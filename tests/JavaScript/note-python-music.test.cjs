const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function setup() {
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
            music.playStep(8);
            advance(eighth);
        }
        const arpeggio = voices[2].notes;
        assert.equal(arpeggio.length, 256);
        arpeggio.forEach((note, index) => {
            assert.ok(Math.abs(note.time - (10 + index * eighth / 2)) < 0.00001);
        });
        assert.equal(voices[1].notes.length, 128, 'the largest snake gets an eighth-note bass groove');
    }
});

test('growth adds activity and shrinking removes it using current length', () => {
    function phrase(length) {
        const { music, voices, advance } = setup();
        music.start(60);
        for (let i = 0; i < 8; i++) { music.playStep(length); advance(0.5); }
        return voices.map((voice) => voice.notes.length);
    }
    const calm = phrase(2), lively = phrase(3), busy = phrase(5), wild = phrase(8);
    assert.ok(calm.every((count) => count > 0), 'even the smallest snake starts with a full instrumental groove');
    assert.ok(lively[1] > calm[1]);
    assert.ok(lively[2] > calm[2]);
    assert.equal(busy[2], 8);
    assert.equal(wild[2], 16);
    const { music, voices, advance } = setup();
    music.start(60);
    music.playStep(8);
    const arpCount = voices[2].notes.length;
    advance(1);
    music.playStep(2); // A quiet offbeat still has one accompaniment note.
    const quietCount = voices[2].notes.length;
    advance(0.5);
    music.playStep(2);
    assert.equal(quietCount, arpCount + 1);
    assert.equal(voices[2].notes.length, quietCount, 'shrinking removes the continuous sixteenth-note layer');
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
    assert.deepEqual(fanfare.notes.map((note) => note.time), [10, 10.5, 11, 12]);
    assert.equal(fanfare.notes.at(-1).duration, 1.6);
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
