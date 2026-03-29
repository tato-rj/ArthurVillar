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

    const clefPool = normalizeClefPool(
      this.opts.clefs != null
        ? this.opts.clefs
        : (this.opts.clef != null ? this.opts.clef : this.opts.initialClef),
    );

    this._activeClef = clefPool[0] || "treble";
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
      clef: this._activeClef,
      clefUrls: this.opts.clefUrls || window.__clefUrls,
      autoClef: false,
      getMaxUserNotes: () => 0,
      sound: !!this.opts.sound,
    });
  }

  start() {
    if (!this.$staffEl.length) return;

    this._hideGameChrome();
    this._bindStaffZoneInteraction();

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
      "#continue",
      "#skip",
      "#help",
      "#clear",
    ].forEach((selector) => $(selector).hide());

    $("#controls").show();
    $("#instructions").show();

    this.$staffEl.addClass("staffzone");
  }

  _bindStaffZoneInteraction() {
    this.$staffEl.off(`.${this.ns}`);
    $(window).off(`blur.${this.ns}`);

    this.$staffEl.on(`pointerdown.${this.ns}`, (e) => {
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
    return this._normalizeOnOff(this.opts.solfege)
      ? (StaffZone.LETTER_TO_SOLFEGE[letter] || letter)
      : letter;
  }

  _showNoteNames() {
    return this._normalizeOnOff(this.opts.showNoteNames);
  }

  _highlightLabelHtml(step) {
    if (!this._showNoteNames()) return "";
    return this._stepName(step);
  }

  _stepFromPageY(pageY) {
    const localY = pageY - this.$staffEl.offset().top;
    const rawStep = this.staff.yToStep(localY);
    return this._clampStep(rawStep);
  }

  _highlightTopForStep(step) {
    return this.staff.stepToY(step) - 8;
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

  _createHighlight(step) {
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
          .addClass("staff-highlight__note")
          .html(this._highlightLabelHtml(step)),
      )
      .appendTo(this.$staffEl);

    this._renderHighlightLedgers(id, step);

    return id;
  }

  _highlightStep(highlightId) {
    const raw = this.$staffEl.find(`.staff-highlight[data-highlight-id="${highlightId}"]`).attr("data-step");
    const step = Number(raw);
    return Number.isFinite(step) ? step : null;
  }

  _moveHighlightToStep(highlightId, step) {
    if (!highlightId || !this.staff.isStepAllowed(step)) return;

    this.$staffEl
      .find(`.staff-highlight[data-highlight-id="${highlightId}"]`)
      .attr("data-step", step)
      .css({ top: `${this._highlightTopForStep(step)}px` })
      .find(".staff-highlight__note")
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
    void this.staff.playStep(step, 0);

    // eslint-disable-next-line no-console
    console.log("StaffZone note:", noteName, {
      clef: this.staff.getClef(),
      step,
    });
  }
}
