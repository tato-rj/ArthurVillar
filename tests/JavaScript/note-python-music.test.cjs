const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function setup(levels = {}) {
    let now = 10;
    const voices = [];
    const timers = new Map();
    let timerId = 0;
    class Synth {
        constructor() { this.notes = []; this.disposed = false; voices.push(this); }
        toDestination() { return this; }
        triggerAttackRelease(note, duration, time, velocity) {
            assert.equal(this.disposed, false, 'disposed instruments must stay silent');
            assert.ok(!this.notes.length || time > this.notes.at(-1).time, 'schedule each voice in chronological order');
            this.notes.push({ note, duration, time, velocity });
        }
        dispose() { this.disposed = true; }
    }
    class NoiseSynth extends Synth {
        triggerAttackRelease(duration, time, velocity) { super.triggerAttackRelease('noise', duration, time, velocity); }
    }
    const context = vm.createContext({
        window: { Tone: { Synth, PolySynth: Synth, MembraneSynth: Synth, NoiseSynth, now: () => now } },
        setTimeout: (callback, delay) => { timers.set(++timerId, { callback, delay }); return timerId; },
        clearTimeout: (id) => timers.delete(id),
        GameAudio: { scale: (kind, base) => (levels[kind] ?? 1) * base },
    });
    const root = path.join(__dirname, '../../resources/js/music/games');
    const tempo = fs.readFileSync(path.join(root, 'shared/tempo.js'), 'utf8').replace(/^export /gm, '');
    const music = fs.readFileSync(path.join(root, 'notepython/NotePythonMusic.js'), 'utf8')
        .replace(/^import .*;\n/gm, '').replace(/^export /gm, '');
    vm.runInContext(`${tempo}\n${music}\nglobalThis.music = new NotePythonMusic();`, context);
    return { music: context.music, voices, timers, advance: (seconds) => { now += seconds; } };
}

test('the whole composition stays on the selected BPM at slow and fast settings', () => {
    for (const bpm of [50, 60, 80, 120, 160]) {
        const { music, voices, advance } = setup();
        const eighth = 30 / bpm;
        music.start(bpm);
        for (let step = 0; step < 128; step++) {
            music.playStep(5);
            advance(eighth);
        }
        const arpeggio = voices[2].notes;
        assert.equal(arpeggio.length, 256);
        arpeggio.forEach((note, index) => {
            assert.ok(Math.abs(note.time - (10 + index * eighth / 2)) < 0.00001);
        });
        assert.equal(voices[1].notes.length, 128, 'the final playable stage of a standard game gets an eighth-note bass groove');
    }
});

test('stage three arpeggios enter on eighth notes with chords marking quarter notes', () => {
    for (const bpm of [50, 80, 160]) {
        const { music, voices, advance } = setup();
        const eighth = 30 / bpm;
        music.start(bpm);
        for (let step = 0; step < 64; step++) {
            music.playStep(4);
            advance(eighth);
        }
        assert.equal(voices[2].notes.length, 64);
        voices[2].notes.forEach((note, i) => {
            assert.ok(Math.abs(note.time - (10 + i * eighth)) < 0.00001, 'arpeggio must land with the movement pulse');
        });
        voices[3].notes.forEach((note, i) => {
            assert.ok(Math.abs(note.time - (10 + i * eighth * 2)) < 0.00001, 'chords must reinforce the quarter-note beat');
        });
    }
});

test('growth and shrink transitions keep every part on the same sixteenth-note grid', () => {
    const { music, voices, advance } = setup();
    const bpm = 160;
    const eighth = 30 / bpm;
    music.start(bpm);
    const lengths = [2, 3, 4, 5, 6, 7, 8, 5, 4, 2];
    for (let step = 0; step < 160; step++) {
        music.playStep(lengths[Math.floor(step / 5) % lengths.length]);
        advance(eighth);
    }
    voices.forEach((voice) => voice.notes.forEach((note) => {
        const subdivision = (note.time - 10) / (eighth / 2);
        assert.ok(Math.abs(subdivision - Math.round(subdivision)) < 0.00001, 'fills and transitions must stay on the shared beat grid');
    }));
});

test('growth adds activity and shrinking removes it using current length', () => {
    function phrase(length) {
        const { music, voices, advance } = setup();
        music.start(60);
        for (let i = 0; i < 8; i++) { music.playStep(length); advance(0.5); }
        return voices.map((voice) => voice.notes.length);
    }
    const stages = [2, 3, 4, 5, 6, 7, 8].map(phrase);
    const totals = stages.map((counts) => counts.reduce((sum, count) => sum + count, 0));
    assert.ok(stages[0][1] > 0 && stages[0][3] > 0 && stages[0][4] > 0, 'the opening retains bass, warm harmony, and a gentle kick');
    assert.equal(stages[0][2], 0, 'fast arpeggios leave room at the start');
    assert.equal(stages[0][6], 0, 'hi-hats enter after growth');
    totals.slice(1).forEach((total, index) => assert.ok(total > totals[index], 'every added segment increases rhythmic activity'));
    assert.ok(totals[3] >= totals[0] * 3, 'a standard four-round game must reach a distinctly busier arrangement before ending');
    assert.equal(stages[3][2], 16, 'sixteenth-note arpeggios arrive at length five');
    const { music, voices, advance } = setup();
    music.start(60);
    music.playStep(8);
    const arpCount = voices[2].notes.length;
    advance(0.5);
    music.playStep(2);
    assert.equal(voices[2].notes.length, arpCount, 'shrinking immediately removes the fast layer');
});

test('pause cancels all background voices and resume creates only one fresh set', () => {
    const { music, voices, advance } = setup();
    music.start(80);
    const voiceCount = voices.length;
    music.playStep(8);
    music.stop();
    assert.ok(voices.every((voice) => voice.disposed));
    music.playStep(8);
    advance(1);
    music.start(80);
    music.playStep(2);
    assert.equal(voices.filter((voice) => !voice.disposed).length, voiceCount);
    music.reset();
    assert.ok(voices.every((voice) => voice.disposed));
});

test('victory replaces the music with a finite tempo-matched cadence and cleans up', () => {
    const { music, voices, timers } = setup();
    music.start(60);
    music.playStep(8);
    const background = voices.slice();
    music.playVictory(60);
    const fanfare = voices[background.length];
    assert.ok(background.every((voice) => voice.disposed));
    assert.deepEqual(fanfare.notes.map((note) => note.time), [10, 10.25, 10.5]);
    assert.equal(fanfare.notes.at(-1).duration, 0.35);
    music.stop(); // Showing the results must not cut off the cadence.
    assert.equal(fanfare.disposed, false);
    assert.equal(timers.size, 1);
    [...timers.values()][0].callback();
    assert.ok(voices.every((voice) => voice.disposed));
    assert.equal(timers.size, 0);
});

test('restart cancels a pending victory without leaving notes or timers behind', () => {
    const { music, voices, timers } = setup();
    music.playVictory(120);
    music.reset();
    assert.ok(voices.every((voice) => voice.disposed));
    assert.equal(timers.size, 0);
});

test('sound-effects controls independently scale every Note Python layer', () => {
    const muted = {
        notePythonMelody: 0,
        notePythonLowEnd: 0,
        notePythonDrums: 0,
        notePythonVictory: 0,
    };
    const { music, voices } = setup(muted);
    music.start(80);
    for (let i = 0; i < 8; i++) music.playStep(5);
    voices.slice(0, 7).forEach((voice) => {
        voice.notes.forEach((note) => assert.equal(note.velocity, 0));
    });
    music.playVictory(80);
    voices.slice(7).forEach((voice) => {
        voice.notes.forEach((note) => assert.equal(note.velocity, 0));
    });
});
