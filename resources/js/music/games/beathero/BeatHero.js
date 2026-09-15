import { renderFinalResultsOverlay } from "../shared/finalResults.js";
import { GameAudio } from "../shared/GameAudio.js";

export class BeatHero {
  static MIN_CHALLENGES = 2;
  static MAX_CHALLENGES = 12;
  static DEFAULT_FIGURE_IDS = [
    "quarter",
    "two-eighths",
    "four-sixteenths",
    "eighth-two-sixteenths",
  ];

  static FIGURES = [
    {
      id: "quarter",
      label: "Quarter note",
      events: [0],
      notes: [{ value: 4 }],
    },
    {
      id: "two-eighths",
      label: "Two eighth notes",
      events: [0, 0.5],
      notes: [{ value: 8 }, { value: 8 }],
    },
    {
      id: "eighth-two-sixteenths",
      label: "Eighth note, two sixteenth notes",
      events: [0, 0.5, 0.75],
      notes: [{ value: 8 }, { value: 16 }, { value: 16 }],
    },
    {
      id: "sixteenth-eighth-sixteenth",
      label: "Sixteenth note, eighth note, sixteenth note",
      events: [0, 0.25, 0.75],
      notes: [{ value: 16 }, { value: 8 }, { value: 16 }],
    },
    {
      id: "two-sixteenths-eighth",
      label: "Two sixteenth notes, eighth note",
      events: [0, 0.25, 0.5],
      notes: [{ value: 16 }, { value: 16 }, { value: 8 }],
    },
    {
      id: "four-sixteenths",
      label: "Four sixteenth notes",
      events: [0, 0.25, 0.5, 0.75],
      notes: [{ value: 16 }, { value: 16 }, { value: 16 }, { value: 16 }],
    },
    {
      id: "dotted-eighth-sixteenth",
      label: "Dotted eighth note, sixteenth note",
      events: [0, 0.75],
      notes: [{ value: 8, dotted: true }, { value: 16 }],
    },
    {
      id: "sixteenth-dotted-eighth",
      label: "Sixteenth note, dotted eighth note",
      events: [0, 0.25],
      notes: [{ value: 16 }, { value: 8, dotted: true }],
    },
  ];

  constructor(options = {}) {
    this.opts = {
      wrapperSelector: "#rhythm-card-grid",
      dotsSelector: "#sequence-dots",
      statusSelector: "#sequence-status",
      numOfChallenges: 4,
      bpm: 80,
      practiceMode: false,
      figures: BeatHero.DEFAULT_FIGURE_IDS,
      sound: true,
      ...options,
    };

    this.opts.numOfChallenges = this._normalizeChallengeCount(this.opts.numOfChallenges);
    this.opts.bpm = this._normalizeBpm(this.opts.bpm);
    this.opts.practiceMode = this._normalizeBool(this.opts.practiceMode);
    this.opts.figures = this._normalizeFigureIds(this.opts.figures);
    this.opts.sound = this._normalizeBool(this.opts.sound);

    this.$grid = $(this.opts.wrapperSelector);
    this.$dots = $(this.opts.dotsSelector);
    this.$status = $(this.opts.statusSelector);
    this.$playWrap = $("#play");
    this.$playBtn = this.$playWrap.find('button[action="play"]');
    this.$stopBtn = this.$playWrap.find('button[action="stop"]');
    this.$continueWrap = $("#continue");
    this.$continueBtn = this.$continueWrap.find("button");
    this.$progressBar = $("#progress-bar");
    this.$progressCounter = $("#progress-counter");
    this.$points = $("#points");
    this.$increment = $("#increment");
    this.$finalOverlay = $("#final-overlay");

    this._cards = [];
    this._answer = [];
    this._selection = [];
    this._round = 1;
    this._roundHadMistake = false;
    this._madeAnyMistake = false;
    this._state = "ready";
    this._inputLocked = false;
    this._pointsValue = 0;
    this._correctTaps = 0;
    this._wrongTaps = 0;
    this._startedAt = Date.now();
    this._timers = new Set();
    this._rhythmSynth = null;
    this._uiSynth = null;
    this._uiNoise = null;
    this._audioReady = false;
  }

  start() {
    if (!this.$grid.length) return;

    this._wireControls();
    this._wireFigurePicker();
    this._resetGameUi();
    this._startRound();
  }

  _wireControls() {
    this.$playBtn
      .off("click.beatHero")
      .on("click.beatHero", (event) => {
        event.preventDefault();
        this._playChallenge();
      });

    this.$stopBtn
      .off("click.beatHero")
      .on("click.beatHero", (event) => {
        event.preventDefault();
        this._stopChallenge();
      });

    this.$grid
      .off("click.beatHero", ".rhythm-card")
      .on("click.beatHero", ".rhythm-card", (event) => {
        event.preventDefault();
        this._handleCardTap(event.currentTarget);
      });

    this.$continueBtn
      .off("click.beatHero")
      .on("click.beatHero", (event) => {
        event.preventDefault();
        this._continue();
      });
  }

  _wireFigurePicker() {
    const picker = document.querySelector("[data-beat-hero-symbol-picker]");
    if (!picker) return;

    const checkboxes = [...picker.querySelectorAll(".beat-hero-symbol-input")];
    const message = document.querySelector("[data-beat-hero-symbol-message]");
    const form = picker.closest("form");

    picker.querySelectorAll("[data-beat-hero-figure-thumbnail]").forEach((thumbnail) => {
      const figure = BeatHero.FIGURES.find((item) => item.id === thumbnail.dataset.beatHeroFigureThumbnail);
      if (figure) thumbnail.innerHTML = this._figureSvg(figure);
    });

    const selectedCount = () => checkboxes.filter((checkbox) => checkbox.checked).length;
    const showCount = (error = "") => {
      if (!message) return;
      message.classList.toggle("is-error", Boolean(error));
      message.textContent = error || `${selectedCount()} selected`;
    };

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const count = selectedCount();

        if (count < 2) {
          checkbox.checked = true;
          showCount("Choose at least 2 symbols.");
          return;
        }

        if (count > 4) {
          checkbox.checked = false;
          showCount("Choose no more than 4 symbols.");
          return;
        }

        showCount();
      });
    });

    form?.addEventListener("submit", (event) => {
      const count = selectedCount();
      if (count >= 2 && count <= 4) return;

      event.preventDefault();
      showCount("Choose between 2 and 4 symbols.");
    });

    showCount();
  }

  _resetGameUi() {
    this._round = 1;
    this._pointsValue = 0;
    this._correctTaps = 0;
    this._wrongTaps = 0;
    this._madeAnyMistake = false;
    this._startedAt = Date.now();

    $("#timer").hide();
    $("#feedback-success").hide();
    $("#check, #help, #skip").hide();
    $("#controls").show();
    this.$finalOverlay.hide();
    this.$continueWrap.hide();
    this.$points.text("0");
    this.$increment.css("opacity", 0);
    this.$progressBar.data("progress", 0).css("width", "0%");
    this.$progressCounter.text(this.opts.practiceMode ? "Practice" : `0 of ${this.opts.numOfChallenges}`);
    this._setPlayButtons(false);
  }

  _startRound() {
    this._cancelTimers();
    this._state = "ready";
    this._inputLocked = false;
    this._selection = [];
    this._roundHadMistake = false;
    this.$continueWrap.hide();

    const pool = BeatHero.FIGURES.filter((figure) => this.opts.figures.includes(figure.id));
    const cards = [];
    while (cards.length < 8) {
      cards.push(...this._shuffle(pool));
    }
    this._cards = this._shuffle(cards.slice(0, 8));
    this._answer = this._shuffle(pool).slice(0, 2);

    this._renderCards();
    this._resetDots();
    this._setStatus("Press Play, listen to the two rhythms, then tap their cards in the same order.");
    this._setPlayButtons(false);
  }

  _renderCards() {
    const html = this._cards.map((figure, index) => `
      <button
        type="button"
        class="rhythm-card"
        data-figure-id="${figure.id}"
        aria-label="Card ${index + 1}: ${figure.label}"
      >
        <span class="rhythm-card__number" aria-hidden="true"></span>
        <span class="rhythm-card__figure" aria-hidden="true">
          ${this._figureSvg(figure)}
        </span>
      </button>
    `).join("");

    this.$grid.html(html);
  }

  _figureSvg(figure) {
    const notes = figure.notes || [];
    const positions = this._notePositions(notes.length);
    const stemTop = 27;
    const headY = 69;

    const heads = notes.map((note, index) => {
      const x = positions[index];
      const dot = note.dotted
        ? `<circle class="rhythm-note-dot" cx="${x + 14}" cy="66" r="2.6"></circle>`
        : "";
      return `
        <ellipse class="rhythm-note-head" cx="${x}" cy="${headY}" rx="8" ry="5.7" transform="rotate(-20 ${x} ${headY})"></ellipse>
        <line class="rhythm-note-stem" x1="${x + 6}" y1="${headY - 2}" x2="${x + 6}" y2="${stemTop}"></line>
        ${dot}
      `;
    }).join("");

    const beamed = notes.length > 1
      ? this._beamSvg(notes, positions, stemTop)
      : this._flagSvg(notes[0], positions[0], stemTop);

    return `
      <svg viewBox="0 0 100 100" role="presentation" focusable="false">
        ${heads}
        ${beamed}
      </svg>
    `;
  }

  _beamSvg(notes, positions, stemTop) {
    const stems = positions.map((x) => x + 6);
    const first = stems[0];
    const last = stems[stems.length - 1];
    const mainBeam = `<line class="rhythm-note-beam" x1="${first}" y1="${stemTop}" x2="${last}" y2="${stemTop}"></line>`;
    const sixteenthIndexes = notes
      .map((note, index) => (note.value === 16 ? index : -1))
      .filter((index) => index >= 0);
    const secondary = [];

    let cursor = 0;
    while (cursor < sixteenthIndexes.length) {
      const group = [sixteenthIndexes[cursor]];
      while (
        cursor + 1 < sixteenthIndexes.length
        && sixteenthIndexes[cursor + 1] === sixteenthIndexes[cursor] + 1
      ) {
        cursor += 1;
        group.push(sixteenthIndexes[cursor]);
      }

      if (group.length > 1) {
        secondary.push(`<line class="rhythm-note-beam rhythm-note-beam--secondary" x1="${stems[group[0]]}" y1="${stemTop + 10}" x2="${stems[group[group.length - 1]]}" y2="${stemTop + 10}"></line>`);
      } else {
        const index = group[0];
        const pointsLeft = index === notes.length - 1;
        secondary.push(`<line class="rhythm-note-beam rhythm-note-beam--secondary" x1="${stems[index]}" y1="${stemTop + 10}" x2="${stems[index] + (pointsLeft ? -11 : 11)}" y2="${stemTop + 10}"></line>`);
      }
      cursor += 1;
    }

    return `${mainBeam}${secondary.join("")}`;
  }

  _flagSvg(note, x, stemTop) {
    if (!note || note.value < 8) return "";

    const stemX = x + 6;
    return `<path class="rhythm-note-flag" d="M ${stemX} ${stemTop} C ${stemX + 17} ${stemTop + 5}, ${stemX + 16} ${stemTop + 18}, ${stemX + 7} ${stemTop + 24}"></path>`;
  }

  _notePositions(count) {
    if (count <= 1) return [50];
    if (count === 2) return [29, 70];
    if (count === 3) return [22, 50, 78];
    return [16, 39, 62, 84];
  }

  async _playChallenge() {
    if (this._state === "playing" || this._state === "complete") return;

    this._cancelTimers();
    this._clearSelectionMarks();
    this._selection = [];
    this._state = "playing";
    this._inputLocked = true;
    this._resetDots();
    this._setStatus("Listen carefully…");
    this._setPlayButtons(true);

    await this._ensureAudio();
    if (this._state !== "playing") return;

    const beatMs = this._beatMs();
    const slotMs = beatMs;

    this._answer.forEach((figure, index) => {
      const startsAt = index * slotMs;
      this._setTimer(() => this._activateDot(index), startsAt);
      this._scheduleFigureAudio(figure, startsAt);
      this._setTimer(() => this._completeDot(index), startsAt + beatMs);
    });

    this._setTimer(() => {
      this._state = "answering";
      this._inputLocked = false;
      this._setPlayButtons(false);
      this._resetDots();
      this._setStatus("Now tap the two cards you heard, in order.");
    }, (this._answer.length * slotMs) + 120);
  }

  _stopChallenge() {
    if (this._state !== "playing") return;

    this._cancelTimers();
    this._state = "ready";
    this._inputLocked = false;
    this._resetDots();
    this._setPlayButtons(false);
    this._setStatus("Playback stopped. Press Play when you’re ready.");
  }

  async _handleCardTap(cardElement) {
    if (this._inputLocked || this._state === "playing" || this._state === "complete") return;

    const figure = this._cards.find((item) => item.id === cardElement.dataset.figureId);
    if (!figure) return;

    this._inputLocked = true;
    await this._ensureAudio();
    this._scheduleFigureAudio(figure, 0, cardElement);

    if (this._state === "ready") {
      cardElement.classList.add("is-previewing");
      this._setStatus("Press Play, listen to the two rhythms, then tap their cards in the same order.");
      this._setTimer(() => {
        cardElement.classList.remove("is-previewing");
        this._inputLocked = false;
      }, this._beatMs());
      return;
    }

    if (this._state !== "answering") return;

    this._inputLocked = true;
    const answerIndex = this._selection.length;
    const expected = this._answer[answerIndex];
    this._activateDot(answerIndex);

    if (expected && expected.id === figure.id) {
      this._correctTaps += 1;
      this._selection.push(figure);
      cardElement.classList.remove("is-wrong");
      cardElement.classList.add("is-correct");
      cardElement.querySelector(".rhythm-card__number").textContent = String(answerIndex + 1);
      this._chooseDot(answerIndex);

      if (this._selection.length === this._answer.length) {
        this._finishRound();
        return;
      }

      this._setStatus("Great — now choose the second card.");
      this._setTimer(() => {
        this._inputLocked = false;
      }, this._beatMs());
      return;
    }

    this._wrongTaps += 1;
    this._roundHadMistake = true;
    this._madeAnyMistake = true;
    cardElement.classList.add("is-wrong");
    this._wrongDot(answerIndex);
    this._setStatus("Not quite. Start again with the first card.");
    this._playFailSound();

    const resetDelay = Math.min(800, Math.max(600, Math.round(this._beatMs() * 0.75)));
    this._setTimer(() => {
      this._selection = [];
      this._clearSelectionMarks();
      this._resetDots();
      this._inputLocked = false;
    }, resetDelay);
  }

  _finishRound() {
    this._state = "complete";
    this._inputLocked = true;
    const earned = this._roundHadMistake ? 1 : 2;
    this._pointsValue += earned;
    this.$points.text(String(this._pointsValue));
    this.$increment.text(`+${earned}`).css("opacity", 1);
    this._setTimer(() => this.$increment.css("opacity", 0), 900);
    this._updateProgress();
    this._setStatus("Perfect order! Ready for another pair?");
    this._setPlayButtons(false);
    this.$playWrap.hide();
    this.$continueWrap.show();
    this.$continueBtn.text(
      !this.opts.practiceMode && this._round >= this.opts.numOfChallenges
        ? "View results"
        : "Continue",
    );
    this._playSuccessSound();
  }

  _continue() {
    if (this._state !== "complete") return;

    if (!this.opts.practiceMode && this._round >= this.opts.numOfChallenges) {
      this._showFinalResults();
      return;
    }

    this._round += 1;
    this.$playWrap.show();
    this._startRound();
  }

  _updateProgress() {
    if (this.opts.practiceMode) {
      this.$progressCounter.text("Practice");
      return;
    }

    const completed = Math.min(this._round, this.opts.numOfChallenges);
    const progress = (completed / this.opts.numOfChallenges) * 100;
    this.$progressBar.data("progress", progress).css("width", `${progress}%`);
    this.$progressCounter.text(`${completed} of ${this.opts.numOfChallenges}`);
  }

  _showFinalResults() {
    this._cancelTimers();
    this.$continueWrap.hide();
    this.$playWrap.hide();
    $("#controls").hide();

    const totalTaps = this._correctTaps + this._wrongTaps;
    const accuracy = totalTaps ? Math.round((this._correctTaps / totalTaps) * 100) : 0;
    const durationSec = Math.max(0, Math.floor((Date.now() - this._startedAt) / 1000));

    renderFinalResultsOverlay({
      $finalOverlay: this.$finalOverlay,
      rounds: this.opts.numOfChallenges,
      score: this._pointsValue,
      accuracy,
      durationSec,
      settingsBonus: false,
      playFinalSfx: () => this._playFinalSound(),
    });
  }

  _scheduleFigureAudio(figure, startsAtMs = 0, cardElement = null) {
    const beatMs = this._beatMs();

    figure.events.forEach((offset) => {
      this._setTimer(() => {
        this._playRhythmHit();
        if (!cardElement) return;

        cardElement.classList.remove("is-sounding");
        void cardElement.offsetWidth;
        cardElement.classList.add("is-sounding");
        this._setTimer(() => cardElement.classList.remove("is-sounding"), 120);
      }, startsAtMs + (offset * beatMs));
    });
  }

  async _ensureAudio() {
    if (!window.Tone) return;

    try {
      await Tone.start();
      await GameAudio.ensureMetronomeAudio();
      if (!this._rhythmSynth) {
        this._rhythmSynth = new Tone.MembraneSynth({
          pitchDecay: 0.012,
          octaves: 0.8,
          oscillator: { type: "sine" },
          envelope: { attack: 0.001, decay: 0.085, sustain: 0, release: 0.02 },
          volume: -2,
        }).toDestination();
      }
      if (this.opts.sound && !this._audioReady) {
        this._uiSynth = GameAudio.createUiPolySynth();
        this._uiNoise = GameAudio.createUiNoiseSynth();
        this._audioReady = true;
      }
    } catch (_) {
      this._setStatus("Audio could not start. Check your browser sound settings.");
    }
  }

  _playRhythmHit() {
    if (!this._rhythmSynth || !window.Tone) return;

    this._rhythmSynth.triggerAttackRelease("C5", "32n", Tone.now(), 0.95);
  }

  _playSuccessSound() {
    if (!this.opts.sound || !this._uiSynth || !window.Tone) return;

    const now = Tone.now();
    ["C6", "E6", "G6"].forEach((note, index) => {
      this._uiSynth.triggerAttackRelease(note, 0.08, now + (index * 0.055), GameAudio.scale("successBasic", 0.5));
    });
  }

  _playFailSound() {
    if (!this.opts.sound || !this._audioReady || !window.Tone) return;

    const now = Tone.now();
    this._uiNoise?.triggerAttackRelease(0.06, now, GameAudio.scale("failNoise", 0.35));
    this._uiSynth?.triggerAttackRelease("A2", 0.1, now + 0.02, GameAudio.scale("failNote", 0.45));
  }

  _playFinalSound() {
    if (!this.opts.sound || !this._uiSynth || !window.Tone) return;

    const now = Tone.now();
    ["C5", "E5", "G5", "C6"].forEach((note, index) => {
      this._uiSynth.triggerAttackRelease(note, 0.16, now + (index * 0.08), GameAudio.scale("final", 0.5));
    });
  }

  _activateDot(index) {
    const dot = this.$dots.find(".sequence-dot").get(index);
    if (!dot) return;

    dot.classList.remove("is-complete", "is-wrong", "is-chosen");
    dot.classList.add("is-active");
  }

  _completeDot(index) {
    const dot = this.$dots.find(".sequence-dot").get(index);
    if (!dot) return;

    dot.classList.remove("is-active");
    dot.classList.add("is-complete");
  }

  _chooseDot(index) {
    const dot = this.$dots.find(".sequence-dot").get(index);
    if (!dot) return;

    dot.classList.remove("is-active", "is-wrong");
    dot.classList.add("is-chosen");
  }

  _wrongDot(index) {
    const dot = this.$dots.find(".sequence-dot").get(index);
    if (!dot) return;

    dot.classList.remove("is-active", "is-complete", "is-chosen");
    dot.classList.add("is-wrong");
  }

  _resetDots() {
    this.$dots.find(".sequence-dot").removeClass("is-active is-complete is-chosen is-wrong");
  }

  _clearSelectionMarks() {
    this.$grid.find(".rhythm-card")
      .removeClass("is-correct is-wrong is-previewing is-sounding");
    this.$grid.find(".rhythm-card__number").text("");
  }

  _setPlayButtons(isPlaying) {
    this.$playWrap.show();
    this.$playBtn.toggle(!isPlaying);
    this.$stopBtn.toggle(isPlaying);
  }

  _setStatus(message) {
    this.$status.text(message);
  }

  _beatMs() {
    return 60000 / this.opts.bpm;
  }

  _setTimer(callback, delayMs) {
    const timer = setTimeout(() => {
      this._timers.delete(timer);
      callback();
    }, Math.max(0, delayMs));
    this._timers.add(timer);
    return timer;
  }

  _cancelTimers() {
    this._timers.forEach((timer) => clearTimeout(timer));
    this._timers.clear();
  }

  _shuffle(items) {
    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const other = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]];
    }
    return shuffled;
  }

  _normalizeChallengeCount(value) {
    const count = Math.trunc(Number(value));
    if (!Number.isFinite(count)) return 4;
    return Math.min(BeatHero.MAX_CHALLENGES, Math.max(BeatHero.MIN_CHALLENGES, count));
  }

  _normalizeBpm(value) {
    const bpm = Number(value);
    if (!Number.isFinite(bpm)) return 80;
    return Math.min(160, Math.max(50, bpm));
  }

  _normalizeFigureIds(value) {
    const validIds = new Set(BeatHero.FIGURES.map((figure) => figure.id));
    const selected = [...new Set(Array.isArray(value) ? value : [])]
      .filter((figureId) => validIds.has(figureId))
      .slice(0, 4);

    BeatHero.DEFAULT_FIGURE_IDS.forEach((figureId) => {
      if (selected.length < 2 && !selected.includes(figureId)) selected.push(figureId);
    });

    return selected;
  }

  _normalizeBool(value) {
    return value === true
      || value === 1
      || ["1", "true", "on", "yes"].includes(String(value).toLowerCase());
  }
}
