import { Staff } from "../../staff/Staff.js";
import { getPointerId, getPointerPageXY, stepToLetterOctave } from "../../staff/staffUtils.js";
import { normalizeClefPool } from "../shared/challengeUtils.js";

export class StaffZone {
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
      namespace: "staffZone",
      sound: true,
      solfege: false,
      maxUserNotes: 1,
      clefUrls: null,
      clef: null,
      clefs: null,
      initialClef: "treble",
    };

    this.opts = { ...defaults, ...(options || {}) };
    this.ns = this.opts.namespace || "staffZone";
    this.$staffEl = $(this.opts.staffEl).first();
    this.$instructions = $("#instructions").find("h6").first();
    this.$continue = $("#continue");
    this.$continueBtn = this.$continue.find("button").first();
    this.$done = $("#done");

    const clefPool = normalizeClefPool(
      this.opts.clefs != null
        ? this.opts.clefs
        : (this.opts.clef != null ? this.opts.clef : this.opts.initialClef),
    );

    this._defaultClef = clefPool[0] || "treble";
    this._currentScreenIndex = 0;
    this._currentScreen = null;
    this._screens = this._buildScreens();
    this._typedInstructions = null;
    this._highlightIdCounter = 1;
    this._pointer = {
      active: false,
      pointerId: null,
      targetId: null,
      dragging: false,
      createdOnPointerDown: false,
      startPageY: 0,
      lastStep: null,
      dragThresholdPx: 5,
    };

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

    this._hideGameChrome();
    this._bindContinue();
    this._bindKeyboardArrows();
    this._bindStaffZoneInteraction();
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

    $("#instructions").show();

    this.$staffEl.addClass("staffzone");
  }

  _buildScreens() {
    const raw = window.staffZoneScreens;
    const screens = Array.isArray(raw) ? raw : [];

    return screens.map((screen) => ({
      instructions: this._normalizeInstructions(screen?.instructions),
      clef: screen?.clef ?? null,
      playSound: this._normalizeOnOff(screen?.playSound),
      logNoteName: this._normalizeOnOff(screen?.logNoteName),
      showLabels: this._normalizeOnOff(screen?.showLabels),
      solfege: this._normalizeOnOff(screen?.solfege),
      initialStep: this._normalizeInitialStep(screen?.initialStep),
    }));
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
        const direction = String($(e.currentTarget).attr("data-direction") || "").toLowerCase();
        if (direction !== "up" && direction !== "down") return;

        e.preventDefault();
        this._moveCurrentHighlightBy(direction === "up" ? 1 : -1);
      });
  }

  _showScreen(index) {
    const screen = this._screens[index];
    if (!screen) return;

    this._currentScreenIndex = index;
    this._currentScreen = screen;
    this._clearHighlights();
    this._applyScreen(screen);
  }

  _applyScreen(screen) {
    this._renderInstructions(screen.instructions || "");
    this.$continue.hide();
    this.$done.hide();
    this.staff.setSoundEnabled(!!screen.playSound);

    if (screen.clef) this.staff.setClef(screen.clef);
    else this._hideClef();

    if (Number.isFinite(screen.initialStep)) {
      this._createHighlight(screen.initialStep, { revealContinue: false });
    }
  }

  _revealContinue() {
    if (indexHasNext(this._currentScreenIndex, this._screens.length)) {
      this.$done.hide();
      this.$continue.show();
      return;
    }

    this.$continue.hide();
    this.$done.show();
  }

  _renderInstructions(html) {
    if (this._typedInstructions?.destroy) {
      this._typedInstructions.destroy();
      this._typedInstructions = null;
    }

    if (!this.$instructions.length) return;

    this.$instructions.html("");

    if (!html) return;

    const $typedTarget = $("<span></span>").addClass("staffzone-instructions__typed");
    this.$instructions.append($typedTarget);

    if (typeof window.Typed !== "function") {
      $typedTarget.html(html);
      return;
    }

    this._typedInstructions = new window.Typed($typedTarget[0], {
      strings: [html],
      typeSpeed: 24,
      startDelay: 180,
      showCursor: true,
      contentType: "html",
    });
  }

  _hideClef() {
    this.staff.opts.clef = null;
    this.staff.opts.clefUrl = null;
    this.$staffEl.find("#clef-wrapper, .staff-clef").remove();
  }

  _clearHighlights() {
    this.$staffEl.find(".staff-highlight").remove();
    this.$staffEl.find(".ledger[data-for-highlight-id]").remove();
  }

  _bindStaffZoneInteraction() {
    this.$staffEl.off(`.${this.ns}`);
    $(window).off(`blur.${this.ns}`);

    this.$staffEl.on(`pointerdown.${this.ns}`, (e) => {
      e.preventDefault();
      this._revealContinue();

      const { y: pageY } = getPointerPageXY(e);
      const $highlight = $(e.target).closest(".staff-highlight");
      const pointerStep = this._stepFromPageY(pageY);

      this._pointer.active = true;
      this._pointer.pointerId = getPointerId(e);
      this._pointer.targetId = null;
      this._pointer.dragging = false;
      this._pointer.createdOnPointerDown = false;
      this._pointer.startPageY = pageY;
      this._pointer.lastStep = null;

      if ($highlight.length) {
        const highlightId = String($highlight.attr("data-highlight-id") || "");
        if (!highlightId) {
          this._finishPointerInteraction();
          return;
        }
        this._pointer.targetId = highlightId;
        this._pointer.lastStep = this._highlightStep(highlightId);
      } else {
        const createdId = this._createHighlight(pointerStep);
        if (!createdId) {
          this._finishPointerInteraction();
          return;
        }
        this._pointer.targetId = createdId;
        this._pointer.createdOnPointerDown = true;
        this._pointer.lastStep = pointerStep;
        this._playAndLogStep(pointerStep);
      }

      const pointerId = this._pointer.pointerId;
      if (this.$staffEl[0]?.setPointerCapture && pointerId != null) {
        this.$staffEl[0].setPointerCapture(pointerId);
      }
    });

    this.$staffEl.on(`pointermove.${this.ns}`, (e) => {
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
      this._playAndLogStep(step);
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
    const shouldRemove = !!targetId && !this._pointer.dragging && !this._pointer.createdOnPointerDown;

    if (targetId) this._setHighlightDragging(targetId, false);
    if (shouldRemove) this._removeHighlight(targetId, { smoke: true });

    this._pointer.active = false;
    this._pointer.pointerId = null;
    this._pointer.targetId = null;
    this._pointer.dragging = false;
    this._pointer.createdOnPointerDown = false;
    this._pointer.startPageY = 0;
    this._pointer.lastStep = null;
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
      ? (StaffZone.LETTER_TO_SOLFEGE[letter] || letter)
      : letter;
  }

  _stepPositionLabel(step) {
    if (!Number.isFinite(step)) return "";

    if (step % 2 === 0) {
      return `line ${Math.floor(step / 2) + 1}`;
    }

    return `space ${Math.floor((step + 1) / 2)}`;
  }

  _highlightLabelHtml(step) {
    if (!this._currentScreen?.showLabels) return "";
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
    const value = Number(this.opts.maxUserNotes);
    return Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 1;
  }

  _highlightCount() {
    return this.$staffEl.find(".staff-highlight").length;
  }

  _renderHighlightLedgers(highlightId, step) {
    if (!highlightId) return;

    this.$staffEl.find(`.ledger[data-for-highlight-id="${highlightId}"]`).remove();

    const ledgerSteps = this.staff.ledgerStepsFor(step);
    const left = this.staff.centerX();
    const isDragging = this.$staffEl
      .find(`.staff-highlight[data-highlight-id="${highlightId}"]`)
      .hasClass("dragging");

    ledgerSteps.forEach((ledgerStep) => {
      const $ledger = $("<div></div>")
        .addClass("ledger")
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
    $("<div></div>")
      .addClass("staff-highlight rounded")
      .attr("data-highlight-id", id)
      .attr("data-step", step)
      .css({ top: `${this._highlightTopForStep(step)}px` })
      .append(
        $("<div></div>")
          .addClass("staff-highlight__label")
          .html(this._highlightLabelHtml(step)),
      )
      .appendTo(this.$staffEl);

    this._renderHighlightLedgers(id, step);
    if (revealContinue) this._revealContinue();

    return id;
  }

  _highlightStep(highlightId) {
    const raw = this.$staffEl.find(`.staff-highlight[data-highlight-id="${highlightId}"]`).attr("data-step");
    const step = Number(raw);
    return Number.isFinite(step) ? step : null;
  }

  _currentHighlightId() {
    return String(this.$staffEl.find(".staff-highlight").first().attr("data-highlight-id") || "");
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

  _moveHighlightToStep(highlightId, step) {
    if (!highlightId || !this.staff.isStepAllowed(step)) return;

    this.$staffEl
      .find(`.staff-highlight[data-highlight-id="${highlightId}"]`)
      .attr("data-step", step)
      .css({ top: `${this._highlightTopForStep(step)}px` })
      .find(".staff-highlight__label")
      .html(this._highlightLabelHtml(step));

    this._renderHighlightLedgers(highlightId, step);
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
  }

  _playAndLogStep(step) {
    const noteName = this._stepName(step);
    if (this._currentScreen?.playSound) void this.staff.playStep(step, 0);
    if (!this._currentScreen?.logNoteName) return;

    // eslint-disable-next-line no-console
    console.log("StaffZone note:", noteName, {
      clef: this.staff.getClef(),
      step,
    });
  }
}

function indexHasNext(index, total) {
  return index < (total - 1);
}
