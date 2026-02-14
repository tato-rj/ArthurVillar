import { Staff } from "../../music/staff/Staff.js";
import {
  normalizeClef,
  pickOne,
  pickWeighted,
  randomInt,
  spellNoteFromState,
  toArrayMaybe,
} from "../../music/staff/staffUtils.js";

const PAGE_OPENED_AT_MS = Date.now();

export class IntervalChallenge {
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
    P8: "perfect 8th"
  };

  constructor(options) {
    const defaults = {
      staffEl: "#staff",
      basePoints: 1,
      firstTryBonus: 2
    };

    options = options || {};

    this.opts = {
      ...defaults,
      ...options,
      accidentalWeights: {
        ...defaults.accidentalWeights,
        ...(options.accidentalWeights || {})
      },
      intervals: Array.isArray(options.intervals)
      ? options.intervals.slice()
      : Object.keys(IntervalChallenge.INTERVAL_FULL_NAME_MAP)
    };

    this._clefPool = this._normalizeClefPool(
      this.opts.clefs != null ? this.opts.clefs : this.opts.clef
      );

    this._uiSfxReady = false;
    this._uiSfxSynth = null;
    this._uiSfxNoise = null;

    this.$staffEl = $(this.opts.staffEl);
    this.$accidentals = $("#accidentals");
    this.$controls = $("#controls");
    this.$feedback = $("#feedback-success");
    this.$bonusBadge = this.$feedback.find(".bonus");
    this.$points = $("#points");
    this.$increment = $("#increment");

    this.$interval = $("#interval");
    this.$intervalLabel = this.$interval.find("label");
    this.$intervalFull = this.$interval.find("div");

    this.$checkBtn = $("#check button");
    this.$finalOverlay = $("#final-overlay");
    this.$checkWrap = this.$checkBtn.parent();
    this.$progressBar = $("#progress-bar");
    this.$progressCounter = $("#progress-counter");
    this.$helpBtn = $("#help");
    this._currentIntervalAbbr = null;
    this._fixedNote = { letterWithAcc: "?", letterOnly: "?" };
    this._fixedState = null;

    this.successPhrases = ["Awesome", "Nicely done", "Well done", "Great job", "Hooray", "Fantastic", "Nice work", "Looks good", "Good one"];

    this.maxUserNotes = this.opts.maxUserNotes;
    this.numOfChallenges = this.opts.numOfChallenges;
    this.levelName = this.opts.levelName;
    this.points = 0;
    this._madeMistakeThisRound = false;
    this._continueBound = false;
    this._usedHintThisRound = false;

    this._stats = {
      checksTotal: 0,
      checksCorrect: 0,
      finishedAtMs: null
    };

    this.staff = new Staff(this.$staffEl, {
      clef: (this._clefPool && this._clefPool[0]) ? this._clefPool[0] : "treble",
      clefUrls: this.opts.clefUrls || window.__clefUrls,
      autoClef: false,
      getMaxUserNotes: () => this.maxUserNotes,
      sound: !!this.opts.sound
    });

    this.showLetterNames = !!this.opts.showLetterNames;
    this.$staffEl.toggleClass("show-letternames", this.showLetterNames);

    this.$increment.hide();
    this.$bonusBadge.hide();
    this.$points.text(String(this.points));
  }

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
    return IntervalChallenge.INTERVAL_FULL_NAME_MAP[key] || this._deriveFullNameFromAbbr(key);
  }

  _setIntervalUI(intervalAbbr) {
    const abbr = String(intervalAbbr || "").trim();
    this._currentIntervalAbbr = abbr;

    if (this.$intervalLabel && this.$intervalLabel.length) this.$intervalLabel.text(abbr);
    if (this.$intervalFull && this.$intervalFull.length) this.$intervalFull.text(this._fullNameForInterval(abbr));
  }

    // --- UI SFX (Tone.js) ----------------------------------------------------

  async _ensureUiSfxAudio() {
    if (!this.isSoundEnabled()) return;
    if (this._uiSfxReady) return;
    if (!window.Tone) return;

    await Tone.start();

    this._uiSfxSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" },
      envelope: { attack: 0.005, decay: 0.12, sustain: 0.0, release: 0.25 }
    }).toDestination();

    this._uiSfxNoise = new Tone.NoiseSynth({
      noise: { type: "pink" },
      envelope: { attack: 0.001, decay: 0.08, sustain: 0.0, release: 0.06 }
    }).toDestination();

    this._uiSfxReady = true;
  }

  _playSuccessSfx() {
    if (!this.isSoundEnabled() || !window.Tone) return;

    this._ensureUiSfxAudio().then(() => {
      if (!this._uiSfxSynth) return;

      const now = Tone.now();
      const notes = ["C6", "E6", "G6", "C7"];
      notes.forEach((n, i) => {
        this._uiSfxSynth.triggerAttackRelease(n, 0.08, now + i * 0.06, 0.1);
      });
    });
  }

  _playFailSfx() {
    if (!this.isSoundEnabled() || !window.Tone) return;

    this._ensureUiSfxAudio().then(() => {
      const now = Tone.now();

      if (this._uiSfxNoise) {
        this._uiSfxNoise.triggerAttackRelease(0.06, now, 0.1);
      }
      if (this._uiSfxSynth) {
        this._uiSfxSynth.triggerAttackRelease("A2", 0.10, now + 0.01, 0.1);
        this._uiSfxSynth.triggerAttackRelease("G2", 0.12, now + 0.08, 10.1);
      }
    });
  }

  _playFinalSfx() {
    if (!this.isSoundEnabled() || !window.Tone) return;

    this._ensureUiSfxAudio().then(() => {
      if (!this._uiSfxSynth) return;

      const oldEnv = { ...this._uiSfxSynth.get().envelope };
      const oldOsc = this._uiSfxSynth.get().oscillator?.type;

      this._uiSfxSynth.set({
        oscillator: { type: "sine" },
        envelope: { attack: 0.02, decay: 0.25, sustain: 0.35, release: 0.9 }
      });

      const now = Tone.now();

      const chord1 = ["C4", "G4", "C5", "E5"];
      chord1.forEach(n => this._uiSfxSynth.triggerAttackRelease(n, 0.9, now, 0.6));

      const run = ["G5", "A5", "B5", "C6", "D6", "E6", "G6"];
      run.forEach((n, i) => {
        this._uiSfxSynth.triggerAttackRelease(n, 0.08, now + 0.25 + i * 0.06, 0.35);
      });

      setTimeout(() => {
        try {
          this._uiSfxSynth.set({
            oscillator: { type: oldOsc || "triangle" },
            envelope: oldEnv
          });
        } catch (_) {}
      }, 1400);
    });
  }

  start() {
    $("#instructions").show();
    $("#controls").show();
    $("#check").addClass("invisible");

    this.$staffEl.off("staff:userNoteAdded._gate").one("staff:userNoteAdded._gate", () => {
      $("#instructions").remove();
      $("#check").removeClass("invisible");
    });

    this._wireAccidentalPalette();
    this._wireStaffTools();
    this._wireControls();
    this._resetProgress();
    this.newChallenge();

    $("#page-wrapper").fadeIn("fast");
  }

  _normalizeClefPool(clefsOrSingle) {
    const raw = Array.isArray(clefsOrSingle)
    ? clefsOrSingle
    : clefsOrSingle != null
    ? [clefsOrSingle]
    : ["treble", "bass"];

    const normalized = raw
    .map(c => normalizeClef(c))
    .filter(Boolean);

    const uniq = [];
    for (let i = 0; i < normalized.length; i++) {
      if (!uniq.includes(normalized[i])) uniq.push(normalized[i]);
    }

    return uniq.length ? uniq : ["treble", "bass"];
  }

  _currentClefForChallenge() {
    const pool = this._clefPool || ["treble", "bass"];
    if (pool.length === 1) return pool[0];
    return pool[Math.floor(Math.random() * pool.length)];
  }

  setSoundEnabled(enabled) {
    this.opts.sound = !!enabled;
    this.staff.setSoundEnabled(!!enabled);

    if (!this.opts.sound && window.Tone) {
      try { this._uiSfxSynth && this._uiSfxSynth.releaseAll && this._uiSfxSynth.releaseAll(); } catch (_) {}
      try { this._uiSfxSynth && this._uiSfxSynth.dispose && this._uiSfxSynth.dispose(); } catch (_) {}
      try { this._uiSfxNoise && this._uiSfxNoise.dispose && this._uiSfxNoise.dispose(); } catch (_) {}
      this._uiSfxSynth = null;
      this._uiSfxNoise = null;
      this._uiSfxReady = false;

      try { Tone.context && Tone.context.suspend && Tone.context.suspend(); } catch (_) {}
    }

    return this;
  }

  isSoundEnabled() { return this.staff.isSoundEnabled(); }
  getLevel() { return this.opts.levelName; }
  getRounds() { return this.numOfChallenges; }
  getIntervals() { return this.opts.intervals; }

  _wireAccidentalPalette() {
    $("#accidentals .music-font__doublesharp, #accidentals .music-font__doubleflat").addClass("d-none");
  }

  _wireStaffTools() {
    this.staff.enableNoteDragAndClickDelete();
    this.staff.enableGhostClickCreate();
    this.staff.enableAccidentalDrag(
      $("#accidentals .music-font__sharp, #accidentals .music-font__flat, #accidentals .music-font__natural")
      );
    this.staff.enableAccidentalDropOnStaff();

    this.$staffEl
    .off("staff:noteState._log")
    .on("staff:noteState._log", (e, data) => {
      const full = spellNoteFromState(this.staff, data.step, data.accidentalClass);
      const letterOnly = full.replace(/\d+$/, "");

      if (this.showLetterNames) {
        this.$staffEl
        .find('.note[data-note-id="' + data.noteId + '"] .lettername')
        .text(letterOnly);
      }

      if (data.source === "fixed") {
        this._fixedNote = {
          letterWithAcc: letterOnly,
          letterOnly: letterOnly.replace(/[#b]+$/, "")
        };

  // ✅ store exact fixed state for hint calculation
        this._fixedState = {
          step: data.step,
          accidentalClass: data.accidentalClass || null,
          midi: data.midi
        };
      }

      console.log(
        (data.source === "fixed" ? "Fixed note:" : "User note:"),
        full,
        { midi: data.midi, noteId: data.noteId, step: data.step, clef: this.staff.getClef() }
        );
    });
  }

  _showHintNote() {
  // Remove any previous hint
    this.staff.removeNote("hint");

  // Try real computed answer
    const ans = this._computeHintAnswer();

  // Fallback to any note if something is missing (should be rare)
    let step = ans ? ans.step : null;
    let accidentalClass = ans ? ans.accidentalClass : null;

    if (step == null) {
      const min = this.staff.minStepAllowed();
      const max = this.staff.maxStepAllowed();
      for (let tries = 0; tries < 50; tries++) {
        const s = randomInt(min, max);
        if (!this.staff._isStepOccupied(s, null)) { step = s; break; }
      }
    }

    if (step == null) return;

    const id = this.staff.addNote({
      id: "hint",
      step: step,
      className: "hint blink",
  allowOccupied: true, // ✅ allow overlay on top of user note
  skipResolve: true    // ✅ don't shove notes around
});

    if (!id) return;

  // Attach accidental (if any)
    if (accidentalClass) {
      this.staff.attachAccidentalToNote("hint", accidentalClass);
    // Also style accidental as hint+blink
      this.$staffEl.find('.accidental[data-for-note-id="hint"]').addClass("hint blink");
    }

  // Make ledger lines match hint color (+ blink)
    this.$staffEl.find('.ledger[data-for-note-id="hint"]').addClass("hint blink");

  // Remove after blink ends
    const $note = this.$staffEl.find('.note[data-note-id="hint"]');
    if ($note.length) {
      $note.off("animationend.hint webkitAnimationEnd.hint")
      .one("animationend.hint webkitAnimationEnd.hint", () => {
        this.staff.removeNote("hint");
      });
    }
  }




  _wireControls() {
    $("#clear").off("click.intervalChallenge").on("click.intervalChallenge", () => {
      this.staff.clearNotes();
    });

    this.$checkBtn.off("click.intervalChallenge").on("click.intervalChallenge", () => {
      this._onCheck();
    });

    this.$helpBtn.off("click.intervalChallengeHelp").on("click.intervalChallengeHelp", () => {
      this._usedHintThisRound = true;
      this._showHintNote();
    });

    if (!this._continueBound) {
      this._continueBound = true;
      $("#continue button").off("click.intervalChallenge").on("click.intervalChallenge", () => {
        $("#check").show();
        $("#continue").hide();
        this.newChallenge();
        this.$checkBtn.enable();
      });
    }
  }

  _resetProgress() {
    this.$progressBar.data("progress", 0);
    this.$progressBar.css({ width: "0%" });
    this.$progressCounter.text('');
  }

  newChallenge() {
    this.$helpBtn.hide(); 
    this._fixedState = null;

    const clef = this._currentClefForChallenge();
    if (clef && clef !== this.staff.getClef()) this.staff.setClef(clef);

    this._madeMistakeThisRound = false;
    this._usedHintThisRound = false;
    this.$bonusBadge.hide();

    const interval = this._pickInterval();
    const fixed = this._pickFixedNote();

    this.staff.clearNotes();
    this.$accidentals.removeClass("invisible");
    this.$feedback.hide();

    this.$interval.show();
    this._setIntervalUI(interval);

    if (fixed) {
      const fixedId = this.staff.addFixedNote({
        step: fixed.step,
        accidentalClass: fixed.accidentalClass || null
      });

      if (fixedId) this.staff._emitNoteState(fixedId, "fixed");
    }

    $("#check").show();
    $("#continue").hide();
  }

  _pickInterval() {
    const pool = Array.isArray(this.opts.intervals) && this.opts.intervals.length ? this.opts.intervals : ["M3"];
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
      { value: null,                weight: Number(w.natural) || 0 },
      { value: "music-font__sharp", weight: Number(w.sharp) || 0 },
      { value: "music-font__flat",  weight: Number(w.flat) || 0 }
    ]);

    return { step: randomInt(0, 7), accidentalClass };
  }

  _parseIntervalAbbr(abbr) {
    const s = String(abbr || "").trim();
    const m = s.match(/^([PMAmd]+)(\d+)$/);
    if (!m) return null;

    return {
    quality: m[1],          // "M", "m", "P", "A", "d", or repeats like "AA"
    number: parseInt(m[2], 10)
  };
}

_intervalSemitones(quality, simpleNum) {
  const baseMajorPerfect = { 1:0, 2:2, 3:4, 4:5, 5:7, 6:9, 7:11, 8:12 }[simpleNum];
  if (baseMajorPerfect == null) return null;

  const isPerfectClass = (simpleNum === 1 || simpleNum === 4 || simpleNum === 5 || simpleNum === 8);

  // Normalize multi-char qualities like "AA" or "dd"
  const q = String(quality || "").trim();

  if (isPerfectClass) {
    if (q === "P") return baseMajorPerfect;
    if (/^A+$/.test(q)) return baseMajorPerfect + q.length;
    if (/^d+$/.test(q)) return baseMajorPerfect - q.length; // P -> d is -1
    return null;
  }

  // Major/minor class
  if (q === "M") return baseMajorPerfect;
  if (q === "m") return baseMajorPerfect - 1;
  if (/^A+$/.test(q)) return baseMajorPerfect + q.length;
  if (/^d+$/.test(q)) return baseMajorPerfect - (q.length + 1); // M -> d is -2
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

_computeHintAnswer() {
  if (!this._fixedState) return null;

  const abbr = this._currentIntervalAbbr || (this.$intervalLabel && this.$intervalLabel.text()) || "";
  const parsed = this._parseIntervalAbbr(abbr);
  if (!parsed || !Number.isFinite(parsed.number) || parsed.number < 1) return null;

  const diatonicSteps = parsed.number - 1;

  const simpleNum = ((parsed.number - 1) % 7) + 1;
  const octaves = Math.floor((parsed.number - 1) / 7);

  const baseSemiSimple = this._intervalSemitones(parsed.quality, simpleNum);
  if (baseSemiSimple == null) return null;

  const semitones = baseSemiSimple + (12 * octaves);

  const fixedStep = this._fixedState.step;
  const fixedMidi = this._fixedState.midi;

  const minStep = this.staff.minStepAllowed();
  const maxStep = this.staff.maxStepAllowed();

  const tryDir = (dir) => {
    const targetStep = fixedStep + (dir * diatonicSteps);
    if (targetStep < minStep || targetStep > maxStep) return null;

    const targetMidi = fixedMidi + (dir * semitones);
    const naturalTargetMidi = this.staff._stepToMidi(targetStep);
    const off = targetMidi - naturalTargetMidi;

    // only support bb..## for now
    if (off < -2 || off > 2) return null;

    const accidentalClass = this._accidentalClassFromOffset(off);
    if (!accidentalClass) return null;

    return { step: targetStep, accidentalClass };
  };

  // Prefer UP if possible, otherwise DOWN.
  return tryDir(+1) || tryDir(-1);
}


_notesOnStaffOrdered() {
  const $notes = this.$staffEl.find(".note").not(".preview").not(".hint");
  const notes = $notes.toArray().map(el => {
    const id = el.getAttribute("data-note-id");
    const step = this.staff._stepOfNoteEl(el);
    const accCls = this.staff._getAttachedAccidentalClass(id);
    const accOff = this.staff._accidentalClassToOffset(accCls);
    return { id, step, accOff };
  });
  notes.sort((a, b) => a.step - b.step);
  return notes;
}


_qualityFor(simpleNum, semitones) {
  const isPerfectClass = (simpleNum === 1 || simpleNum === 4 || simpleNum === 5 || simpleNum === 8);
  const expectedMajorOrPerfect = { 1:0, 2:2, 3:4, 4:5, 5:7, 6:9, 7:11, 8:12 }[simpleNum];
  const delta = semitones - expectedMajorOrPerfect;

  if (isPerfectClass) {
    if (delta === 0) return "P";
    if (delta === 1) return "A";
    if (delta === -1) return "d";
    if (delta > 1) return "A".repeat(delta);
    if (delta < -1) return "d".repeat(-delta);
  } else {
    if (delta === 0) return "M";
    if (delta === -1) return "m";
    if (delta === 1) return "A";
    if (delta === -2) return "d";
    if (delta > 1) return "A".repeat(delta);
    if (delta < -2) return "d".repeat((-delta) - 1);
  }
  return "?";
}

_intervalNameBetween(noteA, noteB) {
  const midiLow = this.staff._stepToMidi(noteA.step) + (noteA.accOff || 0);
  const midiHigh = this.staff._stepToMidi(noteB.step) + (noteB.accOff || 0);

  const semitones = Math.abs(midiHigh - midiLow);
  const diatonicNum = Math.abs(noteB.step - noteA.step) + 1;

  const simpleNum = ((diatonicNum - 1) % 7) + 1;
  const octaves = Math.floor((diatonicNum - 1) / 7);
  const semitonesReduced = semitones - (12 * octaves);

  return this._qualityFor(simpleNum, semitonesReduced) + diatonicNum;
}

_successAnimation() {
  this._playSuccessSfx();
  this.$helpBtn.hide(); 
  this.$accidentals.addClass("invisible");
  this.$feedback.find(".message span").text(pickOne(this.successPhrases));
  this.$feedback.stop(true, true).fadeIn("fast");
  this.$interval.hide();
}

_showIncrement(earned) {
  const $inc = this.$increment;
  if (!$inc || !$inc.length) return;

  $inc.stop(true, true);
  $inc.text("+" + earned).show();

  if ($inc.animateCSS) {
    $inc.animateCSS("fadeOutUp").then(() => $inc.hide());
  } else {
    setTimeout(() => $inc.hide(), 800);
  }
}

_showBonusBadge(bonusAmount) {
  if (!this.$bonusBadge || !this.$bonusBadge.length) return;

  if (!bonusAmount || bonusAmount <= 0) {
    this.$bonusBadge.hide();
    return;
  }

  this.$bonusBadge.text("+" + bonusAmount + " BONUS").show();

  if (this.$bonusBadge.animateCSS) {
    this.$bonusBadge.animateCSS("tada");
  }
}

_awardPointsForCorrect() {
  if (this._usedHintThisRound) {
    this._showBonusBadge(0);
    return { earned: 0, firstTry: false, bonusEarned: 0 };
  }

  const firstTry = !this._madeMistakeThisRound;

  const base = Number.isFinite(this.opts.basePoints) ? this.opts.basePoints : 1;
  const bonus = Number.isFinite(this.opts.firstTryBonus) ? this.opts.firstTryBonus : 0;

  const earned = firstTry ? (base + bonus) : base;
  const bonusEarned = firstTry ? bonus : 0;

  this.points += earned;
  this.$points.text(String(this.points));

  this._showBonusBadge(bonusEarned);

  return { earned, firstTry, bonusEarned };
}


_updateProgressBar() {
  const steps = Math.max(1, this.numOfChallenges || 1);
  const increment = 100 / steps;
  let current = parseFloat(this.$progressBar.data("progress")) || 0;

  current = Math.min(100, current + increment);

  this.$progressBar.data("progress", current);
  this.$progressBar.css({ width: current + "%" });

  const completed = Math.min(steps, Math.max(0, Math.round(current / increment)));
  this.$progressCounter.text(completed + " of " + steps);

  return current;
}


_failAnimation() {
  this._playFailSfx();

  this.$interval.removeClass("text-blue").addClass("text-red");

  this.$interval.removeClass("animate__animated animate__bounce");
  void this.$interval[0].offsetWidth;
  this.$interval.addClass("animate__animated animate__bounce");

  this.$checkWrap.removeClass("animate__animated animate__shakeX");
  void this.$checkWrap[0].offsetWidth;
  this.$checkWrap.addClass("animate__animated animate__shakeX");

  this.$checkWrap
  .off("animationend._fail webkitAnimationEnd._fail oAnimationEnd._fail MSAnimationEnd._fail")
  .one("animationend._fail webkitAnimationEnd._fail oAnimationEnd._fail MSAnimationEnd._fail", () => {
    this.$checkWrap.removeClass("animate__animated animate__shakeX");
    this.$interval.removeClass("animate__animated animate__bounce");
    this.$interval.removeClass("text-red").addClass("text-blue");
    this.$checkBtn.enable();
  });
}

_onCheck() {
    const notes = this._notesOnStaffOrdered();
    this.$checkBtn.disable();

    this._stats.checksTotal += 1;

    if (notes.length !== 2) {
      this._failAnimation();
      this.$checkBtn[0] && this.$checkBtn[0].blur && this.$checkBtn[0].blur();
      this.$helpBtn.show();
      return;
    }

    const name = this._intervalNameBetween(notes[0], notes[1]);

    if (name === this.$intervalLabel.text()) {
      this._stats.checksCorrect += 1;

      this._successAnimation();

      const { earned } = this._awardPointsForCorrect();

      $("#score").animateCSS && $("#score").animateCSS("heartBeat");

      if (earned > 0) this._showIncrement(earned);

      if (this._updateProgressBar() >= 100) {
        this._stats.finishedAtMs = Date.now();

        setTimeout(() => {
          this._showFinalResults();
        }, 1600);
      } else {
        $("#check").hide();
        $("#continue").show();
      }
    } else {
      this._failAnimation();
      this._madeMistakeThisRound = true;
      this.$helpBtn.show();
    }
  }


  _showFinalResults() {
    const total = Math.max(0, this._stats.checksTotal ?? 0);
    const correct = Math.max(0, this._stats.checksCorrect ?? 0);
    const accuracy = total ? Math.round((correct / total) * 100) : 0;

    const endMs = this._stats.finishedAtMs ?? Date.now();
    const totalSeconds = Math.max(0, Math.floor((endMs - PAGE_OPENED_AT_MS) / 1000));

    const CountUpCtor = window?.CountUp?.CountUp;
    const DURATION = 3.5;

    const mmss = (secs) => {
      const v = Math.max(0, Math.floor(secs));
      const mm = String(Math.floor(v / 60)).padStart(2, "0");
      const ss = String(v % 60).padStart(2, "0");
      return `${mm}:${ss}`;
    };

    const countTo = (selector, endVal, opts = {}) => {
      const el = this.$finalOverlay.find(selector)[0];
      if (!el) return;

      if (!CountUpCtor) {
        el.textContent = String(opts.formattingFn ? opts.formattingFn(endVal) : endVal) + (opts.suffix || "");
        return;
      }

      const c = new CountUpCtor(el, endVal, { duration: DURATION, ...opts });
      if (!c.error) c.start();
    };

    countTo('span[name="rounds"]', this.numOfChallenges);
    countTo('span[name="score"]', this.points);
    countTo('span[name="accuracy"]', accuracy, { suffix: "%" });
    countTo('span[name="duration"]', totalSeconds, { formattingFn: mmss });

    this._playFinalSfx();
    this.$finalOverlay.show();
  }


  _fixedNoteToStaffPosition(noteStr) {
    const parsed = this._parsePitch(noteStr);
    if (!parsed) return null;

    const { midi, accOffset, accidentalClass } = parsed;

    for (let step = this.staff.minStepAllowed(); step <= this.staff.maxStepAllowed(); step++) {
      const baseMidi = this.staff._stepToMidi(step);
      if (baseMidi + accOffset === midi) return { step, accidentalClass };
    }

    let best = null;
    for (let step = this.staff.minStepAllowed(); step <= this.staff.maxStepAllowed(); step++) {
      const baseMidi = this.staff._stepToMidi(step);
      const dist = Math.abs((baseMidi + accOffset) - midi);
      if (!best || dist < best.dist) best = { step, dist };
    }
    return best ? { step: best.step, accidentalClass } : null;
  }

  _parsePitch(pitch) {
    const s = String(pitch || "").trim();
    const m = s.match(/^([A-Ga-g])((?:#{1,2})|(?:b{1,2})|)?(\d+)$/);
    if (!m) return null;

    const letter = m[1].toUpperCase();
    const acc = m[2] || "";
    const octave = parseInt(m[3], 10);

    const baseSemitoneFromC = { C:0, D:2, E:4, F:5, G:7, A:9, B:11 }[letter];
    const accOffset = acc === "##" ? 2 : acc === "#" ? 1 : acc === "bb" ? -2 : acc === "b" ? -1 : 0;

    const accidentalClass =
    accOffset === 2 ? "music-font__doublesharp" :
    accOffset === 1 ? "music-font__sharp" :
    accOffset === -1 ? "music-font__flat" :
    accOffset === -2 ? "music-font__doubleflat" :
    "music-font__natural";

    const midi = 12 * (octave + 1) + baseSemitoneFromC + accOffset;
    return { midi, accOffset, accidentalClass };
  }
}