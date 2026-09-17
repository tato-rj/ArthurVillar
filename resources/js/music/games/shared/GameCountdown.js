import { GameAudio } from "./GameAudio.js";

export class GameCountdown {
  static STEPS = ["3", "2", "1", "GO!"];

  constructor({ element, soundEnabled = () => true } = {}) {
    this.element = typeof element === "string" ? document.querySelector(element) : element;
    this.valueElement = this.element?.querySelector("[data-game-countdown-value]") || null;
    this.startButton = this.element?.querySelector("[data-game-countdown-start]") || null;
    this.soundEnabled = soundEnabled;
    this._timers = new Set();
    this._startHandler = null;
  }

  get exists() {
    return Boolean(this.element && this.valueElement);
  }

  async prepareAudio() {
    if (!this._soundEnabled() || !window.Tone) return;

    try {
      await GameAudio.ensureMetronomeAudio();
    } catch (_) {}
  }

  showStart(onStart) {
    this.cancel();

    if (!this.exists || !this.startButton) {
      onStart?.();
      return;
    }

    this.element.hidden = false;
    this.valueElement.hidden = true;
    this.valueElement.textContent = "";
    this.startButton.hidden = false;

    this._startHandler = (event) => {
      event.preventDefault();
      this._removeStartHandler();
      this.startButton.hidden = true;
      onStart?.();
    };
    this.startButton.addEventListener("click", this._startHandler, { once: true });
  }

  start({ beatMs = 1000, onComplete } = {}) {
    this.cancel();

    const interval = Math.max(1, Number(beatMs) || 1000);
    const duration = GameCountdown.STEPS.length * interval;

    if (!this.exists) {
      this._setTimer(() => onComplete?.(), duration);
      return duration;
    }

    this.element.hidden = false;
    if (this.startButton) this.startButton.hidden = true;
    this.valueElement.hidden = false;

    GameCountdown.STEPS.forEach((label, index) => {
      const showStep = () => {
        this.valueElement.textContent = label;
        if (this._soundEnabled()) GameAudio.playMetronomeClick(label === "GO!");
      };

      if (index === 0) showStep();
      else this._setTimer(showStep, index * interval);
    });

    this._setTimer(() => {
      this.hide();
      onComplete?.();
    }, duration);

    return duration;
  }

  hide() {
    if (this.element) this.element.hidden = true;
    if (this.valueElement) {
      this.valueElement.hidden = true;
      this.valueElement.textContent = "";
    }
  }

  cancel() {
    this._timers.forEach((timer) => clearTimeout(timer));
    this._timers.clear();
    this._removeStartHandler();
    this.hide();
  }

  _setTimer(callback, delayMs) {
    const timer = setTimeout(() => {
      this._timers.delete(timer);
      callback();
    }, Math.max(0, delayMs));
    this._timers.add(timer);
    return timer;
  }

  _removeStartHandler() {
    if (this.startButton && this._startHandler) {
      this.startButton.removeEventListener("click", this._startHandler);
    }
    this._startHandler = null;
  }

  _soundEnabled() {
    return typeof this.soundEnabled === "function"
      ? Boolean(this.soundEnabled())
      : Boolean(this.soundEnabled);
  }
}
