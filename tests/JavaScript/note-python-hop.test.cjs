const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function setup(bpm = 80) {
    const root = path.join(__dirname, '../../resources/js/music/games');
    const source = fs.readFileSync(path.join(root, 'notepython/NotePython.js'), 'utf8')
        .replace(/^import\s[\s\S]*?;\n/gm, '').replace(/^export /gm, '');
    const tempo = fs.readFileSync(path.join(root, 'shared/tempo.js'), 'utf8').replace(/^export /gm, '');
    const context = vm.createContext({});
    vm.runInContext(`${tempo}\n${source}`, context);
    const game = vm.runInContext('Object.create(NotePython.prototype)', context);
    game.opts = { bpm };
    game._currentBpm = bpm;
    game._snakeHop = { from: [{ r: 1, c: 4 }, { r: 0, c: 4 }], startedAt: 1000, stepMs: game._snakeSpeedMs() };
    return game;
}

function values(style) {
    return Object.fromEntries(style.split(';').filter(s => s.trim()).map(s => {
        const [key, value] = s.split(':');
        return [key.trim(), parseFloat(value)];
    }));
}

test('head and body hop from their own previous cells around a corner', () => {
    const game = setup();
    const head = values(game._snakeHopStyle({ r: 1, c: 5 }, 0, 1000));
    const body = values(game._snakeHopStyle({ r: 1, c: 4 }, 1, 1000));
    assert.equal(head['--hop-x'], -1);
    assert.equal(head['--hop-y'], 0);
    assert.equal(body['--hop-x'], 0);
    assert.equal(body['--hop-y'], -1);
    assert.ok(body['--hop-delay'] > head['--hop-delay']);
});

test('the entire ripple lands before the next tick at every supported tempo', () => {
    for (const bpm of [50, 80, 160]) {
        const game = setup(bpm);
        const step = game._snakeSpeedMs();
        for (const index of [0, 1, 4, 80]) {
            const style = values(game._snakeHopStyle({ r: 1, c: 4 }, index, 1000));
            assert.ok(style['--hop-delay'] + style['--hop-duration'] < step);
            assert.equal(game._snakeHopStyle({ r: 1, c: 4 }, index, 1000 + step), '');
        }
    }
});

test('food redraws retain the hop phase and growth starts at the old tail', () => {
    const game = setup();
    const before = values(game._snakeHopStyle({ r: 1, c: 4 }, 1, 1000));
    const after = values(game._snakeHopStyle({ r: 1, c: 4 }, 1, 1100));
    assert.equal(after['--hop-delay'], before['--hop-delay'] - 100);
    const tail = values(game._snakeHopStyle({ r: 0, c: 4 }, 2, 1000));
    assert.equal(tail['--hop-x'], 0);
    assert.equal(tail['--hop-y'], 0);
});

test('a tempo change cannot reshape a hop that is already in progress', () => {
    const game = setup();
    const before = game._snakeHopStyle({ r: 1, c: 4 }, 1, 1100);
    game._currentBpm = 90;
    assert.equal(game._snakeHopStyle({ r: 1, c: 4 }, 1, 1100), before);
});

test('edge wrapping bounces in place and stopping clears pending hops', () => {
    const game = setup();
    for (const cell of [{ r: 8, c: 4 }, { r: 1, c: 8 }]) {
        const style = values(game._snakeHopStyle(cell, 0, 1000));
        assert.equal(style['--hop-x'], 0);
        assert.equal(style['--hop-y'], 0);
    }
    game._music = { stop() {} };
    game._stopLoop();
    assert.equal(game._snakeHopStyle({ r: 1, c: 4 }, 0, 1000), '');
});
