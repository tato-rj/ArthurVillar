@extends('layouts.app', ['noMenu' => true])

@push('header')
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Music&display=swap" rel="stylesheet">

<style>
  /* animate.css (keep global but scoped duration) */
  .animate__animated { --animate-duration: .8s; }

  :root{
    --staff-width: 300px;
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

    --clef-width: 140px;
    --clef-height: calc(var(--staff-line-gap) * 6);
    --clef-top: 54px;
    --clef-left-nudge: 21px;

    --note-overlap-gap: -9px;

    --ink: #111;
    --ghost: #90D5FF;
    --ghost-opacity: .5;
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
  .music-font__doubleflat::before{ content: "\1D12B"; }
  .music-font__doublesharp::before{ content: "\1D12A"; }

  #staff{
    position: relative;
    width: var(--staff-width);
    height: var(--staff-height);
    border-radius: var(--staff-radius);
    background: #fff;
    overflow: hidden;
    user-select: none;
    touch-action: none;
  }

  #staff .note{ touch-action: none; }

  #interval{
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
  }

  /* Note + ledger ghost */
  .note.preview,
  .ledger.preview,
  .note.dragging,
  .ledger.dragging{
    background: var(--ghost);
    opacity: var(--ghost-opacity);
    pointer-events: none;
  }

  #feedback-success{
    font-size: 2.5rem;
    top: 30%;
    display: none;
  }

  #accidentals > div{ margin-top: -24px; }

  #accidentals .accidental-tool{
    cursor: grab;
    user-select: none;
    touch-action: none;
  }
  #accidentals .accidental-tool:active{ cursor: grabbing; }

  #accidentals .accidental-tool.dragging,
  .ui-draggable-dragging.accidental-tool{
    color: var(--ghost);
    opacity: var(--ghost-opacity);
  }

  /* Attached accidental */
  .accidental{
    position: absolute;
    line-height: 1;
    pointer-events: none;
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
</style>
@endpush

@section('content')
<section class="d-center py-5">
  <div class="text-center">
    @include('theory.components.counter')
    @include('theory.components.level')

    <div class="position-relative">
      @include('theory.components.accidentals')
      @include('theory.components.feedback')
    </div>

    <div id="staff"></div>

    <div id="interval" class="mb-4 text-blue">M3</div>

    @include('theory.components.controls')
  </div>
</section>
@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/tone@14.8.49/build/Tone.js"></script>
<script type="text/javascript" src="{{ asset('js/vendor/jquery-ui.min.js') }}"></script>

<script>
(function ($) {

  // =========================================================
  // Staff
  // =========================================================
  function Staff($el, opts) {
    this.$el = $el;

    // ---- Read CSS vars
    var css = getComputedStyle($el[0]);
    function px(v, fallback) {
      var n = parseFloat(v);
      return Number.isFinite(n) ? n : fallback;
    }

    // ---- Options
    this.opts = $.extend({
      paddingX: px(css.getPropertyValue('--staff-padding-x'), 20),
      lineGap: px(css.getPropertyValue('--staff-line-gap'), 16),
      lineThickness: px(css.getPropertyValue('--staff-line-thickness'), 3),
      noteOverlapGap: px(css.getPropertyValue('--note-overlap-gap'), -6),

      noteIdPrefix: 'n',
      clefUrl: "{{ asset('images/clefs/treble-clef.svg') }}",
      maxLedgerAbove: 2,
      maxLedgerBelow: 2,

      accidentalTopPx: 20,
      accidentalGapPx: 16
    }, opts || {});

    this.opts.stepSize = this.opts.lineGap / 2;

    this.$el.css('position', 'relative');
    this._idCounter = 1;

    // ---- Drag state (notes)
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

    // ---- Preview state (click-create)
    this._previewState = { active: false, step: null };
    this._preview = null;
    this._previewStep = null;

    // ---- Audio state
    this._audioReady = false;
    this._synth = null;

    // ---- Accidental drag sound state
    this._accDragSound = { noteId: null, accCls: null, step: null };

    this._computeLayout();
    this._drawLines();
  }

  // =========================================================
  // Layout
  // =========================================================
  Staff.prototype._computeLayout = function () {
    var h = this.$el.height();
    var staffHeight = this.opts.lineGap * 4;
    var topLineY = Math.round((h - staffHeight) / 2);
    this.opts.bottomLineY = topLineY + staffHeight;
  };

  Staff.prototype._drawLines = function () {
    this.$el.empty();

    for (var i = 0; i < 5; i++) {
      var y = this.opts.bottomLineY - (4 - i) * this.opts.lineGap;
      $('<div class="staff-line"></div>').css({ top: y + 'px' }).appendTo(this.$el);
    }

    this._drawClef();
  };

  Staff.prototype._drawClef = function () {
    if (!this.opts.clefUrl) return;

    $('<img class="treble-clef" alt="">')
      .attr('src', this.opts.clefUrl)
      .appendTo(this.$el);
  };

  Staff.prototype.relayout = function () {
    this._computeLayout();
    this._drawLines();
    this._resolveNoteOverlaps();
    this._repositionAllAccidentals();
  };

  // =========================================================
  // Coordinates + range
  // =========================================================
  Staff.prototype.centerX = function () { return this.$el.width() / 2; };
  Staff.prototype.stepToY  = function (step) { return this.opts.bottomLineY - (step * this.opts.stepSize); };
  Staff.prototype.yToStep  = function (y)    { return Math.round((this.opts.bottomLineY - y) / this.opts.stepSize); };
  Staff.prototype._pageYToLocalY = function (pageY) { return pageY - this.$el.offset().top; };

  Staff.prototype.minStepAllowed = function () { return 0 - (this.opts.maxLedgerBelow * 2); };
  Staff.prototype.maxStepAllowed = function () { return 8 + (this.opts.maxLedgerAbove * 2); };
  Staff.prototype._isStepAllowed = function (step) {
    return step >= this.minStepAllowed() && step <= this.maxStepAllowed();
  };

  // =========================================================
  // Ledgers
  // =========================================================
  Staff.prototype._ledgerStepsFor = function (step) {
    var ledgers = [];
    var topMost = 8 + (this.opts.maxLedgerAbove * 2);
    var bottomMost = 0 - (this.opts.maxLedgerBelow * 2);

    if (step > 8) {
      var capped = Math.min(step, topMost);
      for (var s = 10; s <= capped; s += 2) ledgers.push(s);
    } else if (step < 0) {
      var capped2 = Math.max(step, bottomMost);
      for (var s2 = -2; s2 >= capped2; s2 -= 2) ledgers.push(s2);
    }
    return ledgers;
  };

  Staff.prototype._renderLedgers = function (id, x, step) {
    this.$el.find('.ledger[data-for-note-id="' + id + '"]').remove();

    var isDragging = this.$el.find('.note[data-note-id="' + id + '"]').hasClass('dragging');
    var steps = this._ledgerStepsFor(step);

    for (var i = 0; i < steps.length; i++) {
      var $l = $('<div class="ledger"></div>')
        .attr('data-for-note-id', id)
        .css({ left: x + 'px', top: this.stepToY(steps[i]) + 'px' });

      if (isDragging) $l.addClass('dragging');
      $l.appendTo(this.$el);
    }
  };

  Staff.prototype._previewLedgersClear = function () {
    this.$el.find('.ledger.preview').remove();
  };

  Staff.prototype._previewLedgersSet = function (step) {
    this._previewLedgersClear();

    var x = this.centerX();
    var steps = this._ledgerStepsFor(step);

    for (var i = 0; i < steps.length; i++) {
      $('<div class="ledger preview"></div>')
        .css({ left: x + 'px', top: this.stepToY(steps[i]) + 'px' })
        .appendTo(this.$el);
    }
  };

  // =========================================================
  // Notes lookup
  // =========================================================
  Staff.prototype._stepOfNoteEl = function (el) {
    var topStr = el.style.top || window.getComputedStyle(el).top;
    return this.yToStep(parseFloat(topStr));
  };

  Staff.prototype._isStepOccupied = function (step, excludeId) {
    var nodes = this.$el.find('.note').toArray();
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (!el) continue;

      var id = el.getAttribute('data-note-id');
      if (excludeId && id === excludeId) continue;

      if (this._stepOfNoteEl(el) === step) return true;
    }
    return false;
  };

  Staff.prototype._getNoteIdAtStep = function (step, excludeId) {
    var nodes = this.$el.find('.note').toArray();
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (!el) continue;

      var id = el.getAttribute('data-note-id');
      if (excludeId && id === excludeId) continue;

      if (this._stepOfNoteEl(el) === step) return id;
    }
    return null;
  };

  Staff.prototype._isCenteredX = function (noteId) {
    var $n = this.$el.find('.note[data-note-id="' + noteId + '"]');
    if (!$n.length) return true;
    return Math.abs(parseFloat($n.css('left')) - this.centerX()) <= 0.5;
  };

  // =========================================================
  // Accidentals
  // =========================================================
  Staff.prototype._removeAccidentalForNote = function (noteId) {
    this.$el.find('.accidental[data-for-note-id="' + noteId + '"]').remove();
  };

  Staff.prototype._positionAccidentalForNote = function (noteId) {
    var $note = this.$el.find('.note[data-note-id="' + noteId + '"]');
    var $acc  = this.$el.find('.accidental[data-for-note-id="' + noteId + '"]');
    if (!$note.length || !$acc.length) return;

    var noteLeft = parseFloat($note.css('left'));
    var noteTop  = parseFloat($note.css('top'));

    $acc.css({
      left: (noteLeft - this.opts.accidentalGapPx) + 'px',
      top:  (noteTop - this.opts.accidentalTopPx) + 'px'
    });
  };

  Staff.prototype._repositionAllAccidentals = function () {
    var self = this;
    this.$el.find('.accidental').each(function () {
      var id = this.getAttribute('data-for-note-id');
      if (id) self._positionAccidentalForNote(id);
    });
  };

  Staff.prototype.attachAccidentalToNote = function (noteId, accidentalClass) {
    if (!noteId) return;

    this._removeAccidentalForNote(noteId);

    var $acc = $('<div class="accidental music-font"></div>')
      .addClass(accidentalClass)
      .attr('data-for-note-id', noteId);

    this.$el.append($acc);
    this._positionAccidentalForNote(noteId);
  };

  Staff.prototype.enableAccidentalDropOnStaff = function () {
    var self = this;

    function classToAccidental(ui) {
      var classes = [
        'music-font__sharp',
        'music-font__doublesharp',
        'music-font__flat',
        'music-font__doubleflat',
        'music-font__natural'
      ];

      for (var i = 0; i < classes.length; i++) {
        if (ui.draggable.hasClass(classes[i])) return classes[i];
      }
      return null;
    }

    this.$el.droppable({
      accept: '.accidental-tool',
      tolerance: 'pointer',
      drop: function (event, ui) {
        var pageY = event.pageY;
        if (!Number.isFinite(pageY) && event.originalEvent) pageY = event.originalEvent.pageY;

        var localY = self._pageYToLocalY(pageY);
        var step = self.yToStep(localY);

        if (!self._isStepAllowed(step)) return;

        var noteId = self._getNoteIdAtStep(step, null);
        if (!noteId) return;

        var accClass = classToAccidental(ui);
        if (!accClass) return;

        self.attachAccidentalToNote(noteId, accClass);
      }
    });
  };

  // =========================================================
  // Notes lifecycle
  // =========================================================
  Staff.prototype.setNoteFixed = function (noteId, fixed) {
    var on = !!fixed;
    this.$el.find('.note[data-note-id="' + noteId + '"]').toggleClass('fixed', on);
    this.$el.find('.ledger[data-for-note-id="' + noteId + '"]').toggleClass('fixed', on);
    this.$el.find('.accidental[data-for-note-id="' + noteId + '"]').toggleClass('fixed', on);
  };

  Staff.prototype.addFixedNote = function (cfg) {
    cfg = cfg || {};
    cfg.className = (cfg.className ? (cfg.className + ' ') : '') + 'fixed';

    var id = this.addNote(cfg);
    if (!id) return null;

    if (cfg.accidentalClass) this.attachAccidentalToNote(id, cfg.accidentalClass);
    this.setNoteFixed(id, true);
    return id;
  };

  Staff.prototype.clearNotes = function () {
    this.$el.find('.note, .ledger, .accidental').remove();
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
    var step = Number.isFinite(cfg.step) ? Number(cfg.step) : null;

    if (Number.isFinite(step) && !this._isStepAllowed(step)) return null;
    if (Number.isFinite(step) && this._isStepOccupied(step, null)) return null;

    var y = Number.isFinite(cfg.y) ? Number(cfg.y)
          : Number.isFinite(step) ? this.stepToY(step)
          : null;
    if (!Number.isFinite(y)) throw new Error('addNote: provide either y or step');

    var x  = Number.isFinite(cfg.x) ? Number(cfg.x) : this.centerX();
    var id = cfg.id || (this.opts.noteIdPrefix + (this._idCounter++));

    var $note = $('<div class="note"></div>')
      .attr('data-note-id', id)
      .css({ left: x + 'px', top: y + 'px' });

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
    var $note = this.$el.find('.note[data-note-id="' + id + '"]');
    if (!$note.length) return;

    var x = Number.isFinite(pos.x) ? Number(pos.x) : null;
    var step = Number.isFinite(pos.step) ? Number(pos.step) : null;
    if (Number.isFinite(step) && !this._isStepAllowed(step)) return;

    var y = Number.isFinite(pos.y) ? Number(pos.y)
          : Number.isFinite(step) ? this.stepToY(step)
          : null;

    if (Number.isFinite(x)) $note.css('left', x + 'px');
    if (Number.isFinite(y)) $note.css('top', y + 'px');

    if (Number.isFinite(step)) {
      var noteX = Number.isFinite(x) ? x : parseFloat($note.css('left'));
      this._renderLedgers(id, noteX, step);
    }

    this._positionAccidentalForNote(id);
  };

  // =========================================================
  // Preview
  // =========================================================
  Staff.prototype._previewSet = function (step) {
    if (!this._preview) this._preview = $('<div class="note preview"></div>').appendTo(this.$el);
    this._preview.css({ left: this.centerX() + 'px', top: this.stepToY(step) + 'px' });
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

  // =========================================================
  // Overlap resolution (adjacent steps only)
  // =========================================================
  Staff.prototype._rectsOverlap = function (a, b) {
    return !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
  };

  Staff.prototype._resolveNoteOverlaps = function () {
    var self = this;
    var GAP = this.opts.noteOverlapGap;
    var MAX_ITERS = 20;

    function notesArray() {
      return self.$el.find('.note').toArray().map(function (el) {
        var $el = $(el);
        return { el: el, $el: $el, step: self.yToStep(parseFloat($el.css('top'))) };
      });
    }

    function noteByStep(list) {
      var map = {};
      for (var i = 0; i < list.length; i++) {
        var s = list[i].step;
        (map[s] || (map[s] = [])).push(list[i]);
      }
      return map;
    }

    function centerAll(list) {
      var cx = self.centerX();
      for (var i = 0; i < list.length; i++) {
        var id = list[i].$el.attr('data-note-id');
        self.moveNote(id, { x: cx, step: list[i].step });
        list[i]._shifted = false;
      }
    }

    function shiftUpperToTouch(upper, stepMap) {
      var upperRect = upper.el.getBoundingClientRect();
      var lowerEls = stepMap[upper.step - 1];
      if (!lowerEls || !lowerEls.length) return false;

      var lowerRect = lowerEls[0].el.getBoundingClientRect();
      if (!self._rectsOverlap(upperRect, lowerRect)) return false;

      var dx = (lowerRect.right - upperRect.left) + GAP;
      var id = upper.$el.attr('data-note-id');
      self.moveNote(id, { x: parseFloat(upper.$el.css('left')) + dx, step: upper.step });
      return true;
    }

    for (var iter = 0; iter < MAX_ITERS; iter++) {
      var list = notesArray();
      if (!list.length) return;

      centerAll(list);

      var stepMap = noteByStep(list);
      var steps = Object.keys(stepMap)
        .map(function (s) { return parseInt(s, 10); })
        .sort(function (a, b) { return a - b; });

      var changed = false;

      for (var i = 0; i < steps.length; i++) {
        var s = steps[i];
        if (!stepMap[s] || !stepMap[s + 1]) continue;

        var lower = stepMap[s][0];
        var upper = stepMap[s + 1][0];

        if (!lower._shifted) {
          if (shiftUpperToTouch(upper, stepMap)) changed = true;
          upper._shifted = true;
        }
      }

      if (!changed) return;
    }
  };

  // =========================================================
  // Drag visuals + adjacency X while dragging
  // =========================================================
  Staff.prototype._setDraggingVisual = function (noteId, on) {
    var $note = this.$el.find('.note[data-note-id="' + noteId + '"]');
    var $ledgers = this.$el.find('.ledger[data-for-note-id="' + noteId + '"]');
    var $acc = this.$el.find('.accidental[data-for-note-id="' + noteId + '"]');

    $note.toggleClass('dragging', !!on);
    $ledgers.toggleClass('dragging', !!on);
    $acc.toggleClass('dragging', !!on);
  };

  Staff.prototype._applyDraggedAdjacencyX = function (dragId) {
    var $drag = this.$el.find('.note[data-note-id="' + dragId + '"]');
    if (!$drag.length) return;

    var dragStep = this.yToStep(parseFloat($drag.css('top')));
    var center = this.centerX();
    var gap = this.opts.noteOverlapGap;

    this.moveNote(dragId, { x: center });

    var lowerId = this._getNoteIdAtStep(dragStep - 1, dragId);
    if (!lowerId) return;
    if (!this._isCenteredX(lowerId)) return;

    var $lower = this.$el.find('.note[data-note-id="' + lowerId + '"]');
    if (!$lower.length) return;

    var upperRect = $drag[0].getBoundingClientRect();
    var lowerRect = $lower[0].getBoundingClientRect();
    if (!this._rectsOverlap(upperRect, lowerRect)) return;

    var dx = (lowerRect.right - upperRect.left) + gap;
    this.moveNote(dragId, { x: center + dx });
  };

  // =========================================================
  // Sound (Tone.js)
  // =========================================================
  Staff.prototype._ensureAudio = async function () {
    if (this._audioReady) return;
    if (!window.Tone) return;

    await Tone.start();

    this._synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
      envelope: { attack: 0.02, decay: 0.2, sustain: 0.8, release: 1.2 }
    }).toDestination();

    this._audioReady = true;
  };

  // Treble staff mapping (bottom line = E4)
  Staff.prototype._stepToMidi = function (step) {
    var diatonic = [0, 2, 4, 5, 7, 9, 11]; // C D E F G A B
    var baseIndex = 2 + step;              // E is index 2
    var octaveShift = Math.floor(baseIndex / 7);
    var noteIndex = (baseIndex % 7 + 7) % 7;
    return 60 + diatonic[noteIndex] + (octaveShift * 12);
  };

  Staff.prototype._accidentalClassToOffset = function (cls) {
    if (!cls) return 0;
    if (cls.indexOf('music-font__doublesharp') >= 0) return +2;
    if (cls.indexOf('music-font__sharp') >= 0)       return +1;
    if (cls.indexOf('music-font__doubleflat') >= 0)  return -2;
    if (cls.indexOf('music-font__flat') >= 0)        return -1;
    if (cls.indexOf('music-font__natural') >= 0)     return 0;
    return 0;
  };

  Staff.prototype._getAttachedAccidentalClass = function (noteId) {
    var $acc = this.$el.find('.accidental[data-for-note-id="' + noteId + '"]');
    if (!$acc.length) return null;

    var classes = [
      'music-font__sharp',
      'music-font__doublesharp',
      'music-font__flat',
      'music-font__doubleflat',
      'music-font__natural'
    ];
    for (var i = 0; i < classes.length; i++) {
      if ($acc.hasClass(classes[i])) return classes[i];
    }
    return null;
  };

  Staff.prototype._playStep = async function (step, accidentalOffset) {
    if (!Number.isFinite(step)) return;

    await this._ensureAudio();
    if (!this._synth) return;

    var offset = accidentalOffset || 0;
    var midi = this._stepToMidi(step) + offset;

    // Avoid spamming console on every drag if you don't want it:
    // console.log("Playing:", Tone.Frequency(midi, "midi").toNote());

    var freq = Tone.Frequency(midi, "midi");
    this._synth.triggerAttackRelease(freq, 0.5);
  };

  // =========================================================
  // Interaction (Pointer Events)
  // =========================================================
  Staff.prototype.enableGhostClickCreate = function () {
    var self = this;

    this.$el.off('.previewCreate');
    $(window).off('blur.previewCreate');

    function getPageY(e) {
      var oe = e.originalEvent || e;
      if (oe.touches && oe.touches.length) return oe.touches[0].pageY;
      if (oe.changedTouches && oe.changedTouches.length) return oe.changedTouches[0].pageY;
      return oe.pageY;
    }

    this.$el.on('pointerdown.previewCreate', function (e) {
      if ($(e.target).closest('.note').length) return;
      e.preventDefault();

      var initialStep = self.yToStep(self._pageYToLocalY(getPageY(e)));
      if (!self._isStepAllowed(initialStep)) return;

      self._previewState.active = true;
      self._previewState.step = initialStep;
      self._previewSet(initialStep);

      self._ensureAudio();

      this.setPointerCapture && this.setPointerCapture(e.originalEvent.pointerId);

      self.$el.off('pointermove.previewCreate').on('pointermove.previewCreate', function (ev) {
        if (!self._previewState.active) return;

        var s = self.yToStep(self._pageYToLocalY(getPageY(ev)));
        if (!self._isStepAllowed(s)) return;

        self._previewState.step = s;
        self._previewSet(s);
      });

      self.$el.off('pointerup.previewCreate pointercancel.previewCreate')
        .on('pointerup.previewCreate pointercancel.previewCreate', function () {
          if (!self._previewState.active) return;

          self._previewState.active = false;
          var finalStep = self._previewState.step;

          self._previewClear();
          self.$el.off('pointermove.previewCreate pointerup.previewCreate pointercancel.previewCreate');

          if (!self._isStepAllowed(finalStep)) return;
          if (self._isStepOccupied(finalStep, null)) return;

          self.addNote({ step: finalStep });
          self._playStep(finalStep, 0);
        });
    });

    $(window).on('blur.previewCreate', function () {
      if (!self._previewState.active) return;
      self._previewState.active = false;
      self._previewClear();
      self.$el.off('pointermove.previewCreate pointerup.previewCreate pointercancel.previewCreate');
    });
  };

  Staff.prototype.enableNoteDragAndClickDelete = function () {
    var self = this;
    var d = this._drag;

    this.$el.off('.noteDrag');

    function getPageY(e) {
      var oe = e.originalEvent || e;
      if (oe.touches && oe.touches.length) return oe.touches[0].pageY;
      if (oe.changedTouches && oe.changedTouches.length) return oe.changedTouches[0].pageY;
      return oe.pageY;
    }

    function startDragFromNoteEl(noteEl, e) {
      e.preventDefault();
      if ($(noteEl).hasClass('fixed')) return;

      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      else e.stopPropagation();

      var pointerId = e.originalEvent.pointerId;
      var $note = $(noteEl);

      d.isDragging = false;
      d.movedPx = 0;
      d.startPageY = getPageY(e);
      d.noteId = $note.attr('data-note-id');

      d.startStep = self.yToStep(parseFloat($note.css('top')));
      d.lastTargetStep = d.startStep;
      d.lastSoundStep = d.startStep;
      d.dropOnOccupied = false;
      d.outOfRange = false;

      self._setDraggingVisual(d.noteId, true);
      self._ensureAudio();

      var capEl = (e.currentTarget && e.currentTarget.setPointerCapture) ? e.currentTarget : null;
      if (capEl && pointerId != null) capEl.setPointerCapture(pointerId);

      self.$el.off('pointermove.noteDrag').on('pointermove.noteDrag', function (ev) {
        if ((ev.originalEvent.pointerId || pointerId) !== pointerId) return;

        var py = getPageY(ev);
        var dy = py - d.startPageY;
        d.movedPx = Math.max(d.movedPx, Math.abs(dy));

        if (!d.isDragging && d.movedPx >= d.thresholdPx) d.isDragging = true;
        if (!d.isDragging) return;

        var targetStep = self.yToStep(self._pageYToLocalY(py));

        if (!self._isStepAllowed(targetStep)) {
          d.outOfRange = true;
          return;
        }
        d.outOfRange = false;

        d.lastTargetStep = targetStep;

        self.moveNote(d.noteId, { step: targetStep });
        d.dropOnOccupied = self._isStepOccupied(targetStep, d.noteId);
        self._applyDraggedAdjacencyX(d.noteId);

        if (targetStep !== d.lastSoundStep) {
          d.lastSoundStep = targetStep;

          var accCls = self._getAttachedAccidentalClass(d.noteId);
          var accOff = self._accidentalClassToOffset(accCls);

          self._playStep(targetStep, accOff);
        }
      });

      self.$el.off('pointerup.noteDrag pointercancel.noteDrag')
        .on('pointerup.noteDrag pointercancel.noteDrag', function (ev2) {
          if ((ev2.originalEvent.pointerId || pointerId) !== pointerId) return;

          self.$el.off('pointermove.noteDrag pointerup.noteDrag pointercancel.noteDrag');

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

    this.$el.on('pointerdown.noteDrag', '.note', function (e) {
      startDragFromNoteEl(this, e);
    });

    this.$el.on('pointerdown.noteDrag', function (e) {
      if ($(e.target).closest('.note').length) return;

      var step = self.yToStep(self._pageYToLocalY(getPageY(e)));
      var idAtStep = self._getNoteIdAtStep(step, null);
      if (!idAtStep) return;

      var noteEl = self.$el.find('.note[data-note-id="' + idAtStep + '"]')[0];
      if (!noteEl) return;

      startDragFromNoteEl(noteEl, e);
    });

    this.$el.on('click.noteDrag', '.note', function (e) {
      if (d.swallowClick) {
        e.preventDefault();
        e.stopPropagation();
        d.swallowClick = false;
        return;
      }
      self.removeNote($(this).attr('data-note-id'));
    });
  };

  // =========================================================
  // Accidentals (drag + sound preview)
  // =========================================================
  Staff.prototype.enableAccidentalDrag = function ($toolEls) {
    var self = this;
    $toolEls.addClass('accidental-tool');

    function classToAccidentalByEl($el) {
      var classes = [
        'music-font__sharp',
        'music-font__doublesharp',
        'music-font__flat',
        'music-font__doubleflat',
        'music-font__natural'
      ];
      for (var i = 0; i < classes.length; i++) {
        if ($el.hasClass(classes[i])) return classes[i];
      }
      return null;
    }

    $toolEls.draggable({
      helper: 'clone',
      appendTo: 'body',
      zIndex: 9999,
      revert: 'invalid',
      scroll: false,

      start: function (event, ui) {
        ui.helper.addClass('dragging accidental-tool');
        self._ensureAudio();

        self._accDragSound.noteId = null;
        self._accDragSound.accCls = classToAccidentalByEl($(this));
        self._accDragSound.step = null;
      },

      drag: function (event) {
        var accCls = self._accDragSound.accCls;
        if (!accCls) return;

        var pageX = event.pageX, pageY = event.pageY;
        if (!Number.isFinite(pageY) && event.originalEvent) pageY = event.originalEvent.pageY;
        if (!Number.isFinite(pageX) && event.originalEvent) pageX = event.originalEvent.pageX;

        var off = self.$el.offset();
        var x = pageX - off.left;
        var y = pageY - off.top;

        if (x < 0 || y < 0 || x > self.$el.width() || y > self.$el.height()) {
          self._accDragSound.noteId = null;
          self._accDragSound.step = null;
          return;
        }

        var step = self.yToStep(y);
        if (!self._isStepAllowed(step)) return;

        var noteId = self._getNoteIdAtStep(step, null);
        if (!noteId) return;

        if (noteId === self._accDragSound.noteId && step === self._accDragSound.step) return;

        self._accDragSound.noteId = noteId;
        self._accDragSound.step = step;

        var accOff = self._accidentalClassToOffset(accCls);
        self._playStep(step, accOff);
      },

      stop: function (event, ui) {
        ui.helper.removeClass('dragging');
        self._accDragSound.noteId = null;
        self._accDragSound.step = null;
      }
    });
  };

  window.Staff = Staff;
})(jQuery);

// =========================================================
// App glue
// =========================================================

// --- small utility: safe log (your code called log())
function log() { if (window.console && console.log) console.log.apply(console, arguments); }

// --- cache selectors once
const $staffEl = $('#staff');
const $accidentals = $('#accidentals');
const $feedback = $('#feedback-success');
const $interval = $('#interval');
const $check = $('#check');
const $checkWrap = $check.parent();
const $progressBar = $('#progress-bar');

const staff = new Staff($staffEl);
staff.enableNoteDragAndClickDelete();
staff.enableGhostClickCreate();

staff.enableAccidentalDrag($('#accidentals .music-font__sharp, #accidentals .music-font__doublesharp, #accidentals .music-font__flat, #accidentals .music-font__doubleflat, #accidentals .music-font__natural'));
staff.enableAccidentalDropOnStaff();

$('#clear').on('click', function () {
  staff.clearNotes();
});

// =========================================================
// Challenge
// =========================================================
const INTERVALS = ['m2', 'M2', 'm3', 'M3', 'P4', 'A4', 'd5', 'P5', 'm6', 'M6', 'm7', 'M7'];
const HARDINTERVALS = ['A4', 'd5', 'm6', 'm7', 'M7'];

function _randomInt(min, maxInclusive) {
  return Math.floor(Math.random() * (maxInclusive - min + 1)) + min;
}

function _createNewIntervalChallenge() {
  // steps are discrete in your staff, so choose discrete steps
  const randomStep = _randomInt(0, 7);
  const randomInterval = INTERVALS[Math.floor(Math.random() * INTERVALS.length)];
  let $level = $("#level");

  staff.clearNotes();
  $accidentals.removeClass('invisible');
  $feedback.hide();

  $interval.text(randomInterval);

  $level.addClass('invisible');

  if (HARDINTERVALS.includes(randomInterval))
    $level.removeClass('invisible');

  staff.addFixedNote({
    step: randomStep,
    accidentalClass: null
  });
}

// =========================================================
// Interval helpers
// =========================================================
function _notesOnStaffOrdered() {
  const $notes = $staffEl.find('.note').not('.preview');
  const notes = $notes.toArray().map(el => {
    const id = el.getAttribute('data-note-id');
    const step = staff._stepOfNoteEl(el);
    const accCls = staff._getAttachedAccidentalClass(id);
    const accOff = staff._accidentalClassToOffset(accCls);
    return { id, step, accOff };
  });

  notes.sort((a, b) => a.step - b.step);
  return notes;
}

function _diatonicNumberFromSteps(stepLow, stepHigh) {
  return Math.abs(stepHigh - stepLow) + 1;
}

function _qualityFor(simpleNum, semitones) {
  const isPerfectClass = (simpleNum === 1 || simpleNum === 4 || simpleNum === 5 || simpleNum === 8);
  const expectedMajorOrPerfect = { 1:0, 2:2, 3:4, 4:5, 5:7, 6:9, 7:11, 8:12 }[simpleNum];
  const delta = semitones - expectedMajorOrPerfect;

  if (isPerfectClass) {
    if (delta === 0) return 'P';
    if (delta === 1) return 'A';
    if (delta === -1) return 'd';
    if (delta > 1) return 'A'.repeat(delta);
    if (delta < -1) return 'd'.repeat(-delta);
  } else {
    if (delta === 0) return 'M';
    if (delta === -1) return 'm';
    if (delta === 1) return 'A';
    if (delta === -2) return 'd';
    if (delta > 1) return 'A'.repeat(delta);
    if (delta < -2) return 'd'.repeat((-delta) - 1);
  }
  return '?';
}

function _intervalNameBetween(noteA, noteB) {
  const stepLow = noteA.step;
  const stepHigh = noteB.step;

  const midiLow = staff._stepToMidi(stepLow) + (noteA.accOff || 0);
  const midiHigh = staff._stepToMidi(stepHigh) + (noteB.accOff || 0);

  const semitones = Math.abs(midiHigh - midiLow);
  const diatonicNum = _diatonicNumberFromSteps(stepLow, stepHigh);

  const simpleNum = ((diatonicNum - 1) % 7) + 1;
  const octaves = Math.floor((diatonicNum - 1) / 7);
  const semitonesReduced = semitones - (12 * octaves);

  const q = _qualityFor(simpleNum, semitonesReduced);
  return q + diatonicNum;
}

// =========================================================
// UI animations / progress
// =========================================================
function _successAnimation() {
  // restart animation cleanly
  $feedback.removeClass('animate__animated animate__tada');
  void $feedback[0].offsetWidth;
  $feedback.addClass('animate__animated animate__tada');

  $accidentals.addClass('invisible');
  $feedback.fadeIn('fast');
}

function _updateProgressBar(steps = 4) {
  const increment = 100 / steps;
  let current = parseFloat($progressBar.data('progress')) || 0;

  current = Math.min(100, current + increment);
  $progressBar.data('progress', current);
  $progressBar.css({ width: current + '%' });

  return current;
}

function _failAnimation() {
  $interval.removeClass('text-blue').addClass('text-red');

  $checkWrap.removeClass('animate__animated animate__shakeX');
  void $checkWrap[0].offsetWidth;
  $checkWrap.addClass('animate__animated animate__shakeX');

  // ensure only one handler attached
  $checkWrap.off('animationend._fail webkitAnimationEnd._fail oAnimationEnd._fail MSAnimationEnd._fail')
    .one('animationend._fail webkitAnimationEnd._fail oAnimationEnd._fail MSAnimationEnd._fail', function () {
      $checkWrap.removeClass('animate__animated animate__shakeX');
      $interval.removeClass('text-red').addClass('text-blue');
      $check.enable();
    });
}

// =========================================================
// Button handler
// =========================================================
$check.on('click', function () {
  const notes = _notesOnStaffOrdered();

  $check.disable();

  if (notes.length !== 2) {
    _failAnimation();
    this.blur();
    return;
  }

  const name = _intervalNameBetween(notes[0], notes[1]);
  log(name);

  if (name === $interval.text()) {
    _successAnimation();

    if (_updateProgressBar() >= 100) {
      setTimeout(function () {
        alert('Done!');
        $check.enable();
      }, 2000);
    } else {
      setTimeout(function () {
        _createNewIntervalChallenge();
        $check.enable();
      }, 2000);
    }
  } else {
    _failAnimation();
  }
});

_createNewIntervalChallenge();
</script>
@endpush
