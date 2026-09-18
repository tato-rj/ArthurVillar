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
