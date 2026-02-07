@extends('layouts.app', ['noMenu' => true])

@push('header')
<style>
    /* Staff container */
    #staff {
      position: relative;
      height: 160px;
      width: 300px;
      border-radius: 1rem;
      background: #fff;
      overflow: hidden;
      user-select: none;
    }

    /* 5 staff lines */
    .staff-line {
      position: absolute;
      left: 1.25rem;
      right: 1.25rem;
      height: 2px;
      background: #111;
      opacity: .9;
      border-radius: 20px;
    }

    /* Notehead (simple filled ellipse) */
    .note {
      position: absolute;
      width: 16px;
      height: 13px;
      border-radius: 50%;
      background: #111;
      transform: rotate(-18deg);
      margin-left: -8px; /* center on x */
      margin-top: -5px;  /* center on y */
      {{-- cursor: pointer; --}}
    }

    /* Ledger line */
    .ledger {
      position: absolute;
      width: 22px;
      height: 3px;
      background: #111;
      opacity: .9;
      margin-left: -11px; /* center on x */
      margin-top: 0px;
      pointer-events: none;
    }

/* Ghost / preview */
.note.preview { background: #90D5FF; opacity: .5; pointer-events: none; }
.ledger.preview { background: #90D5FF; opacity: .5; pointer-events: none; }

/* While dragging an existing note: make note + its ledgers ghosty */
.note.dragging { background: #90D5FF; opacity: .5; }
.ledger.dragging { background: #90D5FF; opacity: .5; }

</style>
@endpush

@section('content')
{{-- <section class="container">
	<div class="row">
		<div class="col-lg-6 col-md-8 col-11 mx-auto">
			
		</div>
	</div>
</section> --}}

<div class="h-100vh w-100 d-center">
	<div class="text-center">
		<div id="staff"></div>
		<div class="btn-floating">
			<button id="clear" class="btn btn-primary">Reset</button>
		</div>
	</div>
</div>
@endsection

@push('scripts')
<script>
(function ($) {

  // ============================================================
  // Staff
  // ============================================================
  function Staff($el, opts) {
    this.$el = $el;

    this.opts = $.extend({
      paddingX: 20,
      lineGap: 16,
      lineThickness: 3,
      noteIdPrefix: 'n',

      clefUrl: "{{asset('images/clefs/treble-clef.svg')}}",
      clefWidth: 100,
      clefTop: 34,

      maxLedgerAbove: 2,
      maxLedgerBelow: 2,
      noteOverlapGap: -6
    }, opts || {});

    this.opts.stepSize = this.opts.lineGap / 2;
    this.$el.css('position', 'relative');

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
      dropOnOccupied: false,
      outOfRange: false
    };

    this._previewState = { active: false, step: null };
    this._preview = null;
    this._previewStep = null;

    this._computeLayout();
    this._drawLines();
  }

  // ============================================================
  // Layout + drawing
  // ============================================================
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
      $('<div class="staff-line"></div>')
        .css({
          top: y + 'px',
          left: this.opts.paddingX + 'px',
          right: this.opts.paddingX + 'px',
          height: this.opts.lineThickness + 'px'
        })
        .appendTo(this.$el);
    }

    this._drawClef();
  };

  Staff.prototype._drawClef = function () {
    if (!this.opts.clefUrl) return;

    $('<img class="treble-clef" alt="">')
      .attr('src', this.opts.clefUrl)
      .css({
        position: 'absolute',
        left: (this.opts.paddingX - 6) + 'px',
        top: this.opts.clefTop + 'px',
        width: this.opts.clefWidth + 'px',
        height: (this.opts.lineGap * 6) + 'px',
        pointerEvents: 'none',
        userSelect: 'none'
      })
      .appendTo(this.$el);
  };

  Staff.prototype.relayout = function () {
    this._computeLayout();
    this._drawLines();
  };

  // ============================================================
  // Coordinates + range
  // ============================================================
  Staff.prototype.centerX = function () { return this.$el.width() / 2; };
  Staff.prototype.stepToY  = function (step) { return this.opts.bottomLineY - (step * this.opts.stepSize); };
  Staff.prototype.yToStep  = function (y) { return Math.round((this.opts.bottomLineY - y) / this.opts.stepSize); };
  Staff.prototype._pageYToLocalY = function (pageY) { return pageY - this.$el.offset().top; };

  Staff.prototype.minStepAllowed = function () { return 0 - (this.opts.maxLedgerBelow * 2); };
  Staff.prototype.maxStepAllowed = function () { return 8 + (this.opts.maxLedgerAbove * 2); };
  Staff.prototype._isStepAllowed = function (step) { return step >= this.minStepAllowed() && step <= this.maxStepAllowed(); };

  // ============================================================
  // Ledgers
  // ============================================================
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

  // Preview ledgers
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

  // ============================================================
  // Occupancy helpers
  // ============================================================
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

  // ============================================================
  // Notes
  // ============================================================

  Staff.prototype._stepToNoteNameTreble = function (step) {
    // With your mapping: step 2 = second line = G
    // Each step is a diatonic move (line/space)
    var names = ['C','D','E','F','G','A','B'];
    var baseStep = 2;      // second line from bottom
    var baseIndex = 4;     // 'G' in names

    var diatonic = step - baseStep;
    var idx = ((baseIndex + diatonic) % 7 + 7) % 7;
    return names[idx];
  };

  Staff.prototype._logCreatedNote = function (step) {
    console.log('Created note:', this._stepToNoteNameTreble(step));
  };

  Staff.prototype.clearNotes = function () {
    this.$el.find('.note, .ledger').remove();
  };

  Staff.prototype.removeNote = function (id) {
    // IMPORTANT: never create notes here; only remove and re-layout
    this.$el.find('.note[data-note-id="' + id + '"]').remove();
    this.$el.find('.ledger[data-for-note-id="' + id + '"]').remove();
    this._resolveNoteOverlaps();
  };

  Staff.prototype.addNote = function (cfg) {
    cfg = cfg || {};

    var step = Number.isFinite(cfg.step) ? Number(cfg.step) : null;

    // Range clamp: never create outside ledger limit
    if (Number.isFinite(step) && !this._isStepAllowed(step)) return null;

    var y = Number.isFinite(cfg.y) ? Number(cfg.y)
          : Number.isFinite(step) ? this.stepToY(step)
          : null;
    if (!Number.isFinite(y)) throw new Error('addNote: provide either y or step');

    if (Number.isFinite(step) && this._isStepOccupied(step, null)) return null;

    var x = Number.isFinite(cfg.x) ? Number(cfg.x) : this.centerX();
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

    if (Number.isFinite(step)) this._logCreatedNote(step);

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
  };

  // ============================================================
  // Ghost / preview note
  // ============================================================
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

  // ============================================================
  // Overlap resolution (adjacent steps only)
  // ============================================================
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

  // ============================================================
  // Drag visuals + adjacency X while dragging
  // ============================================================
  Staff.prototype._setDraggingVisual = function (noteId, on) {
    var $note = this.$el.find('.note[data-note-id="' + noteId + '"]');
    var $ledgers = this.$el.find('.ledger[data-for-note-id="' + noteId + '"]');
    $note.toggleClass('dragging', !!on);
    $ledgers.toggleClass('dragging', !!on);
  };

  Staff.prototype._applyDraggedAdjacencyX = function (dragId) {
    var $drag = this.$el.find('.note[data-note-id="' + dragId + '"]');
    if (!$drag.length) return;

    var dragStep = this.yToStep(parseFloat($drag.css('top')));
    var center = this.centerX();
    var gap = this.opts.noteOverlapGap;

    // default center
    this.moveNote(dragId, { x: center });

    var lowerId = this._getNoteIdAtStep(dragStep - 1, dragId);
    if (!lowerId) return;

    // alternation: if lower is shifted, keep dragged centered
    if (!this._isCenteredX(lowerId)) return;

    var $lower = this.$el.find('.note[data-note-id="' + lowerId + '"]');
    if (!$lower.length) return;

    var upperRect = $drag[0].getBoundingClientRect();
    var lowerRect = $lower[0].getBoundingClientRect();

    if (!this._rectsOverlap(upperRect, lowerRect)) return;

    var dx = (lowerRect.right - upperRect.left) + gap;
    this.moveNote(dragId, { x: center + dx });
  };

  // ============================================================
  // Interaction
  // ============================================================
  Staff.prototype.enableGhostClickCreate = function () {
    var self = this;

    this.$el.off('.previewCreate');
    $(document).off('.previewCreateDoc');
    $(window).off('blur.previewCreate');

    this.$el.on('mousedown.previewCreate', function (e) {
      if ($(e.target).closest('.note').length) return;
      e.preventDefault();

      self._previewState.active = true;
      var initialStep = self.yToStep(self._pageYToLocalY(e.pageY));
      if (!self._isStepAllowed(initialStep)) return;

      self._previewState.step = initialStep;
      self._previewSet(initialStep);

      $(document).off('.previewCreateDoc');

      $(document).on('mousemove.previewCreateDoc', function (ev) {
        if (!self._previewState.active) return;

        var s = self.yToStep(self._pageYToLocalY(ev.pageY));
        if (!self._isStepAllowed(s)) return;

        self._previewState.step = s;
        self._previewSet(s);
      });

      $(document).on('mouseup.previewCreateDoc', function () {
        if (!self._previewState.active) return;

        $(document).off('.previewCreateDoc');

        var finalStep = self._previewState.step;
        self._previewState.active = false;

        self._previewClear();

        if (!self._isStepAllowed(finalStep)) return;
        if (!self._isStepOccupied(finalStep, null)) self.addNote({ step: finalStep });
      });
    });

    $(window).on('blur.previewCreate', function () {
      if (!self._previewState.active) return;
      self._previewState.active = false;
      self._previewClear();
      $(document).off('.previewCreateDoc');
    });
  };

  Staff.prototype.enableNoteDragAndClickDelete = function () {
    var self = this;
    var d = this._drag;

    this.$el.off('dragstart.noteDrag').on('dragstart.noteDrag', '.note', function (e) { e.preventDefault(); });

    this.$el.off('mousedown.noteDrag').on('mousedown.noteDrag', '.note', function (e) {
      e.preventDefault();
      e.stopPropagation();

      var $note = $(this);

      d.isDragging = false;
      d.movedPx = 0;
      d.startPageY = e.pageY;
      d.noteId = $note.attr('data-note-id');

      d.startStep = self.yToStep(parseFloat($note.css('top')));
      d.lastTargetStep = d.startStep;
      d.dropOnOccupied = false;
      d.outOfRange = false;

      self._setDraggingVisual(d.noteId, true);

      $(document).off('.noteDragDoc');

      $(document).on('mousemove.noteDragDoc', function (ev) {
        var dy = ev.pageY - d.startPageY;
        d.movedPx = Math.max(d.movedPx, Math.abs(dy));

        if (!d.isDragging && d.movedPx >= d.thresholdPx) d.isDragging = true;
        if (!d.isDragging) return;

        var targetStep = self.yToStep(self._pageYToLocalY(ev.pageY));

        // Range limit: ignore motion, but remember out-of-range
        if (!self._isStepAllowed(targetStep)) {
          d.outOfRange = true;
          return;
        }
        d.outOfRange = false;

        d.lastTargetStep = targetStep;

        // move dragged note freely (even onto occupied)
        self.moveNote(d.noteId, { step: targetStep });

        // if occupied (excluding itself), mark it
        d.dropOnOccupied = self._isStepOccupied(targetStep, d.noteId);

        // only adjust dragged note X (do not move others)
        self._applyDraggedAdjacencyX(d.noteId);
      });

      $(document).on('mouseup.noteDragDoc', function () {
        $(document).off('.noteDragDoc');

        d.swallowClick = d.isDragging;

        // stop ghosting
        self._setDraggingVisual(d.noteId, false);

        // If released out of range OR dropped onto occupied step: delete dragged note
        if (d.outOfRange || d.dropOnOccupied) {
          self.removeNote(d.noteId);
        } else {
          self.moveNote(d.noteId, { step: d.lastTargetStep });
          self._logCreatedNote(d.lastTargetStep);
          self._resolveNoteOverlaps();
        }

        d.noteId = null;
        d.isDragging = false;
        d.movedPx = 0;
        d.startStep = null;
        d.lastTargetStep = null;
        d.dropOnOccupied = false;
        d.outOfRange = false;
      });
    });

    this.$el.off('click.noteDelete').on('click.noteDelete', '.note', function (e) {
      // prevent click-delete right after a drag
      if (d.swallowClick) {
        e.preventDefault();
        e.stopPropagation();
        d.swallowClick = false;
        return;
      }
      self.removeNote($(this).attr('data-note-id'));
    });
  };

  window.Staff = Staff;
})(jQuery);

// ============================================================
// Usage
// ============================================================
const staff = new Staff($('#staff'), { lineGap: 16 });

staff.enableNoteDragAndClickDelete();
staff.enableGhostClickCreate();

$('#addRandom').on('click', function () {
  staff.addNote({ step: Math.round(-4 + Math.random() * 18) });
});

$('#clear').on('click', function () {
  staff.clearNotes();
});
</script>


@endpush