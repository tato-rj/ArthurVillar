import { BaseStaffGame } from "../base/BaseStaffGame.js";
import { normalizeClefPool, pickChallengeClef } from "../shared/challengeUtils.js";
import { accidentalClassToText, pickWeighted, stepToLetterOctave } from "../../staff/staffUtils.js";
import { PianoKeyboardUi } from "../shared/PianoKeyboardUi.js";

export class NoteNest extends BaseStaffGame {
  static LETTER_TO_SOLFEGE = {
    C: "Do",
    D: "Re",
    E: "Mi",
    F: "Fa",
    G: "Sol",
    A: "La",
    B: "Si",
  };

  constructor(options = {}) {
    const defaults = {
      staffEl: "#staff",
      basePoints: 1,
      firstTryBonus: 2,
      namespace: "noteNest",
    };

    const merged = { ...defaults, ...(options || {}) };
    const clefPool = normalizeClefPool(
      merged.clefs != null ? merged.clefs : merged.clef,
    );

    super({
      ...merged,
      initialClef: (clefPool && clefPool[0]) ? clefPool[0] : "treble",
    });

    this._clefPool = clefPool;
    this._targetNote = null;
    this._keyboardSyncPatched = false;
    this._keyboardAccidentalPreviewPatched = false;
    this.keyboard = new PianoKeyboardUi({
      rootSelector: "#keyboard",
      namespace: `${this.ns}.keyboard`,
    });
  }

  start() {
    this.keyboard.bind();
    this._wireKeyboardSync();
    super.start();
    this._wireKeyboardAccidentalPreview();
    this.prompt.show();
    this._setPromptForTarget(this._targetNote);
  }

  _wireKeyboardSync() {
    if (this._keyboardSyncPatched) return;
    this._keyboardSyncPatched = true;

    const baseMoveNote = this.staff.moveNote.bind(this.staff);
    this.staff.moveNote = (...args) => {
      const out = baseMoveNote(...args);
      this._syncKeyboardMarkerFromStaff();
      return out;
    };

    const baseRemoveNote = this.staff.removeNote.bind(this.staff);
    this.staff.removeNote = (...args) => {
      const out = baseRemoveNote(...args);
      this._syncKeyboardMarkerFromStaff();
      return out;
    };

    const baseClearNotes = this.staff.clearNotes.bind(this.staff);
    this.staff.clearNotes = (...args) => {
      const out = baseClearNotes(...args);
      this._syncKeyboardMarkerFromStaff();
      return out;
    };

    this.$staffEl
      .off(`staff:noteState.${this.ns}.keyboard`)
      .on(`staff:noteState.${this.ns}.keyboard`, (e, data) => {
        if (data?.source !== "user") return;
        this._syncKeyboardMarkerFromStaff();
      });
  }

  _wireKeyboardAccidentalPreview() {
    if (this._keyboardAccidentalPreviewPatched) return;
    this._keyboardAccidentalPreviewPatched = true;

    const $tools = $("#accidentals .accidental-tool");
    if (!$tools.length || !$tools.draggable) return;

    const originalDrag = $tools.draggable("option", "drag");
    const originalStop = $tools.draggable("option", "stop");

    $tools.draggable("option", "drag", (event, ui) => {
      if (typeof originalDrag === "function") originalDrag.call(event.currentTarget, event, ui);
      this._syncKeyboardMarkerFromAccidentalPreview();
    });

    $tools.draggable("option", "stop", (event, ui) => {
      if (typeof originalStop === "function") originalStop.call(event.currentTarget, event, ui);
      this._syncKeyboardMarkerFromStaff();
    });
  }

  _keyboardKeySelectorFor(letter, accidentalClass, octave) {
    return this.keyboard.keyForNote(letter, accidentalClass, octave);
  }

  _syncKeyboardMarkerFromAccidentalPreview() {
    const dragState = this.staff?._accDragSound || {};
    const noteId = String(dragState.noteId || "");
    const previewAccidentalClass = dragState.prospectiveCls || null;

    if (!noteId || !previewAccidentalClass) {
      this._syncKeyboardMarkerFromStaff();
      return;
    }

    const $note = this.$staffEl.find(`.note[data-note-id="${noteId}"]`).first();
    if (!$note.length) {
      this._syncKeyboardMarkerFromStaff();
      return;
    }

    const top = parseFloat($note.css("top"));
    const step = Number.isFinite(top) ? this.staff.yToStep(top) : null;
    if (!Number.isFinite(step)) {
      this._syncKeyboardMarkerFromStaff();
      return;
    }

    const noteState = stepToLetterOctave(this.staff, step);
    const $nextKey = this._keyboardKeySelectorFor(
      noteState?.letter,
      previewAccidentalClass,
      noteState?.octave,
    );
    this.keyboard.syncActiveKey($nextKey);
  }

  _syncKeyboardMarkerFromStaff() {
    const notes = this._collectUserNotes();
    const note = notes.length ? notes[0] : null;

    let $nextKey = $();
    if (note && Number.isFinite(note.step)) {
      const noteState = stepToLetterOctave(this.staff, note.step);
      $nextKey = this._keyboardKeySelectorFor(
        noteState?.letter,
        note.accidentalClass,
        noteState?.octave,
      );
    }
    this.keyboard.syncActiveKey($nextKey);
  }

  _displayNameForLetter(letter) {
    const clean = String(letter || "").trim().toUpperCase();
    if (this._showSolfegeNoteNames()) return NoteNest.LETTER_TO_SOLFEGE[clean] || clean;
    return clean;
  }

  _targetAccidentalClass() {
    if (!this._normalizeOnOff(this.opts.allowAccidentals)) return null;

    const w = this.opts.accidentalWeights || {};
    const naturalWeight = Number(w.natural);
    const sharpWeight = Number(w.sharp);
    const flatWeight = Number(w.flat);

    if (Number.isFinite(naturalWeight) || Number.isFinite(sharpWeight) || Number.isFinite(flatWeight)) {
      return pickWeighted([
        { value: null, weight: Number.isFinite(naturalWeight) ? naturalWeight : 0 },
        { value: "music-font__sharp", weight: Number.isFinite(sharpWeight) ? sharpWeight : 0 },
        { value: "music-font__flat", weight: Number.isFinite(flatWeight) ? flatWeight : 0 },
      ]);
    }

    return Math.random() < 0.5 ? "music-font__sharp" : "music-font__flat";
  }

  _keyboardStartNoteForClef(clef) {
    const cleanClef = String(clef || "").trim().toLowerCase();
    if (cleanClef === "bass") return "C3";
    if (cleanClef === "alto") return "C3";
    if (cleanClef === "tenor") return "C3";
    return "C4";
  }

  _pickTargetStep() {
    const minStep = 0;
    const maxStep = 8;
    return Math.floor(Math.random() * (maxStep - minStep + 1)) + minStep;
  }

  _setPromptForTarget(target) {
    if (!target) return;
    const shortName = `${this._displayNameForLetter(target.letter)}${accidentalClassToText(target.accidentalClass)}`;
    this.prompt.setShort(shortName);
    this.prompt.setLong("Find this note on the staff");
  }

  newChallenge() {
    const clef = pickChallengeClef(this._clefPool);
    if (clef && clef !== this.staff.getClef()) this.staff.setClef(clef);
    this.keyboard.setStartNote(this._keyboardStartNoteForClef(this.staff.getClef()));

    this._madeMistakeThisRound = false;
    this._usedHintThisRound = false;

    this.staff.clearNotes();
    this.$feedback.hide();
    this.$helpBtn.hide();
    this.$bonusBadge.hide();
    this.$doublePoints?.hide?.();

    const step = this._pickTargetStep();
    const noteState = stepToLetterOctave(this.staff, step);
    this._targetNote = {
      step,
      letter: noteState.letter,
      octave: noteState.octave,
      accidentalClass: this._targetAccidentalClass(),
    };

    this.prompt.show();
    this._setPromptForTarget(this._targetNote);
    this._syncKeyboardMarkerFromStaff();

    $("#check").show().removeClass("invisible");
    $("#continue").hide();
  }

  _collectUserNotes() {
    return this.$staffEl.find(".note").toArray()
      .map((el) => {
        const $note = $(el);
        const noteId = String($note.attr("data-note-id") || "");
        if (!noteId || this.staff.isNoteFixed(noteId)) return null;
        const top = parseFloat($note.css("top"));
        const step = Number.isFinite(top) ? this.staff.yToStep(top) : null;
        const accidentalClass = this.staff._getAttachedAccidentalClass?.(noteId) || null;
        return { noteId, step, accidentalClass };
      })
      .filter(Boolean);
  }

  _isUserAnswerCorrect() {
    const target = this._targetNote;
    if (!target) return false;

    const notes = this._collectUserNotes();
    if (notes.length !== 1) return false;

    const [note] = notes;
    const noteState = stepToLetterOctave(this.staff, note.step);
    return (
      String(noteState?.letter || "") === String(target.letter || "") &&
      String(note.accidentalClass || "") === String(target.accidentalClass || "")
    );
  }

  _computeHintAnswers() {
    if (!this._targetNote) return [{ step: null, accidentalClass: null }];
    return [{
      step: this._targetNote.step,
      accidentalClass: this._targetNote.accidentalClass || null,
    }];
  }

  _onCheck() {
    this.$checkBtn.disable();
    this._stats.checksTotal += 1;

    if (this._isUserAnswerCorrect()) {
      this._stats.checksCorrect += 1;
      this._pauseGameTimer();

      const { earned, bonusEarned } = this._awardPointsForCorrect();
      this._handleCorrectAnswerUi({
        isBonus: bonusEarned > 0,
        earned,
        $prompt: this.prompt.$root,
      });
      return;
    }

    this._madeAnyMistake = true;
    this._madeMistakeThisRound = true;
    this._failAnimation(this.$checkWrap);
    this.$helpBtn.show();
  }
}
