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
    return { GameAudio: context.GameAudio, synths, context };
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

for (const sound of [true, false]) {
    test(`Note Python results reveal, metric, and bonus sounds respect sound=${sound}`, async () => {
        const { context, synths } = setup();
        const timers = [];
        let overlay;
        context.setTimeout = (callback, delay) => { timers.push({ callback, delay }); return timers.length; };
        context.renderFinalResultsOverlay = (options) => { overlay = options; };
        context.Tone.Frequency = (midi) => midi;
        for (const file of ['base/BaseStaffGame.js', 'notepython/NotePython.js']) {
            const source = fs.readFileSync(path.join(__dirname, '../../resources/js/music/games', file), 'utf8')
                .replace(/^import\s[\s\S]*?;\n/gm, '').replace(/^export /gm, '');
            vm.runInContext(source, context);
        }
        const game = vm.runInContext('Object.create(NotePython.prototype)', context);
        const uiNotes = [];
        Object.assign(game, {
            opts: { sound, bpm: 80, numOfChallenges: 4 },
            _stats: { checksTotal: 4, checksCorrect: 4, finishedAtMs: Date.now() },
            _finalStartMs: Date.now() - 10000,
            _pointsValue: 12,
            _madeAnyMistake: false,
            _countdownTimeouts: [],
            _finalCountupTimeouts: [],
            _stopLoop() {},
            _ensureUiSfxAudio: async () => {},
            _uiSfxReady: true,
            _uiSfxSynth: {
                get: () => ({ envelope: {}, oscillator: { type: 'triangle' } }),
                set() {},
                triggerAttackRelease: (...args) => uiNotes.push(args),
            },
            _music: { playVictory() { assert.fail('the results reveal must not replay the victory cue'); } },
        });

        game._showFinalResults();
        assert.equal(synths.length, 0, 'wait until the overlay invokes its reveal callback');
        overlay.playFinalSfx();
        await Promise.resolve();
        assert.equal(synths.length, sound ? 1 : 0);
        if (sound) assert.ok(synths[0].notes.length > 0, 'play the shared results fanfare');

        game._playFinalMetricPopSfx(2);
        const metricNotes = uiNotes.length;
        assert.equal(metricNotes > 0, sound, 'metric boxes play their shared pop sounds');

        timers.find(({ delay }) => delay === 1750).callback();
        await Promise.resolve();
        assert.equal(uiNotes.length > metricNotes, sound, 'the perfect-game bonus has its shared sound');
    });
}
