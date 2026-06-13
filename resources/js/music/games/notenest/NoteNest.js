import { BaseStaffGame } from "../base/BaseStaffGame.js";
import { normalizeClefPool, pickChallengeClef } from "../shared/challengeUtils.js";
import { accidentalClassToText, pickWeighted, stepToLetterOctave } from "../../staff/staffUtils.js";

export class NoteNest extends BaseStaffGame {
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
      basePoints: 1,
      firstTryBonus: 2,
      namespace: "noteNest",
    };

    const merged = { ...defaults, ...(options || {}) };
    const clefPool = normalizeClefPool(
      merged.clefs != null ? merged.clefs : merged.clef,
    );

    super({
      ...merged,
      initialClef: (clefPool && clefPool[0]) ? clefPool[0] : "treble",
    });

    this._clefPool = clefPool;
    this._targetNote = null;
    this._lastTargetSignature = null;
    this._blockMarkerClass = "block-marker";
    this._lastPlayedNote = null;
    this.$playNoteWrap = $("#play-note");
    this.$playNoteBtn = this.$playNoteWrap.find("button");
    this.$playSoundModal = $("#play-sound-modal");
    this.$playIcon = $("#play-icon");
    this.$playSoundStatus = $("#play-sound-status");
    this.$playSoundDetected = $("#play-sound-detected");
    this.$confirmSoundWrap = this.$playSoundModal.find("#confirm-sound");
    this.$confirmSoundBtn = this.$confirmSoundWrap.find("button");
    this.$retrySoundWrap = this.$playSoundModal.find("#retry");
    this.$retrySoundBtn = this.$retrySoundWrap.find("button");
    this._playedNoteConfirmed = false;
    this._pitchAudioContext = null;
    this._pitchStream = null;
    this._pitchSource = null;
    this._pitchAnalyser = null;
    this._pitchData = null;
    this._pitchFrame = null;
    this._pitchStartFrame = null;
    this._pitchInputStarting = false;
    this._stablePitch = { midi: null, frequency: null, count: 0 };
  }

  start() {
    super.start();
    this._wirePlayedNoteTracking();
    this._bindBlockMarkerDismiss();
    this.prompt.show();
    this._setPromptForTarget(this._targetNote);
  }

  _requiresPlayedNote() {
    return this._normalizeOnOff(this.opts.requirePlayedNote);
  }

  _isLikelyMobileDevice() {
    return window.matchMedia?.("(pointer: coarse)")?.matches ||
      /Android|iPhone|iPad|iPod/i.test(window.navigator?.userAgent || "");
  }

  _resetPlayedNote() {
    this._lastPlayedNote = null;
    this._playedNoteConfirmed = false;
    this._hideRecordedSoundActions();
  }

  _setPlaySoundModalStatus(status, detected = "") {
    this.$playSoundStatus?.text?.(status);
    this.$playSoundDetected?.text?.(detected);
  }

  _setPlayIconState(state = "idle") {
    const $icon = this.$playIcon;
    if (!$icon?.length) return;

    $icon.removeClass("listening heard text-yellow text-green animate__animated animate__tada");
    this._setPlayIconGraphic(state !== "idle");

    if (state === "listening") {
      $icon.addClass("listening text-yellow");
      return;
    }

    if (state === "heard") {
      $icon.addClass("heard text-green animate__animated animate__tada");
    }
  }

  _setPlayIconGraphic(enabled) {
    const activeIcon = "microphone-lines";
    const inactiveIcon = "microphone-lines-slash";
    const fromIcon = enabled ? inactiveIcon : activeIcon;
    const toIcon = enabled ? activeIcon : inactiveIcon;
    const $iconEl = this.$playIcon.find(`[data-icon="${fromIcon}"], .fa-${fromIcon}`);

    $iconEl.attr("data-icon", toIcon);
    $iconEl.removeClass(`fa-${fromIcon}`).addClass(`fa-${toIcon}`);
  }

  _hideConfirmSoundButton() {
    this.$confirmSoundWrap?.hide?.().addClass?.("invisible");
  }

  _showConfirmSoundButton() {
    this.$confirmSoundWrap?.show?.().removeClass?.("invisible");
  }

  _hideRetrySoundButton() {
    this.$retrySoundWrap?.hide?.().addClass?.("invisible");
  }

  _showRetrySoundButton() {
    this.$retrySoundWrap?.show?.().removeClass?.("invisible");
  }

  _hideRecordedSoundActions() {
    this._hideConfirmSoundButton();
    this._hideRetrySoundButton();
  }

  _hasEnoughUserNotesForCheck(count = this._currentUserNoteCount()) {
    const userNoteCount = Number.isFinite(count) ? count : this._currentUserNoteCount();
    return this._checkAfterUserNotes() <= 0 || userNoteCount >= this._checkAfterUserNotes();
  }

  _syncPlayedNoteGate(count = this._currentUserNoteCount()) {
    if (!this.$playNoteWrap?.length) return;

    if (!this._requiresPlayedNote()) {
      this.$playNoteWrap.hide().addClass("invisible");
      this._hideRecordedSoundActions();
      return;
    }

    const readyForPlayedNote = this._hasEnoughUserNotesForCheck(count);
    $("#check").hide().addClass("invisible");

    if (readyForPlayedNote && this._lastPlayedNote && this._playedNoteConfirmed) {
      this.$playNoteWrap.hide().addClass("invisible");
      $("#check").show().removeClass("invisible");
    } else if (readyForPlayedNote) {
      this.$playNoteWrap.show().removeClass("invisible");
    } else {
      this.$playNoteWrap.hide().addClass("invisible");
    }
  }

  _showPlaySoundModal() {
    if (!this.$playSoundModal?.length) return;

    this._setPlaySoundModalStatus("Connecting...", "Getting the microphone ready.");
    this._hideRecordedSoundActions();
    this._setPlayIconState("idle");

    const el = this.$playSoundModal[0];
    if (window.bootstrap?.Modal?.getOrCreateInstance) {
      window.bootstrap.Modal.getOrCreateInstance(el).show();
      return;
    }

    if (typeof this.$playSoundModal.modal === "function") {
      this.$playSoundModal.modal("show");
    }
  }

  _hidePlaySoundModal() {
    if (!this.$playSoundModal?.length) return;

    const el = this.$playSoundModal[0];
    if (window.bootstrap?.Modal?.getOrCreateInstance) {
      window.bootstrap.Modal.getOrCreateInstance(el).hide();
      return;
    }

    if (typeof this.$playSoundModal.modal === "function") {
      this.$playSoundModal.modal("hide");
    }
  }

  _midiToNoteName(midi) {
    if (!Number.isFinite(midi)) return "";
    return this.keyboard?._noteNameFromMidi?.(midi) || `MIDI ${midi}`;
  }

  _noteMidi(note) {
    if (!note || !this.staff) return null;
    const naturalMidi = this.staff._stepToMidi?.(note.step);
    if (!Number.isFinite(naturalMidi)) return null;
    const accidentalOffset = this.staff._accidentalClassToOffset?.(note.accidentalClass) || 0;
    return naturalMidi + accidentalOffset;
  }

  _onPianoKeyboardKeyClick(data) {
    if (!this._requiresPlayedNote()) return;
    const $key = data?.$key;
    const midi = Number($key?.attr?.("data-midi"));
    if (!Number.isFinite(midi)) return;

    this._lastPlayedNote = {
      midi,
      noteName: String(data?.noteName || ""),
    };
    this._playedNoteConfirmed = true;
    this._syncPlayedNoteGate();
  }

  _wirePlayedNoteTracking() {
    this.$staffEl
      .off(`staff:noteState.${this.ns}.playedNote staff:userNotesChanged.${this.ns}.playedNote`)
      .on(`staff:noteState.${this.ns}.playedNote staff:userNotesChanged.${this.ns}.playedNote`, (e, data) => {
        if (!this._requiresPlayedNote()) return;
        if (e.type === "staff:noteState" && data?.source === "fixed") return;
        this._resetPlayedNote();
        this._syncPlayedNoteGate(Number(data?.count));
      });

    this.$playNoteBtn
      ?.off?.(`click.${this.ns}.playedNote`)
      ?.on?.(`click.${this.ns}.playedNote`, (e) => {
        e.preventDefault();
        this._showPlaySoundModal();
        this._beginPitchRecording();
      });

    this.$confirmSoundBtn
      ?.off?.(`click.${this.ns}.playedNote`)
      ?.on?.(`click.${this.ns}.playedNote`, (e) => {
        e.preventDefault();
        if (!this._lastPlayedNote) return;
        this._playedNoteConfirmed = true;
        this._hidePlaySoundModal();
        this._syncPlayedNoteGate();
      });

    this.$retrySoundBtn
      ?.off?.(`click.${this.ns}.playedNote`)
      ?.on?.(`click.${this.ns}.playedNote`, (e) => {
        e.preventDefault();
        this._beginPitchRecording();
      });

    this.$playSoundModal
      ?.off?.(`hidden.bs.modal.${this.ns}.playedNote`)
      ?.on?.(`hidden.bs.modal.${this.ns}.playedNote`, () => {
        this._stopPitchInput();
      });
  }

  _armUiGates(args) {
    super._armUiGates(args);
    this._syncPlayedNoteGate();
  }

  _displayNameForLetter(letter) {
    const clean = String(letter || "").trim().toUpperCase();
    if (this._showSolfegeNoteNames()) return NoteNest.LETTER_TO_SOLFEGE[clean] || clean;
    return clean;
  }

  _handlePlayedNoteHeard(midi, noteName, frequency) {
    this._lastPlayedNote = { midi, noteName, frequency };
    this._playedNoteConfirmed = false;
    this._stopPitchInput({ keepIconState: true });
    this._setPlayIconState("heard");
    this._setPlaySoundModalStatus("Note heard", `Detected ${noteName}`);
    this._showConfirmSoundButton();
    this._showRetrySoundButton();
  }

  _beginPitchRecording() {
    this._stopPitchInput();
    this._lastPlayedNote = null;
    this._playedNoteConfirmed = false;
    this._hideRecordedSoundActions();
    this._setPlaySoundModalStatus("Connecting...", "Getting the microphone ready.");
    this._setPlayIconState("idle");
    this._stablePitch = { midi: null, frequency: null, count: 0 };
    if (this._pitchStartFrame) cancelAnimationFrame(this._pitchStartFrame);
    this._pitchStartFrame = requestAnimationFrame(() => {
      this._pitchStartFrame = null;
      this._startPitchInput();
    });
  }

  _startPitchInput() {
    if (this._pitchInputStarting || this._pitchAnalyser) return Promise.resolve();

    if (!window.isSecureContext) {
      this._setPlayIconState("idle");
      this._setPlaySoundModalStatus("Microphone unavailable", "Use HTTPS or localhost to enable listening.");
      return Promise.resolve();
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      this._setPlayIconState("idle");
      this._setPlaySoundModalStatus("Microphone unavailable", "This browser cannot access microphone input.");
      return Promise.resolve();
    }

    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) {
      this._setPlayIconState("idle");
      this._setPlaySoundModalStatus("Microphone unavailable", "This browser cannot analyze live audio.");
      return Promise.resolve();
    }

    this._pitchInputStarting = true;
    this._stablePitch = { midi: null, frequency: null, count: 0 };
    this._setPlaySoundModalStatus("Connecting...", "Getting the microphone ready.");

    return navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: true,
      },
    }).then((stream) => {
      this._pitchAudioContext = new AudioContextCtor();
      this._pitchAudioContext.resume?.();
      this._pitchStream = stream;
      this._pitchSource = this._pitchAudioContext.createMediaStreamSource(stream);
      this._pitchAnalyser = this._pitchAudioContext.createAnalyser();
      this._pitchAnalyser.fftSize = 8192;
      this._pitchData = new Float32Array(this._pitchAnalyser.fftSize);
      this._pitchSource.connect(this._pitchAnalyser);
      this._pitchInputStarting = false;
      this._setPlaySoundModalStatus("Listening...", "Play or sing one clear note.");
      this._setPlayIconState("listening");
      this._listenForPitch();
    }).catch(() => {
      this._pitchInputStarting = false;
      this._setPlayIconState("idle");
      this._setPlaySoundModalStatus("Microphone blocked", "Allow microphone access, then try again.");
    });
  }

  _stopPitchInput({ keepIconState = false } = {}) {
    if (this._pitchFrame) {
      cancelAnimationFrame(this._pitchFrame);
      this._pitchFrame = null;
    }
    if (this._pitchStartFrame) {
      cancelAnimationFrame(this._pitchStartFrame);
      this._pitchStartFrame = null;
    }

    this._pitchStream?.getTracks?.().forEach((track) => track.stop());
    this._pitchAudioContext?.close?.();
    this._pitchAudioContext = null;
    this._pitchStream = null;
    this._pitchSource = null;
    this._pitchAnalyser = null;
    this._pitchData = null;
    this._pitchInputStarting = false;
    this._stablePitch = { midi: null, frequency: null, count: 0 };
    if (!keepIconState) this._setPlayIconState("idle");
  }

  _listenForPitch() {
    if (!this._pitchAnalyser || !this._pitchData || !this._pitchAudioContext) return;

    this._pitchAnalyser.getFloatTimeDomainData(this._pitchData);
    const pitch = this._detectPitch(this._pitchData, this._pitchAudioContext.sampleRate);
    const frequency = pitch?.frequency;

    if (Number.isFinite(frequency)) {
      const midi = this._frequencyToMidi(frequency);
      const noteName = this._midiToNoteName(midi);
      this._setPlaySoundModalStatus("Listening...", `Detected ${noteName}`);

      const semitoneDistance = Number.isFinite(this._stablePitch.frequency)
        ? Math.abs(12 * Math.log2(frequency / this._stablePitch.frequency))
        : Infinity;

      if (midi === this._stablePitch.midi || semitoneDistance <= 0.75) {
        this._stablePitch.count += 1;
        this._stablePitch.frequency = ((this._stablePitch.frequency * 0.75) + (frequency * 0.25));
        this._stablePitch.midi = this._frequencyToMidi(this._stablePitch.frequency);
      } else {
        this._stablePitch = { midi, frequency, count: 1 };
      }

      if (this._stablePitch.count >= 3) {
        const stableMidi = this._frequencyToMidi(this._stablePitch.frequency);
        this._handlePlayedNoteHeard(stableMidi, this._midiToNoteName(stableMidi), this._stablePitch.frequency);
        return;
      }
    } else {
      this._stablePitch = { midi: null, frequency: null, count: 0 };
    }

    this._pitchFrame = requestAnimationFrame(() => this._listenForPitch());
  }

  _frequencyToMidi(frequency) {
    return Math.round(69 + (12 * Math.log2(frequency / 440)));
  }

  _detectPitch(buffer, sampleRate) {
    const isMobile = this._isLikelyMobileDevice();
    const minRms = isMobile ? 0.006 : 0.014;
    const minPeak = isMobile ? 0.022 : 0.045;
    const trimThreshold = isMobile ? 0.035 : 0.06;
    const minConfidence = isMobile ? 0.12 : 0.16;
    let rms = 0;
    let peak = 0;

    for (let i = 0; i < buffer.length; i += 1) {
      const sample = Math.abs(buffer[i]);
      rms += buffer[i] * buffer[i];
      if (sample > peak) peak = sample;
    }

    rms = Math.sqrt(rms / buffer.length);
    if (rms < minRms || peak < minPeak) return null;

    let start = 0;
    let end = buffer.length - 1;
    const threshold = trimThreshold;

    for (let i = 0; i < buffer.length / 2; i += 1) {
      if (Math.abs(buffer[i]) < threshold) {
        start = i;
        break;
      }
    }

    for (let i = 1; i < buffer.length / 2; i += 1) {
      if (Math.abs(buffer[buffer.length - i]) < threshold) {
        end = buffer.length - i;
        break;
      }
    }

    const trimmed = buffer.slice(start, end);
    const trimmedSize = trimmed.length;
    if (trimmedSize < 32) return null;

    const minLag = Math.max(1, Math.floor(sampleRate / 2000));
    const maxLag = Math.min(trimmedSize - 1, Math.ceil(sampleRate / 40));
    const correlations = new Array(maxLag + 1).fill(0);
    let zeroLag = 0;

    for (let i = 0; i < trimmedSize; i += 1) {
      zeroLag += trimmed[i] * trimmed[i];
    }

    if (zeroLag <= 0) return null;

    for (let lag = minLag; lag <= maxLag; lag += 1) {
      for (let i = 0; i < trimmedSize - lag; i += 1) {
        correlations[lag] += trimmed[i] * trimmed[i + lag];
      }
    }

    let maxValue = -Infinity;
    let maxPosition = -1;
    for (let i = minLag; i <= maxLag; i += 1) {
      if (correlations[i] > maxValue) {
        maxValue = correlations[i];
        maxPosition = i;
      }
    }

    if (maxPosition <= 0) return null;
    if ((maxValue / zeroLag) < minConfidence) return null;

    const x1 = correlations[maxPosition - 1] || 0;
    const x2 = correlations[maxPosition] || 0;
    const x3 = correlations[maxPosition + 1] || 0;
    const divisor = (2 * x2) - x1 - x3;
    const shift = divisor ? (x3 - x1) / (2 * divisor) : 0;

    const frequency = sampleRate / (maxPosition + shift);

    if (!Number.isFinite(frequency) || frequency < 40 || frequency > 2000) return null;

    return { frequency };
  }

  _targetAccidentalClass() {
    if (!this._normalizeOnOff(this.opts.allowAccidentals)) return null;

    const w = this.opts.accidentalWeights || {};
    const naturalWeight = Number(w.natural);
    const sharpWeight = Number(w.sharp);
    const flatWeight = Number(w.flat);

    if (Number.isFinite(naturalWeight) || Number.isFinite(sharpWeight) || Number.isFinite(flatWeight)) {
      return pickWeighted([
        { value: null, weight: Number.isFinite(naturalWeight) ? naturalWeight : 0 },
        { value: "music-font__sharp", weight: Number.isFinite(sharpWeight) ? sharpWeight : 0 },
        { value: "music-font__flat", weight: Number.isFinite(flatWeight) ? flatWeight : 0 },
      ]);
    }

    return Math.random() < 0.5 ? "music-font__sharp" : "music-font__flat";
  }

  _isBlockNoteEnabled() {
    return this._normalizeOnOff(this.opts.blockNote);
  }

  _blockIconClassName() {
    const raw = String(this.opts.blockIcon || "").trim();
    const clean = raw.replace(/^fa-/, "").replace(/[^a-z0-9-]/gi, "");
    return clean ? `fa-solid fa-${clean}` : "fa-solid fa-lock";
  }

  _blockTooltipNoteName(target) {
    if (!target) return "";
    const acc = String(target.accidentalClass || "");
    const accText = acc.includes("doublesharp")
      ? " double sharp"
      : acc.includes("sharp")
        ? " sharp"
        : acc.includes("doubleflat")
          ? " double flat"
          : acc.includes("flat")
            ? " flat"
            : "";
    return `${this._displayNameForLetter(target.letter)}${accText}`;
  }

  _blockTooltipText(target) {
    return `This note is blocked, can you find another ${this._blockTooltipNoteName(target)}?`;
  }

  _alternateStepsForTarget(target) {
    if (!target || !this.staff) return [];

    const minStep = this.staff.minStepAllowed();
    const maxStep = this.staff.maxStepAllowed();
    const out = [];

    for (let step = minStep; step <= maxStep; step += 1) {
      if (step === target.step) continue;
      const noteState = stepToLetterOctave(this.staff, step);
      if (String(noteState?.letter || "") !== String(target.letter || "")) continue;
      out.push(step);
    }

    return out;
  }

  _pickHintStepForTarget(target) {
    const alternates = this._alternateStepsForTarget(target);
    if (alternates.length) return alternates[Math.floor(Math.random() * alternates.length)];
    return target?.step ?? null;
  }

  _clearBlockMarker() {
    const $marker = this.$staffEl.find(`.${this._blockMarkerClass}`);
    if ($marker.length && $.fn.tooltip) {
      try {
        $marker.tooltip("dispose");
      } catch (_) {}
    }
    $marker.remove();
    this.staff?.clearBlockedSteps?.();
  }

  _hideBlockMarkerTooltip() {
    const $marker = this.$staffEl.find(`.${this._blockMarkerClass}`);
    if (!$marker.length || !$.fn.tooltip) return;
    try {
      $marker.tooltip("hide");
    } catch (_) {}
  }

  _bindBlockMarkerDismiss() {
    $(document)
      .off(`pointerdown.${this.ns}.blockTooltip mousedown.${this.ns}.blockTooltip`, "*")
      .on(`pointerdown.${this.ns}.blockTooltip mousedown.${this.ns}.blockTooltip`, (e) => {
        if ($(e.target).closest(`.${this._blockMarkerClass}`).length) return;
        this._hideBlockMarkerTooltip();
      });
  }

  _renderBlockMarker(target) {
    this._clearBlockMarker();
    if (!this._isBlockNoteEnabled() || !target || !Number.isFinite(target.step)) return;

    this.staff.setBlockedSteps([target.step]);

    const $marker = $("<span></span>")
      .addClass(`block-icon ${this._blockMarkerClass}`)
      .attr("aria-hidden", "true")
      .attr("tabindex", "0")
      .attr("data-toggle", "tooltip")
      .attr("data-trigger", "click")
      .attr("data-placement", "top")
      .attr("title", this._blockTooltipText(target))
      .css({
        left: `${this.staff.centerX()}px`,
        top: `${this.staff.stepToY(target.step) + 3}px`,
      })
      .html(`<i class="${this._blockIconClassName()}"></i>`)
      .appendTo(this.$staffEl);

    if ($.fn.tooltip) {
      $marker.tooltip({
        trigger: "click",
      });
    }
  }

  _pickTargetStep() {
    const minStep = 0;
    const maxStep = 8;
    return Math.floor(Math.random() * (maxStep - minStep + 1)) + minStep;
  }

  _setPromptForTarget(target) {
    if (!target) return;
    const shortName = `${this._displayNameForLetter(target.letter)}${accidentalClassToText(target.accidentalClass)}`;
    this.prompt.setShort(shortName, { html: true });
    // this.prompt.setLong("Find this note on the staff");
  }

  _targetSignature(target) {
    if (!target) return "";
    return [
      String(target.letter || ""),
      String(target.accidentalClass || ""),
      String(target.step),
      String(target.octave),
    ].join("|");
  }

  _pickTargetNote() {
    const maxAttempts = 24;

    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
      const step = this._pickTargetStep();
      const noteState = stepToLetterOctave(this.staff, step);
      const target = {
        step,
        letter: noteState.letter,
        octave: noteState.octave,
        accidentalClass: this._targetAccidentalClass(),
      };

      if (this._isBlockNoteEnabled() && !this._alternateStepsForTarget(target).length) {
        continue;
      }

      if (this._targetSignature(target) !== this._lastTargetSignature) {
        return target;
      }
    }

    const fallbackStep = this._pickTargetStep();
    const fallbackState = stepToLetterOctave(this.staff, fallbackStep);
    return {
      step: fallbackStep,
      letter: fallbackState.letter,
      octave: fallbackState.octave,
      accidentalClass: this._targetAccidentalClass(),
    };
  }

  newChallenge() {
    const clef = pickChallengeClef(this._clefPool);
    if (clef && clef !== this.staff.getClef()) this.staff.setClef(clef);

    this._madeMistakeThisRound = false;
    this._usedHintThisRound = false;
    this._stopPitchInput();
    this._resetPlayedNote();

    this._clearBlockMarker();
    this.staff.clearNotes();
    this.$feedback.hide();
    this.$helpBtn.hide();
    this.$bonusBadge.hide();
    this.$doublePoints?.hide?.();

    this._targetNote = this._pickTargetNote();
    this._lastTargetSignature = this._targetSignature(this._targetNote);

    this.prompt.show();
    this._setPromptForTarget(this._targetNote);
    this._renderBlockMarker(this._targetNote);

    $("#check").show().removeClass("invisible");
    this._syncPlayedNoteGate(0);
    $("#continue").hide();
  }

  _collectUserNotes() {
    return this.$staffEl.find(".note").toArray()
      .map((el) => {
        const $note = $(el);
        const noteId = String($note.attr("data-note-id") || "");
        if (!noteId || this.staff.isNoteFixed(noteId)) return null;
        const top = parseFloat($note.css("top"));
        const step = Number.isFinite(top) ? this.staff.yToStep(top) : null;
        const accidentalClass = this.staff._getAttachedAccidentalClass?.(noteId) || null;
        return { noteId, step, accidentalClass };
      })
      .filter(Boolean);
  }

  _isUserAnswerCorrect() {
    const target = this._targetNote;
    if (!target) return false;

    const notes = this._collectUserNotes();
    if (notes.length !== 1) return false;

    const [note] = notes;
    const noteState = stepToLetterOctave(this.staff, note.step);
    return (
      String(noteState?.letter || "") === String(target.letter || "") &&
      String(note.accidentalClass || "") === String(target.accidentalClass || "") &&
      this._isPlayedNoteCorrect(note)
    );
  }

  _isPlayedNoteCorrect(note) {
    if (!this._requiresPlayedNote()) return true;
    if (!this._playedNoteConfirmed) return false;
    const targetMidi = this._noteMidi(note);
    const playedMidi = Number(this._lastPlayedNote?.midi);
    return Number.isFinite(targetMidi) && playedMidi === targetMidi;
  }

  _computeHintAnswers() {
    if (!this._targetNote) return [{ step: null, accidentalClass: null }];
    return [{
      step: this._isBlockNoteEnabled()
        ? this._pickHintStepForTarget(this._targetNote)
        : this._targetNote.step,
      accidentalClass: this._targetNote.accidentalClass || null,
    }];
  }

  _onCheck() {
    this.$checkBtn.disable();
    this._stats.checksTotal += 1;

    if (this._isUserAnswerCorrect()) {
      this._stats.checksCorrect += 1;
      this._pauseGameTimer();
      this._stopPitchInput();
      this.$playNoteWrap?.hide?.().addClass?.("invisible");
      this._hideConfirmSoundButton();

      const { earned, bonusEarned } = this._awardPointsForCorrect();
      this._handleCorrectAnswerUi({
        isBonus: bonusEarned > 0,
        earned,
        $prompt: this.prompt.$root,
      });
      return;
    }

    this._madeAnyMistake = true;
    this._madeMistakeThisRound = true;
    this._failAnimation(this.$checkWrap);
    this.$helpBtn.show();
  }
}
