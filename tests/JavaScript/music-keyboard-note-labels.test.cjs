const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(
    path.join(__dirname, '../../resources/js/music/staff/staffUtils.js'),
    'utf8',
).replace(/^export /gm, '');
const baseStaffGameSource = fs.readFileSync(
    path.join(__dirname, '../../resources/js/music/games/base/BaseStaffGame.js'),
    'utf8',
).replace(/^import[\s\S]*?from "[^"]+";\n/gm, '').replace(/^export /gm, '');

const context = vm.createContext({});
vm.runInContext(
    `${source}\n${baseStaffGameSource}\nglobalThis.BaseStaffGame = BaseStaffGame;`,
    context,
);

const staff = { getClef: () => 'treble' };
const game = Object.create(context.BaseStaffGame.prototype);
game.staff = staff;
game.showNoteNames = true;
game._showSolfegeNoteNames = () => false;

test('keyboard labels preserve the staff note spelling', () => {
    assert.equal(game._keyboardMarkerLabelForState(0, 'music-font__flat'), 'E♭');
    assert.equal(game._keyboardMarkerLabelForState(-1, 'music-font__sharp'), 'D♯');
    assert.equal(game._keyboardMarkerLabelForState(0, 'music-font__natural'), 'E');
});

test('keyboard labels preserve double accidentals', () => {
    assert.equal(game._keyboardMarkerLabelForState(0, 'music-font__doubleflat'), 'E𝄫');
    assert.equal(game._keyboardMarkerLabelForState(-1, 'music-font__doublesharp'), 'D𝄪');
});
