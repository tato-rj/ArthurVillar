import { Staff } from "../../staff/Staff.js";
import { getPointerId, getPointerPageXY, normalizeClef, stepToLetterOctave } from "../../staff/staffUtils.js";
import { GameAudio } from "../shared/GameAudio.js";
import { InstructionsUi } from "../shared/InstructionsUi.js";
import { PianoKeyboardUi } from "../shared/PianoKeyboardUi.js";

export class OpenStaff {
  static LETTER_TO_SOLFEGE = {
    C: "Do",
    D: "Re",
    E: "Mi",
    F: "Fa",
    G: "Sol",
    A: "La",
    B: "Si",
  };

  static VOICE_COLORS = [
    "rgb(255, 229, 76)",
    "rgb(79, 199, 232)",
    "rgb(139, 118, 232)",
    "rgb(92, 205, 128)",
  ];

  constructor(options = {}) {
    const defaults = {
      staffEl: "#staff",
      namespace: "openStaff",
      sound: true,
      solfege: false,
      showLabelOnTap: false,
      maxUserNotes: 1,
      numOfVoices: 1,
      clefUrls: null,
      clef: null,
      clefs: null,
      initialClef: "treble",
    };

    this.opts = { ...defaults, ...(options || {}) };
    this.ns = this.opts.namespace || "openStaff";
    this.$staffEl = $(this.opts.staffEl).first();
    this.instructionsUi = new InstructionsUi("#instructions");
    this.$instructions = $("#instructions").find("h6").first();
    this.$continue = $("#continue");
    this.$continueBtn = this.$continue.find("button").first();
    this.$done = $("#done");
    this.$keyboardWrap = $("#keyboard-wrapper").first();
    this.$pianoToggleBtn = $("#piano-toggle button").first();

    this._clefPool = this._resolveClefPool();
    this._defaultClef = this._clefPool[0] || null;
    this._currentScreenIndex = 0;
    this._currentScreen = null;
    this._currentScreenSuccessShown = false;
    this._pendingSuccessInstructions = false;
    this._screens = this._buildScreens();
    this._highlightIdCounter = 1;
    this._activeHighlightId = null;
    this._holdSynth = null;
    this._heldMidiSignature = null;
    this._heldToneNotes = [];
    this._holdSoundTimer = null;
    this._pendingHeldStep = null;
    this._pointer = {
      active: false,
      pointerId: null,
      targetId: null,
      dragging: false,
      createdOnPointerDown: false,
      startPageY: 0,
      startTime: 0,
      lastStep: null,
      dragThresholdPx: 5,
      tapMaxMs: 450,
      holdSoundDelayMs: 140,
    };
    this.keyboard = this.$keyboardWrap.length
      ? new PianoKeyboardUi({
        rootSelector: "#keyboard",
        namespace: `${this.ns}.keyboard`,
        canPlayNote: () => !!this._currentScreen?.clef && this.staff?.isSoundEnabled?.(),
      })
      : null;

    this.staff = new Staff(this.$staffEl, {
      clef: null,
      clefUrls: this.opts.clefUrls || window.__clefUrls,
      autoClef: false,
      getMaxUserNotes: () => 0,
      sound: !!this.opts.sound,
    });
  }

  start() {
    if (!this.$staffEl.length) return;

    $("#controls").show();
    this._hideGameChrome();
    this._bindContinue();
    this._bindKeyboardArrows();
    this._bindOpenStaffInteraction();
    this._wirePianoKeyboardToggle();
    this.keyboard?.bind?.();
    this._showScreen(0);

    $("#page-wrapper").fadeIn("fast");
  }

  _normalizeOnOff(value) {
    if (value === true) return true;
    if (value === false) return false;
    const normalized = String(value ?? "").trim().toLowerCase();
    return normalized === "on" || normalized === "true" || normalized === "1";
  }

  _hideGameChrome() {
    [
      "#prompt",
      "#feedback-success",
      "#accidentals",
      "#final-overlay",
      "#double-points",
      "#timeup-message",
      "#hand-pointer",
      "#timer",
      "#score",
      "#check",
      "#skip",
      "#help",
      "#clear",
    ].forEach((selector) => $(selector).hide());

    this.instructionsUi.show();

    this.$staffEl.addClass("staffzone");
  }

  _buildScreens() {
    const raw = window.staffZoneScreens;
    const screens = Array.isArray(raw) ? raw : [];

    if (!screens.length) {
      return [this._buildDefaultScreen()];
    }

    return screens.map((screen) => ({
      instructions: this._normalizeInstructions(screen?.instructions),
      success: this._normalizeInstructions(screen?.success),
      clef: this._normalizeScreenClef(screen?.clef),
      playSound: this._normalizeOnOff(screen?.playSound),
      logNoteName: this._normalizeOnOff(screen?.logNoteName),
      showLabels: this._normalizeOnOff(screen?.showLabels),
      showLabelOnTap: this._normalizeOnOff(screen?.showLabelOnTap ?? this.opts.showLabelOnTap),
      solfege: this._normalizeOnOff(screen?.solfege),
      initialStep: this._normalizeInitialStep(screen?.initialStep),
    }));
  }

  _resolveClefPool() {
    const raw = this.opts.clefs != null
      ? this.opts.clefs
      : (this.opts.clef != null ? this.opts.clef : this.opts.initialClef);

    const source = Array.isArray(raw)
      ? raw
      : raw != null
        ? [raw]
        : [];

    const pool = [];

    source.forEach((value) => {
      const clef = normalizeClef(value);
      if (clef && !pool.includes(clef)) pool.push(clef);
    });

    return pool;
  }

  _normalizeScreenClef(value) {
    if (value == null || value === "") return this._defaultClef;
    return normalizeClef(value);
  }

  _buildDefaultScreen() {
    return {
      instructions: this.instructionsUi.getHtml() || "",
      success: "",
      clef: this._defaultClef,
      playSound: !!this.opts.sound,
      logNoteName: false,
      showLabels: true,
      showLabelOnTap: this._normalizeOnOff(this.opts.showLabelOnTap),
      solfege: !!this.opts.solfege,
      initialStep: null,
    };
  }

  _normalizeInitialStep(value) {
    const step = Number(value);
    return Number.isFinite(step) ? step : null;
  }

  _normalizeInstructions(value) {
    if (Array.isArray(value)) {
      return value
        .map((line) => String(line ?? "").trim())
        .filter(Boolean)
        .join("<br>");
    }

    return String(value ?? "");
  }

  _keyboardStartNoteForClef(clef) {
    const cleanClef = String(clef || "").trim().toLowerCase();
    if (cleanClef === "bass" || cleanClef === "alto" || cleanClef === "tenor") return "C3";
    return "C4";
  }

  _syncPianoKeyboardStartNote() {
    if (!this.keyboard) return;
    const clef = this._currentScreen?.clef || null;
    if (!clef) return;
    this.keyboard.setStartNote(this._keyboardStartNoteForClef(clef));
  }

  _bindContinue() {
    this.$continueBtn
      .off(`click.${this.ns}`)
      .on(`click.${this.ns}`, (e) => {
        e.preventDefault();
        const nextIndex = this._currentScreenIndex + 1;
        if (nextIndex >= this._screens.length) return;
        this._showScreen(nextIndex);
      });
  }

  _bindKeyboardArrows() {
    $(document)
      .off(`keydown.${this.ns}HighlightArrow`)
      .on(`keydown.${this.ns}HighlightArrow`, (e) => {
        if (this._shouldBlockStaffInteraction()) return;

        const key = String(e.key || "").toLowerCase();
        if (key !== "arrowup" && key !== "arrowdown") return;

        const $target = $(e.target);
        if ($target.is("input, textarea, select, [contenteditable='true']")) return;

        e.preventDefault();
        this._moveCurrentHighlightBy(key === "arrowup" ? 1 : -1);
      });

    $(document)
      .off(`click.${this.ns}HighlightArrow`, '#music-keyboard [data-direction], [data-direction][data-target="staff-highlight"]')
      .on(`click.${this.ns}HighlightArrow`, '#music-keyboard [data-direction], [data-direction][data-target="staff-highlight"]', (e) => {
        if (this._shouldBlockStaffInteraction()) return;

        const direction = String($(e.currentTarget).attr("data-direction") || "").toLowerCase();
        if (direction !== "up" && direction !== "down") return;

        e.preventDefault();
        this._moveCurrentHighlightBy(direction === "up" ? 1 : -1);
      });
  }

  _showScreen(index) {
    const screen = this._screens[index];
    if (!screen) return;

    this._finishPointerInteraction();
    this._currentScreenIndex = index;
    this._currentScreen = screen;
    this._currentScreenSuccessShown = false;
    this._pendingSuccessInstructions = false;
    this._clearHighlights();
    this._applyScreen(screen);
  }

  _applyScreen(screen) {
    this._renderInstructions(screen.instructions || "");
    this.$continue.hide();
    this.$done.hide();
    this._releaseHeldStep();
    this.staff.setSoundEnabled(!!screen.playSound);

    if (screen.clef) this.staff.setClef(screen.clef);
    else this._hideClef();

    this._syncPianoKeyboardStartNote();

    if (Number.isFinite(screen.initialStep)) {
      this._createHighlight(screen.initialStep, { revealContinue: false });
    }

    this._syncPianoKeyboardMarkerFromHighlight();
  }

  _revealContinue() {
    if (!this._currentScreenSuccessShown) {
      this._currentScreenSuccessShown = true;
      if (this._currentScreen?.success) {
        if (this._pointer.active) this._pendingSuccessInstructions = true;
        else this._renderSuccessInstructions();
      }
    }

    if (indexHasNext(this._currentScreenIndex, this._screens.length)) {
      this.$done.hide();
      this.$continue.show();
      return;
    }

    this.$continue.hide();
    this.$done.show();
  }

  _renderInstructions(html) {
    this.instructionsUi.setHtml(html);
  }

  _renderSuccessInstructions() {
    this._pendingSuccessInstructions = false;
    this._renderInstructions(this._currentScreen?.success || "");
  }

  _shouldBlockStaffInteraction() {
    return false;
  }

  _hideClef() {
    this.staff.opts.clef = null;
    this.staff.opts.clefUrl = null;
    this.$staffEl.find("#clef-wrapper, .staff-clef").remove();
  }

  _clearHighlights() {
    this.$staffEl.find(".staff-highlight").remove();
    this.$staffEl.find(".ledger[data-for-highlight-id]").remove();
    this._activeHighlightId = null;
    this._syncPianoKeyboardMarkerFromHighlight();
  }

  _syncPianoKeyboardToggleUi() {
    if (!this.$pianoToggleBtn.length || !this.$keyboardWrap.length) return;
    if (this.$keyboardWrap.is(":visible")) this.$pianoToggleBtn.attr("selected", "selected");
    else this.$pianoToggleBtn.removeAttr("selected");
  }

  _wirePianoKeyboardToggle() {
    if (!this.$keyboardWrap.length) return;

    if (this.$pianoToggleBtn.length) this.$keyboardWrap.hide();
    else this.$keyboardWrap.show();

    if (this.$pianoToggleBtn.length) {
      this.$pianoToggleBtn
        .off(`click.${this.ns}.pianoToggle`)
        .on(`click.${this.ns}.pianoToggle`, (e) => {
          e.preventDefault();
          this.$keyboardWrap.toggle();
          this._syncPianoKeyboardToggleUi();
        });
    }

    this._syncPianoKeyboardToggleUi();
  }

  _syncPianoKeyboardMarkerFromHighlight() {
    if (!this.keyboard) return;
    if (!this._currentScreen?.clef) {
      this.keyboard.syncActiveKeys([]);
      return;
    }

    const highlights = this._highlightEntries();
    if (!highlights.length) {
      this.keyboard.syncActiveKeys([]);
      return;
    }

    const markerEntries = highlights
      .map(({ id, step, voiceIndex }, index) => {
        const note = stepToLetterOctave(this.staff, step);
        const $key = index === 0
          ? this.keyboard.keyForNote(note?.letter, null, note?.octave)
          : this.keyboard.keyForNoteIfVisible(note?.letter, null, note?.octave);
        const noteName = this._keyboardNoteNameFromStep(step);
        const labelRevealed = !this._delaysNoteLabel() || this._isHighlightLabelRevealed(id);
        return {
          noteName,
          markerLabel: labelRevealed ? this._stepName(step) : "",
          tone: voiceIndex === 0 ? "primary" : "secondary",
          markerColor: this._voiceColor(voiceIndex),
          $key,
        };
      })
      .filter((entry) => entry.noteName && entry.$key?.length);

    this.keyboard.syncActiveMarkers(markerEntries);
  }

  _bindOpenStaffInteraction() {
    this.$staffEl.off(`.${this.ns}`);
    $(window).off(`blur.${this.ns}`);

    this.$staffEl.on(`pointerdown.${this.ns}`, (e) => {
      if (this._shouldBlockStaffInteraction()) return;

      e.preventDefault();

      const { y: pageY } = getPointerPageXY(e);
      const $highlight = $(e.target).closest(".staff-highlight");
      const pointerStep = this._stepFromPageY(pageY);

      this._pointer.active = true;
      this._pointer.pointerId = getPointerId(e);
      this._pointer.targetId = null;
      this._pointer.dragging = false;
      this._pointer.createdOnPointerDown = false;
      this._pointer.startPageY = pageY;
      this._pointer.startTime = Date.now();
      this._pointer.lastStep = null;

      if ($highlight.length) {
        const highlightId = String($highlight.attr("data-highlight-id") || "");
        if (!highlightId) {
          this._finishPointerInteraction();
          return;
        }
        this._pointer.targetId = highlightId;
        this._activeHighlightId = highlightId;
        this._pointer.lastStep = this._highlightStep(highlightId);
        this._setHighlightDragging(highlightId, true);
        if (Number.isFinite(this._pointer.lastStep)) {
          this._playAndLogStep(this._pointer.lastStep, { sustain: true });
        }
      } else {
        const sameStepHighlightId = this._highlightIdAtStep(pointerStep);
        const existingHighlightId = sameStepHighlightId
          || (this._highlightCount() >= this._maxUserHighlights()
          ? this._currentHighlightId()
          : "");

        if (existingHighlightId) {
          const isSameStepHighlight = existingHighlightId === sameStepHighlightId;
          this._pointer.targetId = existingHighlightId;
          this._activeHighlightId = existingHighlightId;
          this._pointer.createdOnPointerDown = !isSameStepHighlight;
          this._pointer.lastStep = isSameStepHighlight ? this._highlightStep(existingHighlightId) : pointerStep;
          if (!isSameStepHighlight) {
            this._moveHighlightToStep(existingHighlightId, pointerStep, { revealLabel: false });
          }
          this._setHighlightDragging(existingHighlightId, true);
          this._playAndLogStep(this._pointer.lastStep, { sustain: true });
        } else {
          const createdId = this._createHighlight(pointerStep);
          if (!createdId) {
            this._finishPointerInteraction();
            return;
          }
          this._pointer.targetId = createdId;
          this._activeHighlightId = createdId;
          this._pointer.createdOnPointerDown = true;
          this._pointer.lastStep = pointerStep;
          this._playAndLogStep(pointerStep, { sustain: true });
        }

        if (!this._pointer.targetId) {
          this._finishPointerInteraction();
          return;
        }
      }

      const pointerId = this._pointer.pointerId;
      if (this.$staffEl[0]?.setPointerCapture && pointerId != null) {
        this.$staffEl[0].setPointerCapture(pointerId);
      }
    });

    this.$staffEl.on(`pointermove.${this.ns}`, (e) => {
      if (this._shouldBlockStaffInteraction()) return;
      if (!this._pointer.active) return;

      const pointerId = getPointerId(e);
      if (this._pointer.pointerId != null && pointerId != null && pointerId !== this._pointer.pointerId) return;

      e.preventDefault();

      const { y: pageY } = getPointerPageXY(e);
      const movedPx = Math.abs(pageY - this._pointer.startPageY);

      if (!this._pointer.dragging && movedPx >= this._pointer.dragThresholdPx) {
        this._pointer.dragging = true;
        this._setHighlightDragging(this._pointer.targetId, true);
      }
      if (!this._pointer.dragging) return;

      const step = this._stepFromPageY(pageY);
      this._moveHighlightToStep(this._pointer.targetId, step);

      if (step === this._pointer.lastStep) return;
      this._pointer.lastStep = step;
      this._revealContinue();
      this._playAndLogStep(step, { sustain: true });
    });

    this.$staffEl.on(`pointerup.${this.ns} pointercancel.${this.ns}`, (e) => {
      const pointerId = getPointerId(e);
      if (this._pointer.pointerId != null && pointerId != null && pointerId !== this._pointer.pointerId) return;
      this._finishPointerInteraction();
    });

    $(window).on(`blur.${this.ns}`, () => {
      this._finishPointerInteraction();
    });
  }

  _finishPointerInteraction() {
    const targetId = this._pointer.targetId;
    const pointerId = this._pointer.pointerId;
    const elapsedMs = this._pointer.startTime ? Date.now() - this._pointer.startTime : Infinity;
    const isTap = elapsedMs <= this._pointer.tapMaxMs;
    const shouldRemove = !!targetId && isTap && !this._pointer.dragging && !this._pointer.createdOnPointerDown;

    if (targetId) this._setHighlightDragging(targetId, false);
    this._releaseHeldStep();
    if (shouldRemove) {
      this._revealContinue();
      if (this._shouldRevealHighlightBeforeRemove(targetId)) {
        this._setHighlightLabelRevealed(targetId, true);
      } else {
        this._removeHighlight(targetId, { smoke: true });
      }
    }
    if (this.$staffEl[0]?.releasePointerCapture && pointerId != null) {
      try {
        this.$staffEl[0].releasePointerCapture(pointerId);
      } catch (_) {
        // Ignore release errors when capture is already gone.
      }
    }

    this._pointer.active = false;
    this._pointer.pointerId = null;
    this._pointer.targetId = null;
    this._pointer.dragging = false;
    this._pointer.createdOnPointerDown = false;
    this._pointer.startPageY = 0;
    this._pointer.startTime = 0;
    this._pointer.lastStep = null;

    if (this._pendingSuccessInstructions) this._renderSuccessInstructions();
  }

  _clampStep(step) {
    const min = this.staff.minStepAllowed();
    const max = this.staff.maxStepAllowed();
    return Math.max(min, Math.min(max, step));
  }

  _stepName(step) {
    const note = stepToLetterOctave(this.staff, step);
    if (!note) return "";

    const letter = String(note.letter || "").toUpperCase();
    return this._currentScreen?.solfege
      ? (OpenStaff.LETTER_TO_SOLFEGE[letter] || letter)
      : letter;
  }

  _stepPositionLabel(step) {
    if (!Number.isFinite(step)) return "";

    if (step > 8) {
      if (step === 9) return "space 5";
      if (step % 2 !== 0) return "space";
      return `ledger line ${Math.floor((step - 8) / 2)}`;
    }

    if (step < 0) {
      if (step === -1) return "space 0";
      if (step % 2 !== 0) return "space";
      return `ledger line ${Math.floor(Math.abs(step) / 2)}`;
    }

    if (step % 2 === 0) {
      return `line ${Math.floor(step / 2) + 1}`;
    }

    return `space ${Math.floor((step + 1) / 2)}`;
  }

  _delaysNoteLabel() {
    return !!this._currentScreen?.showLabelOnTap
      && !!this._currentScreen?.showLabels;
  }

  _highlightLabelHtml(step, { revealLabel = true } = {}) {
    if (!this._currentScreen?.showLabels) return "";
    if (this._delaysNoteLabel() && !revealLabel) return "";
    if (!this._currentScreen?.clef) return this._stepPositionLabel(step);
    return this._stepName(step);
  }

  _stepFromPageY(pageY) {
    const localY = pageY - this.$staffEl.offset().top;
    const rawStep = this.staff.yToStep(localY);
    return this._clampStep(rawStep);
  }

  _highlightTopForStep(step) {
    return this.staff.stepToY(step) - 7.7;
  }

  _maxUserHighlights() {
    const value = this.opts.numOfVoices != null
      ? Number(this.opts.numOfVoices)
      : Number(this.opts.maxUserNotes);
    return Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 1;
  }

  _highlightCount() {
    return this.$staffEl.find(".staff-highlight").length;
  }

  _highlightEntries() {
    return this.$staffEl.find(".staff-highlight").toArray()
      .map((el) => {
        const $highlight = $(el);
        const id = String($highlight.attr("data-highlight-id") || "");
        const step = Number($highlight.attr("data-step"));
        const voiceIndex = Number($highlight.attr("data-voice-index"));
        if (!id || !Number.isFinite(step)) return null;
        return {
          id,
          step,
          voiceIndex: Number.isFinite(voiceIndex) ? voiceIndex : 0,
          $highlight,
        };
      })
      .filter(Boolean);
  }

  _highlightSteps() {
    return this._highlightEntries()
      .map((entry) => entry.step)
      .filter((step) => Number.isFinite(step));
  }

  _highlightIdAtStep(step) {
    if (!Number.isFinite(step)) return "";
    const entry = this._highlightEntries()
      .find((item) => item.step === step);
    return entry?.id || "";
  }

  _nextVoiceIndex() {
    const used = new Set(this._highlightEntries().map((entry) => entry.voiceIndex));
    const max = Math.max(1, this._maxUserHighlights());
    for (let i = 0; i < max; i += 1) {
      if (!used.has(i)) return i;
    }
    return used.size;
  }

  _voiceColor(voiceIndex) {
    const index = Number.isFinite(Number(voiceIndex)) ? Number(voiceIndex) : 0;
    const colors = OpenStaff.VOICE_COLORS;
    return colors[((index % colors.length) + colors.length) % colors.length];
  }

  _keyboardNoteNameFromStep(step) {
    const note = stepToLetterOctave(this.staff, step);
    const letter = String(note?.letter || "").trim().toUpperCase();
    const octave = Number(note?.octave);
    if (!letter || !Number.isFinite(octave) || !this.keyboard) return "";
    return this.keyboard._noteNameFromMidi?.(this.staff._stepToMidi(step)) || `${letter}${octave}`;
  }

  _renderHighlightLedgers(highlightId, step) {
    if (!highlightId) return;

    this.$staffEl.find(`.ledger[data-for-highlight-id="${highlightId}"]`).remove();

    const ledgerSteps = this.staff.ledgerStepsFor(step);
    const left = this.staff.centerX();
    const $highlight = this.$staffEl.find(`.staff-highlight[data-highlight-id="${highlightId}"]`);
    const isDragging = $highlight.hasClass("dragging");
    const voiceIndex = Number($highlight.attr("data-voice-index"));
    const voiceClass = `staff-highlight--voice-${((Number.isFinite(voiceIndex) ? voiceIndex : 0) % 4) + 1}`;

    ledgerSteps.forEach((ledgerStep) => {
      const $ledger = $("<div></div>")
        .addClass(`ledger ${voiceClass}`)
        .attr("data-for-highlight-id", highlightId)
        .css({
          left: `${left}px`,
          top: `${this.staff.stepToY(ledgerStep)}px`,
        });

      if (isDragging) $ledger.addClass("dragging");
      $ledger.appendTo(this.$staffEl);
    });
  }

  _createHighlight(step, { revealContinue = true } = {}) {
    if (!this.staff.isStepAllowed(step)) return null;
    if (this._highlightCount() >= this._maxUserHighlights()) return null;

    const id = `staffzone-highlight-${this._highlightIdCounter++}`;
    const voiceIndex = this._nextVoiceIndex();
    const revealLabel = !this._delaysNoteLabel();
    const labelHtml = this._highlightLabelHtml(step, { revealLabel });
    $("<div></div>")
      .addClass(`staff-highlight staff-highlight--voice-${(voiceIndex % 4) + 1} rounded`)
      .attr("data-highlight-id", id)
      .attr("data-step", step)
      .attr("data-voice-index", voiceIndex)
      .attr("data-label-revealed", revealLabel ? "true" : "false")
      .css({ top: `${this._highlightTopForStep(step)}px` })
      .append(
        $("<div></div>")
          .addClass("staff-highlight__label")
          .toggleClass("d-none", !labelHtml)
          .html(labelHtml),
      )
      .appendTo(this.$staffEl);

    this._renderHighlightLedgers(id, step);
    this._activeHighlightId = id;
    if (revealContinue) this._revealContinue();
    this._syncPianoKeyboardMarkerFromHighlight();

    return id;
  }

  _highlightStep(highlightId) {
    const raw = this.$staffEl.find(`.staff-highlight[data-highlight-id="${highlightId}"]`).attr("data-step");
    const step = Number(raw);
    return Number.isFinite(step) ? step : null;
  }

  _currentHighlightId() {
    if (
      this._activeHighlightId
      && this.$staffEl.find(`.staff-highlight[data-highlight-id="${this._activeHighlightId}"]`).length
    ) {
      return this._activeHighlightId;
    }

    const fallback = String(this.$staffEl.find(".staff-highlight").last().attr("data-highlight-id") || "");
    this._activeHighlightId = fallback || null;
    return fallback;
  }

  _moveCurrentHighlightBy(delta) {
    const highlightId = this._currentHighlightId();
    if (!highlightId || !Number.isFinite(delta) || delta === 0) return;

    const currentStep = this._highlightStep(highlightId);
    if (!Number.isFinite(currentStep)) return;

    const nextStep = this._clampStep(currentStep + delta);
    if (nextStep === currentStep || !this.staff.isStepAllowed(nextStep)) return;

    this._revealContinue();
    this._moveHighlightToStep(highlightId, nextStep);
    this._playAndLogStep(nextStep);
  }

  _isHighlightLabelRevealed(highlightId) {
    if (!highlightId) return false;
    return this.$staffEl
      .find(`.staff-highlight[data-highlight-id="${highlightId}"]`)
      .attr("data-label-revealed") === "true";
  }

  _shouldRevealHighlightBeforeRemove(highlightId) {
    return this._delaysNoteLabel() && !this._isHighlightLabelRevealed(highlightId);
  }

  _setHighlightLabelRevealed(highlightId, revealLabel) {
    if (!highlightId) return;

    const $highlight = this.$staffEl.find(`.staff-highlight[data-highlight-id="${highlightId}"]`);
    if (!$highlight.length) return;

    const step = this._highlightStep(highlightId);
    const labelHtml = this._highlightLabelHtml(step, { revealLabel });
    $highlight
      .attr("data-label-revealed", revealLabel ? "true" : "false")
      .find(".staff-highlight__label")
      .toggleClass("d-none", !labelHtml)
      .html(labelHtml);
    this._syncPianoKeyboardMarkerFromHighlight();
  }

  _moveHighlightToStep(highlightId, step, { revealLabel = this._isHighlightLabelRevealed(highlightId) } = {}) {
    if (!highlightId || !this.staff.isStepAllowed(step)) return;

    const labelHtml = this._highlightLabelHtml(step, { revealLabel });
    this.$staffEl
      .find(`.staff-highlight[data-highlight-id="${highlightId}"]`)
      .attr("data-step", step)
      .attr("data-label-revealed", revealLabel ? "true" : "false")
      .css({ top: `${this._highlightTopForStep(step)}px` })
      .find(".staff-highlight__label")
      .toggleClass("d-none", !labelHtml)
      .html(labelHtml);

    this._renderHighlightLedgers(highlightId, step);
    this._syncPianoKeyboardMarkerFromHighlight();
  }

  _setHighlightDragging(highlightId, on) {
    if (!highlightId) return;
    this.$staffEl
      .find(`.staff-highlight[data-highlight-id="${highlightId}"]`)
      .toggleClass("dragging", !!on);
    this.$staffEl
      .find(`.ledger[data-for-highlight-id="${highlightId}"]`)
      .toggleClass("dragging", !!on);
  }

  _setHighlightSounding(highlightId, on) {
    const selector = highlightId
      ? `.staff-highlight[data-highlight-id="${highlightId}"]`
      : ".staff-highlight";
    this.$staffEl.find(selector).toggleClass("is-sounding", !!on);
  }

  _removeHighlight(highlightId, { smoke = false } = {}) {
    if (!highlightId) return;
    const $highlight = this.$staffEl.find(`.staff-highlight[data-highlight-id="${highlightId}"]`);
    if (!$highlight.length) return;
    if (smoke) {
      const fill = window.getComputedStyle($highlight[0]).backgroundColor || "black";
      this.staff._animations.playNoteRemoveSmoke($highlight[0], { fill });
    }
    this.$staffEl.find(`.ledger[data-for-highlight-id="${highlightId}"]`).remove();
    $highlight.remove();
    if (this._activeHighlightId === highlightId) this._activeHighlightId = null;
    this._syncPianoKeyboardMarkerFromHighlight();
  }

  _releaseHeldStep() {
    if (this._holdSoundTimer) {
      window.clearTimeout(this._holdSoundTimer);
      this._holdSoundTimer = null;
    }
    this._pendingHeldStep = null;
    this._setHighlightSounding(null, false);
    if (this._holdSynth?.triggerRelease) {
      if (this._heldToneNotes.length) this._holdSynth.triggerRelease(this._heldToneNotes);
      else this._holdSynth.triggerRelease();
    }
    this._heldMidiSignature = null;
    this._heldToneNotes = [];
  }

  async _ensureHoldSynth() {
    if (!window.Tone) return;
    if (this._holdSynth) return;

    await Tone.start();
    this._holdSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
      envelope: { attack: 0.01, decay: 0.08, sustain: 0.6, release: 0.12 },
      volume: GameAudio.SYNTH_VOLUME_DB.staffNote,
    }).toDestination();
  }

  async _startHeldStep(step) {
    if (!this._currentScreen?.playSound || !this._currentScreen?.clef || !Number.isFinite(step)) return;

    await this._ensureHoldSynth();
    if (!this._holdSynth) return;
    if (!this._pointer.active || this._pendingHeldStep !== step) return;

    const midis = this._highlightMidis();
    const signature = midis.join(",");
    if (!signature || this._heldMidiSignature === signature) return;

    const toneNotes = midis.map((midi) => Tone.Frequency(midi, "midi").toNote());
    if (this._holdSynth.triggerRelease) {
      if (this._heldToneNotes.length) this._holdSynth.triggerRelease(this._heldToneNotes);
      else this._holdSynth.triggerRelease();
    }
    this._holdSynth.triggerAttack(
      toneNotes,
      undefined,
      GameAudio.scale("staffNote", 0.9),
    );
    this._heldMidiSignature = signature;
    this._heldToneNotes = toneNotes;
    this._setHighlightSounding(null, true);
  }

  _scheduleHeldStep(step) {
    if (!this._currentScreen?.playSound || !this._currentScreen?.clef || !Number.isFinite(step)) return;

    this._pendingHeldStep = step;
    if (this._heldMidiSignature != null) {
      void this._startHeldStep(step, 0);
      return;
    }
    if (this._holdSoundTimer) return;

    this._holdSoundTimer = window.setTimeout(() => {
      this._holdSoundTimer = null;
      if (!this._pointer.active) return;
      void this._startHeldStep(this._pendingHeldStep, 0);
    }, this._pointer.holdSoundDelayMs);
  }

  _playAndLogStep(step, { sustain = false } = {}) {
    const noteName = this._stepName(step);
    if (this._currentScreen?.playSound && this._currentScreen?.clef) {
      if (sustain) this._scheduleHeldStep(step);
      else void this._playHighlightChord();
    }
    if (!this._currentScreen?.logNoteName) return;

    // eslint-disable-next-line no-console
    console.log("OpenStaff note:", noteName, {
      clef: this.staff.getClef(),
      step,
    });
  }

  _highlightMidis() {
    return this._highlightSteps()
      .map((highlightStep) => this.staff._stepToMidi(highlightStep))
      .filter((midi) => Number.isFinite(midi))
      .sort((a, b) => a - b);
  }

  async _playHighlightChord() {
    if (!this._currentScreen?.playSound || !this._currentScreen?.clef) return;
    const midis = this._highlightMidis();
    if (!midis.length) return;

    await this._ensureHoldSynth();
    if (!this._holdSynth?.triggerAttackRelease) return;

    this._holdSynth.triggerAttackRelease(
      midis.map((midi) => Tone.Frequency(midi, "midi")),
      0.5,
      undefined,
      GameAudio.scale("staffNote", 0.9),
    );
  }
}

function indexHasNext(index, total) {
  return index < (total - 1);
}
