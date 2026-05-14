import { GameAudio } from "../shared/GameAudio.js";

export class BeatHero {
  constructor(options = {}) {
    this.opts = {
      wrapperSelector: "#game-wrapper",
      previewSelector: "#preview-score",
      tapSelector: "#tap-wrapper",
      ...options,
    };
    this._resizeHandler = null;
    this._timeSignature = this._pickTimeSignature();
    this._bpm = this._normalizeBpm(this.opts.bpm);
    this._includeRests = this._normalizeBoolOption(this.opts.includeRests);
    this._useVoice = this._normalizeBoolOption(this.opts.useVoice);
    this._enabledNoteValues = this._normalizeNoteOptions(this.opts.notesValues || this.opts.notes);
    this._numOfMeasures = this._normalizeMeasureCount(this.opts.numOfMeasures);
    this._measures = [];
    this._rhythm = [];
    this._previewRhythm = null;
    this._activeMeasureNumber = 1;
    this._metronomeInterval = null;
    this._metronomeStartTimeout = null;
    this._rhythmAnimationTimeouts = [];
    this._rhythmHighlightTimeouts = [];
    this._metronomeTickIndex = 0;
    this._rhythmPlaybackStarted = false;
    this._metronomeAudioReady = false;
    this._metronomeIsStarting = false;
    this._rhythmStartTime = null;
    this._tapEvents = [];
    this._tapWindowMs = 120;
    this._voiceAudioContext = null;
    this._voiceAnalyser = null;
    this._voiceData = null;
    this._voiceStream = null;
    this._voiceFrame = null;
    this._voiceBaseline = 0.02;
    this._voiceIsActive = false;
    this._voiceInputStarting = false;
    this._lastVoiceTapTime = 0;
    this._voiceTapOffsetMs = 120;
    this.$playWrap = null;
    this.$playPlayBtn = null;
    this.$playStopBtn = null;
    this._resetMeasureQueue();
  }

  start() {
    this.renderChallenge();
    this._showInitialControls();
    this._syncInputMode();
    this._wirePlayControls();
    this._wireTapControls();
    if (this._useVoice) this._startVoiceInput();

    if (!this._resizeHandler) {
      this._resizeHandler = () => this.renderChallenge();
      window.addEventListener("resize", this._resizeHandler);
    }
  }

  renderChallenge() {
    const wrapper = document.querySelector(this.opts.wrapperSelector);
    const previewWrapper = document.querySelector(this.opts.previewSelector);
    if (!wrapper && !previewWrapper) return;

    this._setPreviewWrapperVisible(Boolean(this._previewRhythm));

    if (this._previewRhythm) {
      this._renderRhythmMeasure({
        wrapper: previewWrapper,
        rhythm: this._previewRhythm,
        showClef: false,
        showTimeSignature: false,
        showBarlines: false,
        isFinalMeasure: this._activeMeasureNumber + 1 >= this._numOfMeasures,
      });
    } else {
      this._clearRhythmMeasure(previewWrapper);
    }

    this._renderRhythmMeasure({
      wrapper,
      rhythm: this._rhythm,
      showTimeSignature: this._activeMeasureNumber === 1,
      isFinalMeasure: this._activeMeasureNumber >= this._numOfMeasures,
    });
  }

  _setPreviewWrapperVisible(isVisible) {
    const previewWrapper = document.querySelector(this.opts.previewSelector);
    const previewContainer = previewWrapper?.closest("#preview-wrapper") || previewWrapper;
    if (!previewContainer) return;

    previewContainer.classList.toggle("d-none", !isVisible);
    previewContainer.style.display = isVisible ? "block" : "none";
  }

  _renderRhythmMeasure({
    wrapper,
    rhythm,
    showClef = true,
    showTimeSignature = true,
    showBarlines = true,
    isFinalMeasure = false,
  }) {
    if (!wrapper) return;

    wrapper.innerHTML = "";
    wrapper.classList.add("beat-hero-wrapper");
    if (wrapper.matches(this.opts.wrapperSelector)) {
      const beatCount = document.createElement("div");
      beatCount.id = "beat-count";
      wrapper.appendChild(beatCount);
    }

    const VF = window.Vex?.Flow;
    if (!VF) {
      wrapper.textContent = "VexFlow could not be loaded.";
      return;
    }

    const width = Math.max(1, Math.floor(wrapper.clientWidth || 1));
    const height = 190;
    const renderer = new VF.Renderer(wrapper, VF.Renderer.Backends.SVG);
    renderer.resize(width, height);

    const context = renderer.getContext();
    context.setFont("Arial", 10);

    const stave = new VF.Stave(18, 24, width - 36, {
      fill_style: "#273043",
      spacing_between_lines_px: 14,
    });

    stave.setConfigForLines([
      { visible: false },
      { visible: false },
      { visible: true },
      { visible: false },
      { visible: false },
    ]);

    if (showClef) stave.addClef("percussion");
    if (showTimeSignature) stave.addTimeSignature(this._timeSignatureLabel());
    if (isFinalMeasure) {
      stave.setEndBarType?.(VF.Barline?.type?.END ?? 3);
    }
    stave.setContext(context).draw();

    const stemDirection = VF.Stem?.UP || 1;
    const glyphFontScale = this._rhythmNoteGlyphFontScale(wrapper);
    const notes = rhythm.map((duration) =>
      new VF.StaveNote({
        clef: "percussion",
        keys: ["b/4"],
        duration,
        glyph_font_scale: glyphFontScale,
        stem_direction: stemDirection,
      }),
    );
    this._extendStems(notes, 8);
    this._removeNoteSpacing(notes);

    const beams = VF.Beam.generateBeams(notes, {
      stem_direction: stemDirection,
    });

    this._drawQuarterGrid({
      VF,
      context,
      stave,
      notes,
      beams,
      rhythm,
      width,
    });

    this._alignVerticalStaveLines(wrapper);
    if (!showBarlines) this._removeVerticalStaveLines(wrapper);
    this._extendRenderedStems(wrapper, 10);
    this._moveStemTopAttachments(wrapper, 10);
  }

  _clearRhythmMeasure(wrapper) {
    if (!wrapper) return;

    wrapper.innerHTML = "";
    wrapper.classList.add("beat-hero-wrapper");
  }

  _showInitialControls() {
    $("#controls").show();
    $("#instructions").show();
    $("#check").show().removeClass("invisible");
    $("#continue").hide();
  }

  _wirePlayControls() {
    this.$playWrap = $("#play");
    this.$playPlayBtn = this.$playWrap.find('button[action="play"]');
    this.$playStopBtn = this.$playWrap.find('button[action="stop"]');

    this.$playPlayBtn
      .off("click.beatHeroMetronome")
      .on("click.beatHeroMetronome", (event) => {
        event.preventDefault();
        if (this._useVoice) this._startVoiceInput();
        this._startMetronome();
      });

    this.$playStopBtn
      .off("click.beatHeroMetronome")
      .on("click.beatHeroMetronome", (event) => {
        event.preventDefault();
        this._stopMetronome();
      });

    this._setPlayButtons(false);
  }

  _wireTapControls() {
    const tapWrapper = document.querySelector(this.opts.tapSelector);
    if (!tapWrapper) return;

    tapWrapper.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      this._handleTap();
    });
  }

  _syncInputMode() {
    const tapWrapper = document.querySelector(this.opts.tapSelector);
    if (!tapWrapper) return;

    tapWrapper.classList.toggle("d-none", this._useVoice);
    tapWrapper.style.display = this._useVoice ? "none" : "";
  }

  _setPlayButtons(isPlaying) {
    if (this.$playPlayBtn?.length) this.$playPlayBtn.toggle(!isPlaying);
    if (this.$playStopBtn?.length) this.$playStopBtn.toggle(!!isPlaying);
  }

  _startMetronome() {
    if (this._isMetronomeActive()) return;

    if (!window.Tone) {
      this._setPlayButtons(false);
      return;
    }

    if (this._shouldRewindMeasureQueueForPlayback()) {
      this._rewindMeasureQueue();
      this.renderChallenge();
    }

    this._setPlayButtons(true);
    this._metronomeIsStarting = true;

    this._ensureMetronomeAudio().then(() => {
      if (!this._metronomeIsStarting) return;

      this._metronomeStartTimeout = setTimeout(() => {
        if (!this._metronomeIsStarting) return;

        const intervalMs = 60000 / this._bpm;
        const playBeat = () => {
          if (this._shouldStopAtEndOfPiece()) {
            this._stopMetronome();
            return;
          }

          this._advanceMeasureIfNeeded();
          this._playMetronomeClick(this._isMetronomeDownbeat());
          this._updateBeatCount(intervalMs);
          this._handleMetronomeBeat(intervalMs);
          this._metronomeTickIndex += 1;
        };

        this._metronomeStartTimeout = null;
        this._metronomeIsStarting = false;
        this._metronomeTickIndex = 0;
        this._rhythmPlaybackStarted = false;
        playBeat();
        this._metronomeInterval = setInterval(playBeat, intervalMs);
      }, 1000);
    }).catch(() => {
      this._metronomeIsStarting = false;
      this._setPlayButtons(false);
    });
  }

  _stopMetronome({ resetButtons = true } = {}) {
    if (this._metronomeStartTimeout) {
      clearTimeout(this._metronomeStartTimeout);
      this._metronomeStartTimeout = null;
    }

    if (this._metronomeInterval) {
      clearInterval(this._metronomeInterval);
      this._metronomeInterval = null;
    }

    this._metronomeIsStarting = false;
    this._clearRhythmAnimationTimeouts();
    this._clearRhythmNoteAnimations();
    this._clearBeatCount();
    this._clearTapSchedule();
    if (!this._useVoice) this._stopVoiceInput();
    this._metronomeTickIndex = 0;
    this._rhythmPlaybackStarted = false;

    if (resetButtons) this._setPlayButtons(false);
  }

  async _ensureMetronomeAudio() {
    if (!window.Tone || this._metronomeAudioReady) return;

    await GameAudio.ensureMetronomeAudio();
    this._metronomeAudioReady = true;
  }

  _isMetronomeActive() {
    return Boolean(
      this._metronomeIsStarting
      || this._metronomeStartTimeout
      || this._metronomeInterval,
    );
  }

  _isMetronomeDownbeat() {
    const groupSize = Math.max(1, this._timeSignature.beats);

    return this._metronomeTickIndex % groupSize === 0;
  }

  _shouldStopAtEndOfPiece() {
    const countInBeats = Math.max(1, this._timeSignature.beats);
    const totalMeasureBeats = this._measurePlaybackBeats() * this._numOfMeasures;

    return this._metronomeTickIndex >= countInBeats + totalMeasureBeats;
  }

  _advanceMeasureIfNeeded() {
    const countInBeats = Math.max(1, this._timeSignature.beats);
    const measureBeats = this._measurePlaybackBeats();
    if (this._metronomeTickIndex < countInBeats) return;

    const elapsedMeasureBeats = this._metronomeTickIndex - countInBeats;
    if (elapsedMeasureBeats === 0 || elapsedMeasureBeats % measureBeats !== 0) return;
    if (this._activeMeasureNumber >= this._numOfMeasures) return;

    this._promotePreviewMeasure();
  }

  _playMetronomeClick(isDownbeat = false) {
    GameAudio.playMetronomeClick(isDownbeat);
  }

  _updateBeatCount(intervalMs) {
    const beatCount = document.querySelector(`${this.opts.wrapperSelector} #beat-count`);
    if (!beatCount) return;

    const beatsPerMeasure = Math.max(1, this._timeSignature.beats);
    const count = (this._metronomeTickIndex % beatsPerMeasure) + 1;

    beatCount.textContent = String(count);
    beatCount.style.animationDuration = `${Math.round(intervalMs)}ms`;
    beatCount.classList.remove("beat-animation");
    void beatCount.offsetWidth;
    beatCount.classList.add("beat-animation");
  }

  _clearBeatCount() {
    const beatCount = document.querySelector(`${this.opts.wrapperSelector} #beat-count`);
    if (!beatCount) return;

    beatCount.textContent = "";
    beatCount.classList.remove("beat-animation");
    beatCount.style.animationDuration = "";
  }

  _handleMetronomeBeat(intervalMs) {
    if (this._rhythmPlaybackStarted) return;

    const countInBeats = Math.max(1, this._timeSignature.beats);
    if (this._metronomeTickIndex < countInBeats) return;

    this._rhythmPlaybackStarted = true;
    this._prepareTapSchedule(intervalMs);
  }

  _promotePreviewMeasure() {
    if (!this._previewRhythm) return;

    this._clearRhythmAnimationTimeouts();
    this._clearRhythmNoteAnimations();
    this._clearTapSchedule();
    this._activeMeasureNumber += 1;
    this._syncCurrentMeasures();
    this._rhythmPlaybackStarted = false;
    this.renderChallenge();
  }

  _prepareTapSchedule(intervalMs) {
    this._clearTapSchedule();
    this._rhythmStartTime = performance.now();
    this._tapWindowMs = this._tapTimingWindow(intervalMs);
    this._tapEvents = this._rhythmPlaybackSchedule()
      .filter((event) => !this._isRestDuration(event.duration))
      .map((event) => ({
        ...event,
        time: this._rhythmStartTime + (event.beatOffset * intervalMs),
        tapped: false,
      }));
  }

  _clearTapSchedule() {
    this._rhythmStartTime = null;
    this._tapEvents = [];
  }

  _tapTimingWindow(intervalMs) {
    return Math.min(260, Math.max(130, intervalMs * 0.28));
  }

  _handleTap() {
    this._handleTapAt(performance.now());
  }

  _handleTapAt(tapTime) {
    const event = this._findMatchingTapEvent(tapTime);
    if (!event) {
      console.log("Wrong tap");
      return;
    }

    event.tapped = true;
    console.log("Good tap");
    this._animateRhythmNote(event.index);
  }

  _findMatchingTapEvent(tapTime) {
    const availableEvents = this._tapEvents.filter((event) => !event.tapped);
    if (!availableEvents.length) return null;

    const closestEvent = availableEvents.reduce((closest, event) => {
      const distance = Math.abs(event.time - tapTime);
      if (!closest || distance < closest.distance) return { event, distance };

      return closest;
    }, null);

    if (!closestEvent || closestEvent.distance > this._tapWindowMs) return null;

    return closestEvent.event;
  }

  _startVoiceInput() {
    if (
      this._voiceIsActive
      || this._voiceInputStarting
    ) return Promise.resolve();

    if (!window.isSecureContext) {
      console.warn("Beat Hero voice input needs HTTPS or localhost to request microphone access.");
      return Promise.resolve();
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      console.warn("Beat Hero voice input is not supported by this browser.");
      return Promise.resolve();
    }

    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) return Promise.resolve();

      this._voiceInputStarting = true;
    return navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    }).then((stream) => {
      if (!this._useVoice && !this._metronomeIsStarting && !this._metronomeInterval) {
        stream.getTracks?.().forEach((track) => track.stop());
        this._voiceInputStarting = false;
        return;
      }

      this._voiceAudioContext = new AudioContextCtor();
      this._voiceStream = stream;
      const source = this._voiceAudioContext.createMediaStreamSource(stream);
      this._voiceAnalyser = this._voiceAudioContext.createAnalyser();
      this._voiceAnalyser.fftSize = 1024;
      this._voiceData = new Uint8Array(this._voiceAnalyser.fftSize);
      source.connect(this._voiceAnalyser);

      this._voiceIsActive = true;
      this._voiceInputStarting = false;
      this._listenForVoiceTaps();
    }).catch(() => {
      this._voiceInputStarting = false;
    });
  }

  _stopVoiceInput() {
    if (this._voiceFrame) {
      cancelAnimationFrame(this._voiceFrame);
      this._voiceFrame = null;
    }

    this._voiceStream?.getTracks?.().forEach((track) => track.stop());
    this._voiceAudioContext?.close?.();
    this._voiceAudioContext = null;
    this._voiceAnalyser = null;
    this._voiceData = null;
    this._voiceStream = null;
    this._voiceBaseline = 0.02;
    this._voiceIsActive = false;
    this._voiceInputStarting = false;
    this._lastVoiceTapTime = 0;
  }

  _listenForVoiceTaps() {
    if (!this._voiceAnalyser || !this._voiceData) return;

    this._voiceAnalyser.getByteTimeDomainData(this._voiceData);
    const level = this._voiceInputLevel(this._voiceData);
    const now = performance.now();
    const threshold = Math.max(0.055, this._voiceBaseline * 2.4);

    this._voiceBaseline = (this._voiceBaseline * 0.96) + (Math.min(level, 0.18) * 0.04);

    if (level > threshold && now - this._lastVoiceTapTime > 140) {
      this._lastVoiceTapTime = now;
      this._handleTapAt(now - this._voiceTapOffsetMs);
    }

    this._voiceFrame = requestAnimationFrame(() => this._listenForVoiceTaps());
  }

  _voiceInputLevel(data) {
    let sum = 0;

    data.forEach((value) => {
      const centered = (value - 128) / 128;
      sum += centered * centered;
    });

    return Math.sqrt(sum / data.length);
  }

  _scheduleRhythmAnimations(intervalMs) {
    this._clearRhythmAnimationTimeouts();

    this._rhythmPlaybackSchedule().forEach((event) => {
      const timeout = setTimeout(() => {
        this._animateRhythmNote(event.index);
      }, event.beatOffset * intervalMs);

      this._rhythmAnimationTimeouts.push(timeout);
    });
  }

  _rhythmPlaybackSchedule() {
    let beatOffset = 0;

    return this._rhythm.map((duration, index) => {
      const event = { index, beatOffset, duration };
      beatOffset += this._durationToBeatBlocks(duration);

      return event;
    });
  }

  _clearRhythmAnimationTimeouts() {
    this._rhythmAnimationTimeouts.forEach((timeout) => clearTimeout(timeout));
    this._rhythmAnimationTimeouts = [];
    this._rhythmHighlightTimeouts.forEach((timeout) => clearTimeout(timeout));
    this._rhythmHighlightTimeouts = [];
  }

  _clearRhythmNoteAnimations() {
    const wrapper = document.querySelector(this.opts.wrapperSelector);
    wrapper?.querySelectorAll(".vf-notehead.beat-hero-highlight, .vf-notehead.pulsate").forEach((notehead) => {
      this._setNoteheadHighlight(notehead, false);
    });
  }

  _animateRhythmNote(index) {
    const wrapper = document.querySelector(this.opts.wrapperSelector);
    const note = wrapper?.querySelectorAll(".vf-stavenote")?.[index];
    const notehead = note?.querySelector(".vf-notehead");
    if (!notehead) return;

    this._setNoteheadHighlight(notehead, true);
    GameAudio.playRhythmHit();

    const timeout = setTimeout(() => {
      this._setNoteheadHighlight(notehead, false);
    }, 200);
    this._rhythmHighlightTimeouts.push(timeout);
  }

  _setNoteheadHighlight(notehead, isHighlighted) {
    const paths = [notehead, ...notehead.querySelectorAll("path")];

    notehead.classList.toggle("beat-hero-highlight", isHighlighted);
    notehead.classList.toggle("pulsate", isHighlighted);
    paths.forEach((element) => {
      if (isHighlighted) {
        element.style.fill = "#1cb0f6";
        element.style.stroke = "#1cb0f6";
      } else {
        element.style.fill = "";
        element.style.stroke = "";
      }
    });
  }

  _drawRhythmWithFormatter({ VF, context, stave, notes, beams, width }) {
    const voice = new VF.Voice({
      num_beats: this._timeSignature.beats,
      beat_value: this._timeSignature.beatValue,
    });
    voice.addTickables(notes);

    const formatter = new VF.Formatter();
    formatter.joinVoices([voice]);

    if (formatter.createTickContexts && formatter.preFormat) {
      formatter.createTickContexts([voice]);
      this._setTickContextPadding(formatter.getTickContexts?.(), 0);
      formatter.preFormat(width - 170, context, [voice], stave);
      formatter.postFormat?.();
    } else {
      formatter.format([voice], width - 170);
      this._setTickContextPadding(formatter.getTickContexts?.(), 0);
    }

    voice.draw(context, stave);

    beams.forEach((beam) => {
      beam.setContext(context).draw();
    });
  }

  _drawQuarterGrid({ VF, context, stave, notes, beams, rhythm, width }) {
    const firstNoteX = 0;
    const finalBarlineX = width - 16;
    const beatCount = Math.max(1, this._timeSignature.beats);
    let beatCursor = 0;
    let firstStemX = null;

    notes.forEach((note, index) => {
      const tickContext = new VF.TickContext();
      tickContext.addTickable(note).preFormat();
      tickContext.setX(firstNoteX);

      note.setContext(context);
      note.setStave(stave);

      if (firstStemX === null) {
        firstStemX = note.getStemX?.();
      }

      const noteOffset = Number.isFinite(firstStemX) ? firstStemX : 0;
      const division = Math.max(0, (finalBarlineX - noteOffset) / beatCount);
      tickContext.setX(firstNoteX + beatCursor * division);

      note.draw();
      beatCursor += this._durationToBeatBlocks(rhythm[index]);
    });

    beams.forEach((beam) => {
      beam.setContext(context).draw();
    });
  }

  _removeNoteSpacing(notes) {
    notes.forEach((note) => {
      note.setExtraLeftPx?.(0);
      note.setExtraRightPx?.(0);
    });
  }

  _setTickContextPadding(tickContexts, padding) {
    if (!tickContexts) return;

    const contexts = tickContexts instanceof Map
      ? [...tickContexts.values()]
      : Object.values(tickContexts);

    contexts.forEach((tickContext) => {
      tickContext?.setPadding?.(padding);
    });
  }

  _alignVerticalStaveLines(wrapper) {
    const barlines = wrapper.querySelectorAll("svg rect");
    const finalBarline = barlines[barlines.length - 1];
    if (!finalBarline) return;

    const x = parseFloat(finalBarline.getAttribute("x"));
    if (Number.isFinite(x)) finalBarline.setAttribute("x", String(x + 2));
  }

  _removeVerticalStaveLines(wrapper) {
    wrapper.querySelectorAll("svg rect").forEach((rect) => rect.remove());
  }

  _extendStems(notes, extension) {
    notes.forEach((note) => {
      const stem = note.getStem?.();
      stem?.setExtension?.(extension);
    });
  }

  _extendRenderedStems(wrapper, extension) {
    wrapper.querySelectorAll(".vf-stem path").forEach((path) => {
      const d = path.getAttribute("d") || "";
      const match = d.match(/^M([\d.-]+) ([\d.-]+)L([\d.-]+) ([\d.-]+)$/);
      if (!match) return;

      const [, startX, startY, endX, endY] = match;
      const stemTop = parseFloat(endY);
      if (!Number.isFinite(stemTop)) return;

      path.setAttribute(
        "d",
        `M${startX} ${startY}L${endX} ${stemTop - extension}`,
      );
    });
  }

  _moveStemTopAttachments(wrapper, extension) {
    wrapper.querySelectorAll(".vf-flag, .vf-beam").forEach((element) => {
      const transform = element.getAttribute("transform") || "";
      element.setAttribute("transform", `${transform} translate(0 -${extension})`.trim());
    });

    this._moveUnclassifiedEighthFlags(wrapper, 4.5);
  }

  _moveUnclassifiedEighthFlags(wrapper, extension) {
    wrapper.querySelectorAll("svg path").forEach((path) => {
      if (path.getAttribute("class")) return;

      const d = path.getAttribute("d") || "";
      const match = d.match(/^M([\d.-]+) ([\d.-]+)/);
      if (!match || !d.includes("C") || !d.includes("L")) return;

      const [, startX] = match;
      if (parseFloat(startX) < 80) return;

      const transform = path.getAttribute("transform") || "";
      path.setAttribute("transform", `${transform} translate(0 -${extension})`.trim());
    });
  }

  _rhythmNoteGlyphFontScale(wrapper) {
    const styles = getComputedStyle(wrapper);
    const noteWidth = this._pxFromCssVar(styles, "--note-width", 28);
    const noteHeight = this._pxFromCssVar(styles, "--note-height", 22);

    return Math.round(Math.max(noteWidth * 2, noteHeight * 2.55));
  }

  _pxFromCssVar(styles, name, fallback) {
    const value = parseFloat(styles.getPropertyValue(name));
    return Number.isFinite(value) ? value : fallback;
  }

  _timeSignatureLabel() {
    return `${this._timeSignature.beats}/${this._timeSignature.beatValue}`;
  }

  _measureBeatBlocks() {
    return this._timeSignature.beats * (4 / this._timeSignature.beatValue);
  }

  _measurePlaybackBeats() {
    return Math.max(1, this._timeSignature.beats);
  }

  _durationToBeatBlocks(duration) {
    const noteDuration = this._durationWithoutRest(duration);

    return {
      w: 4,
      h: 2,
      q: 1,
      8: 0.5,
    }[noteDuration] || 1;
  }

  _durationWithoutRest(duration) {
    return String(duration || "").replace(/r$/, "");
  }

  _isRestDuration(duration) {
    return String(duration || "").endsWith("r");
  }

  _maybeRestDuration(duration) {
    if (!this._includeRests || Math.random() < 0.5) return duration;

    return `${duration}r`;
  }

  _normalizeBoolOption(value) {
    return (
      value === true
      || value === 1
      || ["1", "true", "on", "yes"].includes(String(value).toLowerCase())
    );
  }

  _normalizeBpm(value) {
    const bpm = Number(value);
    if (!Number.isFinite(bpm) || bpm <= 0) return 80;

    return bpm;
  }

  _normalizeMeasureCount(value) {
    const count = Number(value);
    if (!Number.isInteger(count) || count <= 0) return 1;

    return count;
  }

  _resetMeasureQueue() {
    this._activeMeasureNumber = 1;
    this._measures = Array.from(
      { length: this._numOfMeasures },
      () => this._makeRandomRhythm(),
    );
    this._syncCurrentMeasures();
  }

  _rewindMeasureQueue() {
    if (!this._measures.length) {
      this._resetMeasureQueue();
      return;
    }

    this._activeMeasureNumber = 1;
    this._syncCurrentMeasures();
  }

  _syncCurrentMeasures() {
    const currentIndex = Math.max(0, this._activeMeasureNumber - 1);

    this._rhythm = this._measures[currentIndex] || [];
    this._previewRhythm = this._measures[currentIndex + 1] || null;
  }

  _shouldRewindMeasureQueueForPlayback() {
    return this._activeMeasureNumber > 1 || !this._rhythm.length;
  }

  _pickTimeSignature() {
    const signatures = this._normalizeTimeSignatures(
      this.opts.timeSignatures || this.opts.timeSignatues,
    );

    return signatures[Math.floor(Math.random() * signatures.length)];
  }

  _normalizeTimeSignatures(timeSignatures) {
    const values = Array.isArray(timeSignatures) && timeSignatures.length
      ? timeSignatures
      : ["4/4"];
    const normalized = values
      .map((value) => this._parseTimeSignature(value))
      .filter(Boolean);

    return normalized.length
      ? normalized
      : [{ beats: 4, beatValue: 4 }];
  }

  _parseTimeSignature(value) {
    const match = String(value || "").trim().match(/^(\d+)\s*\/\s*(\d+)$/);
    if (!match) return null;

    const beats = Number(match[1]);
    const beatValue = Number(match[2]);
    if (!Number.isInteger(beats) || !Number.isInteger(beatValue)) return null;
    if (beats <= 0 || beatValue <= 0) return null;

    return { beats, beatValue };
  }

  _normalizeNoteOptions(notes) {
    const aliases = {
      whole: "whole",
      w: "whole",
      half: "half",
      h: "half",
      quarter: "quarter",
      q: "quarter",
      eigth: "eighth",
      eighth: "eighth",
      eight: "eighth",
      "8": "eighth",
    };
    const values = Array.isArray(notes) && notes.length
      ? notes
      : ["whole", "half", "quarter", "eighth"];
    const normalized = values
      .map((note) => aliases[String(note).toLowerCase()])
      .filter(Boolean);

    return new Set(normalized.length ? normalized : ["quarter"]);
  }

  _makeRandomRhythm() {
    const rhythm = [];
    const rhythmCells = this._rhythmCellsForEnabledNotes();
    let beatsRemaining = this._measureBeatBlocks();
    let previousHadEighths = false;

    while (beatsRemaining > 0) {
      const fittingChoices = rhythmCells.filter(
        (cell) => cell.beats <= beatsRemaining && this._canCompleteRhythm(
          beatsRemaining - cell.beats,
          rhythmCells,
        ),
      );
      const separatedChoices = fittingChoices.filter(
        (cell) => !(previousHadEighths && cell.hasEighths),
      );
      const safeChoices = separatedChoices.length
        ? separatedChoices
        : fittingChoices;
      if (!safeChoices.length) {
        rhythm.push(this._maybeRestDuration("q"));
        beatsRemaining -= 1;
        previousHadEighths = false;
        continue;
      }
      const cell = safeChoices[Math.floor(Math.random() * safeChoices.length)];

      rhythm.push(
        ...cell.durations.map((duration) => this._maybeRestDuration(duration)),
      );
      beatsRemaining -= cell.beats;
      previousHadEighths = cell.hasEighths;
    }

    return rhythm;
  }

  _canCompleteRhythm(beatsRemaining, rhythmCells) {
    if (beatsRemaining === 0) return true;
    if (beatsRemaining < 0) return false;

    return rhythmCells.some((cell) => (
      cell.beats <= beatsRemaining
      && this._canCompleteRhythm(beatsRemaining - cell.beats, rhythmCells)
    ));
  }

  _rhythmCellsForEnabledNotes() {
    const enabled = this._enabledNoteValues;
    const cells = [];

    if (enabled.has("whole")) {
      cells.push({ durations: ["w"], beats: 4, hasEighths: false });
    }

    if (enabled.has("half")) {
      cells.push({ durations: ["h"], beats: 2, hasEighths: false });
    }

    if (enabled.has("quarter")) {
      cells.push({ durations: ["q"], beats: 1, hasEighths: false });
    }

    if (enabled.has("eighth")) {
      cells.push({ durations: ["8", "8"], beats: 1, hasEighths: true });
    }

    if (enabled.has("eighth") && enabled.has("quarter")) {
      cells.push({ durations: ["8", "q", "8"], beats: 2, hasEighths: true });
    }

    return cells.length
      ? cells
      : [{ durations: ["q"], beats: 1, hasEighths: false }];
  }
}
