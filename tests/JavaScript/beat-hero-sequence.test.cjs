const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(
    path.join(__dirname, '../../resources/js/music/games/beathero/beatHeroSequence.js'),
    'utf8',
).replace(/^export /gm, '');
const context = vm.createContext({});
vm.runInContext(`${source}\nglobalThis.buildBeatHeroSequence = buildBeatHeroSequence;`, context);
const build = context.buildBeatHeroSequence;

const figures = ['quarter', 'eighths', 'sixteenths'].map((id) => ({ id }));
const unchanged = (items) => [...items];
const ids = (answer) => Array.from(answer, (figure) => figure.id);

test('Beat Hero never returns the exact sequence from the previous round', () => {
    const first = build({ pool: figures, count: 3, shuffle: unchanged });
    const second = build({
        pool: figures,
        count: 3,
        shuffle: unchanged,
        previousIds: ids(first),
    });

    assert.deepEqual(ids(first), ['quarter', 'eighths', 'sixteenths']);
    assert.deepEqual(ids(second), ['eighths', 'quarter', 'sixteenths']);
    assert.deepEqual(
        ids(second).sort(),
        ids(first).sort(),
        'the fallback changes only the order',
    );
});

test('a sequence may return when it was not the immediately previous one', () => {
    const answer = build({
        pool: figures,
        count: 3,
        shuffle: unchanged,
        previousIds: ['eighths', 'quarter', 'sixteenths'],
    });

    assert.deepEqual(ids(answer), ['quarter', 'eighths', 'sixteenths']);
});

test('long sequences keep their requested length when a repeat is prevented', () => {
    const previousIds = ['quarter', 'eighths', 'sixteenths', 'quarter', 'eighths', 'sixteenths'];
    const answer = build({ pool: figures, count: 6, shuffle: unchanged, previousIds });

    assert.equal(answer.length, 6);
    assert.notDeepEqual(ids(answer), previousIds);
});

test('half notes use two card slots without overflowing the requested round length', () => {
    const pool = [{ id: 'half', beats: 2 }, { id: 'triplets', beats: 1 }];
    for (let count = 2; count <= 6; count += 1) {
        for (const shuffle of [unchanged, items => [...items].reverse()]) {
            const answer = build({ pool, count, shuffle });
            assert.equal(answer.reduce((total, figure) => total + figure.beats, 0), count);
            assert.ok(answer.every(figure => pool.includes(figure)));
        }
    }
    assert.deepEqual(ids(build({ pool, count: 2, shuffle: unchanged })), ['half']);
    assert.deepEqual(ids(build({ pool, count: 3, shuffle: unchanged })), ['half', 'triplets']);
});

test('a two-card half-note round can alternate with two one-beat figures', () => {
    const pool = [{ id: 'half', beats: 2 }, { id: 'quarter', beats: 1 }];
    const answer = build({ pool, count: 2, shuffle: unchanged, previousIds: ['half'] });
    assert.deepEqual(ids(answer), ['quarter', 'quarter']);
    assert.deepEqual(ids(build({ pool, count: 2, shuffle: unchanged, previousIds: ids(answer) })), ['half']);
});

test('a half note is excluded when only one card slot remains', () => {
    const pool = [{ id: 'quarter', beats: 1 }, { id: 'half', beats: 2 }];
    assert.deepEqual(ids(build({ pool, count: 2, shuffle: unchanged })), ['quarter', 'quarter']);
    const answer = build({ pool, count: 4, shuffle: unchanged });
    assert.deepEqual(ids(answer), ['quarter', 'half', 'quarter']);
});
