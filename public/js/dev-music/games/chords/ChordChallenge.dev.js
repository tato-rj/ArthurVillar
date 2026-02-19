// resources/js/music/games/interval/ChordChallenge.js
import { BaseStaffGame } from "../base/BaseStaffGame.js";
import {
  normalizeClef,
  pickOne,
  pickWeighted,
  randomInt,
  toArrayMaybe,
} from "../../staff/staffUtils.js";

export class ChordChallenge extends BaseStaffGame {
  static TRIAD_QUALITY_FULL_NAME_MAP = {
    major: "major",
    minor: "minor",
    augmented: "augmented",
    diminished: "diminished",
  };

  static TRIAD_QUALITY_SHORT_SUFFIX_MAP = {
    major: "",
    minor: "m",
    augmented: "aug",
    diminished: "°",
  };

  constructor(options = {}) {
    const defaults = {
      staffEl: "#staff",
      basePoints: 1,
      firstTryBonus: 2,
      namespace: "chordChallenge",
      // BaseStaffGame UI gating: triads need 2 user notes before Check/instructions
      instructionsAfterUserNotes: 2,
      checkAfterUserNotes: 2,
    };

    const merged = {
      ...defaults,
      ...options,
      accidentalWeights: {
        ...(defaults.accidentalWeights || {}),
        ...(options.accidentalWeights || {}),
      },
      triadQualities: Array.isArray(options.triadQualities) && options.triadQualities.length
        ? options.triadQualities.slice()
        : Object.keys(ChordChallenge.TRIAD_QUALITY_FULL_NAME_MAP),
    };

    const clefPool = ChordChallenge._normalizeClefPoolStatic(
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
    return ChordChallenge.TRIAD_QUALITY_FULL_NAME_MAP[key] || this._deriveFullNameFromAbbr(key);
  }


_setTriadUI(quality) {
  this._currentTriadQuality = String(quality || "").trim();
  this.$interval.removeClass("text-red").addClass("text-blue");
  this._refreshTriadUILabels();
}

_triadShortName(root, quality) {
  const r = String(root || "").trim();
  const q = String(quality || "").trim();
  const suffix = ChordChallenge.TRIAD_QUALITY_SHORT_SUFFIX_MAP[q] ?? "";
  return `${r}${suffix}`;
}

_triadFullName(root, quality) {
  const r = String(root || "").trim();
  const q = String(quality || "").trim();
  const qWord = ChordChallenge.TRIAD_QUALITY_FULL_NAME_MAP[q] || q;
  return `${r} ${qWord}`.trim();
}

_refreshTriadUILabels() {
  const q = this._currentTriadQuality;
  const root =
    this._fixedNote && this._fixedNote.letterWithAcc && this._fixedNote.letterWithAcc !== "?"
      ? this._fixedNote.letterWithAcc
      : null;

  const shortLabel = root ? this._triadShortName(root, q) : q;
  const fullLabel = root ? this._triadFullName(root, q) : (ChordChallenge.TRIAD_QUALITY_FULL_NAME_MAP[q] || q);

  if (this.$intervalLabel?.length) this.$intervalLabel.text(shortLabel);
  if (this.$intervalFull?.length) this.$intervalFull.text(fullLabel);
}

_onFixedNoteState() {
  // BaseStaffGame updates this._fixedNote before calling this hook.
  this._refreshTriadUILabels();
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

  const quality = this._pickTriadQuality();
  const fixed = this._pickFixedNote();

  this.staff.clearNotes();
  this.$accidentals.removeClass("invisible");
  this.$feedback.hide();

  this.$interval.show();
  this._setTriadUI(quality);

  if (fixed) {
    const fixedId = this.staff.addFixedNote({
      step: fixed.step,
      accidentalClass: fixed.accidentalClass || null,
    });

    if (fixedId) this.staff._emitNoteState(fixedId, "fixed");
  }

  $("#continue").hide();
}



_pickTriadQuality() {
  const pool =
    Array.isArray(this.opts.triadQualities) && this.opts.triadQualities.length
      ? this.opts.triadQualities
      : ["major"];
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

    return { step: randomInt(0, 7), accidentalClass };
  }

  // ------------------------ evaluation ------------------------


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

  if (notes.length !== 3) {
    this._madeAnyMistake = true;
    this._madeMistakeThisRound = true;

    this.$interval.removeClass("text-blue").addClass("text-red");
    this._failAnimation(this.$checkWrap);

    this.$checkBtn[0] && this.$checkBtn[0].blur && this.$checkBtn[0].blur();
    this.$helpBtn.show();
    return;
  }

  const root = notes.find((n) => n.fixed) || notes[0];
  const others = notes.filter((n) => n.id !== root.id);

  const rootMidi = this.staff._stepToMidi(root.step) + (root.accOff || 0);
  const intervals = others
    .map((n) => {
      const midi = this.staff._stepToMidi(n.step) + (n.accOff || 0);
      let d = (midi - rootMidi) % 12;
      if (d < 0) d += 12;
      return d;
    })
    .filter((d) => d !== 0)
    .sort((a, b) => a - b);

  const expectedByQuality = {
    major: [4, 7],
    minor: [3, 7],
    augmented: [4, 8],
    diminished: [3, 6],
  };

  const expected = expectedByQuality[this._currentTriadQuality] || null;
  const ok = expected && intervals.length === 2 && intervals[0] === expected[0] && intervals[1] === expected[1];

  if (ok) {
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
  const notes = this._notesOnStaffOrdered();
  if (notes.length < 1) return null;

  const root = notes.find((n) => n.fixed) || notes[0];
  const rootMidi = this.staff._stepToMidi(root.step) + (root.accOff || 0);

  const expectedByQuality = {
    major: [4, 7],
    minor: [3, 7],
    augmented: [4, 8],
    diminished: [3, 6],
  };
  const expected = expectedByQuality[this._currentTriadQuality] || null;
  if (!expected) return null;

  const present = new Set(
    notes
      .filter((n) => n.id !== root.id)
      .map((n) => {
        const midi = this.staff._stepToMidi(n.step) + (n.accOff || 0);
        let d = (midi - rootMidi) % 12;
        if (d < 0) d += 12;
        return d;
      }),
  );

  const missing = expected.filter((d) => !present.has(d));
  if (!missing.length) return null;

  const target = pickOne(missing);
  // Choose the closest staff step to root+target that is within bounds.
  const min = this.staff.minStepAllowed();
  const max = this.staff.maxStepAllowed();

  let best = null;
  for (let step = min; step <= max; step++) {
    if (this.staff._isStepOccupied(step, null)) continue;
    const midi = this.staff._stepToMidi(step);
    let d = (midi - rootMidi) % 12;
    if (d < 0) d += 12;

    const neededOffset = (target - d + 12) % 12;
    const offset = neededOffset > 6 ? neededOffset - 12 : neededOffset;

    const accClass = this._accidentalClassFromOffset(offset);
    if (accClass == null && offset !== 0) continue;

    const cost = Math.abs(midi + offset - (rootMidi + target));
    if (!best || cost < best.cost) best = { step, accidentalClass: accClass, cost };
  }

  
  return best ? { step: best.step, accidentalClass: best.accidentalClass } : null;
}

/**
 * ChordChallenge.dev.js
 * Override for BaseStaffGame multi-hint support.
 */
_computeHintAnswers() {
  const notes = this._notesOnStaffOrdered();
  if (notes.length < 1) return [];

  const root = notes.find((n) => n.fixed) || notes[0];
  const rootMidi = this.staff._stepToMidi(root.step) + (root.accOff || 0);

  const expectedByQuality = {
    major: [4, 7],
    minor: [3, 7],
    augmented: [4, 8],
    diminished: [3, 6],
  };
  const expected = expectedByQuality[this._currentTriadQuality];
  if (!expected) return [];

  const presentPCs = new Set(
    notes
      .filter((n) => n.id !== root.id)
      .map((n) => {
        const midi = this.staff._stepToMidi(n.step) + (n.accOff || 0);
        let d = (midi - rootMidi) % 12;
        if (d < 0) d += 12;
        return d;
      }),
  );

  const min = this.staff.minStepAllowed();
  const max = this.staff.maxStepAllowed();

  const buildHintAtStep = (id, step, targetSemis) => {
    if (step < min || step > max) return null;

    const naturalMidi = this.staff._stepToMidi(step);
    let offset = (rootMidi + targetSemis) - naturalMidi;

    // Keep offsets reasonable (supports double-flats/sharps if your CSS supports them)
    while (offset > 6) offset -= 12;
    while (offset < -6) offset += 12;

    const accClass = this._accidentalClassFromOffset(offset);
    if (accClass == null && offset !== 0) return null;

    return { id, step, accidentalClass: accClass };
  };

  const thirdStep = root.step + 2;
  const fifthStep = root.step + 4;

  const thirdSemis = expected[0];
  const fifthSemis = expected[1];

  const hints = [];

  // If you want "Show answer" to ALWAYS show both notes, remove these two `if` checks.
  if (!presentPCs.has(thirdSemis)) {
    const h3 = buildHintAtStep("hint3", thirdStep, thirdSemis);
    if (h3) hints.push(h3);
  }
  if (!presentPCs.has(fifthSemis)) {
    const h5 = buildHintAtStep("hint5", fifthStep, fifthSemis);
    if (h5) hints.push(h5);
  }

  return hints;
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
