// resources/js/music/games/base/BaseStaffGame.js
import { Staff } from "../../staff/Staff.js";
import { pickOne, spellNoteFromState } from "../../staff/staffUtils.js";

export const PAGE_OPENED_AT_MS = Date.now();

/**
 * BaseStaffGame
 * Shared runtime for staff-based games:
 * - Staff wiring (notes, accidentals, noteState events)
 * - Controls wiring (clear/check/help/continue)
 * - Scoring, progress, final overlay (CountUp), 2x perfect-game bonus
 * - UI SFX (Tone.js) + success/fail/final/perfect-game sounds
 *
 * Subclasses must implement:
 * - newChallenge()
 * - _onCheck()
 * Optionally override:
 * - _computeHintAnswer()
 * - _wireAccidentalPalette()
 * - _onFixedNoteState()
 */
export class BaseStaffGame {
  constructor(options = {}) {
    const defaults = {
      staffEl: "#staff",
      basePoints: 1,
      firstTryBonus: 2,
      sound: true,
      showLetterNames: false,
      clefUrls: null,
      initialClef: "treble",
      maxUserNotes: Infinity,
      numOfChallenges: 10,
      levelName: "",
      successPhrases: [
        "Awesome",
        "Nicely done",
        "Well done",
        "Great job",
        "Hooray",
        "Fantastic",
        "Nice work",
        "Looks good",
        "Good one",
      ],
      // namespace for jQuery event handlers (avoid collisions if multiple games exist)
      namespace: "staffGame",
      // UI gating: how many USER notes before removing instructions / enabling Check
      instructionsAfterUserNotes: 1,
      checkAfterUserNotes: 1,
    };

    this.opts = { ...defaults, ...(options || {}) };
    this.ns = this.opts.namespace || "staffGame";

    // UI SFX
    this._uiSfxReady = false;
    this._uiSfxSynth = null;
    this._uiSfxNoise = null;

    // DOM refs
    this.$staffEl = $(this.opts.staffEl);
    this.$accidentals = $("#accidentals");
    this.$controls = $("#controls");
    this.$feedback = $("#feedback-success");
    this.$bonusBadge = this.$feedback.find(".bonus");
    this.$points = $("#points");
    this.$increment = $("#increment");

    this.$checkBtn = $("#check button");
    this.$finalOverlay = $("#final-overlay");
    this.$doublePoints = $("#double-points");
    this.$checkWrap = this.$checkBtn.parent();
    this.$progressBar = $("#progress-bar");
    this.$progressCounter = $("#progress-counter");
    this.$helpBtn = $("#help");

    // Game state
    this.successPhrases = this.opts.successPhrases;
    this.maxUserNotes = Number(this.opts.maxUserNotes);
    this.numOfChallenges = this.opts.numOfChallenges;
    this.levelName = this.opts.levelName;

    this.points = 0;
    this._madeMistakeThisRound = false;
    this._madeAnyMistake = false;
    this._continueBound = false;
    this._usedHintThisRound = false;

    this._stats = {
      checksTotal: 0,
      checksCorrect: 0,
      finishedAtMs: null,
    };

    // Staff
    this.staff = new Staff(this.$staffEl, {
      clef: this.opts.initialClef || "treble",
      clefUrls: this.opts.clefUrls || window.__clefUrls,
      autoClef: false,
      getMaxUserNotes: () =>
        Number.isFinite(this.maxUserNotes) ? this.maxUserNotes : Infinity,
      sound: !!this.opts.sound,
    });

    this.showLetterNames = !!this.opts.showLetterNames;
    this.$staffEl.toggleClass("show-letternames", this.showLetterNames);

    // Fixed note state (for hints)
    this._fixedNote = { letterWithAcc: "?", letterOnly: "?" };
    this._fixedState = null;

    // init UI
    this.$increment.hide();
    this.$bonusBadge.hide();
    this.$doublePoints?.hide?.();
    this.$points.text(String(this.points));
  }

  // ------------------------ sound controls ------------------------

  setSoundEnabled(enabled) {
    this.opts.sound = !!enabled;
    this.staff.setSoundEnabled(!!enabled);

    if (!this.opts.sound && window.Tone) {
      try {
        this._uiSfxSynth && this._uiSfxSynth.releaseAll && this._uiSfxSynth.releaseAll();
      } catch (_) {}
      try {
        this._uiSfxSynth && this._uiSfxSynth.dispose && this._uiSfxSynth.dispose();
      } catch (_) {}
      try {
        this._uiSfxNoise && this._uiSfxNoise.dispose && this._uiSfxNoise.dispose();
      } catch (_) {}

      this._uiSfxSynth = null;
      this._uiSfxNoise = null;
      this._uiSfxReady = false;

      try {
        Tone.context && Tone.context.suspend && Tone.context.suspend();
      } catch (_) {}
    }

    return this;
  }

  isSoundEnabled() {
    return this.staff.isSoundEnabled();
  }

  async _ensureUiSfxAudio() {
    if (!this.isSoundEnabled()) return;
    if (this._uiSfxReady) return;
    if (!window.Tone) return;

    await Tone.start();

    this._uiSfxSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" },
      envelope: { attack: 0.005, decay: 0.12, sustain: 0.0, release: 0.25 },
    }).toDestination();

    this._uiSfxNoise = new Tone.NoiseSynth({
      noise: { type: "pink" },
      envelope: { attack: 0.001, decay: 0.08, sustain: 0.0, release: 0.06 },
    }).toDestination();

    this._uiSfxReady = true;
  }

  _playSuccessSfxBasic() {
    if (!this.isSoundEnabled() || !window.Tone) return;

    this._ensureUiSfxAudio().then(() => {
      if (!this._uiSfxSynth) return;

      const now = Tone.now();
      const notes = ["C6", "E6", "G6"];
      notes.forEach((n, i) => {
        this._uiSfxSynth.triggerAttackRelease(n, 0.07, now + i * 0.05, 0.42);
      });
    });
  }

  _playSuccessSfxBonus() {
    if (!this.isSoundEnabled() || !window.Tone) return;

    this._ensureUiSfxAudio().then(() => {
      if (!this._uiSfxSynth) return;

      const now = Tone.now();
      const oldEnv = { ...this._uiSfxSynth.get().envelope };
      const oldOsc = this._uiSfxSynth.get().oscillator?.type;

      try {
        this._uiSfxSynth.set({
          oscillator: { type: "sine" },
          envelope: { attack: 0.004, decay: 0.12, sustain: 0.15, release: 0.65 },
        });
      } catch (_) {}

      const arp = ["C6", "E6", "G6", "B6", "C7"];
      arp.forEach((n, i) => {
        this._uiSfxSynth.triggerAttackRelease(n, 0.06, now + i * 0.045, 0.45);
      });

      const chord = ["C6", "G6", "C7", "E7"];
      chord.forEach((n) => {
        this._uiSfxSynth.triggerAttackRelease(n, 0.12, now + 0.26, 0.30);
      });

      setTimeout(() => {
        try {
          this._uiSfxSynth.set({
            oscillator: { type: oldOsc || "triangle" },
            envelope: oldEnv,
          });
        } catch (_) {}
      }, 600);
    });
  }

  _playFailSfx() {
    if (!this.isSoundEnabled() || !window.Tone) return;

    this._ensureUiSfxAudio().then(() => {
      const now = Tone.now();

      if (this._uiSfxNoise) {
        this._uiSfxNoise.triggerAttackRelease(0.06, now, 0.1);
      }
      if (this._uiSfxSynth) {
        this._uiSfxSynth.triggerAttackRelease("A2", 0.10, now + 0.01, 0.1);
        this._uiSfxSynth.triggerAttackRelease("G2", 0.12, now + 0.08, 10.1);
      }
    });
  }

  _playFinalSfx() {
    if (!this.isSoundEnabled() || !window.Tone) return;

    this._ensureUiSfxAudio().then(() => {
      if (!this._uiSfxSynth) return;

      const oldEnv = { ...this._uiSfxSynth.get().envelope };
      const oldOsc = this._uiSfxSynth.get().oscillator?.type;

      this._uiSfxSynth.set({
        oscillator: { type: "sine" },
        envelope: { attack: 0.02, decay: 0.25, sustain: 0.35, release: 0.9 },
      });

      const now = Tone.now();
      const variants = [
        // 1) Triad pad + bright run
        () => {
          ["C4", "G4", "C5", "E5"].forEach((n) =>
            this._uiSfxSynth.triggerAttackRelease(n, 0.9, now, 0.6),
          );
          ["G5", "A5", "B5", "C6", "D6", "E6", "G6"].forEach((n, i) => {
            this._uiSfxSynth.triggerAttackRelease(n, 0.08, now + 0.25 + i * 0.06, 0.35);
          });
        },
        // 2) Rising broken chord + final hit
        () => {
          ["C5", "E5", "G5", "B5", "D6", "G6"].forEach((n, i) => {
            this._uiSfxSynth.triggerAttackRelease(n, 0.11, now + i * 0.08, 0.44);
          });
          ["C6", "E6", "G6"].forEach((n) =>
            this._uiSfxSynth.triggerAttackRelease(n, 0.28, now + 0.62, 0.5),
          );
        },
        // 3) Two chord swells
        () => {
          ["A3", "E4", "A4", "C5"].forEach((n) =>
            this._uiSfxSynth.triggerAttackRelease(n, 0.45, now, 0.45),
          );
          ["F4", "A4", "C5", "F5"].forEach((n) =>
            this._uiSfxSynth.triggerAttackRelease(n, 0.52, now + 0.35, 0.48),
          );
          ["C5", "F5", "A5"].forEach((n) =>
            this._uiSfxSynth.triggerAttackRelease(n, 0.24, now + 0.78, 0.4),
          );
        },
        // 4) Sparkly step run + octave landing
        () => {
          ["E5", "G5", "A5", "B5", "D6", "E6", "G6", "A6"].forEach((n, i) => {
            this._uiSfxSynth.triggerAttackRelease(n, 0.075, now + i * 0.055, 0.34);
          });
          ["A5", "A6", "C7"].forEach((n) =>
            this._uiSfxSynth.triggerAttackRelease(n, 0.20, now + 0.52, 0.42),
          );
        },
        // 5) Major lift arpeggio
        () => {
          ["D4", "A4", "D5", "F#5"].forEach((n) =>
            this._uiSfxSynth.triggerAttackRelease(n, 0.36, now, 0.45),
          );
          ["D5", "F#5", "A5", "D6", "F#6"].forEach((n, i) => {
            this._uiSfxSynth.triggerAttackRelease(n, 0.095, now + 0.2 + i * 0.065, 0.4);
          });
        },
        // 6) Warm cadence
        () => {
          ["G3", "D4", "G4", "B4"].forEach((n) =>
            this._uiSfxSynth.triggerAttackRelease(n, 0.4, now, 0.4),
          );
          ["C4", "E4", "G4", "C5"].forEach((n) =>
            this._uiSfxSynth.triggerAttackRelease(n, 0.44, now + 0.32, 0.46),
          );
          ["E5", "G5", "C6"].forEach((n) =>
            this._uiSfxSynth.triggerAttackRelease(n, 0.22, now + 0.72, 0.4),
          );
        },
        // 7) Fast gamey sparkle
        () => {
          ["C6", "D6", "E6", "G6", "A6", "G6", "E6", "C7"].forEach((n, i) => {
            this._uiSfxSynth.triggerAttackRelease(n, 0.06, now + i * 0.048, 0.3);
          });
          ["G6", "C7"].forEach((n) =>
            this._uiSfxSynth.triggerAttackRelease(n, 0.2, now + 0.48, 0.38),
          );
        },
        // 8) Two-step fanfare
        () => {
          ["F4", "C5", "A5"].forEach((n, i) => {
            this._uiSfxSynth.triggerAttackRelease(n, 0.16, now + i * 0.06, 0.45);
          });
          ["G4", "D5", "B5"].forEach((n, i) => {
            this._uiSfxSynth.triggerAttackRelease(n, 0.16, now + 0.28 + i * 0.06, 0.48);
          });
          ["C5", "E5", "G5", "C6"].forEach((n) =>
            this._uiSfxSynth.triggerAttackRelease(n, 0.26, now + 0.54, 0.44),
          );
        },
        // 9) Descend then resolve up
        () => {
          ["A6", "G6", "E6", "D6", "C6"].forEach((n, i) => {
            this._uiSfxSynth.triggerAttackRelease(n, 0.08, now + i * 0.06, 0.34);
          });
          ["E6", "G6", "C7"].forEach((n) =>
            this._uiSfxSynth.triggerAttackRelease(n, 0.24, now + 0.4, 0.42),
          );
        },
        // 10) Big finish hit
        () => {
          ["C4", "E4", "G4", "C5"].forEach((n) =>
            this._uiSfxSynth.triggerAttackRelease(n, 0.34, now, 0.48),
          );
          ["E5", "G5", "B5", "D6", "E6"].forEach((n, i) => {
            this._uiSfxSynth.triggerAttackRelease(n, 0.09, now + 0.18 + i * 0.055, 0.38);
          });
          ["C6", "E6", "G6", "C7"].forEach((n) =>
            this._uiSfxSynth.triggerAttackRelease(n, 0.3, now + 0.58, 0.5),
          );
        },
      ];

      const playVariant = variants[Math.floor(Math.random() * variants.length)];
      playVariant();

      setTimeout(() => {
        try {
          this._uiSfxSynth.set({
            oscillator: { type: oldOsc || "triangle" },
            envelope: oldEnv,
          });
        } catch (_) {}
      }, 1700);
    });
  }

  _playPerfectGameBonusSfx() {
    if (!this.isSoundEnabled() || !window.Tone) return;

    this._ensureUiSfxAudio().then(() => {
      if (!this._uiSfxSynth) return;

      const oldEnv = { ...this._uiSfxSynth.get().envelope };
      const oldOsc = this._uiSfxSynth.get().oscillator?.type;

      try {
        this._uiSfxSynth.set({
          oscillator: { type: "triangle" },
          envelope: { attack: 0.01, decay: 0.18, sustain: 0.25, release: 0.8 },
        });
      } catch (_) {}

      const now = Tone.now();

      const fanfare = ["C5", "E5", "G5", "C6", "E6", "G6", "C7"];
      fanfare.forEach((n, i) => {
        this._uiSfxSynth.triggerAttackRelease(n, 0.09, now + i * 0.06, 0.62);
      });

      const hit = ["C6", "G6", "C7", "E7"];
      hit.forEach((n) => this._uiSfxSynth.triggerAttackRelease(n, 0.35, now + 0.48, 0.46));

      setTimeout(() => {
        try {
          this._uiSfxSynth.set({
            oscillator: { type: oldOsc || "triangle" },
            envelope: oldEnv,
          });
        } catch (_) {}
      }, 1400);
    });
  }

  // ------------------------ lifecycle ------------------------

  start() {
    this._madeAnyMistake = false;

    $("#instructions").show();
    $("#controls").show();

    this._instructionsRemoved = false;

    this._wireAccidentalPalette();
    this._wireStaffTools();
    this._wireControls();
    this._resetProgress();

    this.newChallenge();
    this._armUiGates({ resetInstructions: true });

    $("#page-wrapper").fadeIn("fast");
  }

  // Subclasses must implement
  newChallenge() {
    throw new Error("newChallenge() not implemented");
  }

  // Subclasses implement their own check logic
  _onCheck() {
    throw new Error("_onCheck() not implemented");
  }

  // ------------------------ wiring ------------------------

  _wireAccidentalPalette() {
    $("#accidentals .music-font__doublesharp, #accidentals .music-font__doubleflat").addClass("d-none");
  }

  _wireStaffTools() {
    this.staff.enableNoteDragAndClickDelete();
    this.staff.enableGhostClickCreate();
    this.staff.enableAccidentalDrag(
      $("#accidentals .music-font__sharp, #accidentals .music-font__flat, #accidentals .music-font__natural"),
    );
    this.staff.enableAccidentalDropOnStaff();

    this.$staffEl
      .off(`staff:noteState._log.${this.ns}`)
      .on(`staff:noteState._log.${this.ns}`, (e, data) => {
        const full = spellNoteFromState(this.staff, data.step, data.accidentalClass);
        const letterOnly = full.replace(/\d+$/, "");

        if (this.showLetterNames) {
          this.$staffEl
            .find(`.note[data-note-id="${data.noteId}"] .lettername`)
            .text(letterOnly);
        }

        if (data.source === "fixed") {
          this._fixedNote = {
            letterWithAcc: letterOnly,
            letterOnly: letterOnly.replace(/[#b]+$/, ""),
          };

          this._fixedState = {
            step: data.step,
            accidentalClass: data.accidentalClass || null,
            midi: data.midi,
          };

          this._onFixedNoteState?.(data, full, letterOnly);
        }

        // Keep your debug logging behavior
        // eslint-disable-next-line no-console
        console.log(data.source === "fixed" ? "Fixed note:" : "User note:", full, {
          midi: data.midi,
          noteId: data.noteId,
          step: data.step,
          clef: this.staff.getClef(),
        });
      });
  }

  _wireControls() {
    $("#clear")
      .off(`click.${this.ns}`)
      .on(`click.${this.ns}`, () => this.staff.clearNotes());

    this.$checkBtn
      .off(`click.${this.ns}`)
      .on(`click.${this.ns}`, () => this._onCheck());

    this.$helpBtn
      .off(`click.${this.ns}Help`)
      .on(`click.${this.ns}Help`, () => {
        this._usedHintThisRound = true;
        this._showHintNote();
      });

    if (!this._continueBound) {
      this._continueBound = true;
      $("#continue button")
        .off(`click.${this.ns}`)
        .on(`click.${this.ns}`, () => {
          $("#continue").hide();
          this.newChallenge();
          this._armUiGates({ resetInstructions: false });
          this.$checkBtn.enable();
        });
    }
  }


  // ------------------------ UI gating ------------------------

  _instructionsAfterUserNotes() {
    const v = Number(this.opts.instructionsAfterUserNotes);
    return Number.isFinite(v) && v >= 0 ? Math.floor(v) : 1;
  }

  _checkAfterUserNotes() {
    const v = Number(this.opts.checkAfterUserNotes);
    return Number.isFinite(v) && v >= 0 ? Math.floor(v) : 1;
  }

  _armUiGates({ resetInstructions } = {}) {
    const needForInstructions = this._instructionsAfterUserNotes();
    const needForCheck = this._checkAfterUserNotes();

    if (resetInstructions) this._instructionsRemoved = false;

    // Ensure the check control occupies layout but is not visible until the gate opens.
    $("#check").show().addClass("invisible");

    this._userNotesSinceGate = 0;

    this.$staffEl
      .off(`staff:userNoteAdded._uiGate.${this.ns}`)
      .on(`staff:userNoteAdded._uiGate.${this.ns}`, () => {
        this._userNotesSinceGate += 1;

        if (!this._instructionsRemoved && this._userNotesSinceGate >= needForInstructions) {
          $("#instructions").remove();
          this._instructionsRemoved = true;
        }

        if (this._userNotesSinceGate >= needForCheck) {
          $("#check").removeClass("invisible");
          this.$staffEl.off(`staff:userNoteAdded._uiGate.${this.ns}`);
        }
      });
  }

  // ------------------------ initial note range ------------------------

  /**
   * Resolve the configured range index for the randomly-generated *given* note.
   *
   * Supported inputs:
   * - number or numeric string: 0=narrow, 1=wide, 2=full
   *
   * There is intentionally NO default here; the backend must always provide it.
   *
   * @returns {0|1|2}
   */

  _initialNoteRangeIndex() {
    const raw =
      this.opts.initialNoteRange != null
        ? this.opts.initialNoteRange
        : (this.opts.range != null ? this.opts.range : undefined);

    if (raw == null) {
      throw new Error("[BaseStaffGame] Missing required option: initialNoteRange (0=narrow, 1=wide, 2=full).");
    }

    const n = Number(raw);
    if (!Number.isFinite(n)) {
      throw new Error(`[BaseStaffGame] initialNoteRange must be a number (0, 1, or 2). Got: ${String(raw)}`);
    }

    const idx = Math.trunc(n);

    if (idx === 0 || idx === 1 || idx === 2) {
      return /** @type {0|1|2} */ (idx);
    }

    // Out-of-range values default to FULL (2) instead of crashing.
    // eslint-disable-next-line no-console
    console.warn("[BaseStaffGame] initialNoteRange out of range; defaulting to 2 (full).", { value: raw });

    return 2;
  }


  /**
   * Staff "step" for the clef's reference line:
   * - treble: G line (2nd line from bottom) => step 2
   * - bass:   F line (2nd line from top)    => step 6
   * - alto:   C line (middle line)          => step 4
   * - tenor:  C line (2nd line from top)    => step 6
   */
  _clefMainLineStep(clef) {
    switch (String(clef || "").trim().toLowerCase()) {
      case "bass":
        return 6;
      case "alto":
        return 4;
      case "tenor":
        return 6;
      case "treble":
      default:
        return 2;
    }
  }

  /**
   * Allowed bounds for the randomly-generated *given* note, based on the current clef.
   * @returns {{min:number, max:number}}
   */
  _initialFixedStepBounds() {
    const minAllowed = this.staff.minStepAllowed();
    const maxAllowed = this.staff.maxStepAllowed();

    const idx = this._initialNoteRangeIndex();
    if (idx === 2) return { min: minAllowed, max: maxAllowed };

    const center = this._clefMainLineStep(this.staff.getClef());
    const lineSpan = idx === 0 ? 1 : 2;
    const spanSteps = lineSpan * 2; // 1 staff line = 2 "steps"

    const min = Math.max(minAllowed, center - spanSteps);
    const max = Math.min(maxAllowed, center + spanSteps);
    return { min, max };
  }

  _isStepInInitialFixedRange(step) {
    if (!Number.isFinite(step)) return false;
    const { min, max } = this._initialFixedStepBounds();
    return step >= min && step <= max;
  }

  /**
   * Pick a random step for the *given* note (fixed note) that respects the selected range.
   * @returns {number}
   */
  _randomInitialFixedStep() {
    const { min, max } = this._initialFixedStepBounds();
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // ------------------------ hints ------------------------


  /**
   * Compute one hint note (legacy API).
   *
   * @returns {{step:number, accidentalClass?:string}|null}
   */
  _computeHintAnswer() {
    return null; // subclasses override
  }

  /**
   * Compute one or more hint notes.
   *
   * Subclasses can override this to return multiple notes (e.g. triads).
   *
   * @returns {Array<{id?:string, step:number|null, accidentalClass?:string|null}>}
   */
  _computeHintAnswers() {
    const single = this._computeHintAnswer();
    return single ? [single] : [];
  }

  _removeAllHintNotes() {
    const ids = Array.isArray(this._activeHintIds) ? this._activeHintIds : [];
    ids.forEach((id) => this.staff.removeNote(id));
    this._activeHintIds = [];
  }

  _randomFreeStep() {
    const min = this.staff.minStepAllowed();
    const max = this.staff.maxStepAllowed();

    for (let tries = 0; tries < 50; tries++) {
      const step = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!this.staff._isStepOccupied(step, null)) return step;
    }
    return null;
  }

  _attachHintBlinkRemoval(noteId) {
    const $note = this.$staffEl.find(`.note[data-note-id="${noteId}"]`);
    if (!$note.length) return;

    $note
      .off(`animationend.hint.${noteId} webkitAnimationEnd.hint.${noteId}`)
      .one(`animationend.hint.${noteId} webkitAnimationEnd.hint.${noteId}`, () => {
        this.staff.removeNote(noteId);
        this._activeHintIds = (this._activeHintIds || []).filter((x) => x !== noteId);
      });
  }

  _showHintNote() {
    this._removeAllHintNotes();

    const answers = this._computeHintAnswers();
    const specs = (Array.isArray(answers) && answers.length) ? answers : [{ step: null, accidentalClass: null }];

    this._activeHintIds = [];

    for (let i = 0; i < specs.length; i++) {
      const ans = specs[i] || {};
      const id = ans.id || (specs.length === 1 ? "hint" : `hint${i + 1}`);

      let step = Number.isFinite(ans.step) ? Number(ans.step) : null;
      let accidentalClass = ans.accidentalClass || null;

      if (step == null) step = this._randomFreeStep();
      if (step == null) continue;

      const createdId = this.staff.addNote({
        id,
        step,
        className: "hint blink",
        allowOccupied: true,
        skipResolve: true,
      });

      if (!createdId) continue;

      this._activeHintIds.push(id);

      if (accidentalClass) {
        this.staff.attachAccidentalToNote(id, accidentalClass);
        this.$staffEl.find(`.accidental[data-for-note-id="${id}"]`).addClass("hint blink");
      }

      this.$staffEl.find(`.ledger[data-for-note-id="${id}"]`).addClass("hint blink");
      this._attachHintBlinkRemoval(id);
    }
  }

  // ------------------------ scoring / progress ------------------------

  _successAnimation({ isBonus } = {}) {
    if (isBonus) this._playSuccessSfxBonus();
    else this._playSuccessSfxBasic();

    this.$helpBtn.hide();
    this.$accidentals.addClass("invisible");
    this.$feedback.find(".message span").text(pickOne(this.successPhrases));
    this.$feedback.stop(true, true).fadeIn("fast");
  }

  _showIncrement(earned) {
    const $inc = this.$increment;
    if (!$inc || !$inc.length) return;

    $inc.stop(true, true);
    $inc.text(`+${earned}`).show();

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

    this.$bonusBadge.text(`+${bonusAmount} BONUS`).show();

    if (this.$bonusBadge.animateCSS) {
      this.$bonusBadge.animateCSS("tada");
    }
  }

  _awardPointsForCorrect() {
    if (this._usedHintThisRound) {
      this._showBonusBadge(0);
      return { earned: 0, firstTry: false, bonusEarned: 0 };
    }

    const firstTry = !this._madeMistakeThisRound;
    const base = Number.isFinite(this.opts.basePoints) ? this.opts.basePoints : 1;
    const bonus = Number.isFinite(this.opts.firstTryBonus) ? this.opts.firstTryBonus : 0;

    const earned = firstTry ? base + bonus : base;
    const bonusEarned = firstTry ? bonus : 0;

    this.points += earned;
    this.$points.text(String(this.points));
    this._showBonusBadge(bonusEarned);

    return { earned, firstTry, bonusEarned };
  }

  _resetProgress() {
    this._madeAnyMistake = false;
    this.$progressBar.data("progress", 0);
    this.$progressBar.css({ width: "0%" });
    this.$progressCounter.text("");
  }

  _updateProgressBar() {
    const steps = Math.max(1, this.numOfChallenges || 1);
    const increment = 100 / steps;
    let current = parseFloat(this.$progressBar.data("progress")) || 0;

    current = Math.min(100, current + increment);

    this.$progressBar.data("progress", current);
    this.$progressBar.css({ width: `${current}%` });

    const completed = Math.min(steps, Math.max(0, Math.round(current / increment)));
    this.$progressCounter.text(`${completed} of ${steps}`);

    return current;
  }

  _failAnimation($shakeTarget) {
    this._playFailSfx();

    const $target = $shakeTarget || this.$checkWrap;

    $target.removeClass("animate__animated animate__shakeX");
    // eslint-disable-next-line no-unused-expressions
    $target[0] && $target[0].offsetWidth;
    $target.addClass("animate__animated animate__shakeX");

    $target
      .off(`animationend._fail.${this.ns} webkitAnimationEnd._fail.${this.ns} oAnimationEnd._fail.${this.ns} MSAnimationEnd._fail.${this.ns}`)
      .one(`animationend._fail.${this.ns} webkitAnimationEnd._fail.${this.ns} oAnimationEnd._fail.${this.ns} MSAnimationEnd._fail.${this.ns}`, () => {
        $target.removeClass("animate__animated animate__shakeX");
        this.$checkBtn.enable();
      });
  }

  _showFinalResults() {
    const total = Math.max(0, this._stats.checksTotal ?? 0);
    const correct = Math.max(0, this._stats.checksCorrect ?? 0);
    const accuracy = total ? Math.round((correct / total) * 100) : 0;

    const endMs = this._stats.finishedAtMs ?? Date.now();
    const totalSeconds = Math.max(0, Math.floor((endMs - PAGE_OPENED_AT_MS) / 1000));

    const perfectGame = total > 0 && !this._madeAnyMistake;
    const finalPoints = perfectGame ? this.points * 2 : this.points;

    if (perfectGame) {
      setTimeout(() => {
        this.$doublePoints?.show?.();
        this._playPerfectGameBonusSfx();
      }, 1750);

      // eslint-disable-next-line no-console
      console.log("[BaseStaffGame] Perfect game! 2x bonus applied.", {
        basePoints: this.points,
        finalPoints,
      });
    } else {
      // eslint-disable-next-line no-console
      console.log("[BaseStaffGame] No perfect-game bonus.", {
        basePoints: this.points,
        finalPoints,
        madeAnyMistake: this._madeAnyMistake,
      });
    }

    const CountUpCtor = window?.CountUp?.CountUp;
    const DURATION = 3.5;

    const mmss = (secs) => {
      const v = Math.max(0, Math.floor(secs));
      const mm = String(Math.floor(v / 60)).padStart(2, "0");
      const ss = String(v % 60).padStart(2, "0");
      return `${mm}:${ss}`;
    };

    const countTo = (selector, endVal, opts = {}) => {
      const el = this.$finalOverlay.find(selector)[0];
      if (!el) return;

      if (!CountUpCtor) {
        el.textContent =
          String(opts.formattingFn ? opts.formattingFn(endVal) : endVal) + (opts.suffix || "");
        return;
      }

      const c = new CountUpCtor(el, endVal, { duration: DURATION, ...opts });
      if (!c.error) c.start();
    };

    countTo('span[name="rounds"]', this.numOfChallenges);
    countTo('span[name="score"]', finalPoints);
    countTo('span[name="accuracy"]', accuracy, { suffix: "%" });
    countTo('span[name="duration"]', totalSeconds, { formattingFn: mmss });

    this._playFinalSfx();
    this.$finalOverlay.show();
  }
}
