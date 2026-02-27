// resources/js/music/games/dictation/DictationChallenge.dev.js
import { BaseStaffGame } from "../base/BaseStaffGame.js";
import {
  pickOne,
  pickWeighted,
  toArrayMaybe,
} from "../../staff/staffUtils.js";
import {
  accidentalClassFromOffset,
  fixedNoteToStaffPosition,
  normalizeClefPool,
  parseIntervalAbbr,
  pickChallengeClef,
} from "../shared/challengeUtils.js";

/**
 * Interval Dictation (dev)
 *
 * Rules:
 * - Staff note sounds are always disabled (no click/drag audio).
 * - SFX follow the global sound toggle (BaseStaffGame / opts.sound).
 * - Dictation playback always plays (ignores opts.sound) via its own synth.
 * - The player enters exactly ONE note (the heard note) above/below the fixed note.
 * - Answer checking is pitch-only (enharmonic spellings are accepted).
 */
export class DictationChallenge extends BaseStaffGame {
  static INTERVALS_DEFAULT = ["M2", "m3", "M3", "P5", "P8"];

  constructor(options = {}) {
    const defaults = {
      staffEl: "#staff",
      basePoints: 1,
      firstTryBonus: 2,
      namespace: "dictationChallenge",

      // Dictation: one user note (the heard note).
      maxUserNotes: 1,

      // UI gating: show Check after 1 user note.
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
      intervals:
        Array.isArray(options.intervals) && options.intervals.length
          ? options.intervals.slice()
          : DictationChallenge.INTERVALS_DEFAULT.slice(),
    };

    const clefPool = normalizeClefPool(
      merged.clefs != null ? merged.clefs : merged.clef,
    );

    super({
      ...merged,
      initialClef: clefPool && clefPool[0] ? clefPool[0] : "treble",
    });

    this._clefPool = clefPool;

    // Dictation state
    this._expectedFirst = null; // { step, accidentalClass }
    this._expectedSecond = null; // { step, accidentalClass, accOff, midi }

    // Dictation playback
    this._dictationTimeouts = [];
    this._dictSynth = null;
    this._dictAudioReady = false;

    // Play/Stop UI
    this.$playWrap = null;
    this.$playPlayBtn = null;
    this.$playStopBtn = null;
  }

  // ------------------------ lifecycle ------------------------

  start() {
    super.start();

    // Dictation: never play sounds for user-added/moved staff notes.
    if (this.staff && typeof this.staff._soundEnabled === "function") {
      this.staff._soundEnabled = () => false;
    }

    this.$playWrap = $("#play");
    this.$playPlayBtn = this.$playWrap.find('button[action="play"]');
    this.$playStopBtn = this.$playWrap.find('button[action="stop"]');

    this.$playPlayBtn
      .off(`click.${this.ns}Play`)
      .on(`click.${this.ns}Play`, (e) => {
        e.preventDefault();
        this.playDictation();
      });

    this.$playStopBtn
      .off(`click.${this.ns}Stop`)
      .on(`click.${this.ns}Stop`, (e) => {
        e.preventDefault();
        this._stopDictationPlayback();
        this._setPlayButtons(false);
      });

    // Ensure Play is shown on Continue (new round).
    $("#continue button")
      .off(`click.${this.ns}ShowPlay`)
      .on(`click.${this.ns}ShowPlay`, () => {
        if (this.$playWrap?.length) this.$playWrap.show();
        this._setPlayButtons(false);
      });

    this._setPlayButtons(false);
  }

  // ------------------------ play/stop UI ------------------------

  _setPlayButtons(isPlaying) {
    if (this.$playPlayBtn?.length) this.$playPlayBtn.toggle(!isPlaying);
    if (this.$playStopBtn?.length) this.$playStopBtn.toggle(!!isPlaying);
  }

  // ------------------------ dictation playback ------------------------

  playDictation() {
    if (!this._expectedFirst || !this._expectedSecond) return;

    this._stopDictationPlayback();
    this._setPlayButtons(true);

    const firstMidi =
      this.staff._stepToMidi(this._expectedFirst.step) +
      (this.staff._accidentalClassToOffset(this._expectedFirst.accidentalClass) || 0);

    // Sequence: first -> second -> first -> both together (1s spacing)
    this._playMidi(firstMidi, 0.6, 0.0);
    this._playMidi(this._expectedSecond.midi, 0.6, 1.0);
    this._playMidi(firstMidi, 0.6, 2.0);

    // Both together at t=3.0s (two trigger calls at same time).
    this._playMidi(firstMidi, 0.6, 3.0);
    this._playMidi(this._expectedSecond.midi, 0.6, 3.0);

    this._dictationTimeouts.push(
      setTimeout(() => {
        // eslint-disable-next-line no-console
        console.log("Dictation: user can now write the note on the staff.");
        this._setPlayButtons(false);
      }, 3000),
    );
  }

  _stopDictationPlayback() {
    if (Array.isArray(this._dictationTimeouts)) {
      this._dictationTimeouts.forEach((t) => clearTimeout(t));
    }
    this._dictationTimeouts = [];

    if (this._dictSynth && this._dictSynth.dispose) {
      try {
        this._dictSynth.dispose();
      } catch (_) {}
    }
    this._dictSynth = null;
    this._dictAudioReady = false;
  }

  async _ensureDictationAudio() {
    if (!window.Tone) return;
    if (this._dictAudioReady) return;

    await Tone.start();

    // Poly synth so we can play two notes together.
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
      this._dictSynth.triggerAttackRelease(
        Tone.Frequency(midi, "midi"),
        dur,
        when,
      );
    });
  }

  // ------------------------ selection ------------------------

  _pickInterval() {
    const pool =
      Array.isArray(this.opts.intervals) && this.opts.intervals.length
        ? this.opts.intervals
        : DictationChallenge.INTERVALS_DEFAULT;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  _pickFixedNote() {
    const fixedList = toArrayMaybe(this.opts.fixedNotes).filter(Boolean);
    if (fixedList.length) {
      const chosen = pickOne(fixedList);
      return fixedNoteToStaffPosition(this.staff, chosen);
    }

    const w = this.opts.accidentalWeights || {};
    const accidentalClass = pickWeighted([
      { value: null, weight: Number(w.natural) || 0 },
      { value: "music-font__sharp", weight: Number(w.sharp) || 0 },
      { value: "music-font__flat", weight: Number(w.flat) || 0 },
    ]);

    return { step: this._randomInitialFixedStep(), accidentalClass };
  }

  // ------------------------ interval math ------------------------

  _intervalSemitones(quality, simpleNum) {
    const baseMajorPerfect = { 1:0, 2:2, 3:4, 4:5, 5:7, 6:9, 7:11, 8:12 }[
      simpleNum
    ];
    if (baseMajorPerfect == null) return null;

    const isPerfectClass =
      simpleNum === 1 || simpleNum === 4 || simpleNum === 5 || simpleNum === 8;
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

  _computeSecondFromFixed(intervalAbbr, fixedStep, fixedMidi) {
    const parsed = parseIntervalAbbr(intervalAbbr);
    if (!parsed || !Number.isFinite(parsed.number) || parsed.number < 1) return null;

    const diatonicSteps = parsed.number - 1;
    const simpleNum = ((parsed.number - 1) % 7) + 1;
    const octaves = Math.floor((parsed.number - 1) / 7);

    const baseSemiSimple = this._intervalSemitones(parsed.quality, simpleNum);
    if (baseSemiSimple == null) return null;

    const semitones = baseSemiSimple + 12 * octaves;

    const minStep = this.staff.minStepAllowed();
    const maxStep = this.staff.maxStepAllowed();

    const build = (dir) => {
      const targetStep = fixedStep + dir * diatonicSteps;
      if (targetStep < minStep || targetStep > maxStep) return null;

      const targetMidi = fixedMidi + dir * semitones;
      const naturalTargetMidi = this.staff._stepToMidi(targetStep);
      const off = targetMidi - naturalTargetMidi;

      // Limit to supported accidentals.
      if (off < -2 || off > 2) return null;

      const accidentalClass = accidentalClassFromOffset(off);
      if (!accidentalClass) return null;

      return { step: targetStep, accidentalClass, accOff: off, midi: targetMidi };
    };

    const up = build(+1);
    const down = build(-1);

    if (up && down) return pickOne([up, down]);
    return up || down || null;
  }

  // ------------------------ game flow ------------------------

  newChallenge() {
    if (this.$playWrap?.length) this.$playWrap.show();
    this._setPlayButtons(false);

    this.$helpBtn.hide();
    this._fixedState = null;
    this._expectedFirst = null;
    this._expectedSecond = null;

    const clef = pickChallengeClef(this._clefPool);
    if (clef && clef !== this.staff.getClef()) this.staff.setClef(clef);

    this._madeMistakeThisRound = false;
    this._usedHintThisRound = false;
    this.$bonusBadge.hide();
    this.$doublePoints?.hide?.();

    const interval = this._pickInterval();

    // Retry until we find a playable pair within staff bounds/accidentals.
    let fixed = null;
    let second = null;

    for (let i = 0; i < 40; i += 1) {
      fixed = this._pickFixedNote();
      if (!fixed) continue;

      const fixedAccOff = this.staff._accidentalClassToOffset(fixed.accidentalClass) || 0;
      const fixedMidi = this.staff._stepToMidi(fixed.step) + fixedAccOff;

      second = this._computeSecondFromFixed(interval, fixed.step, fixedMidi);
      if (second) break;
    }

    if (!fixed || !second) return;

    this.staff.clearNotes();
    this.$accidentals.removeClass("invisible");
    this.$feedback.hide();

    // Show the initial note immediately (suppress natural glyph).
    const fixedAcc =
      fixed.accidentalClass === "music-font__natural" ? null : (fixed.accidentalClass || null);

    const fixedId = this.staff.addFixedNote({
      step: fixed.step,
      accidentalClass: fixedAcc,
    });
    if (fixedId) this.staff._emitNoteState(fixedId, "fixed");

    this._expectedFirst = { step: fixed.step, accidentalClass: fixed.accidentalClass || null };
    this._expectedSecond = second;

    $("#continue").hide();
  }

  // ------------------------ notes + hint ------------------------

  _notesOnStaffOrdered() {
    const $notes = this.$staffEl.find(".note").not(".preview").not(".hint");
    const notes = $notes.toArray().map((el) => {
      const id = el.getAttribute("data-note-id");
      const step = this.staff._stepOfNoteEl(el);
      const accCls = this.staff._getAttachedAccidentalClass(id);
      const accOff = this.staff._accidentalClassToOffset(accCls) || 0;
      const fixed = el.classList.contains("fixed");
      return { id, step, accOff, fixed };
    });

    notes.sort((a, b) => a.step - b.step);
    return notes;
  }

  _computeHintAnswer() {
    if (!this._expectedSecond) return null;
    return {
      step: this._expectedSecond.step,
      accidentalClass: this._expectedSecond.accidentalClass || null,
    };
  }

  // ------------------------ evaluation ------------------------

  _onCheck() {
    this._stopDictationPlayback();
    this._setPlayButtons(false);

    const notes = this._notesOnStaffOrdered();
    this.$checkBtn.disable();

    this._stats.checksTotal += 1;

    if (!this._expectedSecond) return;

    // fixed + 1 user note
    if (notes.length !== 2) {
      this._madeAnyMistake = true;
      this._madeMistakeThisRound = true;
      this._failAnimation(this.$checkWrap);
      this.$helpBtn.show();
      return;
    }

    const user = notes.find((n) => !n.fixed) || null;
    if (!user) {
      this._madeAnyMistake = true;
      this._madeMistakeThisRound = true;
      this._failAnimation(this.$checkWrap);
      this.$helpBtn.show();
      return;
    }

    // Pitch-only correctness (enharmonics accepted).
    const userMidi = this.staff._stepToMidi(user.step) + (user.accOff || 0);
    const ok = userMidi === this._expectedSecond.midi;

    if (ok) {
      this._stats.checksCorrect += 1;
      this._pauseGameTimer();

      const { earned, bonusEarned } = this._awardPointsForCorrect();
      this._successAnimation({ isBonus: bonusEarned > 0 });

      if (this.$playWrap?.length) this.$playWrap.hide();

      $("#score").animateCSS && $("#score").animateCSS("heartBeat");
      if (earned > 0) this._showIncrement(earned);

      if (this._updateProgressBar() >= 100) {
        this._stats.finishedAtMs = Date.now();
        this.$checkBtn.text('Final results, let\'s see…');
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
