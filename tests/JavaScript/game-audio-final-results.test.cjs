const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function setup(random = 0) {
    const synths = [];
    class Synth {}
    class PolySynth {
        constructor() { this.notes = []; synths.push(this); }
        toDestination() { return this; }
        triggerAttackRelease(note, duration, time, velocity) {
            this.notes.push({ note, duration, time, velocity });
        }
    }
    const tone = {
        Synth,
        PolySynth,
        now: () => 10,
        start: async () => {},
    };
    const math = Object.create(Math);
    math.random = () => random;
    const context = vm.createContext({ Tone: tone, window: { Tone: tone }, Math: math, setTimeout });
    const source = fs.readFileSync(
        path.join(__dirname, '../../resources/js/music/games/shared/GameAudio.js'),
        'utf8',
    ).replace(/^export /gm, '');
    vm.runInContext(`${source}\nglobalThis.GameAudio = GameAudio;`, context);
    return { GameAudio: context.GameAudio, synths };
}

test('the shared final-results sound plays the full fanfare', () => {
    const { GameAudio, synths } = setup(0);
    GameAudio.playFinalResults();

    assert.equal(synths.length, 1);
    assert.equal(synths[0].notes.length, 11);
    assert.deepEqual(synths[0].notes.slice(0, 4).map((event) => event.note), ['C4', 'G4', 'C5', 'E5']);
    assert.ok(synths[0].notes.slice(0, 4).every((event) => event.time === 10));
    assert.equal(synths[0].notes.at(-1).note, 'G6');
});

test('the Audio Control final preview delegates to the shared sound', async () => {
    const { GameAudio, synths } = setup(0.1);
    let calls = 0;
    const sharedFinal = GameAudio.playFinalResults;
    GameAudio.playFinalResults = () => {
        calls += 1;
        sharedFinal.call(GameAudio);
    };

    await GameAudio.previewSound('final');

    assert.equal(calls, 1);
    assert.ok(synths[0].notes.length > 0);
});
