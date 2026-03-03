import { renderFinalResultsOverlay } from "../shared/finalResults.js";

export class BlocksChallenge {
  static INTERVALS_FALLBACK = [
    "m2", "M2", "m3", "M3", "P4", "A4", "d5", "P5", "m6", "M6", "m7", "M7", "P8",
  ];
  static MIN_CHALLENGES = 2;
  static MAX_CHALLENGES = 12;

  constructor(options = {}) {
    const defaults = {
      tableEl: "table.table",
      pathLength: 9,
      maxGenerateAttempts: 2000,
      maxStraightRun: 3,
      intervals: null,
      initialNotes: null,
      sound: true,
      basePoints: 1,
      firstTryBonus: 2,
      numOfChallenges: 4,
      namespace: "blocksChallenge",
    };

    this.opts = { ...defaults, ...(options || {}) };
    this.opts.numOfChallenges = this._normalizeNumOfChallenges(this.opts.numOfChallenges);
    this.$table = $(this.opts.tableEl).first();
    this.$musicKeyboard = $("#music-keyboard").first();
    this.$feedback = $("#feedback-success");
    this.$helpBtn = $("#help");
    this.$checkWrap = $("#check");
    this.$checkBtn = $("#check button");
    this.$continueWrap = $("#continue");
    this.$continueBtn = $("#continue button");
    this.$progressBar = $("#progress-bar");
    this.$progressCounter = $("#progress-counter");
    this.$points = $("#points");
    this.$finalOverlay = $("#final-overlay");
    this.ns = this.opts.namespace || "blocksChallenge";
    this._audioReady = false;
    this._synth = null;
    this._revealTimeouts = [];
    this._keyboardHideTimer = null;
    this._suppressKeyboardHideUntil = 0;
    this.$activeBlockInput = null;
    this.$activeBlockCell = null;
    this._instructionsDismissed = false;
    this._correctionMode = false;
    this._wrongEditableIndexes = new Set();
    this._finalStartMs = Date.now();
    this._currentRound = 1;
    this._roundLocked = false;
    this._usedHintThisRound = false;
    this._madeMistakeThisRound = false;
    this._madeAnyMistake = false;
    this._points = 0;
    this._stats = {
      checksTotal: 0,
      checksCorrect: 0,
      finishedAtMs: null,
    };
    this._roundAnswerKey = {};
    this._roundRecords = [];
    this._finalCountupTimeouts = [];
    this._instructionsDismissed = false;
    this._correctionMode = false;
    this._wrongEditableIndexes = new Set();
  }

  start() {
    if (!this.$table.length) return;
    this._wireControls();
    this._wireNoteInputUx();
    this._wireIntervalBlocks();
    this._showStandardGameUi();
    this._resetRunUi();
    this._startRound();
  }

  _normalizeNumOfChallenges(raw) {
    const n = Number(raw);
    const safe = Number.isFinite(n) ? Math.trunc(n) : 4;
    if (safe < BlocksChallenge.MIN_CHALLENGES) return BlocksChallenge.MIN_CHALLENGES;
    if (safe > BlocksChallenge.MAX_CHALLENGES) return BlocksChallenge.MAX_CHALLENGES;
    return safe;
  }

  _resetRunUi() {
    this._finalStartMs = Date.now();
    this._currentRound = 1;
    this._roundLocked = false;
    this._usedHintThisRound = false;
    this._madeMistakeThisRound = false;
    this._madeAnyMistake = false;
    this._points = 0;
    this._stats = {
      checksTotal: 0,
      checksCorrect: 0,
      finishedAtMs: null,
    };
    this._roundAnswerKey = {};
    this._roundRecords = [];
    this._clearFinalCountupTimers();

    this.$points.text("0");
    this.$feedback.hide();
    this.$helpBtn.hide();
    this.$continueWrap.hide();
    this.$finalOverlay.hide();
    this.$checkBtn.text("Check my answer");
    this.$progressBar.data("progress", 0).css({ width: "0%" });
    this.$progressCounter.text(`0 of ${this.opts.numOfChallenges}`);
  }

  _startRound() {
    this._roundLocked = false;
    this._correctionMode = false;
    this._wrongEditableIndexes = new Set();
    this._usedHintThisRound = false;
    this._madeMistakeThisRound = false;
    this.$helpBtn.hide();
    this.$continueWrap.hide();
    this.$feedback.hide();
    this.$checkWrap.show().addClass("invisible");
    this._hideMusicKeyboard();
    this._clearActiveBlockInput();
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
    const layout = this._buildRoundLayout({
      rowCount,
      colCount,
      pathLength,
    });
    if (!layout) return;
    const revealItems = layout.revealItems;
    this._roundAnswerKey = layout.answerKey || {};

    this._revealPathCells(revealItems);
  }

  _buildRoundLayout({ rowCount, colCount, pathLength }) {
    const maxAttempts = Math.max(1, Number(this.opts.maxGenerateAttempts) || 2000);
    const maxStraightRun = Math.max(1, Number(this.opts.maxStraightRun) || 3);
    const intervalPool = this._intervalPool();

    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
      const path = this._generatePath({
        rowCount,
        colCount,
        length: pathLength,
        maxAttempts: 1,
        maxStraightRun,
      });
      if (!path) continue;

      const initialRaw = this._pickInitialNote();
      const initialNote = this._parseSpelledNote(initialRaw) || this._parseSpelledNote("C");
      if (!initialNote) continue;

      const revealItems = [];
      const answerKey = {};
      let prevExpected = initialNote;
      let failed = false;

      for (let i = 0; i < path.length; i += 1) {
        const cell = path[i];
        if (i === 0) {
          const next = path[1] || null;
          const arrowClass = this._arrowClassForNextStep(cell, next);
          revealItems.push({
            r: cell.r,
            c: cell.c,
            i,
            cls: "initial-block",
            html: `<div><span>START HERE</span><input type="text" name="note" value="${initialNote.display}" disabled=""><i class="fa-solid ${arrowClass}"></i></div>`,
          });
          continue;
        }

        if (i % 2 === 1) {
          let pickedInterval = null;
          let pickedDir = null;
          let nextExpected = null;

          const localAttempts = Math.max(8, intervalPool.length * 3);
          for (let t = 0; t < localAttempts; t += 1) {
            const interval = intervalPool[Math.floor(Math.random() * intervalPool.length)];
            const dir = Math.random() < 0.5 ? -1 : 1;
            const candidate = this._spelledIntervalTarget(prevExpected, interval, dir);
            if (!candidate) continue;
            pickedInterval = interval;
            pickedDir = dir;
            nextExpected = candidate;
            break;
          }

          if (!pickedInterval || !nextExpected) {
            failed = true;
            break;
          }

          answerKey[i + 1] = nextExpected;
          prevExpected = nextExpected;
          revealItems.push({
            r: cell.r,
            c: cell.c,
            i,
            cls: "interval-block",
            html: `<div><button type="button" data-interval="${pickedInterval}"><i class="fa-solid fa-volume-up"></i></button><span interval>${pickedInterval}</span><span direction>${pickedDir === -1 ? "DOWN" : "UP"}</span></div>`,
          });
          continue;
        }

        revealItems.push({
          r: cell.r,
          c: cell.c,
          i,
          cls: "block",
          html: `<div><span style="opacity: 0.2; font-size: 3rem;">?</span><input type="text" name="note"></div>`,
        });
      }

      if (!failed) return { revealItems, answerKey };
    }

    return null;
  }

  _intervalPool() {
    const fromOptions = Array.isArray(this.opts.intervals)
      ? this.opts.intervals.filter(Boolean).map((x) => String(x).trim())
      : [];
    return fromOptions.length ? fromOptions : BlocksChallenge.INTERVALS_FALLBACK.slice();
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

  _wireControls() {
    this.$checkBtn
      .off(`click.${this.ns}Check`)
      .on(`click.${this.ns}Check`, (e) => {
        e.preventDefault();
        this._onCheck();
      });

    this.$helpBtn
      .off(`click.${this.ns}Help`)
      .on(`click.${this.ns}Help`, (e) => {
        e.preventDefault();
        this._onHelp();
      });

    this.$continueBtn
      .off(`click.${this.ns}Continue`)
      .on(`click.${this.ns}Continue`, (e) => {
        e.preventDefault();
        this.$continueWrap.hide();
        if (this._currentRound >= this.opts.numOfChallenges) {
          this._showFinalResults();
          return;
        }
        this._currentRound += 1;
        this._startRound();
      });
  }

  _onCheck() {
    if (this._roundLocked) return;

    const evalResult = this._evaluateRoundAnswers();
    this._renderBlockCheckMarks(evalResult);

    const isComplete = this._areAllBlockInputsFilled();
    if (!isComplete) {
      this._failAnimation();
      this.$helpBtn.show();
      this._madeAnyMistake = true;
      this._madeMistakeThisRound = true;
      return;
    }

    this._recordRoundCheck(evalResult);
    this._stats.checksTotal += 1;

    if (evalResult.correct) {
      this._correctionMode = false;
      this._wrongEditableIndexes = new Set();
      this._stats.checksCorrect += 1;
      const earned = this._awardPointsForCorrect();
      this._finalizeRoundRecord({ passed: true, earned });
      this._showSuccessAnimation();
      this._updateProgressBar();
      this._roundLocked = true;
      this.$table.find('td.block input[name="note"]').prop("disabled", true);
      this.$helpBtn.hide();
      if (this._currentRound >= this.opts.numOfChallenges) {
        this.$checkBtn.text("Final results, let's see...");
        this.$checkWrap.hide();
        this.$continueWrap.hide();
        const tid = setTimeout(() => this._showFinalResults(), 1400);
        this._revealTimeouts.push(tid);
      } else {
        this.$checkWrap.hide();
        this.$continueWrap.show();
        this.$continueBtn.text("Continue");
      }

      if (earned > 0) {
        $("#score").animateCSS && $("#score").animateCSS("heartBeat");
      }
      return;
    }

    this._madeAnyMistake = true;
    this._madeMistakeThisRound = true;
    this._finalizeRoundRecord({ passed: false, earned: 0 });
    this._enterCorrectionMode(evalResult);
    this._failAnimation();
    this.$helpBtn.show();
  }

  _onHelp() {
    if (this._roundLocked) return;
    const evalResult = this._evaluateRoundAnswers();
    const answers = evalResult.expectedByIndex || {};
    const entries = Object.keys(answers);
    if (!entries.length) return;

    this._usedHintThisRound = true;
    this._ensureRoundRecord().usedHint = true;

    entries.forEach((idxStr) => {
      const idx = Number(idxStr);
      const $cell = this.$table.find(`td[data-path-index="${idx}"]`).first();
      if (!$cell.length || !$cell.hasClass("block")) return;
      const $input = $cell.find('input[name="note"]').first();
      if (!$input.length) return;
      const note = String(answers[idxStr]?.display || "");
      if (!note) return;
      $input.val(note).trigger("input");
    });

    this.$helpBtn.hide();
  }

  _areAllBlockInputsFilled() {
    const $inputs = this.$table.find('td.block input[name="note"]');
    if (!$inputs.length) return false;
    let allFilled = true;
    $inputs.each((_, el) => {
      if (!String(el.value || "").trim()) allFilled = false;
    });
    return allFilled;
  }

  _evaluateRoundAnswers() {
    const expectedByIndex = this._roundAnswerKey || {};
    const marksByIndex = {};
    const expectedKeys = Object.keys(expectedByIndex);
    if (!expectedKeys.length) {
      return { correct: false, expectedByIndex, marksByIndex, correctCount: 0, wrongCount: 0 };
    }

    let correct = true;
    let correctCount = 0;
    let wrongCount = 0;
    expectedKeys.forEach((idxStr) => {
      const expected = expectedByIndex[idxStr];
      const $target = this.$table.find(`td.block[data-path-index="${idxStr}"]`).first();
      const user = this._noteFromCell($target);
      const ok = !!(user && user.canonical === expected.canonical);
      marksByIndex[idxStr] = ok;
      if (!ok) {
        correct = false;
        wrongCount += 1;
      } else {
        correctCount += 1;
      }
    });

    return { correct, expectedByIndex, marksByIndex, correctCount, wrongCount };
  }

  _ensureRoundRecord() {
    const idx = Math.max(0, Number(this._currentRound || 1) - 1);
    if (!this._roundRecords[idx]) {
      this._roundRecords[idx] = {
        round: idx + 1,
        checks: 0,
        firstCorrect: null,
        firstWrong: null,
        finalCorrect: 0,
        finalWrong: 0,
        usedHint: false,
        passed: false,
        points: 0,
      };
    }
    return this._roundRecords[idx];
  }

  _recordRoundCheck(evalResult) {
    const rec = this._ensureRoundRecord();
    rec.checks += 1;
    if (rec.firstCorrect == null || rec.firstWrong == null) {
      rec.firstCorrect = Number(evalResult?.correctCount || 0);
      rec.firstWrong = Number(evalResult?.wrongCount || 0);
    }
    rec.finalCorrect = Number(evalResult?.correctCount || 0);
    rec.finalWrong = Number(evalResult?.wrongCount || 0);
    rec.usedHint = rec.usedHint || this._usedHintThisRound;
  }

  _finalizeRoundRecord({ passed, earned }) {
    const rec = this._ensureRoundRecord();
    rec.passed = !!passed;
    rec.usedHint = rec.usedHint || this._usedHintThisRound;
    rec.points = Number(earned || 0);
  }

  _enterCorrectionMode(evalResult) {
    const marks = evalResult?.marksByIndex || {};
    this._correctionMode = true;
    this._wrongEditableIndexes = new Set();

    Object.keys(marks).forEach((idxStr) => {
      if (!marks[idxStr]) this._wrongEditableIndexes.add(Number(idxStr));
    });

    this._updateNoteInputProgression();
  }

  _renderBlockCheckMarks(evalResult) {
    const marks = evalResult?.marksByIndex || {};
    this.$table.find("td.block .block-correct").remove();
    this.$table.find("td.block .block-wrong").remove();
    this.$table.find("td.block > div").removeClass("bg-green bg-red");
    this.$table.find("td.block").removeClass("animate__animated animate__rubberBand animate__shakeX");

    Object.keys(marks).forEach((idxStr) => {
      const ok = !!marks[idxStr];
      const $cell = this.$table.find(`td.block[data-path-index="${idxStr}"]`).first();
      if (!$cell.length) return;
      const $wrap = $cell.children("div").first();
      if (!$wrap.length) return;

      $wrap.addClass(ok ? "bg-green" : "bg-red");

      $cell.removeClass("animate__animated animate__rubberBand animate__shakeX");
      // eslint-disable-next-line no-unused-expressions
      $cell[0] && $cell[0].offsetWidth;
      if (ok) $cell.addClass("animate__animated animate__rubberBand");

      const html = ok
        ? '<span class="block-correct"><i class="fa-solid fa-circle-check"></i></span>'
        : '<span class="block-wrong"><i class="fa-solid fa-circle-xmark"></i></span>';
      $wrap.append(html);
    });
  }

  _noteFromCell($cell) {
    if (!$cell || !$cell.length) return null;
    const textFromInput = String($cell.find('input[name="note"]').first().val() || "").trim();
    const raw = textFromInput || String($cell.text() || "").trim();
    return this._parseSpelledNote(raw);
  }

  _parseSpelledNote(rawText) {
    const normalized = String(rawText || "")
      .trim()
      .replaceAll("𝄪", "##")
      .replaceAll("♯", "#")
      .replaceAll("𝄫", "bb")
      .replaceAll("♭", "b");

    const m = normalized.match(/^([A-Ga-g])((?:#{1,2})|(?:b{1,2})|)?(\d+)?$/);
    if (!m) return null;

    const letter = m[1].toUpperCase();
    const acc = m[2] || "";
    const accOffset =
      acc === "##" ? 2 :
      acc === "#" ? 1 :
      acc === "bb" ? -2 :
      acc === "b" ? -1 :
      0;
    const basePc = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[letter];
    const pitchClass = ((basePc + accOffset) % 12 + 12) % 12;
    return {
      letter,
      accOffset,
      pitchClass,
      canonical: `${letter}${acc}`,
      display: `${letter}${this._accidentalDisplayFromOffset(accOffset)}`,
    };
  }

  _accidentalDisplayFromOffset(off) {
    if (off === 2) return "𝄪";
    if (off === 1) return "♯";
    if (off === -1) return "♭";
    if (off === -2) return "𝄫";
    return "";
  }

  _spelledIntervalTarget(prevNote, intervalAbbr, dir) {
    if (!prevNote) return null;
    const semis = this._intervalToSemitones(intervalAbbr);
    const parsed = this._parseIntervalAbbr(intervalAbbr);
    if (!Number.isFinite(semis) || !parsed || !Number.isFinite(parsed.number)) return null;

    const letters = ["C", "D", "E", "F", "G", "A", "B"];
    const fromIdx = letters.indexOf(prevNote.letter);
    if (fromIdx < 0) return null;

    const diatonicSteps = Math.max(0, parsed.number - 1);
    const toIdxRaw = fromIdx + (dir * diatonicSteps);
    const toIdx = ((toIdxRaw % 7) + 7) % 7;
    const targetLetter = letters[toIdx];

    const targetPc = ((prevNote.pitchClass + (dir * semis)) % 12 + 12) % 12;
    const naturalPc = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[targetLetter];

    let off = targetPc - naturalPc;
    while (off > 6) off -= 12;
    while (off < -6) off += 12;
    if (off > 2) off -= 12;
    if (off < -2) off += 12;
    if (off < -2 || off > 2) return null;

    const accText =
      off === 2 ? "##" :
      off === 1 ? "#" :
      off === -1 ? "b" :
      off === -2 ? "bb" :
      "";

    return {
      letter: targetLetter,
      accOffset: off,
      pitchClass: targetPc,
      canonical: `${targetLetter}${accText}`,
      display: `${targetLetter}${this._accidentalDisplayFromOffset(off)}`,
    };
  }

  _awardPointsForCorrect() {
    if (this._usedHintThisRound) return 0;
    const base = Number.isFinite(Number(this.opts.basePoints)) ? Number(this.opts.basePoints) : 1;
    const bonus = Number.isFinite(Number(this.opts.firstTryBonus)) ? Number(this.opts.firstTryBonus) : 2;
    const earned = this._madeMistakeThisRound ? base : (base + bonus);
    this._points += Math.max(0, earned);
    this.$points.text(String(this._points));
    return earned;
  }

  _showSuccessAnimation() {
    this.$feedback.find(".message span").text("Great job");
    this.$feedback.stop(true, true).fadeIn("fast");
  }

  _failAnimation() {
    const $target = this.$checkWrap && this.$checkWrap.length ? this.$checkWrap : this.$table;
    $target.removeClass("animate__animated animate__shakeX");
    // eslint-disable-next-line no-unused-expressions
    $target[0] && $target[0].offsetWidth;
    $target.addClass("animate__animated animate__shakeX");
    $target
      .off(`animationend.${this.ns}Fail webkitAnimationEnd.${this.ns}Fail`)
      .one(`animationend.${this.ns}Fail webkitAnimationEnd.${this.ns}Fail`, () => {
        $target.removeClass("animate__animated animate__shakeX");
      });
  }

  _updateProgressBar() {
    const steps = Math.max(1, Number(this.opts.numOfChallenges) || 1);
    const increment = 100 / steps;
    let current = parseFloat(this.$progressBar.data("progress")) || 0;
    current = Math.min(100, current + increment);
    this.$progressBar.data("progress", current);
    this.$progressBar.css({ width: `${current}%` });
    const completed = Math.min(steps, Math.round(current / increment));
    this.$progressCounter.text(`${completed} of ${steps}`);
    return current;
  }

  _showFinalResults() {
    this._stats.finishedAtMs = Date.now();
    const records = this._roundRecords.filter(Boolean);
    let answersCorrect = 0;
    let answersWrong = 0;
    records.forEach((r) => {
      const c = Number.isFinite(r.firstCorrect) ? r.firstCorrect : Number(r.finalCorrect || 0);
      const w = Number.isFinite(r.firstWrong) ? r.firstWrong : Number(r.finalWrong || 0);
      answersCorrect += Math.max(0, c);
      answersWrong += Math.max(0, w);
    });
    const accuracyBase = answersCorrect + answersWrong;
    const accuracy = accuracyBase ? Math.round((answersCorrect / accuracyBase) * 100) : 0;
    const durationSec = Math.max(0, Math.floor((this._stats.finishedAtMs - this._finalStartMs) / 1000));

    this.$musicKeyboard.hide();
    this.$continueWrap.hide();
    this.$helpBtn.hide();
    this.$checkWrap.hide();
    renderFinalResultsOverlay({
      $finalOverlay: this.$finalOverlay,
      rounds: this.opts.numOfChallenges,
      score: this._points,
      accuracy,
      durationSec,
      clearCountupTimers: () => this._clearFinalCountupTimers(),
      countupTimers: this._finalCountupTimeouts,
    });
  }

  _clearFinalCountupTimers() {
    if (!Array.isArray(this._finalCountupTimeouts)) {
      this._finalCountupTimeouts = [];
      return;
    }
    this._finalCountupTimeouts.forEach((id) => clearTimeout(id));
    this._finalCountupTimeouts = [];
  }

  _wireNoteInputUx() {
    this.$table
      .off(`pointerdown.${this.ns}Cover mousedown.${this.ns}Cover touchstart.${this.ns}Cover click.${this.ns}Cover`, ".block-cover")
      .on(`pointerdown.${this.ns}Cover mousedown.${this.ns}Cover touchstart.${this.ns}Cover click.${this.ns}Cover`, ".block-cover", (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      });

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
        const prevVal = String($input.data("prev-value") || "");
        const curVal = String($input.val() || "");
        const becameFilled = prevVal.trim().length === 0 && curVal.trim().length > 0;
        if (becameFilled) {
          this._revealNextCovers(2);
        }
        $input.data("prev-value", curVal);
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

    if (this._correctionMode) {
      let allFilledCorrection = $blocks.length > 0;
      for (let i = 0; i < $blocks.length; i += 1) {
        const $cell = $($blocks[i]);
        const idx = parseInt($cell.attr("data-path-index"), 10);
        const $input = $cell.find('input[name="note"]').first();
        const $label = $cell.children("div").children("span").not(".block-arrow").first();
        if (!$input.length) continue;

        const value = String($input.val() || "").trim();
        if (!value) allFilledCorrection = false;

        const editable = this._wrongEditableIndexes.has(idx);
        $input.prop("disabled", !editable);
        if (editable) {
          if (value) $label.hide();
          else {
            $label.css("opacity", "0.2");
            $label.show();
          }
        } else {
          $label.hide();
        }
      }

      if (this.$activeBlockInput && this.$activeBlockInput.length && this.$activeBlockInput.prop("disabled")) {
        this._clearActiveBlockInput();
        this._hideMusicKeyboard();
      }

      this._syncActiveBlockLabelOpacity();
      this._syncBlocksCompletionUi(allFilledCorrection);
      return;
    }

    let gateOpen = true;
    let allFilled = $blocks.length > 0;
    for (let i = 0; i < $blocks.length; i += 1) {
      const $cell = $($blocks[i]);
      const $input = $cell.find('input[name="note"]').first();
      const $label = $cell.children("div").children("span").not(".block-arrow").first();
      if (!$input.length) continue;

      const value = String($input.val() || "").trim();
      if (!value) allFilled = false;

      if (gateOpen) {
        $input.prop("disabled", false);
        if (value) {
          $label.hide();
        } else {
          $label.css("opacity", "0.2");
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

    this._syncActiveBlockLabelOpacity();
    this._syncBlocksCompletionUi(allFilled);
  }

  _syncBlocksCompletionUi(allFilled) {
    if (this._roundLocked) return;
    if (allFilled) {
      this._instructionsDismissed = true;
      $("#instructions").remove();
      $("#check").show().removeClass("invisible");
      return;
    }

    if (!this._instructionsDismissed) $("#instructions").show();
    $("#check").show().addClass("invisible");
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

    this._syncActiveBlockLabelOpacity();
  }

  _clearActiveBlockInput() {
    this.$activeBlockInput = null;
    this.$activeBlockCell = null;
    this.$table.find("td.block").removeClass("active-editable").css({
      boxShadow: "",
      borderColor: "",
      zIndex: "",
    });
    this._syncActiveBlockLabelOpacity();
  }

  _syncActiveBlockLabelOpacity() {
    const $labels = this.$table.find('td.block > div > span').not(".block-arrow");
    $labels.css("opacity", "0.2");

    if (!this.$activeBlockCell || !this.$activeBlockCell.length) return;
    const $activeLabel = this.$activeBlockCell.children("div").children("span").not(".block-arrow").first();
    if (!$activeLabel.length || !$activeLabel.is(":visible")) return;
    $activeLabel.css("opacity", "0.05");
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
        if (item.i >= 2) {
          $cell.append('<div class="block-cover"></div>');
        }
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

    const coversTid = setTimeout(() => {
      this._revealNextCovers(1);
    }, list.length * 80);
    this._revealTimeouts.push(coversTid);

    if (typeof onDone === "function") {
      const doneTid = setTimeout(() => onDone(), list.length * 80);
      this._revealTimeouts.push(doneTid);
    }
  }

  _revealNextCovers(count = 1) {
    const maxCount = Math.max(0, Number(count) || 0);
    if (!maxCount) return;

    const $covers = this.$table
      .find("td[data-path-index]")
      .toArray()
      .sort((a, b) => {
        const ia = parseInt(a.getAttribute("data-path-index"), 10);
        const ib = parseInt(b.getAttribute("data-path-index"), 10);
        return (Number.isFinite(ia) ? ia : 9999) - (Number.isFinite(ib) ? ib : 9999);
      })
      .map((td) => $(td).children(".block-cover").first())
      .filter(($c) => $c && $c.length && !$c.hasClass("cover-revealing") && !$c.hasClass("cover-revealed"))
      .slice(0, maxCount);

    $covers.forEach(($cover, i) => {
      const tid = setTimeout(() => {
        $cover.addClass("cover-revealing");
        $cover
          .removeClass("animate__animated animate__hinge")
          .addClass("animate__animated animate__hinge")
          .one(`animationend.${this.ns}CoverHinge webkitAnimationEnd.${this.ns}CoverHinge`, () => {
            $cover.hide();
            $cover.removeClass("animate__animated animate__hinge cover-revealing");
            $cover.addClass("cover-revealed");
          });

        // Fallback in case animationend does not fire.
        const fallbackTid = setTimeout(() => {
          $cover.hide();
          $cover.removeClass("animate__animated animate__hinge cover-revealing");
          $cover.addClass("cover-revealed");
        }, 2200);
        this._revealTimeouts.push(fallbackTid);
      }, i * 500);
      this._revealTimeouts.push(tid);
    });
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
