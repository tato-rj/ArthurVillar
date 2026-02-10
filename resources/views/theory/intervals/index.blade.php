@extends('layouts.app', ['noMenu' => true])

@push('header')
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Music&display=swap" rel="stylesheet">

<style>
  .animate__animated { --animate-duration: .8s; }

  :root{
    --staff-width: 340px;
    --staff-height: 240px;
    --staff-radius: 1rem;

    --staff-padding-x: 20px;
    --staff-line-gap: 25px;
    --staff-line-thickness: 5px;

    --note-width: 28px;
    --note-height: 22px;
    --note-rotate: -18deg;
    --note-center-x: calc(var(--note-width) / 2);
    --note-center-y: 8.5px;

    --ledger-width: 38px;
    --ledger-thickness: 5px;
    --ledger-center-x: calc(var(--ledger-width) / 2);
    --ledger-center-y: 0px;

    --clef-width: 76px;
    --clef-height: calc(var(--staff-line-gap) * 6);
    --clef-top: 35px;
    --clef-left-nudge: -16px;

    --note-overlap-gap: -9px;

    --ink: #111;
    --ghost: #90D5FF;
    --ghost-opacity: .5;
  }

  #final-overlay {
    background: rgba(255,255,255,0.96);
    display: none;
    z-index: 1000;
  }

  .music-font{
    font-family: "Noto Music", sans-serif;
    font-weight: 400;
    font-style: normal;
  }

  .music-font__sharp,
  .music-font__flat,
  .music-font__natural,
  .music-font__doubleflat,
  .music-font__doublesharp{
    font-size: 4rem;
  }

  .music-font__sharp::before{ content: "\266F"; }
  .music-font__flat::before{ content: "\266D"; }
  .music-font__natural::before{ content: "\266E"; }
  .music-font__doubleflat::before{ content: "\01D12B"; }
  .music-font__doublesharp::before{ content: "\01D12A"; }

  #staff{
    position: relative;
    width: var(--staff-width);
    height: var(--staff-height);
    border-radius: var(--staff-radius);
    background: #fff;
    overflow: visible;
    user-select: none;
    touch-action: none;
  }

  #page-wrapper { display: none; }

  #staff .note{ touch-action: none; }

  #interval{
    height: 62.4px;
    font-size: 3rem;
    font-weight: bold;
  }

  .staff-line{
    position: absolute;
    left: var(--staff-padding-x);
    right: var(--staff-padding-x);
    height: var(--staff-line-thickness);
    background: var(--ink);
    opacity: .9;
    border-radius: 999px;
  }

  .treble-clef{
    position: absolute;
    left: calc(var(--staff-padding-x) - var(--clef-left-nudge));
    top: var(--clef-top);
    width: var(--clef-width);
    height: var(--clef-height);
    pointer-events: none;
    user-select: none;
  }

  .note{
    position: absolute;
    width: var(--note-width);
    height: var(--note-height);
    border-radius: 50%;
    background: var(--ink);
    transform: rotate(var(--note-rotate));
    margin-left: calc(var(--note-center-x) * -1);
    margin-top: calc(var(--note-center-y) * -1);
    z-index: 2;
  }

  .note.fixed{ pointer-events: none; }

  .ledger{
    position: absolute;
    width: var(--ledger-width);
    height: var(--ledger-thickness);
    background: var(--ink);
    opacity: .9;
    margin-left: calc(var(--ledger-center-x) * -1);
    margin-top: var(--ledger-center-y);
    pointer-events: none;
    border-radius: 999px;
    z-index: 2;
  }

  .note.preview,
  .ledger.preview,
  .note.dragging,
  .ledger.dragging{
    background: var(--ghost);
    opacity: var(--ghost-opacity);
    pointer-events: none;
  }

  #feedback-success .message {
    font-size: 2rem;
    height: 62.4px;
  }

  #feedback-success .bonus-wrapper {
    top: -18px;
    left: 50%;
    transform: translateX(-50%);
  }

  #feedback-success .bonus {
    font-size: 64%;
    display: none;
  }

  #accidentals {
    position: absolute;
    top: 0;
    right: 40px;
    z-index: 1;
  }

  #accidentals > div { margin-top: -20px; }

  #accidentals .accidental-tool{
    cursor: grab;
    user-select: none;
    touch-action: none;
    font-size: 2.5rem;
    position: absolute;
  }

  #accidentals .music-font__sharp { top: -4px; right: 0; }

  #accidentals .accidental-tool:active { cursor: grabbing; }

  #accidentals .accidental-tool.dragging,
  .ui-draggable-dragging.accidental-tool{
    color: var(--ghost);
    opacity: var(--ghost-opacity);
  }

  .accidental{
    position: absolute;
    line-height: 1;
    pointer-events: auto;
    cursor: pointer;
    transform: translate(-100%, -50%);
    z-index: 5;
  }

  .accidental.preview,
  .accidental.dragging{
    color: var(--ghost);
    opacity: var(--ghost-opacity);
  }

  #level {
    font-size: 70%;
    z-index: 10;
    position: relative;
  }

  #increment{ display: none; white-space: nowrap; }
</style>
@endpush

@section('content')
<section id="page-wrapper">
  <div class="d-center py-5">
    <div class="text-center">
      @include('theory.intervals.components.counter')
      @include('theory.intervals.components.level')
      @include('theory.intervals.components.title')

      <div class="position-relative">
        @include('theory.intervals.components.accidentals')
        <div id="staff"></div>
      </div>

      <div class="mb-3 text-center">
        @include('theory.intervals.components.feedback')
        @include('theory.intervals.components.interval')
      </div>

      @include('theory.intervals.components.controls')
    </div>
  </div>
</section>

@include('theory.overlays.final')
@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/tone@14.8.49/build/Tone.js"></script>
<script type="text/javascript" src="{{ asset('js/vendor/jquery-ui.min.js') }}"></script>

<script>
(function ($) {
  "use strict";

  const PAGE_OPENED_AT_MS = Date.now();

  const ACCIDENTAL_CLASSES = [
    "music-font__sharp",
    "music-font__doublesharp",
    "music-font__flat",
    "music-font__doubleflat",
    "music-font__natural"
  ];

  const CLEF_LAYOUT_VARS = {
    treble: {
      "--clef-width": "140px",
      "--clef-height": "calc(var(--staff-line-gap) * 6)",
      "--clef-top": "54px",
      "--clef-left-nudge": "28px"
    },
    bass: {
      "--clef-width": "76px",
      "--clef-height": "calc(var(--staff-line-gap) * 6)",
      "--clef-top": "35px",
      "--clef-left-nudge": "-12px"
    }
  };

  function pxFromCss(css, varName, fallback) {
    const v = css.getPropertyValue(varName);
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : fallback;
  }

  function getPointerPageXY(e) {
    const oe = e.originalEvent || e;
    if (oe.touches && oe.touches.length) return { x: oe.touches[0].pageX, y: oe.touches[0].pageY };
    if (oe.changedTouches && oe.changedTouches.length) return { x: oe.changedTouches[0].pageX, y: oe.changedTouches[0].pageY };
    return { x: oe.pageX, y: oe.pageY };
  }

  function getPointerId(e) {
    const oe = e.originalEvent || e;
    return oe.pointerId;
  }

  if (!$.fn.disable) $.fn.disable = function () { return this.prop("disabled", true).addClass("disabled"); };
  if (!$.fn.enable) $.fn.enable = function () { return this.prop("disabled", false).removeClass("disabled"); };

  function randomInt(min, maxInclusive) {
    return Math.floor(Math.random() * (maxInclusive - min + 1)) + min;
  }

  function pickOne(arr) {
    if (!Array.isArray(arr) || !arr.length) return null;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function pickWeighted(items) {
    // items: [{ value, weight }]
    const list = Array.isArray(items) ? items.filter(x => x && Number.isFinite(x.weight) && x.weight > 0) : [];
    if (!list.length) return null;

    const total = list.reduce((sum, x) => sum + x.weight, 0);
    let r = Math.random() * total;

    for (let i = 0; i < list.length; i++) {
      r -= list[i].weight;
      if (r <= 0) return list[i].value;
    }
    return list[list.length - 1].value;
  }

  function toArrayMaybe(v) {
    if (v == null) return [];
    return Array.isArray(v) ? v : [v];
  }

  function normalizeClef(clef) {
    const c = String(clef || "treble").toLowerCase();
    return (c === "bass") ? "bass" : "treble";
  }

  function randomClef() {
    return Math.random() < 0.5 ? "treble" : "bass";
  }

  function toolTypeFromEl($el) {
    if ($el.hasClass("music-font__sharp")) return "sharp";
    if ($el.hasClass("music-font__flat")) return "flat";
    if ($el.hasClass("music-font__natural")) return "natural";
    return null;
  }

  function nextAccidentalClass(currentCls, toolType) {
    if (toolType === "sharp") {
      if (currentCls === "music-font__doublesharp") return "music-font__doublesharp";
      if (currentCls === "music-font__sharp") return "music-font__doublesharp";
      return "music-font__sharp";
    }
    if (toolType === "flat") {
      if (currentCls === "music-font__doubleflat") return "music-font__doubleflat";
      if (currentCls === "music-font__flat") return "music-font__doubleflat";
      return "music-font__flat";
    }
    if (toolType === "natural") return "music-font__natural";
    return currentCls || null;
  }

  function isMaxedDouble(currentCls, toolType) {
    return (
      (toolType === "sharp" && currentCls === "music-font__doublesharp") ||
      (toolType === "flat" && currentCls === "music-font__doubleflat")
    );
  }

  function Staff($el, opts) {
    this.$el = $el;
    const css = getComputedStyle($el[0]);

    this.opts = $.extend(
      {
        paddingX: pxFromCss(css, "--staff-padding-x", 20),
        lineGap: pxFromCss(css, "--staff-line-gap", 16),
        lineThickness: pxFromCss(css, "--staff-line-thickness", 3),
        noteOverlapGap: pxFromCss(css, "--note-overlap-gap", -6),

        noteIdPrefix: "n",
        clef: "treble",
        clefUrl: null,
        maxLedgerAbove: 2,
        maxLedgerBelow: 2,

        accidentalTopPx: 20,
        accidentalGapPx: 16,

        getMaxUserNotes: function () { return Infinity; },

        sound: true,
        accSnapMaxPx: pxFromCss(css, "--staff-line-gap", 25) * 1.2
      },
      opts || {}
    );

    this.opts.clef = normalizeClef(this.opts.clef);
    if (!this.opts.clefUrl) this.opts.clefUrl = this._clefUrlFor(this.opts.clef);

    this.opts.stepSize = this.opts.lineGap / 2;

    this.$el.css("position", "relative");
    this._idCounter = 1;

    this._drag = {
      isDragging: false,
      movedPx: 0,
      startPageY: 0,
      noteId: null,
      thresholdPx: 5,
      swallowClick: false,
      startStep: null,
      lastTargetStep: null,
      lastSoundStep: null,
      dropOnOccupied: false,
      outOfRange: false
    };

    this._previewState = { active: false, step: null };
    this._preview = null;
    this._previewStep = null;

    this._audioReady = false;
    this._synth = null;

    this._accDragSound = { noteId: null, step: null, toolType: null, prospectiveCls: null };
    this._accSnap = { noteId: null, dist: null, localY: null };

    this._suppressNextClick = { noteId: null, until: 0 };

    this._applyClefCssVars(this.opts.clef);
    this._computeLayout();
    this._drawLines();
  }

  Staff.prototype._clefUrlFor = function (clef) {
    return clef === "bass"
      ? "{{ asset('images/clefs/bass-clef.svg') }}"
      : "{{ asset('images/clefs/treble-clef.svg') }}";
  };

  Staff.prototype.setSoundEnabled = function (enabled) {
    this.opts.sound = !!enabled;
    if (!this.opts.sound && window.Tone) {
      try { Tone.Transport && Tone.Transport.stop(); } catch (_) {}
      try { Tone.context && Tone.context.suspend && Tone.context.suspend(); } catch (_) {}
      try { this._synth && this._synth.releaseAll && this._synth.releaseAll(); } catch (_) {}
    }
  };
  Staff.prototype.isSoundEnabled = function () { return !!this.opts.sound; };
  Staff.prototype._soundEnabled = function () { return !!this.opts.sound; };

  Staff.prototype._applyClefCssVars = function (clef) {
    const c = normalizeClef(clef);
    const vars = CLEF_LAYOUT_VARS[c] || CLEF_LAYOUT_VARS.treble;
    const el = this.$el[0];
    Object.keys(vars).forEach((k) => el.style.setProperty(k, vars[k]));
  };

  Staff.prototype.setClef = function (clef) {
    this.opts.clef = normalizeClef(clef);
    this.opts.clefUrl = this._clefUrlFor(this.opts.clef);
    this._applyClefCssVars(this.opts.clef);
    this.relayout();
  };

  Staff.prototype.getClef = function () { return this.opts.clef; };

  Staff.prototype._maxUserNotes = function () {
    const v = this.opts.getMaxUserNotes ? this.opts.getMaxUserNotes() : Infinity;
    return Number.isFinite(v) ? v : Infinity;
  };

  Staff.prototype._userNoteCount = function () {
    return this.$el.find(".note").not(".fixed").not(".preview").length;
  };

  Staff.prototype._computeLayout = function () {
    const h = this.$el.height();
    const staffHeight = this.opts.lineGap * 4;
    const topLineY = Math.round((h - staffHeight) / 2);
    this.opts.bottomLineY = topLineY + staffHeight;
  };

  Staff.prototype._drawLines = function () {
    this.$el.find(".staff-line, .treble-clef").remove();
    for (let i = 0; i < 5; i++) {
      const y = this.opts.bottomLineY - (4 - i) * this.opts.lineGap;
      $('<div class="staff-line"></div>').css({ top: y + "px" }).appendTo(this.$el);
    }
    this._drawClef();
  };

  Staff.prototype._drawClef = function () {
    if (!this.opts.clefUrl) return;
    $('<img class="treble-clef" alt="">').attr("src", this.opts.clefUrl).appendTo(this.$el);
  };

  Staff.prototype.relayout = function () {
    this._computeLayout();
    this._drawLines();
    this._resolveNoteOverlaps();
    this._repositionAllAccidentals();
  };

  Staff.prototype.centerX = function () { return this.$el.width() / 2; };
  Staff.prototype.stepToY = function (step) { return this.opts.bottomLineY - (step * this.opts.stepSize); };
  Staff.prototype.yToStep = function (y) { return Math.round((this.opts.bottomLineY - y) / this.opts.stepSize); };
  Staff.prototype._pageYToLocalY = function (pageY) { return pageY - this.$el.offset().top; };

  Staff.prototype.minStepAllowed = function () { return 0 - (this.opts.maxLedgerBelow * 2); };
  Staff.prototype.maxStepAllowed = function () { return 8 + (this.opts.maxLedgerAbove * 2); };
  Staff.prototype._isStepAllowed = function (step) {
    return step >= this.minStepAllowed() && step <= this.maxStepAllowed();
  };

  Staff.prototype._ledgerStepsFor = function (step) {
    const ledgers = [];
    const topMost = 8 + (this.opts.maxLedgerAbove * 2);
    const bottomMost = 0 - (this.opts.maxLedgerBelow * 2);

    if (step > 8) {
      const capped = Math.min(step, topMost);
      for (let s = 10; s <= capped; s += 2) ledgers.push(s);
    } else if (step < 0) {
      const capped = Math.max(step, bottomMost);
      for (let s = -2; s >= capped; s -= 2) ledgers.push(s);
    }
    return ledgers;
  };

  Staff.prototype._renderLedgers = function (id, x, step) {
    this.$el.find('.ledger[data-for-note-id="' + id + '"]').remove();
    const isDragging = this.$el.find('.note[data-note-id="' + id + '"]').hasClass("dragging");
    const steps = this._ledgerStepsFor(step);

    for (let i = 0; i < steps.length; i++) {
      const $l = $('<div class="ledger"></div>')
        .attr("data-for-note-id", id)
        .css({ left: x + "px", top: this.stepToY(steps[i]) + "px" });

      if (isDragging) $l.addClass("dragging");
      $l.appendTo(this.$el);
    }
  };

  Staff.prototype._previewLedgersClear = function () { this.$el.find(".ledger.preview").remove(); };

  Staff.prototype._previewLedgersSet = function (step) {
    this._previewLedgersClear();
    const x = this.centerX();
    const steps = this._ledgerStepsFor(step);
    for (let i = 0; i < steps.length; i++) {
      $('<div class="ledger preview"></div>')
        .css({ left: x + "px", top: this.stepToY(steps[i]) + "px" })
        .appendTo(this.$el);
    }
  };

  Staff.prototype._stepOfNoteEl = function (el) {
    const topStr = el.style.top || window.getComputedStyle(el).top;
    return this.yToStep(parseFloat(topStr));
  };

  Staff.prototype._isStepOccupied = function (step, excludeId) {
    const nodes = this.$el.find(".note").toArray();
    for (let i = 0; i < nodes.length; i++) {
      const el = nodes[i];
      if (!el) continue;
      const id = el.getAttribute("data-note-id");
      if (excludeId && id === excludeId) continue;
      if (this._stepOfNoteEl(el) === step) return true;
    }
    return false;
  };

  Staff.prototype._getNoteIdAtStep = function (step, excludeId) {
    const nodes = this.$el.find(".note").toArray();
    for (let i = 0; i < nodes.length; i++) {
      const el = nodes[i];
      if (!el) continue;
      const id = el.getAttribute("data-note-id");
      if (excludeId && id === excludeId) continue;
      if (this._stepOfNoteEl(el) === step) return id;
    }
    return null;
  };

  Staff.prototype._isCenteredX = function (noteId) {
    const $n = this.$el.find('.note[data-note-id="' + noteId + '"]');
    if (!$n.length) return true;
    return Math.abs(parseFloat($n.css("left")) - this.centerX()) <= 0.5;
  };

  Staff.prototype.isNoteFixed = function (noteId) {
    const $note = this.$el.find('.note[data-note-id="' + noteId + '"]');
    return $note.length ? $note.hasClass("fixed") : false;
  };

  Staff.prototype._nearestEditableNoteByLocalY = function (localY) {
    const maxD = Number.isFinite(this.opts.accSnapMaxPx) ? this.opts.accSnapMaxPx : (this.opts.lineGap * 1.2);
    let best = null;

    const nodes = this.$el.find(".note").not(".preview").toArray();
    for (let i = 0; i < nodes.length; i++) {
      const el = nodes[i];
      const id = el.getAttribute("data-note-id");
      if (!id) continue;
      if ($(el).hasClass("fixed")) continue;

      const top = parseFloat(el.style.top || window.getComputedStyle(el).top);
      const d = Math.abs(top - localY);
      if (best == null || d < best.dist) best = { noteId: id, dist: d };
    }

    if (!best || best.dist > maxD) return null;
    return best;
  };

  Staff.prototype._removeAccidentalForNote = function (noteId) {
    this.$el.find('.accidental[data-for-note-id="' + noteId + '"]').remove();
  };

  Staff.prototype._accidentalAnchorXForNote = function (noteLeftPx) {
    const cx = this.centerX();
    const EPS = 0.5;
    // If the note was shifted to the right due to adjacency, keep accidental at the "normal" (center) x.
    if (Number.isFinite(noteLeftPx) && noteLeftPx > (cx + EPS)) return cx;
    return noteLeftPx;
  };

  Staff.prototype._positionAccidentalForNote = function (noteId) {
    const $note = this.$el.find('.note[data-note-id="' + noteId + '"]');
    const $acc = this.$el.find('.accidental[data-for-note-id="' + noteId + '"]');
    if (!$note.length || !$acc.length) return;

    const noteLeft = parseFloat($note.css("left"));
    const noteTop = parseFloat($note.css("top"));

    const anchorX = this._accidentalAnchorXForNote(noteLeft);

    $acc.css({
      left: (anchorX - this.opts.accidentalGapPx) + "px",
      top: (noteTop - this.opts.accidentalTopPx) + "px"
    });
  };

  Staff.prototype._rectsOverlap = function (a, b) {
    return !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
  };

  Staff.prototype._repositionAllAccidentals = function () {
    const self = this;

    // Pass 1: base positioning (with "keep accidental normal if note shifted right")
    this.$el.find(".accidental").each(function () {
      const id = this.getAttribute("data-for-note-id");
      if (id) self._positionAccidentalForNote(id);
    });

    // Pass 2: if both adjacent notes have accidentals, push the upper accidental left to avoid overlap
    const noteEls = this.$el.find(".note").not(".preview").toArray();
    const stepToNoteId = {};
    for (let i = 0; i < noteEls.length; i++) {
      const el = noteEls[i];
      const id = el.getAttribute("data-note-id");
      if (!id) continue;
      stepToNoteId[this._stepOfNoteEl(el)] = id;
    }

    const steps = Object.keys(stepToNoteId).map(s => parseInt(s, 10)).sort((a, b) => a - b);
    for (let i = 0; i < steps.length; i++) {
      const lowerStep = steps[i];
      const upperStep = lowerStep + 1;
      const lowerId = stepToNoteId[lowerStep];
      const upperId = stepToNoteId[upperStep];
      if (!lowerId || !upperId) continue;

      const $lowerAcc = this.$el.find('.accidental[data-for-note-id="' + lowerId + '"]');
      const $upperAcc = this.$el.find('.accidental[data-for-note-id="' + upperId + '"]');
      if (!$lowerAcc.length || !$upperAcc.length) continue;

      const lowerRect = $lowerAcc[0].getBoundingClientRect();
      const upperRect = $upperAcc[0].getBoundingClientRect();
      if (!this._rectsOverlap(lowerRect, upperRect)) continue;

      const overlapPx = Math.max(0, upperRect.right - lowerRect.left);
      const padPx = -6;
      const curLeft = parseFloat($upperAcc.css("left"));
      if (!Number.isFinite(curLeft)) continue;

      $upperAcc.css("left", (curLeft - (overlapPx + padPx)) + "px");
    }
  };

  Staff.prototype._getAttachedAccidentalClass = function (noteId) {
    const $acc = this.$el.find('.accidental[data-for-note-id="' + noteId + '"]');
    if (!$acc.length) return null;
    for (let i = 0; i < ACCIDENTAL_CLASSES.length; i++) {
      const cls = ACCIDENTAL_CLASSES[i];
      if ($acc.hasClass(cls)) return cls;
    }
    return null;
  };

  Staff.prototype.attachAccidentalToNote = function (noteId, accidentalClass) {
    if (!noteId || this.isNoteFixed(noteId)) return;
    this._removeAccidentalForNote(noteId);

    const $acc = $('<div class="accidental music-font"></div>')
      .addClass(accidentalClass)
      .attr("data-for-note-id", noteId);

    this.$el.append($acc);
    this._repositionAllAccidentals();
  };

  Staff.prototype._hintIgnoredAccidental = function (noteId) {
    const $note = this.$el.find('.note[data-note-id="' + noteId + '"]');
    if (!$note.length) return;

    $note.removeClass("animate__animated animate__headShake");
    void $note[0].offsetWidth;
    $note.addClass("animate__animated animate__headShake");

    $note.off("animationend._hint webkitAnimationEnd._hint oAnimationEnd._hint MSAnimationEnd._hint")
      .one("animationend._hint webkitAnimationEnd._hint oAnimationEnd._hint MSAnimationEnd._hint", function () {
        $note.removeClass("animate__animated animate__headShake");
      });
  };

  Staff.prototype.applyAccidentalToolToNote = function (noteId, toolType) {
    if (!noteId || this.isNoteFixed(noteId)) return false;

    const currentCls = this._getAttachedAccidentalClass(noteId);

    if (isMaxedDouble(currentCls, toolType)) {
      this._hintIgnoredAccidental(noteId);
      return false;
    }

    const nextCls = nextAccidentalClass(currentCls, toolType);
    if (toolType === "natural" && currentCls === "music-font__natural") return false;
    if (nextCls === currentCls) return false;

    this.attachAccidentalToNote(noteId, nextCls);
    return true;
  };

  Staff.prototype._ensureAudio = async function () {
    if (!this._soundEnabled()) return;
    if (this._audioReady) return;
    if (!window.Tone) return;

    await Tone.start();
    this._synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
      envelope: { attack: 0.02, decay: 0.2, sustain: 0.8, release: 1.2 }
    }).toDestination();
    this._audioReady = true;
  };

  Staff.prototype._stepToMidi = function (step) {
    const diatonic = [0, 2, 4, 5, 7, 9, 11];

    if (this.opts.clef === "bass") {
      const gBasedIndex = 4 + step;
      const octaveShift = Math.floor(gBasedIndex / 7);
      const noteIndex = (gBasedIndex % 7 + 7) % 7;
      const c2 = 36;
      return c2 + diatonic[noteIndex] + octaveShift * 12;
    }

    const eBasedIndex = 2 + step;
    const octaveShift = Math.floor(eBasedIndex / 7);
    const noteIndex = (eBasedIndex % 7 + 7) % 7;
    return 60 + diatonic[noteIndex] + octaveShift * 12;
  };

  Staff.prototype._accidentalClassToOffset = function (cls) {
    if (!cls) return 0;
    if (cls.indexOf("music-font__doublesharp") >= 0) return +2;
    if (cls.indexOf("music-font__sharp") >= 0) return +1;
    if (cls.indexOf("music-font__doubleflat") >= 0) return -2;
    if (cls.indexOf("music-font__flat") >= 0) return -1;
    return 0;
  };

  Staff.prototype._playStep = async function (step, accidentalOffset) {
    if (!this._soundEnabled() || !Number.isFinite(step)) return;
    await this._ensureAudio();
    if (!this._synth) return;
    const midi = this._stepToMidi(step) + (accidentalOffset || 0);
    this._synth.triggerAttackRelease(Tone.Frequency(midi, "midi"), 0.5);
  };

  Staff.prototype.setNoteFixed = function (noteId, fixed) {
    const on = !!fixed;
    this.$el.find('.note[data-note-id="' + noteId + '"]').toggleClass("fixed", on);
    this.$el.find('.ledger[data-for-note-id="' + noteId + '"]').toggleClass("fixed", on);
    this.$el.find('.accidental[data-for-note-id="' + noteId + '"]').toggleClass("fixed", on);
  };

  Staff.prototype.addFixedNote = function (cfg) {
    cfg = cfg || {};

    // IMPORTANT: don't add "fixed" class until AFTER accidental is attached,
    // because attachAccidentalToNote() blocks fixed notes.
    const className = cfg.className || "";

    const id = this.addNote({
      step: cfg.step,
      y: cfg.y,
      x: cfg.x,
      id: cfg.id,
      ledger: cfg.ledger,
      className
    });

    if (!id) return null;

    if (cfg.accidentalClass) this.attachAccidentalToNote(id, cfg.accidentalClass);

    this.setNoteFixed(id, true);
    return id;
  };

  Staff.prototype.clearNotes = function () {
    this.$el.find(".note, .ledger, .accidental").remove();
    this._previewClear();
  };

  Staff.prototype.removeNote = function (id) {
    this.$el.find('.note[data-note-id="' + id + '"]').remove();
    this.$el.find('.ledger[data-for-note-id="' + id + '"]').remove();
    this._removeAccidentalForNote(id);
    this._resolveNoteOverlaps();
  };

  Staff.prototype.addNote = function (cfg) {
    cfg = cfg || {};
    const step = Number.isFinite(cfg.step) ? Number(cfg.step) : null;

    if (Number.isFinite(step) && !this._isStepAllowed(step)) return null;
    if (Number.isFinite(step) && this._isStepOccupied(step, null)) return null;

    const y = Number.isFinite(cfg.y)
      ? Number(cfg.y)
      : Number.isFinite(step)
        ? this.stepToY(step)
        : null;

    if (!Number.isFinite(y)) throw new Error("addNote: provide either y or step");

    const x = Number.isFinite(cfg.x) ? Number(cfg.x) : this.centerX();
    const id = cfg.id || (this.opts.noteIdPrefix + (this._idCounter++));

    const $note = $('<div class="note"></div>')
      .attr("data-note-id", id)
      .css({ left: x + "px", top: y + "px" });

    if (cfg.className) $note.addClass(cfg.className);

    this.$el.append($note);

    if ((cfg.ledger === true) || (cfg.ledger !== false && Number.isFinite(step))) {
      this._renderLedgers(id, x, step);
    }

    this._resolveNoteOverlaps();
    return id;
  };

  Staff.prototype.moveNote = function (id, pos) {
    pos = pos || {};
    const $note = this.$el.find('.note[data-note-id="' + id + '"]');
    if (!$note.length) return;

    const x = Number.isFinite(pos.x) ? Number(pos.x) : null;
    const step = Number.isFinite(pos.step) ? Number(pos.step) : null;
    if (Number.isFinite(step) && !this._isStepAllowed(step)) return;

    const y = Number.isFinite(pos.y)
      ? Number(pos.y)
      : Number.isFinite(step)
        ? this.stepToY(step)
        : null;

    if (Number.isFinite(x)) $note.css("left", x + "px");
    if (Number.isFinite(y)) $note.css("top", y + "px");

    if (Number.isFinite(step)) {
      const noteX = Number.isFinite(x) ? x : parseFloat($note.css("left"));
      this._renderLedgers(id, noteX, step);
    }

    // Reposition all so adjacency accidental-overlap logic stays correct during drags too.
    this._repositionAllAccidentals();
  };

  Staff.prototype._previewSet = function (step) {
    if (!this._preview) this._preview = $('<div class="note preview"></div>').appendTo(this.$el);
    this._preview.css({ left: this.centerX() + "px", top: this.stepToY(step) + "px" });
    this._previewStep = step;
    this._previewLedgersSet(step);
  };

  Staff.prototype._previewClear = function () {
    if (this._preview) {
      this._preview.remove();
      this._preview = null;
      this._previewStep = null;
    }
    this._previewLedgersClear();
  };

  Staff.prototype._resolveNoteOverlaps = function () {
    const self = this;
    const GAP = this.opts.noteOverlapGap;
    const MAX_ITERS = 20;

    function notesArray() {
      return self.$el.find(".note").toArray().map(function (el) {
        const $el = $(el);
        return { el: el, $el: $el, step: self.yToStep(parseFloat($el.css("top"))) };
      });
    }

    function noteByStep(list) {
      const map = {};
      for (let i = 0; i < list.length; i++) {
        const s = list[i].step;
        (map[s] || (map[s] = [])).push(list[i]);
      }
      return map;
    }

    function centerAll(list) {
      const cx = self.centerX();
      for (let i = 0; i < list.length; i++) {
        const id = list[i].$el.attr("data-note-id");
        self.moveNote(id, { x: cx, step: list[i].step });
        list[i]._shifted = false;
      }
    }

    function shiftUpperToTouch(upper, stepMap) {
      const upperRect = upper.el.getBoundingClientRect();
      const lowerEls = stepMap[upper.step - 1];
      if (!lowerEls || !lowerEls.length) return false;

      const lowerRect = lowerEls[0].el.getBoundingClientRect();
      if (!self._rectsOverlap(upperRect, lowerRect)) return false;

      const dx = (lowerRect.right - upperRect.left) + GAP;
      const id = upper.$el.attr("data-note-id");
      self.moveNote(id, { x: parseFloat(upper.$el.css("left")) + dx, step: upper.step });
      return true;
    }

    for (let iter = 0; iter < MAX_ITERS; iter++) {
      const list = notesArray();
      if (!list.length) return;

      centerAll(list);

      const stepMap = noteByStep(list);
      const steps = Object.keys(stepMap).map(s => parseInt(s, 10)).sort((a, b) => a - b);

      let changed = false;

      for (let i = 0; i < steps.length; i++) {
        const s = steps[i];
        if (!stepMap[s] || !stepMap[s + 1]) continue;

        const lower = stepMap[s][0];
        const upper = stepMap[s + 1][0];

        if (!lower._shifted) {
          if (shiftUpperToTouch(upper, stepMap)) changed = true;
          upper._shifted = true;
        }
      }

      if (!changed) {
        self._repositionAllAccidentals();
        return;
      }
    }

    self._repositionAllAccidentals();
  };

  Staff.prototype._setDraggingVisual = function (noteId, on) {
    const $note = this.$el.find('.note[data-note-id="' + noteId + '"]');
    const $ledgers = this.$el.find('.ledger[data-for-note-id="' + noteId + '"]');
    const $acc = this.$el.find('.accidental[data-for-note-id="' + noteId + '"]');
    $note.toggleClass("dragging", !!on);
    $ledgers.toggleClass("dragging", !!on);
    $acc.toggleClass("dragging", !!on);
  };

  Staff.prototype._applyDraggedAdjacencyX = function (dragId) {
    const $drag = this.$el.find('.note[data-note-id="' + dragId + '"]');
    if (!$drag.length) return;

    const dragStep = this.yToStep(parseFloat($drag.css("top")));
    const center = this.centerX();
    const gap = this.opts.noteOverlapGap;

    this.moveNote(dragId, { x: center });

    const lowerId = this._getNoteIdAtStep(dragStep - 1, dragId);
    if (!lowerId) return;
    if (!this._isCenteredX(lowerId)) return;

    const $lower = this.$el.find('.note[data-note-id="' + lowerId + '"]');
    if (!$lower.length) return;

    const upperRect = $drag[0].getBoundingClientRect();
    const lowerRect = $lower[0].getBoundingClientRect();
    if (!this._rectsOverlap(upperRect, lowerRect)) return;

    const dx = (lowerRect.right - upperRect.left) + gap;
    this.moveNote(dragId, { x: center + dx });
  };

  Staff.prototype.enableGhostClickCreate = function () {
    const self = this;

    this.$el.off(".previewCreate");
    $(window).off("blur.previewCreate");

    this.$el.on("pointerdown.previewCreate", function (e) {
      if ($(e.target).closest(".note, .accidental").length) return;
      if (self._userNoteCount() >= self._maxUserNotes()) return;

      e.preventDefault();

      const { y: pageY } = getPointerPageXY(e);
      const initialStep = self.yToStep(self._pageYToLocalY(pageY));
      if (!self._isStepAllowed(initialStep)) return;

      self._previewState.active = true;
      self._previewState.step = initialStep;
      self._previewSet(initialStep);

      if (self._soundEnabled()) self._ensureAudio();

      const pointerId = getPointerId(e);
      if (this.setPointerCapture && pointerId != null) this.setPointerCapture(pointerId);

      self.$el.off("pointermove.previewCreate").on("pointermove.previewCreate", function (ev) {
        if (!self._previewState.active) return;

        if (self._userNoteCount() >= self._maxUserNotes()) {
          self._previewState.active = false;
          self._previewClear();
          self.$el.off("pointermove.previewCreate pointerup.previewCreate pointercancel.previewCreate");
          return;
        }

        const { y: py } = getPointerPageXY(ev);
        const s = self.yToStep(self._pageYToLocalY(py));
        if (!self._isStepAllowed(s)) return;

        self._previewState.step = s;
        self._previewSet(s);
      });

      self.$el.off("pointerup.previewCreate pointercancel.previewCreate")
        .on("pointerup.previewCreate pointercancel.previewCreate", function () {
          if (!self._previewState.active) return;

          self._previewState.active = false;
          const finalStep = self._previewState.step;

          self._previewClear();
          self.$el.off("pointermove.previewCreate pointerup.previewCreate pointercancel.previewCreate");

          if (!self._isStepAllowed(finalStep)) return;
          if (self._isStepOccupied(finalStep, null)) return;
          if (self._userNoteCount() >= self._maxUserNotes()) return;

          const createdId = self.addNote({ step: finalStep });
          if (createdId) {
            self._suppressNextClick.noteId = createdId;
            self._suppressNextClick.until = Date.now() + 700;
            self._playStep(finalStep, 0);
          }
        });
    });

    $(window).on("blur.previewCreate", function () {
      if (!self._previewState.active) return;
      self._previewState.active = false;
      self._previewClear();
      self.$el.off("pointermove.previewCreate pointerup.previewCreate pointercancel.previewCreate");
    });
  };

  Staff.prototype.enableNoteDragAndClickDelete = function () {
    const self = this;
    const d = this._drag;

    this.$el.off(".noteDrag");

    function startDragFromNoteEl(noteEl, e) {
      e.preventDefault();
      if ($(noteEl).hasClass("fixed")) return;

      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      else e.stopPropagation();

      const pointerId = getPointerId(e);
      const $note = $(noteEl);

      d.isDragging = false;
      d.movedPx = 0;
      d.startPageY = getPointerPageXY(e).y;
      d.noteId = $note.attr("data-note-id");

      d.startStep = self.yToStep(parseFloat($note.css("top")));
      d.lastTargetStep = d.startStep;
      d.lastSoundStep = d.startStep;
      d.dropOnOccupied = false;
      d.outOfRange = false;

      self._setDraggingVisual(d.noteId, true);
      if (self._soundEnabled()) self._ensureAudio();

      const capEl = (e.currentTarget && e.currentTarget.setPointerCapture) ? e.currentTarget : null;
      if (capEl && pointerId != null) capEl.setPointerCapture(pointerId);

      self.$el.off("pointermove.noteDrag").on("pointermove.noteDrag", function (ev) {
        const evPointerId = getPointerId(ev);
        if (pointerId != null && evPointerId != null && evPointerId !== pointerId) return;

        const py = getPointerPageXY(ev).y;
        const dy = py - d.startPageY;
        d.movedPx = Math.max(d.movedPx, Math.abs(dy));

        if (!d.isDragging && d.movedPx >= d.thresholdPx) d.isDragging = true;
        if (!d.isDragging) return;

        const targetStep = self.yToStep(self._pageYToLocalY(py));
        if (!self._isStepAllowed(targetStep)) {
          d.outOfRange = true;
          return;
        }
        d.outOfRange = false;

        d.lastTargetStep = targetStep;

        self.moveNote(d.noteId, { step: targetStep });
        d.dropOnOccupied = self._isStepOccupied(targetStep, d.noteId);
        self._applyDraggedAdjacencyX(d.noteId);

        if (self._soundEnabled() && targetStep !== d.lastSoundStep) {
          d.lastSoundStep = targetStep;
          const accCls = self._getAttachedAccidentalClass(d.noteId);
          const accOff = self._accidentalClassToOffset(accCls);
          self._playStep(targetStep, accOff);
        }
      });

      self.$el.off("pointerup.noteDrag pointercancel.noteDrag")
        .on("pointerup.noteDrag pointercancel.noteDrag", function (ev2) {
          const evPointerId = getPointerId(ev2);
          if (pointerId != null && evPointerId != null && evPointerId !== pointerId) return;

          self.$el.off("pointermove.noteDrag pointerup.noteDrag pointercancel.noteDrag");

          d.swallowClick = d.isDragging;
          self._setDraggingVisual(d.noteId, false);

          if (d.outOfRange || d.dropOnOccupied) {
            self.removeNote(d.noteId);
          } else {
            self.moveNote(d.noteId, { step: d.lastTargetStep });
            self._resolveNoteOverlaps();
          }

          d.noteId = null;
          d.isDragging = false;
          d.movedPx = 0;
          d.startStep = null;
          d.lastTargetStep = null;
          d.lastSoundStep = null;
          d.dropOnOccupied = false;
          d.outOfRange = false;
        });
    }

    this.$el.on("pointerdown.noteDrag", ".accidental", function (e) { e.stopPropagation(); });
    this.$el.on("pointerdown.noteDrag", ".note", function (e) { startDragFromNoteEl(this, e); });

    this.$el.on("pointerdown.noteDrag", function (e) {
      if ($(e.target).closest(".accidental").length) return;
      if ($(e.target).closest(".note").length) return;

      const { y: pageY } = getPointerPageXY(e);
      const step = self.yToStep(self._pageYToLocalY(pageY));
      const idAtStep = self._getNoteIdAtStep(step, null);
      if (!idAtStep) return;

      const noteEl = self.$el.find('.note[data-note-id="' + idAtStep + '"]')[0];
      if (!noteEl) return;

      startDragFromNoteEl(noteEl, e);
    });

    this.$el.on("click.noteDrag", ".accidental", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const noteId = this.getAttribute("data-for-note-id");
      if (!noteId) return;
      if (self.isNoteFixed(noteId)) return;
      self._removeAccidentalForNote(noteId);
      self._repositionAllAccidentals();
    });

    this.$el.on("click.noteDrag", ".note", function (e) {
      const clickedId = $(this).attr("data-note-id");

      if (
        self._suppressNextClick.noteId &&
        clickedId === self._suppressNextClick.noteId &&
        Date.now() < self._suppressNextClick.until
      ) {
        self._suppressNextClick.noteId = null;
        self._suppressNextClick.until = 0;
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (d.swallowClick) {
        e.preventDefault();
        e.stopPropagation();
        d.swallowClick = false;
        return;
      }

      self.removeNote(clickedId);
    });
  };

  function resetAccDrag(self) {
    self._accDragSound.noteId = null;
    self._accDragSound.step = null;
    self._accDragSound.toolType = null;
    self._accDragSound.prospectiveCls = null;
    self._accSnap.noteId = null;
    self._accSnap.dist = null;
    self._accSnap.localY = null;
  }

  Staff.prototype.enableAccidentalDrag = function ($toolEls) {
    const self = this;
    $toolEls.addClass("accidental-tool");

    $toolEls.draggable({
      helper: "clone",
      appendTo: "body",
      zIndex: 9999,
      revert: "invalid",
      scroll: false,

      start: function (event, ui) {
        ui.helper.addClass("dragging accidental-tool");
        if (self._soundEnabled()) self._ensureAudio();
        resetAccDrag(self);
        self._accDragSound.toolType = toolTypeFromEl($(this));
      },

      drag: function (event) {
        const toolType = self._accDragSound.toolType;
        if (!toolType) return;

        let pageX = event.pageX, pageY = event.pageY;
        if (!Number.isFinite(pageY) && event.originalEvent) pageY = event.originalEvent.pageY;
        if (!Number.isFinite(pageX) && event.originalEvent) pageX = event.originalEvent.pageX;

        const off = self.$el.offset();
        const x = pageX - off.left;
        const y = pageY - off.top;

        self._accSnap.localY = y;

        if (x < 0 || y < 0 || x > self.$el.width() || y > self.$el.height()) {
          resetAccDrag(self);
          self._accDragSound.toolType = toolType;
          return;
        }

        const nearest = self._nearestEditableNoteByLocalY(y);
        if (!nearest) {
          self._accSnap.noteId = null;
          self._accSnap.dist = null;
          self._accDragSound.noteId = null;
          self._accDragSound.step = null;
          self._accDragSound.prospectiveCls = null;
          return;
        }

        const noteId = nearest.noteId;
        self._accSnap.noteId = noteId;
        self._accSnap.dist = nearest.dist;

        const $note = self.$el.find('.note[data-note-id="' + noteId + '"]');
        if (!$note.length) return;

        const step = self.yToStep(parseFloat($note.css("top")));
        if (!self._isStepAllowed(step)) return;

        const currentCls = self._getAttachedAccidentalClass(noteId);
        const prospectiveCls = nextAccidentalClass(currentCls, toolType);

        if (isMaxedDouble(currentCls, toolType)) {
          self._accDragSound.noteId = null;
          self._accDragSound.step = null;
          self._accDragSound.prospectiveCls = null;
          return;
        }

        if (
          noteId === self._accDragSound.noteId &&
          step === self._accDragSound.step &&
          prospectiveCls === self._accDragSound.prospectiveCls
        ) return;

        self._accDragSound.noteId = noteId;
        self._accDragSound.step = step;
        self._accDragSound.prospectiveCls = prospectiveCls;

        if (self._soundEnabled()) {
          const accOff = self._accidentalClassToOffset(prospectiveCls);
          self._playStep(step, accOff);
        }
      },

      stop: function () { resetAccDrag(self); }
    });
  };

  Staff.prototype.enableAccidentalDropOnStaff = function () {
    const self = this;

    this.$el.droppable({
      accept: ".accidental-tool",
      tolerance: "pointer",
      drop: function (event, ui) {
        const toolType = toolTypeFromEl(ui.draggable);
        if (!toolType) return;

        let localY = null;
        if (self._accSnap && self._accSnap.localY != null) {
          localY = self._accSnap.localY;
        } else {
          let pageY = event.pageY;
          if (!Number.isFinite(pageY) && event.originalEvent) pageY = event.originalEvent.pageY;
          localY = self._pageYToLocalY(pageY);
        }

        const nearest = self._nearestEditableNoteByLocalY(localY);
        if (!nearest) return;

        self.applyAccidentalToolToNote(nearest.noteId, toolType);
      }
    });
  };

  window.Staff = Staff;

  class IntervalChallenge {
    constructor(options) {
      const defaults = {
        staffEl: "#staff",
        maxUserNotes: 1,
        numOfChallenges: 4,
        intervals: ["m2", "M2", "m3", "M3", "P4", "A4", "d5", "P5", "m6", "M6", "m7", "M7"],
        hardIntervals: ["A4", "d5", "m6", "m7", "M7"],
        fixedNotes: null,
        sound: true,

        // NEW: tweak these when constructing IntervalChallenge()
        // Probability is proportional to weight (0 disables).
        // "natural" means no accidental.
        accidentalWeights: {
          natural: 8,
          sharp: 1,
          flat: 1
        },

        basePoints: 1,
        firstTryBonus: 2
      };

      this.opts = $.extend(true, {}, defaults, options || {});
      this._clefLocked = Object.prototype.hasOwnProperty.call(this.opts, "clef") && this.opts.clef != null;
      this.opts.clef = this._clefLocked ? normalizeClef(this.opts.clef) : null;

      this.$staffEl = $(this.opts.staffEl);
      this.$accidentals = $("#accidentals");
      this.$feedback = $("#feedback-success");
      this.$bonusBadge = this.$feedback.find(".bonus");
      this.$points = $("#points");
      this.$increment = $("#increment");
      this.$interval = $("#interval");
      this.$checkBtn = $("#check button");
      this.$finalOverlay = $("#final-overlay");
      this.$checkWrap = this.$checkBtn.parent();
      this.$progressBar = $("#progress-bar");
      this.$level = $("#level");
      this.successPhrases = ["Awesome", "Nicely done", "Well done", "Great job", "Hooray", "Bravo", "Fantastic", "Nice work", "Looks good", "Good one"];

      this.maxUserNotes = Number.isFinite(this.opts.maxUserNotes) ? this.opts.maxUserNotes : 1;
      this.numOfChallenges = Number.isFinite(this.opts.numOfChallenges) ? this.opts.numOfChallenges : 4;

      this.points = 0;
      this._madeMistakeThisRound = false;
      this._continueBound = false;

      this._stats = {
        checksTotal: 0,
        checksCorrect: 0,
        finishedAtMs: null
      };

      this.staff = new Staff(this.$staffEl, {
        clef: this.opts.clef || "treble",
        clefUrl: null,
        getMaxUserNotes: () => this.maxUserNotes,
        sound: !!this.opts.sound
      });

      this.$increment.hide();
      this.$bonusBadge.hide();
      this.$points.text(String(this.points));
    }

    start() {
      this._wireAccidentalPalette();
      this._wireStaffTools();
      this._wireControls();
      this._resetProgress();
      this.newChallenge();
      $("#page-wrapper").fadeIn("fast");
    }

    setSoundEnabled(enabled) {
      this.opts.sound = !!enabled;
      this.staff.setSoundEnabled(!!enabled);
      return this;
    }
    isSoundEnabled() { return this.staff.isSoundEnabled(); }

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
    }

    _wireControls() {
      $("#clear").off("click.intervalChallenge").on("click.intervalChallenge", () => {
        this.staff.clearNotes();
      });

      this.$checkBtn.off("click.intervalChallenge").on("click.intervalChallenge", () => {
        this._onCheck();
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
    }

    _currentClefForChallenge() {
      return this._clefLocked ? this.opts.clef : randomClef();
    }

    newChallenge() {
      const clef = this._currentClefForChallenge();
      if (clef && clef !== this.staff.getClef()) this.staff.setClef(clef);

      this._madeMistakeThisRound = false;
      this.$bonusBadge.hide();

      const interval = this._pickInterval();
      const fixed = this._pickFixedNote();

      this.staff.clearNotes();
      this.$accidentals.removeClass("invisible");
      this.$feedback.hide();

      this.$interval.show().text(interval);

      this.$level.addClass("invisible");
      if (this.opts.hardIntervals.includes(interval)) this.$level.removeClass("invisible");

      if (fixed) {
        this.staff.addFixedNote({ step: fixed.step, accidentalClass: fixed.accidentalClass || null });
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
        { value: null,               weight: Number(w.natural) || 0 },
        { value: "music-font__sharp", weight: Number(w.sharp) || 0 },
        { value: "music-font__flat",  weight: Number(w.flat) || 0 }
      ]);

      return { step: randomInt(0, 7), accidentalClass };
    }

    _notesOnStaffOrdered() {
      const $notes = this.$staffEl.find(".note").not(".preview");
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

      return current;
    }

    _failAnimation() {
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
        return;
      }

      const name = this._intervalNameBetween(notes[0], notes[1]);

      if (name === this.$interval.text()) {
        this._stats.checksCorrect += 1;

        this._successAnimation();

        const { earned } = this._awardPointsForCorrect();

        $("#score").animateCSS && $("#score").animateCSS("heartBeat");
        this._showIncrement(earned);

        if (this._updateProgressBar() >= 100) {
          this._stats.finishedAtMs = Date.now();

          setTimeout(() => {
            this._showFinalResults();
          }, 2000);
        } else {
          $("#check").hide();
          $("#continue").show();
        }
      } else {
        this._failAnimation();
        this._madeMistakeThisRound = true;
      }
    }

    _showFinalResults() {
      const total = Math.max(0, this._stats.checksTotal || 0);
      const correct = Math.max(0, this._stats.checksCorrect || 0);
      const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

      const endMs = (this._stats.finishedAtMs != null) ? this._stats.finishedAtMs : Date.now();
      const elapsedMs = Math.max(0, endMs - PAGE_OPENED_AT_MS);

      const totalSeconds = Math.floor(elapsedMs / 1000);
      const mm = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
      const ss = String(totalSeconds % 60).padStart(2, "0");
      const duration = `${mm}:${ss}`;

      this.$finalOverlay.find('span[name="score"]').text(this.points);
      this.$finalOverlay.find('span[name="accuracy"]').text(accuracy + "%");
      this.$finalOverlay.find('span[name="duration"]').text(duration);

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

  window.IntervalChallenge = IntervalChallenge;

  const challenge = new IntervalChallenge({
    {{-- clef: "treble", --}}
    maxUserNotes: 1,
    numOfChallenges: 2,
    sound: false,
    basePoints: 1,
    firstTryBonus: 3,
    accidentalWeights: {
      natural: 10,
      sharp: 5,
      flat: 5
    }
  });

  challenge.start();
  window.challenge = challenge;

  $('input[name="sound"]').prop("checked", challenge.isSoundEnabled());
  $('input[name="sound"]').off("change.intervalChallengeSound").on("change.intervalChallengeSound", function () {
    challenge.setSoundEnabled(this.checked);
  });

})(jQuery);
</script>
@endpush
