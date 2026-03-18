export class GameAudio {
  // Tweak these values to rebalance the whole app.
  static SYNTH_VOLUME_DB = {
    uiPoly: -10,
    uiNoise: -16,
    uiTimer: -14,
    staffNote: -8,
    staffNoise: -14,
    dictation: -9,
    sequence: -9,
  };

  static VELOCITY = {
    staffNote: 1.0,
    accidentalGrab: 0.45,
    dictation: 1.0,
    sequence: 1.0,
    successBasic: 0.7,
    successBonus: 0.7,
    failNoise: 1,
    failNote: 1,
    bombFail: 1,
    wallCrash: .4,
    final: 0.5,
    finalMetric: 0.85,
    perfectBonus: 0.25,
    runStart: 0.9,
    timerBeep: 0.7,
    timerTimeUp: 0.95,
    countdownBeep: 1,
    hinge: 0.55,
  };

  static SOUND_LIBRARY = [
    {
      id: "staffNote",
      label: "Staff Note",
      volumeKey: "staffNote",
      description: "Base loudness for staff note playback.",
    },
    {
      id: "accidentalGrab",
      label: "Accidental Grab",
      volumeKey: "accidentalGrab",
      description: "Grab/tap feedback when picking up an accidental.",
    },
    {
      id: "dictation",
      label: "Dictation",
      volumeKey: "dictation",
      description: "Dictation playback loudness in PitchDetective.",
    },
    {
      id: "sequence",
      label: "Sequence",
      volumeKey: "sequence",
      description: "Sequence playback loudness in ToneTrek and similar games.",
    },
    {
      id: "successBasic",
      label: "Success",
      volumeKey: "successBasic",
      description: "Normal correct-answer sound.",
    },
    {
      id: "successBonus",
      label: "Streak Bonus",
      volumeKey: "successBonus",
      description: "Streak / bonus correct-answer sound.",
    },
    {
      id: "failNoise",
      label: "Fail Noise",
      volumeKey: "failNoise",
      description: "Noise portion of the fail sound.",
    },
    {
      id: "failNote",
      label: "Fail Notes",
      volumeKey: "failNote",
      description: "Pitched portion of the fail sound.",
    },
    {
      id: "bombFail",
      label: "Bomb Hit",
      volumeKey: "bombFail",
      description: "Long stumbling fail sound when the snake hits a bomb.",
    },
    {
      id: "wallCrash",
      label: "Wall Crash",
      volumeKey: "wallCrash",
      description: "Sharp breaking impact when the snake crashes into a wall.",
    },
    {
      id: "final",
      label: "Final Results",
      volumeKey: "final",
      description: "Final results reveal fanfare.",
    },
    {
      id: "finalMetric",
      label: "Metric Pop",
      volumeKey: "finalMetric",
      description: "Small pop sound as each final metric box appears.",
    },
    {
      id: "perfectBonus",
      label: "Perfect Bonus",
      volumeKey: "perfectBonus",
      description: "Extra reward sound for perfect/no-mistakes games.",
    },
    {
      id: "runStart",
      label: "Run Start",
      volumeKey: "runStart",
      description: "Opening fanfare at the start of a run/countdown.",
    },
    {
      id: "timerBeep",
      label: "Timer Warning",
      volumeKey: "timerBeep",
      description: "Repeating warning beep in the last timer seconds.",
    },
    {
      id: "timerTimeUp",
      label: "Time Up",
      volumeKey: "timerTimeUp",
      description: "Stronger sound when the timer actually runs out.",
    },
    {
      id: "countdownBeep",
      label: "Countdown Tick",
      volumeKey: "countdownBeep",
      description: "Simple 3-2-1 countdown tick sound.",
    },
    {
      id: "hinge",
      label: "Hinge",
      volumeKey: "hinge",
      description: "Short hinge/fall sound used by ToneTrek block reveals.",
    },
  ];

  static _previewSynths = {};

  static scale(kind, base = 1) {
    const mult = Number(GameAudio.VELOCITY[kind]);
    return (Number.isFinite(mult) ? mult : 1) * (Number(base) || 0);
  }

  static getSoundLibrary() {
    return GameAudio.SOUND_LIBRARY.map((sound) => ({
      ...sound,
      valuePercent: GameAudio.getVelocityPercent(sound.volumeKey),
    }));
  }

  static getVelocityPercent(kind) {
    const value = Number(GameAudio.VELOCITY[kind]);
    if (!Number.isFinite(value)) return 0;
    return Math.max(0, Math.min(100, Math.round(value * 100)));
  }

  static setVelocityPercent(kind, percent) {
    const next = Math.max(0, Math.min(100, Number(percent) || 0));
    if (!Object.prototype.hasOwnProperty.call(GameAudio.VELOCITY, kind)) return 0;
    GameAudio.VELOCITY[kind] = next / 100;
    return next;
  }

  static async previewSound(soundId) {
    if (!window.Tone) return;

    await Tone.start();

    const previewers = {
      staffNote: () => {
        GameAudio._getPreviewSynth("staffNote", () => GameAudio.createStaffNoteSynth())
          .triggerAttackRelease("C4", 0.5, undefined, GameAudio.scale("staffNote", 1));
      },
      accidentalGrab: () => {
        GameAudio._getPreviewSynth("staffNoise", () => GameAudio.createStaffNoiseSynth())
          .triggerAttackRelease(0.06, Tone.now(), GameAudio.scale("accidentalGrab", 0.5));
      },
      dictation: () => {
        GameAudio._getPreviewSynth("dictation", () => GameAudio.createDictationSynth())
          .triggerAttackRelease(["C4", "E4"], 0.3, undefined, GameAudio.scale("dictation", 1));
      },
      sequence: () => {
        GameAudio._getPreviewSynth("sequence", () => GameAudio.createSequenceSynth())
          .triggerAttackRelease(["C4", "G4"], 0.26, undefined, GameAudio.scale("sequence", 1));
      },
      successBasic: () => {
        const synth = GameAudio._getPreviewSynth("uiPoly", () => GameAudio.createUiPolySynth());
        const now = Tone.now();
        ["C6", "E6", "G6"].forEach((n, i) => {
          synth.triggerAttackRelease(n, 0.07, now + i * 0.05, GameAudio.scale("successBasic", 0.42));
        });
      },
      successBonus: () => {
        const synth = GameAudio._getPreviewSynth("uiPoly", () => GameAudio.createUiPolySynth());
        const now = Tone.now();
        const oldEnv = { ...synth.get().envelope };
        const oldOsc = synth.get().oscillator?.type;

        try {
          synth.set({
            oscillator: { type: "sine" },
            envelope: { attack: 0.004, decay: 0.12, sustain: 0.15, release: 0.65 },
          });
        } catch (_) {}

        const semitoneShift = 3;
        const toNote = (midi) => Tone.Frequency(midi, "midi").toNote();
        [62, 66, 69, 73, 74].map((m) => toNote(m + semitoneShift)).forEach((n, i) => {
          synth.triggerAttackRelease(n, 0.06, now + i * 0.045, GameAudio.scale("successBonus", 0.45));
        });
        [62, 69, 74, 78].map((m) => toNote(m + semitoneShift)).forEach((n) => {
          synth.triggerAttackRelease(n, 0.12, now + 0.26, GameAudio.scale("successBonus", 0.30));
        });

        setTimeout(() => {
          try {
            synth.set({
              oscillator: { type: oldOsc || "triangle" },
              envelope: oldEnv,
            });
          } catch (_) {}
        }, 600);
      },
      failNoise: () => {
        GameAudio._getPreviewSynth("uiNoise", () => GameAudio.createUiNoiseSynth())
          .triggerAttackRelease(0.06, Tone.now(), GameAudio.scale("failNoise", 0.45));
      },
      failNote: () => {
        const synth = GameAudio._getPreviewSynth("uiPoly", () => GameAudio.createUiPolySynth());
        const now = Tone.now();
        synth.triggerAttackRelease("A2", 0.10, now + 0.01, GameAudio.scale("failNote", 0.55));
        synth.triggerAttackRelease("G2", 0.12, now + 0.08, GameAudio.scale("failNote", 0.6));
      },
      bombFail: () => {
        const synth = GameAudio._getPreviewSynth("uiPoly", () => GameAudio.createUiPolySynth());
        const noiseSynth = GameAudio._getPreviewSynth("uiNoise", () => GameAudio.createUiNoiseSynth());
        const now = Tone.now();
        const oldEnv = { ...synth.get().envelope };
        const oldOsc = synth.get().oscillator?.type;

        try {
          synth.set({
            oscillator: { type: "triangle" },
            envelope: { attack: 0.004, decay: 0.16, sustain: 0.08, release: 0.38 },
          });
        } catch (_) {}

        ["E5", "D5", "C5", "A4", "G4", "E4", "D4", "B3", "A3", "F3", "E3"].forEach((n, i) => {
          const when = now + (i * 0.17);
          synth.triggerAttackRelease(n, 0.15, when, GameAudio.scale("bombFail", 0.42));
          if (i < 8) noiseSynth.triggerAttackRelease(0.05, when + 0.015, GameAudio.scale("bombFail", 0.14));
        });

        setTimeout(() => {
          try {
            synth.set({
              oscillator: { type: oldOsc || "triangle" },
              envelope: oldEnv,
            });
          } catch (_) {}
        }, 2200);
      },
      wallCrash: () => {
        const synth = GameAudio._getPreviewSynth("uiTimer", () => GameAudio.createUiTimerSynth());
        const noiseSynth = GameAudio._getPreviewSynth("uiNoise", () => GameAudio.createUiNoiseSynth());
        const now = Tone.now();
        noiseSynth.triggerAttackRelease(0.12, now, GameAudio.scale("wallCrash", 0.32));
        noiseSynth.triggerAttackRelease(0.09, now + 0.045, GameAudio.scale("wallCrash", 0.22));
        synth.triggerAttackRelease("G3", 0.08, now, GameAudio.scale("wallCrash", 0.85));
        synth.triggerAttackRelease("D3", 0.12, now + 0.04, GameAudio.scale("wallCrash", 0.7));
        synth.triggerAttackRelease("A2", 0.18, now + 0.11, GameAudio.scale("wallCrash", 0.62));
      },
      final: () => {
        const synth = GameAudio._getPreviewSynth("uiPoly", () => GameAudio.createUiPolySynth());
        const now = Tone.now();
        const oldEnv = { ...synth.get().envelope };
        const oldOsc = synth.get().oscillator?.type;

        try {
          synth.set({
            oscillator: { type: "sine" },
            envelope: { attack: 0.02, decay: 0.25, sustain: 0.35, release: 0.9 },
          });
        } catch (_) {}

        ["C5", "E5", "G5", "B5", "D6", "G6"].forEach((n, i) => {
          synth.triggerAttackRelease(n, 0.11, now + i * 0.08, GameAudio.scale("final", 0.44));
        });
        ["C6", "E6", "G6"].forEach((n) => {
          synth.triggerAttackRelease(n, 0.28, now + 0.62, GameAudio.scale("final", 0.5));
        });

        setTimeout(() => {
          try {
            synth.set({
              oscillator: { type: oldOsc || "triangle" },
              envelope: oldEnv,
            });
          } catch (_) {}
        }, 1700);
      },
      finalMetric: () => {
        const synth = GameAudio._getPreviewSynth("uiTimer", () => GameAudio.createUiTimerSynth());
        const now = Tone.now();
        synth.triggerAttackRelease("G5", 0.055, now, GameAudio.scale("finalMetric", 0.44));
        synth.triggerAttackRelease("C6", 0.045, now + 0.03, GameAudio.scale("finalMetric", 0.34));
      },
      perfectBonus: () => {
        const synth = GameAudio._getPreviewSynth("uiPoly", () => GameAudio.createUiPolySynth());
        const now = Tone.now();
        const oldEnv = { ...synth.get().envelope };
        const oldOsc = synth.get().oscillator?.type;

        try {
          synth.set({
            oscillator: { type: "triangle" },
            envelope: { attack: 0.01, decay: 0.18, sustain: 0.25, release: 0.8 },
          });
        } catch (_) {}

        ["C5", "E5", "G5", "C6", "E6", "G6", "C7"].forEach((n, i) => {
          synth.triggerAttackRelease(n, 0.09, now + i * 0.06, GameAudio.scale("perfectBonus", 0.62));
        });

        setTimeout(() => {
          try {
            synth.set({
              oscillator: { type: oldOsc || "triangle" },
              envelope: oldEnv,
            });
          } catch (_) {}
        }, 1400);
      },
      runStart: () => {
        const synth = GameAudio._getPreviewSynth("uiPoly", () => GameAudio.createUiPolySynth());
        const now = Tone.now();
        const toNote = (m) => Tone.Frequency(m, "midi").toNote();
        [
          [[0, 7], 0.00, 0.19, 0.20],
          [[3, 7], 0.24, 0.06, 0.18],
          [[0, 5, 10], 0.38, 0.18, 0.22],
          [[2, 5, 9], 0.62, 0.06, 0.18],
          [[0, 7, 12], 0.76, 0.15, 0.22],
        ].forEach(([intervals, t, dur, vel]) => {
          synth.triggerAttackRelease(
            intervals.map((i) => toNote(60 + i)),
            dur,
            now + t,
            GameAudio.scale("runStart", vel),
          );
        });
      },
      timerBeep: () => {
        GameAudio._getPreviewSynth("uiTimer", () => GameAudio.createUiTimerSynth())
          .triggerAttackRelease("C6", 0.06, Tone.now(), GameAudio.scale("timerBeep", 0.5));
      },
      timerTimeUp: () => {
        const timerSynth = GameAudio._getPreviewSynth("uiTimer", () => GameAudio.createUiTimerSynth());
        const noiseSynth = GameAudio._getPreviewSynth("uiNoise", () => GameAudio.createUiNoiseSynth());
        const now = Tone.now();
        noiseSynth.triggerAttackRelease(0.12, now, GameAudio.scale("timerTimeUp", 0.2));
        timerSynth.triggerAttackRelease("G4", 0.11, now, GameAudio.scale("timerTimeUp", 0.72));
        timerSynth.triggerAttackRelease("E4", 0.13, now + 0.10, GameAudio.scale("timerTimeUp", 0.76));
        timerSynth.triggerAttackRelease("C4", 0.18, now + 0.22, GameAudio.scale("timerTimeUp", 0.82));
      },
      countdownBeep: () => {
        GameAudio._getPreviewSynth("uiTimer", () => GameAudio.createUiTimerSynth())
          .triggerAttackRelease("B5", 0.06, Tone.now(), GameAudio.scale("countdownBeep", 0.2));
      },
      hinge: () => {
        const noiseSynth = GameAudio._getPreviewSynth("uiNoise", () => GameAudio.createUiNoiseSynth());
        const synth = GameAudio._getPreviewSynth("uiTimer", () => GameAudio.createUiTimerSynth());
        const now = Tone.now();
        noiseSynth.triggerAttackRelease(0.04, now, GameAudio.scale("hinge", 0.07));
        synth.triggerAttackRelease("E4", 0.04, now, GameAudio.scale("hinge", 0.12));
        synth.triggerAttackRelease("C4", 0.05, now + 0.04, GameAudio.scale("hinge", 0.16));
      },
    };

    previewers[soundId]?.();
  }

  static createUiPolySynth() {
    return new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" },
      envelope: { attack: 0.005, decay: 0.12, sustain: 0.0, release: 0.25 },
      volume: GameAudio.SYNTH_VOLUME_DB.uiPoly,
    }).toDestination();
  }

  static createUiNoiseSynth() {
    return new Tone.NoiseSynth({
      noise: { type: "pink" },
      envelope: { attack: 0.001, decay: 0.08, sustain: 0.0, release: 0.06 },
      volume: GameAudio.SYNTH_VOLUME_DB.uiNoise,
    }).toDestination();
  }

  static createUiTimerSynth() {
    return new Tone.Synth({
      oscillator: { type: "square" },
      envelope: { attack: 0.001, decay: 0.03, sustain: 0.0, release: 0.06 },
      volume: GameAudio.SYNTH_VOLUME_DB.uiTimer,
    }).toDestination();
  }

  static createStaffNoteSynth() {
    return new Tone.Synth({
      oscillator: { type: "sine" },
      envelope: { attack: 0.01, decay: 0.08, sustain: 0.6, release: 0.12 },
      volume: GameAudio.SYNTH_VOLUME_DB.staffNote,
    }).toDestination();
  }

  static createStaffNoiseSynth() {
    return new Tone.NoiseSynth({
      noise: { type: "white" },
      envelope: { attack: 0.001, decay: 0.05, sustain: 0.0, release: 0.04 },
      volume: GameAudio.SYNTH_VOLUME_DB.staffNoise,
    }).toDestination();
  }

  static createDictationSynth() {
    return new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
      envelope: { attack: 0.01, decay: 0.08, sustain: 0.35, release: 0.25 },
      volume: GameAudio.SYNTH_VOLUME_DB.dictation,
    }).toDestination();
  }

  static createSequenceSynth() {
    return new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
      envelope: { attack: 0.01, decay: 0.08, sustain: 0.35, release: 0.25 },
      volume: GameAudio.SYNTH_VOLUME_DB.sequence,
    }).toDestination();
  }

  static _getPreviewSynth(key, factory) {
    if (!GameAudio._previewSynths[key]) {
      GameAudio._previewSynths[key] = factory();
    }
    return GameAudio._previewSynths[key];
  }
}
