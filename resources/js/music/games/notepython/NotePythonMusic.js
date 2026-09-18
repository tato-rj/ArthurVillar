import { beatMsForBpm } from "../shared/tempo.js";

// An eight-bar chiptune in C major. Each entry is an eighth-note position;
// keeping the harmony fixed lets layers enter and leave as the snake changes size.
const SONG = [
  { bass: "C2", fifth: "G2", chord: ["C5", "E5", "G5", "B5"], melody: ["E5", null, "G5", "E5", "C6", null, "G5", "E5"] },
  { bass: "C2", fifth: "G2", chord: ["C5", "E5", "G5", "B5"], melody: ["D5", "E5", "G5", null, "E5", "D5", "C5", null] },
  { bass: "A2", fifth: "E3", chord: ["A4", "C5", "E5", "G5"], melody: ["E5", null, "A5", "G5", "E5", null, "C5", "E5"] },
  { bass: "A2", fifth: "E3", chord: ["A4", "C5", "E5", "G5"], melody: ["G5", "E5", "C5", null, "B4", "C5", "E5", null] },
  { bass: "F2", fifth: "C3", chord: ["F4", "A4", "C5", "E5"], melody: ["A5", null, "G5", "E5", "F5", null, "A5", "C6"] },
  { bass: "F2", fifth: "C3", chord: ["F4", "A4", "C5", "E5"], melody: ["A5", "G5", "F5", null, "E5", "F5", "A5", null] },
  { bass: "G2", fifth: "D3", chord: ["G4", "B4", "D5", "F5"], melody: ["G5", null, "B5", "A5", "G5", null, "D5", "F5"] },
  { bass: "G2", fifth: "D3", chord: ["G4", "B4", "D5", "F5"], melody: ["E5", "D5", "B4", "D5", "G5", "F5", "D5", "B4"] },
];

export class NotePythonMusic {
  constructor() {
    this._voices = null;
    this._victoryVoices = [];
    this._victoryTimer = null;
    this._step = 0;
  }

  _synth(type, volume, release = 0.04) {
    return new window.Tone.Synth({
      oscillator: { type },
      envelope: { attack: 0.004, decay: 0.06, sustain: 0.3, release },
      volume,
    }).toDestination();
  }

  start(bpm) {
    this.stop();
    if (!window.Tone) return;
    this._eighth = beatMsForBpm(bpm) / 2000;
    this._nextTime = window.Tone.now();
    this._voices = {
      lead: this._synth("square", -25),
      bass: this._synth("triangle", -19),
      arp: this._synth("square", -31),
      drums: new window.Tone.NoiseSynth({
        noise: { type: "white" },
        envelope: { attack: 0.001, decay: 0.025, sustain: 0, release: 0.01 },
        volume: -33,
      }).toDestination(),
    };
  }

  // Called on the same eighth-note tick that moves the snake. Schedule extra
  // sixteenths on the audio clock, without introducing another game timer.
  playStep(snakeLength) {
    if (!this._voices) return;
    const now = window.Tone.now();
    const time = Math.max(now, this._nextTime);
    this._nextTime = time + this._eighth;
    const step = this._step++;
    const slot = step % 8;
    const bar = SONG[Math.floor(step / 8) % SONG.length];
    const lively = snakeLength >= 3;
    const busy = snakeLength >= 5;
    const wild = snakeLength >= 8;
    const { lead, bass, arp, drums } = this._voices;

    if (bar.melody[slot] && (lively || slot % 2 === 0)) {
      lead.triggerAttackRelease(bar.melody[slot], this._eighth * (lively ? 0.65 : 1.25), time, 0.65);
    }
    if (slot % (lively ? 2 : 4) === 0) {
      bass.triggerAttackRelease(slot % 4 === 2 ? bar.fifth : bar.bass, this._eighth * 1.3, time, 0.8);
    }
    if (wild) {
      arp.triggerAttackRelease(bar.chord[(slot + 2) % 4], this._eighth * 0.3, time, 0.45);
    }
    if (busy) {
      arp.triggerAttackRelease(bar.chord[slot % 4], this._eighth * 0.3, time + this._eighth / 2, 0.5);
    }
    if (lively && slot % 4 === 2) {
      drums.triggerAttackRelease(0.035, time, 0.55);
    } else if (busy && slot % 2 === 1) {
      drums.triggerAttackRelease(0.012, time, 0.2);
    }
  }

  stop() {
    // Disposing also cancels notes scheduled just ahead of a collision/pause.
    if (this._voices) Object.values(this._voices).forEach((voice) => voice.dispose());
    this._voices = null;
  }

  playVictory(bpm) {
    this.reset();
    if (!window.Tone) return;
    const beat = beatMsForBpm(bpm) / 1000;
    const start = window.Tone.now();
    const brass = new window.Tone.PolySynth(window.Tone.Synth, {
      oscillator: { type: "square" },
      envelope: { attack: 0.012, decay: 0.12, sustain: 0.5, release: 0.35 },
      volume: -23,
    }).toDestination();
    const bass = this._synth("triangle", -17, 0.4);
    this._victoryVoices = [brass, bass];

    // A short heraldic call, dominant lift, then a broad tonic resolution.
    [
      [0, 0.35, ["C4", "E4", "G4"]],
      [0.5, 0.35, ["C4", "E4", "G4"]],
      [1, 0.75, ["D4", "G4", "B4"]],
      [2, 1.6, ["C4", "E4", "G4", "C5"]],
    ].forEach(([offset, duration, notes]) => {
      brass.triggerAttackRelease(notes, duration * beat, start + offset * beat, 0.7);
    });
    bass.triggerAttackRelease("G2", beat * 0.8, start + beat, 0.8);
    bass.triggerAttackRelease("C2", beat * 1.6, start + 2 * beat, 0.85);
    this._victoryTimer = setTimeout(() => this._stopVictory(), (4 * beat + 0.6) * 1000);
  }

  _stopVictory() {
    if (this._victoryTimer != null) clearTimeout(this._victoryTimer);
    this._victoryTimer = null;
    this._victoryVoices.forEach((voice) => voice.dispose());
    this._victoryVoices = [];
  }

  reset() {
    this.stop();
    this._stopVictory();
    this._step = 0;
  }
}
