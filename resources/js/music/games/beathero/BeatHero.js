import { renderFinalResultsOverlay } from "../shared/finalResults.js";
import { GameAudio } from "../shared/GameAudio.js";
import { rhythmNotationSvg } from "./rhythmNotation.js";

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
      numOfCards: 2,
      bpm: 80,
      practiceMode: false,
      figures: BeatHero.DEFAULT_FIGURE_IDS,
      sound: true,
      ...options,
    };

    this.opts.numOfChallenges = this._normalizeChallengeCount(this.opts.numOfChallenges);
    this.opts.numOfCards = this._normalizeCardCount(this.opts.numOfCards);
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
    this._countIn = document.querySelector("#beat-hero-count-in");
    this._countInWord = this._countIn?.querySelector("[data-count-in-word]");
    this._playbackRun = 0;

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
    const sequence = [];
    while (sequence.length < this.opts.numOfCards) {
      sequence.push(...this._shuffle(pool));
    }
    this._answer = sequence.slice(0, this.opts.numOfCards);

    this._renderCards();
    this.$dots
      .attr("aria-label", `${this.opts.numOfCards}-card sequence progress`)
      .html(this._answer.map(() => '<span class="sequence-dot" aria-hidden="true"></span>').join(""));
    this._resetDots();
    this._setStatus(this._readyInstructions());
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
    return rhythmNotationSvg(figure);
  }

  async _playChallenge() {
    if (this._state === "playing" || this._state === "complete") return;

    this._cancelTimers();
    this._clearSelectionMarks();
    this._selection = [];
    this._state = "playing";
    this._inputLocked = true;
    this._resetDots();
    this._setStatus("Get ready…");
    this._setPlayButtons(true);

    const playbackRun = this._playbackRun;
    await this._ensureAudio();
    if (this._state !== "playing" || playbackRun !== this._playbackRun) return;

    const beatMs = this._beatMs();
    const slotMs = beatMs;
    const countInMs = 3 * beatMs;

    this._showCountInWord("READY", beatMs);
    this._setTimer(() => this._showCountInWord("SET", beatMs), beatMs);
    this._setTimer(() => this._showCountInWord("GO!", beatMs), 2 * beatMs);
    this._setTimer(() => {
      this._hideCountIn();
      this._setStatus("Listen carefully…");
    }, countInMs);

    this._answer.forEach((figure, index) => {
      const startsAt = countInMs + (index * slotMs);
      this._setTimer(() => this._activateDot(index), startsAt);
      this._scheduleFigureAudio(figure, startsAt);
      this._setTimer(() => this._completeDot(index), startsAt + beatMs);
    });

    this._setTimer(() => {
      this._state = "answering";
      this._inputLocked = false;
      this._setPlayButtons(false);
      this._resetDots();
      this._setStatus(`Now tap the ${this.opts.numOfCards} cards you heard, in order.`);
    }, countInMs + (this._answer.length * slotMs) + 120);
  }

  _showCountInWord(word, beatMs) {
    if (!this._countIn || !this._countInWord) return;
    this._countIn.hidden = false;
    this._countInWord.classList.remove("animate__zoomIn");
    this._countInWord.textContent = word;
    this._countInWord.style.setProperty("--animate-duration", `${beatMs}ms`);
    // Restart the entrance animation for each beat without moving its center.
    void this._countInWord.offsetWidth;
    this._countInWord.classList.add("animate__zoomIn");
  }

  _hideCountIn() {
    if (this._countIn) this._countIn.hidden = true;
    if (this._countInWord) {
      this._countInWord.textContent = "";
      this._countInWord.classList.remove("animate__zoomIn");
    }
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
      this._setStatus(this._readyInstructions());
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
      const badge = cardElement.querySelector(".rhythm-card__number");
      badge.textContent = [badge.textContent, answerIndex + 1].filter(Boolean).join(", ");
      this._chooseDot(answerIndex);

      if (this._selection.length === this._answer.length) {
        this._finishRound();
        return;
      }

      this._setStatus(`Great — now choose card ${answerIndex + 2} of ${this.opts.numOfCards}.`);
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
    this._setStatus("Perfect order! Ready for another sequence?");
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

  _readyInstructions() {
    const repeatHint = this.opts.numOfCards > this.opts.figures.length
      ? " Rhythms can repeat; tap the same card again when needed."
      : "";
    return `Press Play, listen to the ${this.opts.numOfCards} rhythms, then tap their cards in the same order.${repeatHint}`;
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
    this._playbackRun += 1;
    this._timers.forEach((timer) => clearTimeout(timer));
    this._timers.clear();
    this._hideCountIn();
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

  _normalizeCardCount(value) {
    const count = Math.trunc(Number(value));
    if (!Number.isFinite(count)) return 2;
    return Math.min(6, Math.max(2, count));
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
