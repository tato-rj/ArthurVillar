import { BaseStaffGame } from "../base/BaseStaffGame.js";
import {
  normalizeClef,
  pickOne,
  pickWeighted,
  toArrayMaybe,
} from "../../staff/staffUtils.js";

export class IntervalsChallenge extends BaseStaffGame {
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
      namespace: "intervalsChallenge",
    };

    const merged = {
      ...defaults,
      ...options,
      accidentalWeights: {
        ...(defaults.accidentalWeights || {}),
        ...(options.accidentalWeights || {}),
      },
      intervals: Array.isArray(options.intervals)
        ? options.intervals.slice()
        : Object.keys(IntervalsChallenge.INTERVAL_FULL_NAME_MAP),
    };

    const clefPool = IntervalsChallenge._normalizeClefPoolStatic(
      merged.clefs != null ? merged.clefs : merged.clef,
    );

    super({
      ...merged,
      initialClef: (clefPool && clefPool[0]) ? clefPool[0] : "treble",
    });

    this._clefPool = clefPool;

    // interval UI
    this.$interval = $("#interval");
    this.$intervalLabel = this.$interval.find("label");
    this.$intervalFull = this.$interval.find("div");

    this._currentIntervalAbbr = null;
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
    return IntervalsChallenge.INTERVAL_FULL_NAME_MAP[key] || this._deriveFullNameFromAbbr(key);
  }

  _setIntervalUI(intervalAbbr) {
    const abbr = String(intervalAbbr || "").trim();
    this._currentIntervalAbbr = abbr;

    if (this.$intervalLabel?.length) this.$intervalLabel.text(abbr);
    if (this.$intervalFull?.length) this.$intervalFull.text(this._fullNameForInterval(abbr));
  }

  static _normalizeClefPoolStatic(clefsOrSingle) {
    const raw = Array.isArray(clefsOrSingle)
      ? clefsOrSingle
      : clefsOrSingle != null
        ? [clefsOrSingle]
        : ["treble", "bass"];

    const normalized = raw.map((c) => normalizeClef(c)).filter(Boolean);

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

  // ------------------------ game flow ------------------------

  newChallenge() {
    this.$helpBtn.hide();
    this._fixedState = null;

    const clef = this._currentClefForChallenge();
    if (clef && clef !== this.staff.getClef()) this.staff.setClef(clef);

    this._madeMistakeThisRound = false;
    this._usedHintThisRound = false;
    this.$bonusBadge.hide();
    this.$doublePoints?.hide?.();

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
        accidentalClass: fixed.accidentalClass || null,
      });

      if (fixedId) this.staff._emitNoteState(fixedId, "fixed");
    }

    $("#check").show();
    $("#continue").hide();
  }

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

  // ------------------------ evaluation ------------------------

  _notesOnStaffOrdered() {
    const $notes = this.$staffEl.find(".note").not(".preview").not(".hint");
    const notes = $notes.toArray().map((el) => {
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

  _onCheck() {
    const notes = this._notesOnStaffOrdered();
    this.$checkBtn.disable();

    this._stats.checksTotal += 1;

    if (notes.length !== 2) {
      this._madeAnyMistake = true;
      this._madeMistakeThisRound = true;

      this.$interval.removeClass("text-blue").addClass("text-red");
      this._failAnimation(this.$checkWrap);

      this.$checkBtn[0] && this.$checkBtn[0].blur && this.$checkBtn[0].blur();
      this.$helpBtn.show();
      return;
    }

    const name = this._intervalNameBetween(notes[0], notes[1]);

    if (name === this.$intervalLabel.text()) {
      this._stats.checksCorrect += 1;

      const { earned, bonusEarned } = this._awardPointsForCorrect();

      this._successAnimation({ isBonus: bonusEarned > 0 });
      this.$interval.hide();

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

      this.$interval.removeClass("text-blue").addClass("text-red");
      this._failAnimation(this.$checkWrap);

      // restore interval color after fail animation completes
      this.$checkWrap
        .off(`animationend._failRestore.${this.ns} webkitAnimationEnd._failRestore.${this.ns}`)
        .one(`animationend._failRestore.${this.ns} webkitAnimationEnd._failRestore.${this.ns}`, () => {
          this.$interval.removeClass("text-red").addClass("text-blue");
        });

      this.$helpBtn.show();
    }
  }

  // ------------------------ hint math (interval-specific) ------------------------

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

  _computeHintAnswer() {
    if (!this._fixedState) return null;

    const abbr =
      this._currentIntervalAbbr || (this.$intervalLabel && this.$intervalLabel.text()) || "";
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

      if (off < -2 || off > 2) return null;

      const accidentalClass = this._accidentalClassFromOffset(off);
      if (!accidentalClass) return null;

      return { step: targetStep, accidentalClass };
    };

    return tryDir(+1) || tryDir(-1);
  }

  // ------------------------ pitch parsing (for fixedNotes option) ------------------------

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
