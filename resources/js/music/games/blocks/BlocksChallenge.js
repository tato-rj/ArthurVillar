export class BlocksChallenge {
  static INTERVALS_FALLBACK = [
    "m2", "M2", "m3", "M3", "P4", "A4", "d5", "P5", "m6", "M6", "m7", "M7", "P8",
  ];

  constructor(options = {}) {
    const defaults = {
      tableEl: "table.table",
      pathLength: 9,
      maxGenerateAttempts: 2000,
      maxStraightRun: 3,
      intervals: null,
      initialNotes: null,
      sound: true,
      namespace: "blocksChallenge",
    };

    this.opts = { ...defaults, ...(options || {}) };
    this.$table = $(this.opts.tableEl).first();
    this.$musicKeyboard = $("#music-keyboard").first();
    this.ns = this.opts.namespace || "blocksChallenge";
    this._audioReady = false;
    this._synth = null;
    this._revealTimeouts = [];
    this._keyboardHideTimer = null;
    this._suppressKeyboardHideUntil = 0;
    this.$activeBlockInput = null;
    this.$activeBlockCell = null;
  }

  start() {
    if (!this.$table.length) return;

    const $rows = this.$table.find("tbody tr");
    const rowCount = $rows.length;
    const colCount = rowCount ? $rows.first().find("td").length : 0;
    if (!rowCount || !colCount) return;

    this._clearRevealTimers();
    this.$table.find("td")
      .removeClass("block interval-block initial-block")
      .removeAttr("id")
      .empty();
    this._hideAllCellsVisual();

    const maxCells = rowCount * colCount;
    const pathLength = Math.max(1, Math.min(maxCells, Number(this.opts.pathLength) || 9));
    const path = this._generatePath({
      rowCount,
      colCount,
      length: pathLength,
      maxAttempts: Number(this.opts.maxGenerateAttempts) || 2000,
      maxStraightRun: Math.max(1, Number(this.opts.maxStraightRun) || 3),
    });
    if (!path) return;

    const revealItems = path.map((cell, i) => {
      if (i === 0) {
        const note = this._pickInitialNote();
        const next = path[1] || null;
        const arrowClass = this._arrowClassForNextStep(cell, next);
        return {
          r: cell.r,
          c: cell.c,
          i,
          cls: "initial-block",
          html: `<div><span>START HERE</span><input type="text" name="note" value="${note}" disabled=""><i class="fa-solid ${arrowClass}"></i></div>`,
        };
      }

      if (i % 2 === 1) {
        const interval = this._pickInitialInterval();
        const direction = Math.random() < 0.5 ? "UP" : "DOWN";
        return {
          r: cell.r,
          c: cell.c,
          i,
          cls: "interval-block",
          html: `<div><button type="button" data-interval="${interval}"><i class="fa-solid fa-volume-up"></i></button><span interval>${interval}</span><span direction>${direction}</span></div>`,
        };
      }

      return {
        r: cell.r,
        c: cell.c,
        i,
        cls: "block",
        html: `<div><span>NEW<br>NOTE<br>HERE</span><input type="text" name="note"></div>`,
      };
    });

    this._wireNoteInputUx();
    this._wireIntervalBlocks();
    this._showStandardGameUi();
    this._revealPathCells(revealItems);
  }

  _generatePath({ rowCount, colCount, length, maxAttempts, maxStraightRun }) {
    const dirs = [
      { dr: 1, dc: 0 },
      { dr: -1, dc: 0 },
      { dr: 0, dc: 1 },
      { dr: 0, dc: -1 },
    ];

    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
      const startCol = Math.floor(Math.random() * colCount);
      const path = [{ r: 0, c: startCol }];
      const occupied = new Set([`0,${startCol}`]);

      let prevDir = null;
      let sameDirRun = 0;

      while (path.length < length) {
        const cur = path[path.length - 1];
        const candidates = [];

        for (let i = 0; i < dirs.length; i += 1) {
          const dir = dirs[i];

          if (
            prevDir &&
            dir.dr === prevDir.dr &&
            dir.dc === prevDir.dc &&
            sameDirRun >= maxStraightRun
          ) {
            continue;
          }

          const nr = cur.r + dir.dr;
          const nc = cur.c + dir.dc;

          if (nr < 0 || nr >= rowCount || nc < 0 || nc >= colCount) continue;
          const key = `${nr},${nc}`;
          if (occupied.has(key)) continue;

          const sideNeighbors = this._sideNeighbors(nr, nc, occupied);
          if (sideNeighbors.length !== 1) continue;
          if (sideNeighbors[0] !== `${cur.r},${cur.c}`) continue;

          candidates.push({ r: nr, c: nc, dir });
        }

        if (!candidates.length) break;

        const picked = candidates[Math.floor(Math.random() * candidates.length)];
        path.push({ r: picked.r, c: picked.c });
        occupied.add(`${picked.r},${picked.c}`);

        if (prevDir && picked.dir.dr === prevDir.dr && picked.dir.dc === prevDir.dc) {
          sameDirRun += 1;
        } else {
          prevDir = picked.dir;
          sameDirRun = 1;
        }
      }

      if (path.length === length) return path;
    }

    return null;
  }

  _sideNeighbors(r, c, occupied) {
    const out = [];
    const neighbors = [
      [r + 1, c],
      [r - 1, c],
      [r, c + 1],
      [r, c - 1],
    ];

    for (let i = 0; i < neighbors.length; i += 1) {
      const key = `${neighbors[i][0]},${neighbors[i][1]}`;
      if (occupied.has(key)) out.push(key);
    }

    return out;
  }

  _cellAt(r, c) {
    const $row = this.$table.find("tbody tr").eq(r);
    return $row.find("td").eq(c);
  }

  _pickInitialInterval() {
    const fromOptions = Array.isArray(this.opts.intervals)
      ? this.opts.intervals.filter(Boolean)
      : [];
    const pool = fromOptions.length ? fromOptions : BlocksChallenge.INTERVALS_FALLBACK;
    return String(pool[Math.floor(Math.random() * pool.length)] || "M2");
  }

  _arrowClassForNextStep(cur, next) {
    if (!cur || !next) return "fa-arrow-right";
    const dr = next.r - cur.r;
    const dc = next.c - cur.c;
    if (dr === 1 && dc === 0) return "fa-arrow-down";
    if (dr === -1 && dc === 0) return "fa-arrow-up";
    if (dr === 0 && dc === 1) return "fa-arrow-right";
    if (dr === 0 && dc === -1) return "fa-arrow-left";
    return "fa-arrow-right";
  }

  _pickInitialNote() {
    const fromOptions = Array.isArray(this.opts.initialNotes)
      ? this.opts.initialNotes.filter(Boolean).map((x) => String(x).trim())
      : [];
    const fallback = ["C", "D", "E", "F", "G", "A", "B"];
    const pool = fromOptions.length ? fromOptions : fallback;
    return String(pool[Math.floor(Math.random() * pool.length)] || "E");
  }

  _wireIntervalBlocks() {
    this.$table
      .off(`click.${this.ns}Block`)
      .on(`click.${this.ns}Block`, "td.interval-block", (e) => {
        if ($(e.target).closest("button[data-interval]").length) return;
        const $btn = $(e.currentTarget).find('button[data-interval]').first();
        if ($btn.length) $btn.trigger("click");
      });

    this.$table
      .off(`click.${this.ns}Btn`)
      .on(`click.${this.ns}Btn`, 'td.interval-block button[data-interval]', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const $btn = $(e.currentTarget);
        const $cell = $btn.closest("td.interval-block");
        const idx = parseInt($cell.attr("data-path-index"), 10);
        if (!Number.isFinite(idx) || idx <= 0) {
          this._shakeCell($cell);
          return;
        }

        const $prev = this.$table.find(`td[data-path-index="${idx - 1}"]`).first();
        const prevMidi = this._midiFromCell($prev);
        if (!Number.isFinite(prevMidi)) {
          this._shakeCell($cell);
          return;
        }

        const interval = String($btn.attr("data-interval") || "").trim();
        const dirRaw = String($cell.find("span[direction]").first().text() || "").trim().toUpperCase();
        const dir = dirRaw === "DOWN" ? -1 : 1;
        const semis = this._intervalToSemitones(interval);
        if (!Number.isFinite(semis)) {
          this._shakeCell($cell);
          return;
        }

        const secondMidi = prevMidi + (dir * semis);
        this._playDictationLike(prevMidi, secondMidi);
      });
  }

  _wireNoteInputUx() {
    this.$table
      .off(`click.${this.ns}Cell`, "td.block")
      .on(`click.${this.ns}Cell`, "td.block", (e) => {
        const $cell = $(e.currentTarget);
        const $input = $cell.find('input[name="note"]').first();
        if (!$input.length) return;
        if ($input.prop("disabled")) {
          this._clearActiveBlockInput();
          return;
        }
        this._setActiveBlockInput($input);
        $input.trigger("focus");
        this._showMusicKeyboard();
      });

    this.$table
      .off(`focusin.${this.ns}Note`, 'input[name="note"]')
      .on(`focusin.${this.ns}Note`, 'input[name="note"]', (e) => {
        const $input = $(e.currentTarget);
        if (!$input.closest("td.block").length) return;
        this._setActiveBlockInput($input);
        this._showMusicKeyboard();
      });

    this.$table
      .off(`focusout.${this.ns}Note`, 'input[name="note"]')
      .on(`focusout.${this.ns}Note`, 'input[name="note"]', () => {
        if (this._keyboardHideTimer) clearTimeout(this._keyboardHideTimer);
        this._keyboardHideTimer = setTimeout(() => {
          if (Date.now() < this._suppressKeyboardHideUntil) return;
          const $active = $(document.activeElement);
          const inNoteInput = $active.is('input[name="note"]') && $active.closest("td.block").length;
          const inKeyboard = $active.closest("#music-keyboard").length;
          if (!inNoteInput && !inKeyboard) {
            this._hideMusicKeyboard();
          }
        }, 0);
      });

    this.$table
      .off(`blur.${this.ns}Note`, 'input[name="note"]')
      .on(`blur.${this.ns}Note`, 'input[name="note"]', (e) => {
        const $input = $(e.currentTarget);
        if (!$input.closest("td.block").length) return;
        this._updateNoteInputProgression();
      });

    this.$table
      .off(`keydown.${this.ns}Note`, 'input[name="note"]')
      .on(`keydown.${this.ns}Note`, 'input[name="note"]', (e) => {
        const $input = $(e.currentTarget);
        if (!$input.closest("td.block").length) return;
        e.preventDefault();
      });

    this.$table
      .off(`input.${this.ns}Note`, 'input[name="note"]')
      .on(`input.${this.ns}Note`, 'input[name="note"]', (e) => {
        const $input = $(e.currentTarget);
        if (!$input.closest("td.block").length) return;
        this._updateNoteInputProgression();
      });

    this.$table
      .off(`paste.${this.ns}Note`, 'input[name="note"]')
      .on(`paste.${this.ns}Note`, 'input[name="note"]', (e) => {
        const $input = $(e.currentTarget);
        if (!$input.closest("td.block").length) return;
        e.preventDefault();
      });

    $(document)
      .off(`mousedown.${this.ns}Keyboard touchstart.${this.ns}Keyboard`)
      .on(`mousedown.${this.ns}Keyboard touchstart.${this.ns}Keyboard`, (e) => {
        const $target = $(e.target);
        if ($target.closest('input[name="note"]').length) return;
        if ($target.closest("#music-keyboard").length) {
          this._suppressKeyboardHideUntil = Date.now() + 250;
          return;
        }
        this._hideMusicKeyboard();
        this._clearActiveBlockInput();
      });

    this.$musicKeyboard
      .off(`click.${this.ns}Write`, "button")
      .on(`click.${this.ns}Write`, "button", (e) => {
        e.preventDefault();
        const $target = $(e.currentTarget);
        const $active = this.$activeBlockInput && this.$activeBlockInput.length
          ? this.$activeBlockInput
          : $(document.activeElement).closest('input[name="note"]');
        if (!$active || !$active.length || !$active.closest("td.block").length) return;
        if ($active.prop("disabled")) return;

        const letter = String($target.attr("data-lettername") || "").trim().toUpperCase();
        const accidentalType = String($target.attr("data-accidental") || "").trim().toLowerCase();
        const isDelete = $target.is("[data-delete]");
        const current = String($active.val() || "").trim();

        if (isDelete) {
          const chars = Array.from(current);
          if (!chars.length) return;
          $active.val(chars.slice(0, -1).join(""));
          $active.trigger("input");
          return;
        }

        if (letter) {
          $active.val(letter);
          $active.trigger("input");
          return;
        }

        if (accidentalType) {
          const nextValue = this._applyAccidentalToInputValue(current, accidentalType);
          if (nextValue == null) return;
          $active.val(nextValue);
        } else {
          const text = String($target.text() || "").trim();
          if (!text) return;
          $active.val(text);
        }

        $active.trigger("input");
      });
  }

  _applyAccidentalToInputValue(current, accidentalType) {
    const m = String(current || "").trim().match(/^([A-G])([#b♯♭𝄪𝄫]{0,2})$/i);
    if (!m) return null;

    const letter = m[1].toUpperCase();
    const rawAcc = m[2] || "";
    const normalizedAcc =
      rawAcc === "#" || rawAcc === "♯" ? "sharp" :
      rawAcc === "##" || rawAcc === "𝄪" ? "double_sharp" :
      rawAcc === "b" || rawAcc === "♭" ? "flat" :
      rawAcc === "bb" || rawAcc === "𝄫" ? "double_flat" :
      "";

    if (accidentalType === "sharp") {
      if (normalizedAcc === "double_sharp") return `${letter}𝄪`;
      if (normalizedAcc === "sharp") return `${letter}𝄪`;
      return `${letter}♯`;
    }

    if (accidentalType === "flat") {
      if (normalizedAcc === "double_flat") return `${letter}𝄫`;
      if (normalizedAcc === "flat") return `${letter}𝄫`;
      return `${letter}♭`;
    }

    return `${letter}`;
  }

  _updateNoteInputProgression() {
    const $blocks = this.$table.find("td.block").toArray().sort((a, b) => {
      const ia = parseInt(a.getAttribute("data-path-index"), 10);
      const ib = parseInt(b.getAttribute("data-path-index"), 10);
      return (Number.isFinite(ia) ? ia : 9999) - (Number.isFinite(ib) ? ib : 9999);
    });

    let gateOpen = true;
    for (let i = 0; i < $blocks.length; i += 1) {
      const $cell = $($blocks[i]);
      const $input = $cell.find('input[name="note"]').first();
      const $label = $cell.children("div").children("span").not(".block-arrow").first();
      if (!$input.length) continue;

      const value = String($input.val() || "").trim();

      if (gateOpen) {
        $input.prop("disabled", false);
        if (value) {
          $label.hide();
        } else {
          $label.show();
          gateOpen = false;
        }
      } else {
        $input.prop("disabled", true);
        $label.hide();
      }
    }

    if (this.$activeBlockInput && this.$activeBlockInput.length && this.$activeBlockInput.prop("disabled")) {
      this._clearActiveBlockInput();
    }
  }

  _setActiveBlockInput($input) {
    if (!$input || !$input.length) return;
    const $cell = $input.closest("td.block");
    if (!$cell.length) return;

    this.$activeBlockInput = $input;
    this.$activeBlockCell = $cell;

    this.$table.find("td.block").removeClass("active-editable").css({
      boxShadow: "",
      borderColor: "",
      zIndex: "",
    });

    $cell.addClass("active-editable").css({
      boxShadow: "0 0 0 3px rgba(13, 110, 253, 0.55) inset, 0 0 0 2px rgba(13, 110, 253, 0.75)",
      borderColor: "#0d6efd",
      zIndex: "2",
    });
  }

  _clearActiveBlockInput() {
    this.$activeBlockInput = null;
    this.$activeBlockCell = null;
    this.$table.find("td.block").removeClass("active-editable").css({
      boxShadow: "",
      borderColor: "",
      zIndex: "",
    });
  }

  _isSoundEnabled() {
    const v = this.opts.sound;
    return v === true || String(v || "").trim().toLowerCase() === "on";
  }

  async _ensureAudio() {
    if (!this._isSoundEnabled()) return;
    if (this._audioReady) return;
    if (!window.Tone) return;
    try {
      await Tone.start();
    } catch (_) {
      return;
    }

    this._synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
      envelope: { attack: 0.01, decay: 0.08, sustain: 0.35, release: 0.25 },
    }).toDestination();
    this._audioReady = true;
  }

  _playMidi(midi, durSeconds, atSecondsFromNow) {
    if (!window.Tone) return;
    this._ensureAudio().then(() => {
      if (!this._synth) return;
      const now = Tone.now();
      const when = now + (Number(atSecondsFromNow) || 0);
      const dur = Number(durSeconds) || 0.6;
      this._synth.triggerAttackRelease(Tone.Frequency(midi, "midi"), dur, when);
    });
  }

  _playDictationLike(firstMidi, secondMidi) {
    if (!this._isSoundEnabled()) return;
    this._playMidi(firstMidi, 0.6, 0.0);
    this._playMidi(secondMidi, 0.6, 1.0);
    this._playMidi(firstMidi, 0.6, 2.0);
    this._playMidi(firstMidi, 0.6, 3.0);
    this._playMidi(secondMidi, 0.6, 3.0);
  }

  _midiFromCell($cell) {
    if (!$cell || !$cell.length) return null;

    const textFromInput = String($cell.find('input[name="note"]').first().val() || "").trim();
    const textFromInterval = String($cell.find("span[note]").first().text() || "").trim();
    const textFromInitial = String($cell.find("span").first().text() || "").trim();
    const rawText = textFromInput || textFromInterval || textFromInitial || String($cell.text() || "").trim();
    if (!rawText) return null;

    const normalized = rawText
      .replaceAll("𝄪", "##")
      .replaceAll("♯", "#")
      .replaceAll("𝄫", "bb")
      .replaceAll("♭", "b");

    const m = normalized.match(/^([A-Ga-g])((?:#{1,2})|(?:b{1,2})|)?(\d+)?$/);
    if (!m) return null;

    const letter = m[1].toUpperCase();
    const acc = m[2] || "";
    const octave = m[3] != null ? parseInt(m[3], 10) : 4;

    const baseSemitoneFromC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[letter];
    const accOffset =
      acc === "##" ? 2 :
      acc === "#" ? 1 :
      acc === "bb" ? -2 :
      acc === "b" ? -1 :
      0;

    return 12 * (octave + 1) + baseSemitoneFromC + accOffset;
  }

  _parseIntervalAbbr(abbr) {
    const s = String(abbr || "").trim();
    const m = s.match(/^([PMAmd]+)(\d+)$/);
    if (!m) return null;
    return { quality: m[1], number: parseInt(m[2], 10) };
  }

  _intervalSemitones(quality, simpleNum) {
    const baseMajorPerfect = { 1: 0, 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 11, 8: 12 }[simpleNum];
    if (baseMajorPerfect == null) return null;

    const isPerfectClass = simpleNum === 1 || simpleNum === 4 || simpleNum === 5 || simpleNum === 8;
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

  _intervalToSemitones(abbr) {
    const parsed = this._parseIntervalAbbr(abbr);
    if (!parsed || !Number.isFinite(parsed.number) || parsed.number < 1) return null;
    const simpleNum = ((parsed.number - 1) % 7) + 1;
    const octaves = Math.floor((parsed.number - 1) / 7);
    const base = this._intervalSemitones(parsed.quality, simpleNum);
    if (base == null) return null;
    return base + 12 * octaves;
  }

  _shakeCell($cell) {
    if (!$cell || !$cell.length) return;
    $cell.removeClass("animate__animated animate__shakeX");
    // eslint-disable-next-line no-unused-expressions
    $cell[0] && $cell[0].offsetWidth;
    $cell.addClass("animate__animated animate__shakeX");
    $cell
      .off(`animationend.${this.ns}Shake webkitAnimationEnd.${this.ns}Shake`)
      .one(`animationend.${this.ns}Shake webkitAnimationEnd.${this.ns}Shake`, () => {
        $cell.removeClass("animate__animated animate__shakeX");
      });
  }

  _clearRevealTimers() {
    if (!Array.isArray(this._revealTimeouts)) {
      this._revealTimeouts = [];
      return;
    }
    this._revealTimeouts.forEach((id) => clearTimeout(id));
    this._revealTimeouts = [];
  }

  _revealPathCells(items, onDone = null) {
    const list = Array.isArray(items) ? items : [];
    if (!list.length) {
      if (typeof onDone === "function") onDone();
      return;
    }

    for (let i = 0; i < list.length; i += 1) {
      const item = list[i];
      const tid = setTimeout(() => {
        const $cell = this._cellAt(item.r, item.c);
        $cell.attr("data-path-index", String(item.i));
        $cell.addClass(item.cls).append(item.html);
        if (item.cls === "block") {
          $cell.find('input[name="note"]').prop("disabled", true).prop("readonly", true).attr({
            inputmode: "none",
            autocomplete: "off",
            autocorrect: "off",
            autocapitalize: "off",
            spellcheck: "false",
          });
          $cell.children("div").children("span").not(".block-arrow").first().hide();
        }
        this._showCellVisual($cell);
        this._updateNoteInputProgression();
      }, i * 80);
      this._revealTimeouts.push(tid);
    }

    if (typeof onDone === "function") {
      const doneTid = setTimeout(() => onDone(), list.length * 80);
      this._revealTimeouts.push(doneTid);
    }
  }

  _showStandardGameUi() {
    $("#instructions").show();
    $("#controls").show();
    $("#page-wrapper").fadeIn("fast");
  }

  _showMusicKeyboard() {
    if (!this.$musicKeyboard.length) return;
    if (this._keyboardHideTimer) {
      clearTimeout(this._keyboardHideTimer);
      this._keyboardHideTimer = null;
    }
    this.$musicKeyboard
      .stop(true, true)
      .show()
      .removeClass("animate__bounceOutDown")
      .addClass("animate__animated animate__bounceInUp");
  }

  _hideMusicKeyboard() {
    if (!this.$musicKeyboard.length) return;
    if (!this.$musicKeyboard.is(":visible")) return;
    this.$musicKeyboard
      .removeClass("animate__bounceInUp")
      .addClass("animate__animated animate__bounceOutDown");

    const hideTid = setTimeout(() => {
      this.$musicKeyboard.hide();
      this.$musicKeyboard.removeClass("animate__bounceOutDown");
    }, 550);
    this._revealTimeouts.push(hideTid);
  }

  _hideAllCellsVisual() {
    this.$table.find("td").css({
      visibility: "visible",
      borderColor: "transparent",
      backgroundColor: "transparent",
      color: "transparent",
    });
  }

  _showCellVisual($cell) {
    if (!$cell || !$cell.length) return;
    $cell.css({
      borderColor: "",
      backgroundColor: "",
      color: "",
    });
  }
}
