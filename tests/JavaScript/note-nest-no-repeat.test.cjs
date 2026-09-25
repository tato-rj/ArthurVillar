const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../../resources/js/music/games/notenest/NoteNest.js'), 'utf8')
    .replace(/^import\s[\s\S]*?;\n/gm, '').replace(/^export /gm, '');
const letters = ['E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', 'F'];
const context = vm.createContext({
    BaseStaffGame: class {},
    stepToLetterOctave: (_staff, step) => ({letter: letters[step], octave: step < 7 ? 4 : 5}),
});
vm.runInContext(`${source}\nglobalThis.NoteNest = NoteNest;`, context);

function gameWithPicks(picks, blockNote = false) {
    const game = Object.create(context.NoteNest.prototype);
    game.staff = {minStepAllowed: () => 0, maxStepAllowed: () => 8};
    game._isBlockNoteEnabled = () => blockNote;
    game._targetAccidentalClass = () => null;
    let index = 0;
    game._pickTargetStep = () => picks[Math.min(index++, picks.length - 1)];
    return game;
}

function next(game) {
    const target = game._pickTargetNote();
    game._lastTargetName = game._targetName(target);
    return target;
}

test('another octave of the same named note is skipped, but that note can return later', () => {
    const game = gameWithPicks([0, 7, 1, 0]);
    assert.equal(next(game).letter, 'E');
    assert.equal(next(game).letter, 'F');
    assert.equal(next(game).letter, 'E');
});

test('a stuck random picker still gives different consecutive notes', () => {
    for (const blockNote of [false, true]) {
        const game = gameWithPicks([0], blockNote);
        const names = Array.from({length: 10}, () => game._targetName(next(game)));
        for (let i = 1; i < names.length; i++) assert.notEqual(names[i], names[i - 1]);
        assert.equal(names[0], names[2]);
    }
});
