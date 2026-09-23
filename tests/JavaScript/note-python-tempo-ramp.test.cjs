const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function setup({ bpm = 80, speedUpEachRound = true } = {}) {
    const root = path.join(__dirname, '../../resources/js/music/games');
    const source = fs.readFileSync(path.join(root, 'notepython/NotePython.js'), 'utf8')
        .replace(/^import\s[\s\S]*?;\n/gm, '').replace(/^export /gm, '');
    const tempo = fs.readFileSync(path.join(root, 'shared/tempo.js'), 'utf8').replace(/^export /gm, '');
    const intervals = [];
    const cleared = [];
    const musicStarts = [];
    let nextId = 0;
    const context = vm.createContext({
        setInterval: (callback, delay) => {
            intervals.push({ id: ++nextId, callback, delay });
            return nextId;
        },
        clearInterval: id => cleared.push(id),
    });
    vm.runInContext(`${tempo}\n${source}`, context);
    const game = vm.runInContext('Object.create(NotePython.prototype)', context);
    game.opts = { bpm, speedUpEachRound };
    game._currentBpm = bpm;
    game._snake = [{}, {}];
    game._normalizeOnOff = value => value === true || value === 'on';
    game._isSoundEnabled = () => true;
    game.$board = { find: () => ({ removeClass() {} }) };
    game._music = {
        start: value => musicStarts.push(value),
        playStep() {},
        stop() {},
    };
    return { game, intervals, cleared, musicStarts };
}

test('each new round restarts snake movement and music together 10 BPM faster', () => {
    const { game, intervals, cleared, musicStarts } = setup();
    game._startLoop();
    for (const bpm of [90, 100, 110]) {
        game._advanceRoundTempo();
        assert.equal(game._currentBpm, bpm);
        assert.equal(intervals.at(-1).delay, 30000 / bpm);
        assert.equal(musicStarts.at(-1), bpm);
    }
    assert.equal(game.opts.bpm, 80, 'the chosen starting tempo stays unchanged');
    assert.deepEqual(musicStarts, [80, 90, 100, 110]);
    assert.deepEqual(cleared, [1, 2, 3]);
});

test('tempo stays fixed when the bonus is off and caps at 160 BPM', () => {
    const regular = setup({ speedUpEachRound: false });
    regular.game._startLoop();
    regular.game._advanceRoundTempo();
    assert.equal(regular.game._currentBpm, 80);
    assert.deepEqual(regular.musicStarts, [80]);

    const fast = setup({ bpm: 155 });
    fast.game._startLoop();
    fast.game._advanceRoundTempo();
    fast.game._advanceRoundTempo();
    assert.equal(fast.game._currentBpm, 160);
    assert.deepEqual(fast.musicStarts, [155, 160]);
});

test('a paused round adopts the faster tempo when play resumes', () => {
    const { game, intervals, musicStarts } = setup();
    game._startLoop();
    game._stopLoop();
    game._pausedByModal = true;
    game._advanceRoundTempo();
    assert.equal(game._currentBpm, 90);
    assert.deepEqual(musicStarts, [80]);
    game._pausedByModal = false;
    game._startLoop();
    assert.deepEqual(musicStarts, [80, 90]);
    assert.equal(intervals.at(-1).delay, 30000 / 90);
});
