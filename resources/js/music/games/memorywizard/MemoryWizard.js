import { BaseStaffGame } from "../base/BaseStaffGame.js";
import { normalizeClefPool, pickChallengeClef } from "../shared/challengeUtils.js";
import { pickWeighted, stepToLetterOctave } from "../../staff/staffUtils.js";

export class MemoryWizard extends BaseStaffGame {
  static PREVIEW_NOTE_ANIMATION_MS = 360;
  static SEQUENCE_NOTE_DISPLAY_MS = 1500;

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
      namespace: "memoryWizard",
      usePianoKeyboard: false,
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
    this._targetSequence = [];
    this._lastTargetSignature = null;
    this._previewTimeoutIds = [];
    this._pendingRoundTimerStart = false;
  }

  start() {
    this._resetSequenceState();
    super.start();
  }

  _displayNameForLetter(letter) {
    const clean = String(letter || "").trim().toUpperCase();
    if (this._showSolfegeNoteNames()) return MemoryWizard.LETTER_TO_SOLFEGE[clean] || clean;
    return clean;
  }

  _readBoolSetting(key, fallback = false) {
    const direct = this.opts?.[key];
    if (direct !== undefined && direct !== null && String(direct).trim() !== "") {
      return this._normalizeOnOff(direct);
    }

    try {
      const qs = new URLSearchParams(window.location.search || "");
      if (qs.has(key)) return this._normalizeOnOff(qs.get(key));
    } catch (_) {}

    return !!fallback;
  }

  _targetAccidentalClass() {
    if (!this._readBoolSetting("allowAccidentals", false)) return null;

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

  _pickTargetStep() {
    const minStep = 0;
    const maxStep = 8;
    return Math.floor(Math.random() * (maxStep - minStep + 1)) + minStep;
  }

  _resetSequenceState() {
    this._clearPendingPreviewTimeouts();
    this._targetSequence = [];
    this._lastTargetSignature = null;
    this.maxUserNotes = 0;
    this._pendingRoundTimerStart = false;
  }

  _clearPendingPreviewTimeouts() {
    if (!this._previewTimeoutIds.length) return;
    this._previewTimeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    this._previewTimeoutIds = [];
  }

  _setPreviewInteractionDisabled(disabled) {
    this._setTimedOutInteractivityDisabled(disabled);
    if (!disabled) this._startPendingRoundTimerIfNeeded();
  }

  _primeRoundTimerIfEnabled() {
    if (!this._isTimerEnabled()) return;
    this.$timer?.show?.();
    this._stopGameTimer();
    this._timerRemainingSec = this._timerLimitSeconds();
    this._renderTimerDisplay();
    this._pendingRoundTimerStart = false;
  }

  _startPendingRoundTimerIfNeeded() {
    if (!this._pendingRoundTimerStart || !this._isTimerEnabled()) return;
    this._pendingRoundTimerStart = false;
    this._startGameTimer(this._timerLimitSeconds());
  }

  _shouldHideLastPreviewNote(index) {
    if (!this._readBoolSetting("hideLastNote", false)) return false;
    if (this._targetSequence.length <= 1) return false;
    return index === this._targetSequence.length - 1;
  }

  _resetRoundTimerIfEnabled() {
    if (!this._isTimerEnabled()) return;
    this._primeRoundTimerIfEnabled();
  }

  _removeTargetPreview(noteId) {
    if (!noteId) return;
    this.staff.removeNote(noteId);
  }

  _playTargetSound(target) {
    if (!target || !this.staff?.playStep) return;
    const accidentalOffset = this.staff._accidentalClassToOffset?.(target.accidentalClass) || 0;
    this.staff.playStep(target.step, accidentalOffset);
  }

  _showPreviewNote(target) {
    if (!target) return null;

    const fixedId = this.staff.addNote({
      step: target.step,
    });

    if (!fixedId) return null;

    const accidentalClass = target.accidentalClass || null;
    if (accidentalClass) {
      this.staff.attachAccidentalToNote(fixedId, accidentalClass);
      this.$staffEl.find(`.accidental[data-for-note-id="${fixedId}"]`).hide();
    }

    this.staff.setNoteFixed(fixedId, true);

    if (!accidentalClass) {
      this.staff._emitNoteState(fixedId, "fixed");
      this._playTargetSound(target);
      return fixedId;
    }

    const timeoutId = window.setTimeout(() => {
      this.$staffEl.find(`.accidental[data-for-note-id="${fixedId}"]`).show();
      this.staff._emitNoteState(fixedId, "fixed");
      this._playTargetSound(target);
    }, MemoryWizard.PREVIEW_NOTE_ANIMATION_MS);

    this._previewTimeoutIds.push(timeoutId);
    return fixedId;
  }

  _showTargetPreviewSequence() {
    if (!this._targetSequence.length) return;

    this._setPreviewInteractionDisabled(true);
    this._clearPendingPreviewTimeouts();

    const showAtIndex = (index) => {
      const target = this._targetSequence[index];
      if (!target) {
        this._setPreviewInteractionDisabled(false);
        return;
      }

      const hideNote = this._shouldHideLastPreviewNote(index);
      const fixedId = hideNote ? null : this._showPreviewNote(target);
      if (hideNote) this._playTargetSound(target);

      const timeoutId = window.setTimeout(() => {
        this._removeTargetPreview(fixedId);

        if (index >= this._targetSequence.length - 1) {
          this._setPreviewInteractionDisabled(false);
          return;
        }

        showAtIndex(index + 1);
      }, MemoryWizard.SEQUENCE_NOTE_DISPLAY_MS);

      this._previewTimeoutIds.push(timeoutId);
    };

    showAtIndex(0);
  }

  _targetSignature(target) {
    if (!target) return "";
    return [
      String(target.letter || ""),
      String(target.accidentalClass || ""),
      String(target.step),
      String(target.octave),
    ].join("|");
  }

  _sequenceHasTarget(target) {
    const signature = this._targetSignature(target);
    return this._targetSequence.some((note) => this._targetSignature(note) === signature);
  }

  _pickTargetNote() {
    const maxAttempts = 24;

    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
      const step = this._pickTargetStep();
      const noteState = stepToLetterOctave(this.staff, step);
      const target = {
        step,
        letter: noteState.letter,
        octave: noteState.octave,
        accidentalClass: this._targetAccidentalClass(),
      };

      if (
        this._targetSignature(target) !== this._lastTargetSignature &&
        !this._sequenceHasTarget(target)
      ) {
        return target;
      }
    }

    const minStep = this.staff.minStepAllowed();
    const maxStep = this.staff.maxStepAllowed();

    for (let step = minStep; step <= maxStep; step += 1) {
      const fallbackState = stepToLetterOctave(this.staff, step);
      const accidentalOptions = this._readBoolSetting("allowAccidentals", false)
        ? [null, "music-font__sharp", "music-font__flat"]
        : [null];

      for (let i = 0; i < accidentalOptions.length; i += 1) {
        const target = {
          step,
          letter: fallbackState.letter,
          octave: fallbackState.octave,
          accidentalClass: accidentalOptions[i],
        };

        if (
          this._targetSignature(target) !== this._lastTargetSignature &&
          !this._sequenceHasTarget(target)
        ) {
          return target;
        }
      }
    }

    const fallbackStep = this._pickTargetStep();
    const fallbackState = stepToLetterOctave(this.staff, fallbackStep);
    return {
      step: fallbackStep,
      letter: fallbackState.letter,
      octave: fallbackState.octave,
      accidentalClass: this._targetAccidentalClass(),
    };
  }

  newChallenge() {
    if (!this._targetSequence.length) {
      const clef = pickChallengeClef(this._clefPool);
      if (clef && clef !== this.staff.getClef()) this.staff.setClef(clef);
    }

    this._madeMistakeThisRound = false;
    this._usedHintThisRound = false;

    this._clearPendingPreviewTimeouts();
    this._setPreviewInteractionDisabled(false);
    this.staff.clearNotes();
    this.$feedback.hide();
    this.$helpBtn.hide();
    this.$bonusBadge.hide();
    this.$doublePoints?.hide?.();

    const nextTarget = this._pickTargetNote();
    this._targetSequence.push(nextTarget);
    this._lastTargetSignature = this._targetSignature(nextTarget);
    this.maxUserNotes = this._targetSequence.length;
    if (this._isTimerEnabled()) this._pendingRoundTimerStart = true;
    this._showTargetPreviewSequence();

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
    const targetSequence = this._targetSequence;
    if (!targetSequence.length) return false;
    const notes = this._collectUserNotes();
    if (notes.length !== targetSequence.length) return false;

    return notes.every((note, index) => {
      const target = targetSequence[index];
      if (!target) return false;
      return (
        Number(note.step) === Number(target.step) &&
        String(note.accidentalClass || "") === String(target.accidentalClass || "")
      );
    });
  }

  _computeHintAnswers() {
    if (!this._targetSequence.length) return [{ step: null, accidentalClass: null }];
    return this._targetSequence.map((target) => ({
      step: target.step,
      accidentalClass: target.accidentalClass || null,
    }));
  }

  _showHintNote() {
    this._removeAllHintNotes();
    this._removeAllUserNotesForHint();
    this._clearPendingPreviewTimeouts();
    this.staff.clearNotes();
    this._activeHintIds = [];
    this._setPreviewInteractionDisabled(true);

    const answers = this._computeHintAnswers();
    const specs = (Array.isArray(answers) && answers.length) ? answers : [{ step: null, accidentalClass: null }];

    const showAtIndex = (index) => {
      const ans = specs[index];
      if (!ans) {
        this._setPreviewInteractionDisabled(false);
        return;
      }

      let step = Number.isFinite(ans.step) ? Number(ans.step) : null;
      const accidentalClass = ans.accidentalClass || null;

      if (step == null) step = this._randomFreeStep();
      if (step == null) {
        this._setPreviewInteractionDisabled(false);
        return;
      }

      const noteId = ans.id || (specs.length === 1 ? "hint" : `hint${index + 1}`);
      const createdId = this.staff.addNote({
        id: noteId,
        step,
        className: "hint blink",
        allowOccupied: true,
        skipResolve: true,
      });

      if (!createdId) {
        this._setPreviewInteractionDisabled(false);
        return;
      }

      this._activeHintIds.push(createdId);

      if (accidentalClass) {
        this.staff.attachAccidentalToNote(createdId, accidentalClass);
        this.$staffEl.find(`.accidental[data-for-note-id="${createdId}"]`).addClass("hint blink");
      }

      this.$staffEl.find(`.ledger[data-for-note-id="${createdId}"]`).addClass("hint blink");
      this._playTargetSound({ step, accidentalClass });

      const timeoutId = window.setTimeout(() => {
        this.staff.removeNote(createdId);
        this._activeHintIds = (this._activeHintIds || []).filter((id) => id !== createdId);

        if (index >= specs.length - 1) {
          this._setPreviewInteractionDisabled(false);
          return;
        }

        showAtIndex(index + 1);
      }, MemoryWizard.SEQUENCE_NOTE_DISPLAY_MS);

      this._previewTimeoutIds.push(timeoutId);
    };

    showAtIndex(0);
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
        $prompt: $(),
      });
      return;
    }

    this._madeAnyMistake = true;
    this._madeMistakeThisRound = true;
    this._failAnimation(this.$checkWrap);
    this.$helpBtn.show();
  }
}
