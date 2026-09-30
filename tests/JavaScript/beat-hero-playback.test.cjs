const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(
    path.join(__dirname, '../../resources/js/music/games/beathero/BeatHero.js'),
    'utf8',
).replace(/^import[\s\S]*?from "[^"]+";\n/gm, '').replace(/^export /gm, '');
const context = vm.createContext({});
vm.runInContext(`${source}\nglobalThis.BeatHero = BeatHero;`, context);
const { BeatHero } = context;
const figure = id => BeatHero.FIGURES.find(item => item.id === id);

function playbackGame(ids, beatMs = 600) {
    const game = Object.create(BeatHero.prototype);
    const timers = [];
    const dots = [];
    const hits = [];
    let now = 0;
    Object.assign(game, {
        opts: { numOfCards: ids.length, figures: ids },
        _state: 'ready',
        _answer: ids.map(figure),
        _countdown: { start: () => 4 * beatMs },
        _beatMs: () => beatMs,
        _cancelTimers() {},
        _clearSelectionMarks() {},
        _resetDots() {},
        _setStatus() {},
        _setPlayButtons() {},
        async _ensureAudio() {},
        _setTimer: (callback, at) => timers.push({ callback, at }),
        _activateDot: index => dots.push(['start', index, now]),
        _completeDot: index => dots.push(['end', index, now]),
        _playRhythmHit: () => hits.push(now),
    });
    return {
        game, timers, dots, hits,
        advanceTo(at) {
            timers.sort((a, b) => a.at - b.at);
            while (timers.length && timers[0].at <= at) {
                const timer = timers.shift();
                now = timer.at;
                timer.callback();
            }
        },
    };
}

test('half notes occupy two beats and triplets divide one beat during mixed playback', async () => {
    const { game, dots, hits, advanceTo } = playbackGame(['half', 'triplets', 'quarter', 'half']);
    await game._playChallenge();
    advanceTo(6000);

    assert.deepEqual(hits, [2400, 3600, 3800, 4000, 4200, 4800]);
    assert.deepEqual(dots, [
        ['start', 0, 2400], ['end', 0, 3600],
        ['start', 1, 3600], ['end', 1, 4200],
        ['start', 2, 4200], ['end', 2, 4800],
        ['start', 3, 4800], ['end', 3, 6000],
    ]);
    assert.equal(game._inputLocked, true);
    advanceTo(6120);
    assert.equal(game._state, 'answering');
    assert.equal(game._inputLocked, false);
});

test('existing one-beat figures retain their playback timing', async () => {
    const { game, hits, advanceTo } = playbackGame(['quarter', 'two-eighths']);
    await game._playChallenge();
    advanceTo(3720);
    assert.deepEqual(hits, [2400, 3000, 3300]);
    assert.equal(game._state, 'answering');
});

test('half-note card previews stay active for two beats', async () => {
    const { game } = playbackGame(['half']);
    const classes = new Set();
    const timers = [];
    const card = {
        dataset: { figureId: 'half' },
        classList: { add: name => classes.add(name), remove: name => classes.delete(name) },
    };
    game._cards = game._answer;
    game._auditionRun = 1;
    game._cancelCardAudition = () => 1;
    game._setAuditionTimer = (callback, at) => timers.push({ callback, at });

    await game._handleCardTap(card);
    assert.equal(classes.has('is-previewing'), true);
    const endPreview = timers.find(timer => timer.at === 1200);
    assert.ok(endPreview);
    endPreview.callback();
    assert.equal(classes.has('is-previewing'), false);
});

test('the browser accepts both new figures without substituting defaults', () => {
    const game = Object.create(BeatHero.prototype);
    assert.deepEqual(Array.from(game._normalizeFigureIds(['half', 'triplets'])), ['half', 'triplets']);
});
