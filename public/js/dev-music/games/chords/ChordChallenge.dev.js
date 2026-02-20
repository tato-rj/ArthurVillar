// resources/js/music/games/interval/ChordChallenge.js
import { BaseStaffGame } from "../base/BaseStaffGame.js";
import {
  normalizeClef,
  pickOne,
  pickWeighted,
  randomInt,
  toArrayMaybe,
  spellNoteFromState,
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
      allowInversions: false,
          initialRoot: true,
};

    const merged = {
      ...defaults,
      ...options,
      accidentalWeights: {
        ...(defaults.accidentalWeights || {}),
        ...(options.accidentalWeights || {}),
      },
      triadQualities:
        Array.isArray(options.triadQualities) && options.triadQualities.length
          ? options.triadQualities.slice()
          : Object.keys(ChordChallenge.TRIAD_QUALITY_FULL_NAME_MAP),
    };

    const clefPool = ChordChallenge._normalizeClefPoolStatic(
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

    this._currentTriadQuality = null;
    this._currentSeventhType = null; // null | '7' | 'maj7' | 'dim7'
    this._requiredUserNotesThisRound = 2;

    // Triad context per round
    this._triadRootState = null; // {step, accidentalClass, midi}
    this._triadBassState = null; // {step, accidentalClass, midi} - fixed note (given)
    this._triadRootLetterWithAcc = null;
  }

  // ------------------------ UI labels ------------------------

  _setTriadUI(quality, seventhType = null) {
    this._currentTriadQuality = String(quality || "").trim();
    this._currentSeventhType = seventhType ? String(seventhType).trim() : null;
    this.$interval.removeClass("text-red").addClass("text-blue");
    this._refreshTriadUILabels();
  }

_escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

/**
 * Converts chord symbols in the SHORT label to superscripts:
 * - Aø7  -> A<sup>ø</sup>7
 * - Ao   -> A<sup>o</sup>
 * - Ao7  -> A<sup>o</sup>7
 *
 * Only superscripts 'o' when it is the diminished marker after the root.
 */
_formatShortLabelHtml(shortLabel) {
  const safe = this._escapeHtml(shortLabel);

  // Always superscript ø wherever it appears (it's only used as a symbol).
  const withOslash = safe.replaceAll("ø", "<sup>ø</sup>");

  // Superscript 'o' only when it's used as the diminished marker:
  // root = A-G + optional accidentals (b, bb, #, ##), then 'o', then optional digits/end.
  return withOslash.replace(
    /(^[A-G](?:bb|b|##|#)?)o(?=\d|$)/,
    "$1<sup>o</sup>",
  );
}


  _triadShortName(root, quality, seventhType = null) {
    const r = String(root || "").trim();
    const q = String(quality || "").trim();

    // Special diminished 7th naming:
    // - half diminished (dim triad + m7): Aø7
    // - fully diminished (dim triad + dim7): A°7
    if (q === "diminished" && seventhType) {
      if (seventhType === "dim7") return `${r}°`;
      // default diminished 7th is half-diminished
      return `${r}ø`;
    }

    const suffix = ChordChallenge.TRIAD_QUALITY_SHORT_SUFFIX_MAP[q] ?? "";
    const base = `${r}${suffix}`;
    if (!seventhType) return base;
    return seventhType === "maj7" ? `${base}maj7` : `${base}7`;
  }

  _triadFullName(root, quality, seventhType = null) {
    const r = String(root || "").trim();
    const q = String(quality || "").trim();
    const qWord = ChordChallenge.TRIAD_QUALITY_FULL_NAME_MAP[q] || q;

    // Special diminished 7th naming:
    if (q === "diminished" && seventhType) {
      return `${r} ${seventhType === "dim7" ? "fully diminished" : "half diminished"}`.trim();
    }

    if (!seventhType) return `${r} ${qWord}`.trim();
    const seventhLabel = seventhType === "maj7" ? "M7" : "m7";
    return `${r} ${qWord} with a ${seventhLabel}`.trim();
  }

  _refreshTriadUILabels() {
    const q = this._currentTriadQuality;

    const root =
      this._triadRootLetterWithAcc ||
      (this._fixedNote &&
      this._fixedNote.letterWithAcc &&
      this._fixedNote.letterWithAcc !== "?"
        ? this._fixedNote.letterWithAcc
        : null);

    const shortLabel = root ? this._triadShortName(root, q, this._currentSeventhType) : q;
    const fullLabel = root
      ? this._triadFullName(root, q, this._currentSeventhType)
      : (ChordChallenge.TRIAD_QUALITY_FULL_NAME_MAP[q] || q);

    if (this.$intervalLabel?.length) this.$intervalLabel.html(this._formatShortLabelHtml(shortLabel));
    if (this.$intervalFull?.length) this.$intervalFull.text(fullLabel);
  }

  _onFixedNoteState() {
    // BaseStaffGame updates this._fixedNote before calling this hook.
    // For inversions, we label from _triadRootLetterWithAcc; otherwise fixed note is the root.
    this._refreshTriadUILabels();
  }

  // ------------------------ clef selection ------------------------

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

  // ------------------------ triad math helpers ------------------------

  _resetTriadContext() {
    this._triadRootState = null;
    this._triadBassState = null;
    this._triadRootLetterWithAcc = null;
  }

  _triadExpectedSemisForQuality(quality, seventhType = null) {
    const q = String(quality || "").trim();
    // Returns chord tones ABOVE root: [3rd, 5th] for triads, [3rd, 5th, 7th] for 7ths.
    if (!seventhType) {
      const triads = {
        major: [4, 7],
        minor: [3, 7],
        augmented: [4, 8],
        diminished: [3, 6],
      };
      return triads[q] || null;
    }

    // 7th-chord rules:
    // - '7' means m7 above root
    // - 'maj7' means M7 above root (major triads only)
    // - 'dim7' means diminished 7th above root (diminished triads only)
    // - Minor and diminished can pair with m7; diminished can also pair with dim7
    // - Augmented can pair with m7 only (aug7)
    if (q === "augmented") {
      if (seventhType !== "7") return null;
      return [4, 8, 10];
    }

    if (seventhType === "maj7" && q !== "major") return null;
    if (seventhType === "dim7" && q !== "diminished") return null;

    const seventh =
      seventhType === "maj7" ? 11 :
      seventhType === "dim7" ? 9 :
      10; // default: m7

    const base = {
      major: [4, 7],
      minor: [3, 7],
      diminished: [3, 6],
    };
    const triad = base[q];
    if (!triad) return null;

    // Never mix minor triad with M7; never add 7ths to augmented (handled above).
    return [triad[0], triad[1], seventh];
  }

  _toneAccidentalClass(rootMidi, targetStep, targetSemis) {
    const naturalMidi = this.staff._stepToMidi(targetStep);
    let offset = (rootMidi + targetSemis) - naturalMidi;

    while (offset > 6) offset -= 12;
    while (offset < -6) offset += 12;

    const accClass = this._accidentalClassFromOffset(offset);
    if (accClass == null && offset !== 0) return null;
    return accClass;
  }

  _stepAboveBass(step, bassStep) {
    let s = step;
    while (s <= bassStep) s += 7;
    return s;
  }

  _pickRootAndBassForTriad(quality, seventhType = null) {
    const expected = this._triadExpectedSemisForQuality(quality, seventhType);
    if (!expected) return null;

    const min = this.staff.minStepAllowed();
    const max = this.staff.maxStepAllowed();

    const initialRoot = this.opts.initialRoot !== undefined ? !!this.opts.initialRoot : true;
    const allowInv = !!this.opts.allowInversions || !initialRoot;

    // If fixedNotes are provided, treat them as the given bass note and fit a triad around them.
    const fixedList = toArrayMaybe(this.opts.fixedNotes).filter(Boolean);
    if (allowInv && fixedList.length) {
      const bass = this._pickFixedNote(); // respects fixedNotes list + parsing
      if (!bass) return null;

      const bassAccOff = this.staff._accidentalClassToOffset(bass.accidentalClass);
      const bassMidi = this.staff._stepToMidi(bass.step) + bassAccOff;

      const candidates = [
        { rootStep: bass.step, roleSemis: 0 },
        { rootStep: bass.step - 2, roleSemis: expected[0] },
        { rootStep: bass.step - 4, roleSemis: expected[1] },
        ...(expected.length === 3 ? [{ rootStep: bass.step - 6, roleSemis: expected[2] }] : []),
      ].filter((c) => c.rootStep >= min && c.rootStep <= max);

      const viable = [];
      for (const c of candidates) {
        const rootMidi = bassMidi - c.roleSemis;
        const rootOff = rootMidi - this.staff._stepToMidi(c.rootStep);
        const rootAccClass = this._accidentalClassFromOffset(rootOff);
        if (rootAccClass == null && rootOff !== 0) continue;

        const thirdStep = c.rootStep + 2;
        const fifthStep = c.rootStep + 4;
        const seventhStep = expected.length === 3 ? c.rootStep + 6 : null;
        if (thirdStep < min || thirdStep > max) continue;
        if (fifthStep < min || fifthStep > max) continue;
        if (seventhStep != null && (seventhStep < min || seventhStep > max)) continue;

        const thirdAcc = this._toneAccidentalClass(rootMidi, thirdStep, expected[0]);
        const fifthAcc = this._toneAccidentalClass(rootMidi, fifthStep, expected[1]);
        const seventhAcc = seventhStep != null ? this._toneAccidentalClass(rootMidi, seventhStep, expected[2]) : null;
        if (thirdAcc == null || fifthAcc == null) continue;
        if (seventhStep != null && seventhAcc == null) continue;

        viable.push({
          root: { step: c.rootStep, accidentalClass: rootAccClass },
          bass: { step: bass.step, accidentalClass: bass.accidentalClass || null },
        });
      }

      if (viable.length) return pickOne(viable);
      // fall through to standard path
    }

    // Standard: choose a root that fits on staff for root/third/fifth spelling.
    const span = expected.length === 3 ? 6 : 4;
    const rootStep = randomInt(min, Math.max(min, max - span));

    const w = this.opts.accidentalWeights || {};
    const rootAccClass = pickWeighted([
      { value: null, weight: Number(w.natural) || 0 },
      { value: "music-font__sharp", weight: Number(w.sharp) || 0 },
      { value: "music-font__flat", weight: Number(w.flat) || 0 },
    ]);

    const rootMidi =
      this.staff._stepToMidi(rootStep) + this.staff._accidentalClassToOffset(rootAccClass);

    const thirdStep = rootStep + 2;
    const fifthStep = rootStep + 4;
    const seventhStep = expected.length === 3 ? rootStep + 6 : null;

    const thirdAcc = this._toneAccidentalClass(rootMidi, thirdStep, expected[0]);
    const fifthAcc = this._toneAccidentalClass(rootMidi, fifthStep, expected[1]);
    const seventhAcc = seventhStep != null ? this._toneAccidentalClass(rootMidi, seventhStep, expected[2]) : null;
    if (thirdAcc == null || fifthAcc == null) return null;
    if (seventhStep != null && seventhAcc == null) return null;

    let bassRole = 0;
    if (allowInv) {
      const roles = expected.length === 3 ? [0, 1, 2, 3] : [0, 1, 2];
      bassRole = pickOne(roles); // root / third / fifth (/ seventh)
    }

    const bassStep =
      bassRole === 0 ? rootStep :
      bassRole === 1 ? thirdStep :
      bassRole === 2 ? fifthStep :
      seventhStep;
    const bassSemis =
      bassRole === 0 ? 0 :
      bassRole === 1 ? expected[0] :
      bassRole === 2 ? expected[1] :
      expected[2];
    const bassAcc = this._toneAccidentalClass(rootMidi, bassStep, bassSemis);
    if (bassAcc == null && bassSemis !== 0) return null;

    return {
      root: { step: rootStep, accidentalClass: rootAccClass },
      bass: { step: bassStep, accidentalClass: bassAcc },
    };
  }

  // ------------------------ game flow ------------------------

  newChallenge() {
    this.$helpBtn.hide();
    this._fixedState = null;
    this._resetTriadContext();

    const clef = this._currentClefForChallenge();
    if (clef && clef !== this.staff.getClef()) this.staff.setClef(clef);

    this._madeMistakeThisRound = false;
    this._usedHintThisRound = false;
    this.$bonusBadge.hide();
    this.$doublePoints?.hide?.();

    let quality = null;
    let seventhType = null;
    let setup = null;

    // Some spellings can be invalid for our accidental system; retry instead of starting an empty round.
    for (let i = 0; i < 40; i += 1) {
      const chord = this._pickChordSpec();
      quality = chord.quality;
      seventhType = chord.seventhType;

      setup = this._pickRootAndBassForTriad(quality, seventhType);
      if (!setup) continue;

      // Fully diminished (dim7) is disallowed for flat roots (would often require triple-flats).
      if (
        quality === "diminished" &&
        seventhType === "dim7" &&
        (setup.root.accidentalClass === "music-font__flat" ||
          setup.root.accidentalClass === "music-font__doubleflat")
      ) {
        seventhType = "7"; // half diminished instead
        setup = this._pickRootAndBassForTriad(quality, seventhType);
        if (!setup) continue;
      }

      break;
    }

    // Hard fallback: keep the round playable.
    if (!setup) {
      quality = "major";
      seventhType = null;
      setup = this._pickRootAndBassForTriad(quality, seventhType);
      if (!setup) return;
    }

    this._requiredUserNotesThisRound = this._requiredUserNotesForChord(seventhType);
    // Let BaseStaffGame gate instructions/#check per round (triad vs 7th).
    this.opts.instructionsAfterUserNotes = this._requiredUserNotesThisRound;
    this.opts.checkAfterUserNotes = this._requiredUserNotesThisRound;
    this.opts.maxUserNotes = this._requiredUserNotesThisRound;

    this.staff.clearNotes();
    this.$accidentals.removeClass("invisible");
    this.$feedback.hide();

    this.$interval.show();
    this._setTriadUI(quality, seventhType);

    {
      const rootMidi =
        this.staff._stepToMidi(setup.root.step) +
        this.staff._accidentalClassToOffset(setup.root.accidentalClass);

      this._triadRootState = {
        step: setup.root.step,
        accidentalClass: setup.root.accidentalClass || null,
        midi: rootMidi,
      };

      this._triadBassState = {
        step: setup.bass.step,
        accidentalClass: setup.bass.accidentalClass || null,
        midi:
          this.staff._stepToMidi(setup.bass.step) +
          this.staff._accidentalClassToOffset(setup.bass.accidentalClass),
      };

      const rootFull = spellNoteFromState(this.staff, setup.root.step, setup.root.accidentalClass);
      this._triadRootLetterWithAcc = String(rootFull || "").replace(/\d+$/, "") || null;

      const fixedAcc =
        setup.bass.accidentalClass === "music-font__natural"
          ? null
          : (setup.bass.accidentalClass || null);

      const fixedId = this.staff.addFixedNote({
        step: setup.bass.step,
        accidentalClass: fixedAcc,
      });

      if (fixedId) this.staff._emitNoteState(fixedId, "fixed");
    }

    $("#continue").hide();
  }


_pickChordSpec() {
  const only7thChords = !!this.opts.only7thChords;

  // If not in 7th-chords-only mode, behave like a triad game.
  if (!only7thChords) {
    return { quality: this._pickTriadQuality(), seventhType: null };
  }

  // 7th-chords-only mode:
  // - Major: either dominant 7 (m7) written as "7" or major 7 written as "maj7".
  // - Minor: only m7 written as "7".
  // - Diminished: either m7 (half diminished, "7") or dim7 (fully diminished, "dim7").
  // - Augmented: only m7 written as "7" (aug7).
  const poolRaw =
    Array.isArray(this.opts.triadQualities) && this.opts.triadQualities.length
      ? this.opts.triadQualities
      : Object.keys(ChordChallenge.TRIAD_QUALITY_FULL_NAME_MAP);

  const pool = poolRaw.length ? poolRaw : ["major", "minor", "diminished", "augmented"];

  const quality = pool[Math.floor(Math.random() * pool.length)];

  if (quality === "major") return { quality, seventhType: pickOne(["7", "maj7"]) };
  if (quality === "minor") return { quality, seventhType: "7" };
  if (quality === "diminished") return { quality, seventhType: pickOne(["7", "dim7"]) };
  if (quality === "augmented") return { quality, seventhType: "7" };

  // Fallback: treat anything unexpected as a triad.
  return { quality, seventhType: null };
}


_requiredUserNotesForChord(seventhType) {
  // Triad: fixed note + 2 user notes. 7th chord: fixed note + 3 user notes.
  return seventhType ? 3 : 2;
}


  _pickTriadQuality() {
    const pool =
      Array.isArray(this.opts.triadQualities) && this.opts.triadQualities.length
        ? this.opts.triadQualities
        : ["major"];
    return pool[Math.floor(Math.random() * pool.length)];
  }

  // ------------------------ fixed note selection ------------------------

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

  _onCheck() {
    const notes = this._notesOnStaffOrdered();
    this.$checkBtn.disable();

    this._stats.checksTotal += 1;

    const expected = this._triadExpectedSemisForQuality(this._currentTriadQuality, this._currentSeventhType);
    const rootState = this._triadRootState;

    const expectedTotalNotes = this._requiredUserNotesThisRound + 1;
    if (notes.length !== expectedTotalNotes) {
      this._madeAnyMistake = true;
      this._madeMistakeThisRound = true;

      this.$interval.removeClass("text-blue").addClass("text-red");
      this._failAnimation(this.$checkWrap);

      this.$checkBtn[0] && this.$checkBtn[0].blur && this.$checkBtn[0].blur();
      this.$helpBtn.show();
      return;
    }


    if (!expected || !rootState) {
      this._madeAnyMistake = true;
      this._madeMistakeThisRound = true;
      this.$helpBtn.show();
      return;
    }

    const rootStep = rootState.step;
    const rootMidi = rootState.midi;

    const roleToSemis = expected.length === 3
      ? { 0: 0, 2: expected[0], 4: expected[1], 6: expected[2] }
      : { 0: 0, 2: expected[0], 4: expected[1] };
    const seenRoles = new Set();

    let ok = true;
    for (const n of notes) {
      const diatonic = ((n.step - rootStep) % 7 + 7) % 7;
      const allowed = expected.length === 3 ? (diatonic === 0 || diatonic === 2 || diatonic === 4 || diatonic === 6)
        : (diatonic === 0 || diatonic === 2 || diatonic === 4);
      if (!allowed) { ok = false; break; }
      if (seenRoles.has(diatonic)) { ok = false; break; }
      seenRoles.add(diatonic);

      const midi = this.staff._stepToMidi(n.step) + (n.accOff || 0);
      let d = (midi - rootMidi) % 12;
      if (d < 0) d += 12;

      if (d !== roleToSemis[diatonic]) { ok = false; break; }
    }

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

  // ------------------------ hints ------------------------

  _accidentalClassFromOffset(off) {
    if (off === 2) return "music-font__doublesharp";
    if (off === 1) return "music-font__sharp";
    if (off === 0) return "music-font__natural";
    if (off === -1) return "music-font__flat";
    if (off === -2) return "music-font__doubleflat";
    return null;
  }

  _computeHintAnswers() {
    const notes = this._notesOnStaffOrdered();
    if (notes.length < 1) return [];

    const expected = this._triadExpectedSemisForQuality(this._currentTriadQuality, this._currentSeventhType);
    const rootState = this._triadRootState;
    const bassState = this._triadBassState;

    if (!expected || !rootState || !bassState) return [];

    const rootStep = rootState.step;
    const rootMidi = rootState.midi;
    const bassStep = bassState.step;

    const presentRoles = new Set();
    for (const n of notes) {
      const diatonic = ((n.step - rootStep) % 7 + 7) % 7;
      const allowed = expected.length === 3 ? (diatonic === 0 || diatonic === 2 || diatonic === 4 || diatonic === 6)
        : (diatonic === 0 || diatonic === 2 || diatonic === 4);
      if (allowed) {
        const midi = this.staff._stepToMidi(n.step) + (n.accOff || 0);
        let d = (midi - rootMidi) % 12;
        if (d < 0) d += 12;

        const want =
          diatonic === 0 ? 0 :
          diatonic === 2 ? expected[0] :
          diatonic === 4 ? expected[1] :
          expected[2];
        if (d === want) presentRoles.add(diatonic);
      }
    }

    const min = this.staff.minStepAllowed();
    const max = this.staff.maxStepAllowed();

    const buildHintAtStep = (id, step, targetSemis) => {
      if (step < min || step > max) return null;
      const accClass = this._toneAccidentalClass(rootMidi, step, targetSemis);
      if (accClass == null && targetSemis !== 0) return null;
      return { id, step, accidentalClass: accClass };
    };

    const targets = [
      { role: 0, id: "hintR", baseStep: rootStep, semis: 0 },
      { role: 2, id: "hint3", baseStep: rootStep + 2, semis: expected[0] },
      { role: 4, id: "hint5", baseStep: rootStep + 4, semis: expected[1] },
      ...(expected.length === 3 ? [{ role: 6, id: "hint7", baseStep: rootStep + 6, semis: expected[2] }] : []),
    ];

    const hints = [];
    for (const t of targets) {
      if (presentRoles.has(t.role)) continue;

      let step = this._stepAboveBass(t.baseStep, bassStep);
      if (step > max) step = t.baseStep;

      const h = buildHintAtStep(t.id, step, t.semis);
      if (h) hints.push(h);
    }

    return hints.slice(0, this._requiredUserNotesThisRound);
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
    const accOffset =
      acc === "##" ? 2 :
      acc === "#" ? 1 :
      acc === "bb" ? -2 :
      acc === "b" ? -1 :
      0;

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
