// resources/js/music/games/dictation/DictationChallenge.dev.js
import { BaseStaffGame } from "../base/BaseStaffGame.js";
import {
  normalizeClef,
  pickOne,
  pickWeighted,
  randomInt,
  toArrayMaybe,
} from "../../staff/staffUtils.js";

export class DictationChallenge extends BaseStaffGame {
  static INTERVAL_FULL_NAME_MAP = {
    m2: "minor 2nd",
    M2: "major 2nd",
    m3: "minor 3rd",
    M3: "major 3rd",
    P4: "perfect 4th",
    A4: "augmented 4th",
    d5: "diminished 5th",
    P5: "perfect 5th",
    m6: "minor 6th",
    M6: "major 6th",
    m7: "minor 7th",
    M7: "major 7th",
    P8: "perfect 8th",
  };

  constructor(options = {}) {
    const defaults = {
      staffEl: "#staff",
      basePoints: 1,
      firstTryBonus: 2,
      namespace: "dictationChallenge",
      maxUserNotes: 1,
      instructionsAfterUserNotes: 1,
      checkAfterUserNotes: 1,
    };

    const merged = {
      ...defaults,
      ...options,
      accidentalWeights: {
        ...(defaults.accidentalWeights || {}),
        ...(options.accidentalWeights || {}),
      },
      intervals: Array.isArray(options.intervals) && options.intervals.length
        ? options.intervals.slice()
        : Object.keys(DictationChallenge.INTERVAL_FULL_NAME_MAP),
    };

    const clefPool = DictationChallenge._normalizeClefPoolStatic(
      merged.clefs != null ? merged.clefs : merged.clef,
    );

    super({
      ...merged,
      initialClef: clefPool && clefPool[0] ? clefPool[0] : "treble",
    });

    this._clefPool = clefPool;

    // UI (re-using #interval container)
    this.$interval = $("#interval");
    this.$intervalLabel = this.$interval.find("label");
    this.$intervalFull = this.$interval.find("div");

    this._currentIntervalAbbr = null;

    this._expectedFirst = null;
    this._expectedSecond = null;
    this._dictationTimeouts = [];
    this._expectedSecond = null; // { step, accidentalClass, accOff, midi }
    this._dictSynth = null;
    this._dictAudioReady = false;
  }

  static _normalizeClefPoolStatic(clefsOrSingle) {
    const raw = Array.isArray(clefsOrSingle)
      ? clefsOrSingle
      : clefsOrSingle != null
        ? [clefsOrSingle]
        : ["treble", "bass"];

    const normalized = raw.map((c) => normalizeClef(c)).filter(Boolean);

    const uniq = [];
    for (let i = 0; i < normalized.length; i += 1) {
      if (!uniq.includes(normalized[i])) uniq.push(normalized[i]);
    }

    return uniq.length ? uniq : ["treble", "bass"];
  }

  _currentClefForChallenge() {
    const pool = this._clefPool || ["treble", "bass"];
    if (pool.length === 1) return pool[0];
    return pool[Math.floor(Math.random() * pool.length)];
  }

  // ------------------------ interval UI ------------------------

  _deriveFullNameFromAbbr(abbr) {
    const m = String(abbr || "").trim().match(/^([PMAmd])(\d+)$/);
    if (!m) return abbr;

    const q = m[1];
    const n = m[2];

    const qWord =
      q === "m" ? "minor" :
      q === "M" ? "major" :
      q === "P" ? "perfect" :
      q === "A" ? "augmented" :
      q === "d" ? "diminished" :
      q;

    return `${qWord} ${n}`;
  }

  _fullNameForInterval(abbr) {
    const key = String(abbr || "").trim();
    return DictationChallenge.INTERVAL_FULL_NAME_MAP[key] || this._deriveFullNameFromAbbr(key);
  }

  _setIntervalUI(intervalAbbr) {
    const abbr = String(intervalAbbr || "").trim();
    this._currentIntervalAbbr = abbr;

    // For dictation we can hide this later; for now keep visible.
    if (this.$intervalLabel?.length) this.$intervalLabel.text(abbr);
    if (this.$intervalFull?.length) this.$intervalFull.text(this._fullNameForInterval(abbr));
  }


  start() {
    super.start();

    // Dictation: never play sounds for user-added/moved staff notes.
    if (this.staff && typeof this.staff._soundEnabled === "function") {
      this.staff._soundEnabled = () => false;
    }

    this.$playBtn = $("#play");
    this.$playBtn.find('button')
      .off(`click.${this.ns}Play`)
      .on(`click.${this.ns}Play`, (e) => {
        e.preventDefault();
        this.playDictation();
      });

    // Show Play again on Continue (after feedback hides / next round starts).
    $("#continue button")
      .off(`click.${this.ns}ShowPlay`)
      .on(`click.${this.ns}ShowPlay`, () => {
        if (this.$playBtn?.length) this.$playBtn.show();
      });

  }

  playDictation() {
    if (!this._expectedFirst || !this._expectedSecond) return;
    this._stopDictationPlayback();

    const firstMidi =
      this.staff._stepToMidi(this._expectedFirst.step) +
      (this.staff._accidentalClassToOffset(this._expectedFirst.accidentalClass) || 0);

    // 0s: first note, +1s: second note, +2s: both together
    this._playMidi(firstMidi, 0.6, 0);
    this._playMidi(this._expectedSecond.midi, 0.6, 1.0);
    this._playMidi(firstMidi, 0.6, 2.0);
    this._playMidi(this._expectedSecond.midi, 0.6, 2.0);

    this._dictationTimeouts.push(setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log("Dictation: user can now write the note on the staff.");
    }, 2000));
  }

  _stopDictationPlayback() {
    if (Array.isArray(this._dictationTimeouts)) {
      this._dictationTimeouts.forEach((t) => clearTimeout(t));
    }
    this._dictationTimeouts = [];

    // Dispose the synth to cancel any scheduled Tone events from previous plays.
    if (this._dictSynth && this._dictSynth.dispose) {
      try { this._dictSynth.dispose(); } catch (_) {}
    }
    this._dictSynth = null;
    this._dictAudioReady = false;
  }
  // ------------------------ sound (dictation playback) ------------------------

  async _ensureDictationAudio() {
    if (!window.Tone) return;
    if (this._dictAudioReady) return;

    await Tone.start();

    // Poly synth so we can play the two notes together.
    this._dictSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
      envelope: { attack: 0.01, decay: 0.08, sustain: 0.35, release: 0.25 },
    }).toDestination();

    this._dictAudioReady = true;
  }

  _playMidi(midi, durSeconds, atSecondsFromNow) {
    if (!window.Tone) return;

    this._ensureDictationAudio().then(() => {
      if (!this._dictSynth) return;
      const now = Tone.now();
      const when = now + (Number(atSecondsFromNow) || 0);
      const dur = Number(durSeconds) || 0.6;
      this._dictSynth.triggerAttackRelease(Tone.Frequency(midi, "midi"), dur, when);
    });
  }

  // ------------------------ interval math ------------------------

  _parseIntervalAbbr(abbr) {
    const s = String(abbr || "").trim();
    const m = s.match(/^([PMAmd]+)(\d+)$/);
    if (!m) return null;
    return { quality: m[1], number: parseInt(m[2], 10) };
  }

  _intervalSemitones(quality, simpleNum) {
    const baseMajorPerfect = { 1:0, 2:2, 3:4, 4:5, 5:7, 6:9, 7:11, 8:12 }[simpleNum];
    if (baseMajorPerfect == null) return null;

    const isPerfectClass = (simpleNum === 1 || simpleNum === 4 || simpleNum === 5 || simpleNum === 8);
    const q = String(quality || "").trim();

    if (isPerfectClass) {
      if (q === "P") return baseMajorPerfect;
      if (/^A+$/.test(q)) return baseMajorPerfect + q.length;
      if (/^d+$/.test(q)) return baseMajorPerfect - q.length;
      return null;
    }

    if (q === "M") return baseMajorPerfect;
    if (q === "m") return baseMajorPerfect - 1;
    if (/^A+$/.test(q)) return baseMajorPerfect + q.length;
    if (/^d+$/.test(q)) return baseMajorPerfect - (q.length + 1);
    return null;
  }

  _accidentalClassFromOffset(off) {
    if (off === 2) return "music-font__doublesharp";
    if (off === 1) return "music-font__sharp";
    if (off === 0) return "music-font__natural";
    if (off === -1) return "music-font__flat";
    if (off === -2) return "music-font__doubleflat";
    return null;
  }

  _computeSecondFromFixed(intervalAbbr, fixedStep, fixedMidi) {
    const parsed = this._parseIntervalAbbr(intervalAbbr);
    if (!parsed || !Number.isFinite(parsed.number) || parsed.number < 1) return null;

    const diatonicSteps = parsed.number - 1;
    const simpleNum = ((parsed.number - 1) % 7) + 1;
    const octaves = Math.floor((parsed.number - 1) / 7);

    const baseSemiSimple = this._intervalSemitones(parsed.quality, simpleNum);
    if (baseSemiSimple == null) return null;

    const semitones = baseSemiSimple + (12 * octaves);

    const minStep = this.staff.minStepAllowed();
    const maxStep = this.staff.maxStepAllowed();

    const targetStep = fixedStep + diatonicSteps; // dictation: always above for now
    if (targetStep < minStep || targetStep > maxStep) return null;

    const targetMidi = fixedMidi + semitones;
    const naturalTargetMidi = this.staff._stepToMidi(targetStep);
    const off = targetMidi - naturalTargetMidi;

    // Keep within the accidental set you support. (Adjust later if you expand.)
    if (off < -2 || off > 2) return null;

    const accidentalClass = this._accidentalClassFromOffset(off);
    if (!accidentalClass) return null;

    return {
      step: targetStep,
      accidentalClass,
      accOff: off,
      midi: targetMidi,
    };
  }

  // ------------------------ selection ------------------------

  _pickInterval() {
    const pool =
      Array.isArray(this.opts.intervals) && this.opts.intervals.length
        ? this.opts.intervals
        : ["M3"];
    return pool[Math.floor(Math.random() * pool.length)];
  }

  _pickFixedNote() {
    const fixedList = toArrayMaybe(this.opts.fixedNotes).filter(Boolean);
    if (fixedList.length) {
      const chosen = pickOne(fixedList);
      return this._fixedNoteToStaffPosition(chosen);
    }

    const w = this.opts.accidentalWeights || {};
    const accidentalClass = pickWeighted([
      { value: null, weight: Number(w.natural) || 0 },
      { value: "music-font__sharp", weight: Number(w.sharp) || 0 },
      { value: "music-font__flat", weight: Number(w.flat) || 0 },
    ]);

    return { step: this._randomInitialFixedStep(), accidentalClass };
  }

  // ------------------------ game flow ------------------------

  newChallenge() {
    if (this.$playBtn?.length) this.$playBtn.show();
    this.$helpBtn.hide();
    this._fixedState = null;
    this._expectedSecond = null;

    const clef = this._currentClefForChallenge();
    if (clef && clef !== this.staff.getClef()) this.staff.setClef(clef);

    this._madeMistakeThisRound = false;
    this._usedHintThisRound = false;
    this.$bonusBadge.hide();
    this.$doublePoints?.hide?.();

    const interval = this._pickInterval();

    // Keep retrying until we get a playable fixed+second within staff bounds/accidentals.
    let fixed = null;
    let second = null;
    for (let i = 0; i < 40; i += 1) {
      fixed = this._pickFixedNote();
      if (!fixed) continue;

      const fixedAccOff = this.staff._accidentalClassToOffset(fixed.accidentalClass);
      const fixedMidi = this.staff._stepToMidi(fixed.step) + fixedAccOff;

      second = this._computeSecondFromFixed(interval, fixed.step, fixedMidi);
      if (second) break;
    }
    if (!fixed || !second) return;

    this.staff.clearNotes();
    this.$accidentals.removeClass("invisible");
    this.$feedback.hide();

    // Hide the interval prompt; reveal only after a correct answer.
    this._setIntervalUI(interval);
    this.$interval.hide();

    // Show the initial note immediately.
    const fixedAcc =
      fixed.accidentalClass === "music-font__natural" ? null : (fixed.accidentalClass || null);

    const fixedId = this.staff.addFixedNote({
      step: fixed.step,
      accidentalClass: fixedAcc,
    });
    if (fixedId) this.staff._emitNoteState(fixedId, "fixed");

    // Store expected second for later checking.
    this._expectedSecond = second;
    this._expectedFirst = {
      step: fixed.step,
      accidentalClass: fixed.accidentalClass || null,
    };

    // Dictation playback is triggered by the #play button.

    $("#continue").hide();
  }


  _notesOnStaffOrdered() {
    const $notes = this.$staffEl.find(".note").not(".preview").not(".hint");
    const notes = $notes.toArray().map((el) => {
      const id = el.getAttribute("data-note-id");
      const step = this.staff._stepOfNoteEl(el);
      const accCls = this.staff._getAttachedAccidentalClass(id);
      const accOff = this.staff._accidentalClassToOffset(accCls);
      const fixed = el.classList.contains("fixed");
      return { id, step, accOff, fixed };
    });

    notes.sort((a, b) => a.step - b.step);
    return notes;
  }

  // ------------------------ evaluation (placeholder) ------------------------

  // ------------------------ hint (show answer) ------------------------

  _computeHintAnswer() {
    // For interval dictation, the "Show answer" hint should always be the expected 2nd note.
    if (!this._expectedSecond) return null;
    return {
      step: this._expectedSecond.step,
      accidentalClass: this._expectedSecond.accidentalClass || null,
    };
  }

  // We'll implement actual dictation checking next step.
  _onCheck() {
    const notes = this._notesOnStaffOrdered();
    this.$checkBtn.disable();

    this._stats.checksTotal += 1;

    if (!this._expectedSecond) return;

    if (notes.length !== 2) {
      this._madeAnyMistake = true;
      this._madeMistakeThisRound = true;

      this._failAnimation(this.$checkWrap);
      this.$helpBtn.show();
      return;
    }

    const root = notes.find((n) => n.fixed) || notes[0];
    const user = notes.find((n) => !n.fixed) || null;

    if (!user) {
      this._madeAnyMistake = true;
      this._madeMistakeThisRound = true;
      this._failAnimation(this.$checkWrap);
      this.$helpBtn.show();
      return;
    }

    const ok =
      user.step === this._expectedSecond.step &&
      (user.accOff || 0) === (this._expectedSecond.accOff || 0);

    if (ok) {
      this._stats.checksCorrect += 1;

      const { earned, bonusEarned } = this._awardPointsForCorrect();

      this._successAnimation({ isBonus: bonusEarned > 0 });

      if (this.$playBtn?.length) this.$playBtn.hide();

      // Reveal the interval only when correct.
      this.$interval.show();

      $("#score").animateCSS && $("#score").animateCSS("heartBeat");
      if (earned > 0) this._showIncrement(earned);

      if (this._updateProgressBar() >= 100) {
        this._stats.finishedAtMs = Date.now();
        setTimeout(() => this._showFinalResults(), 1600);
      } else {
        $("#check").hide();
        $("#continue").show();
      }
    } else {
      this._madeAnyMistake = true;
      this._madeMistakeThisRound = true;

      this._failAnimation(this.$checkWrap);
      this.$helpBtn.show();
    }
  }
}
