const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(
    path.join(__dirname, '../../resources/js/music/staff/staffUtils.js'),
    'utf8',
).replace(/^export /gm, '');
const noteNamesSource = fs.readFileSync(
    path.join(__dirname, '../../resources/js/music/games/shared/noteNames.js'),
    'utf8',
).replace(/^export /gm, '');
const baseStaffGameSource = fs.readFileSync(
    path.join(__dirname, '../../resources/js/music/games/base/BaseStaffGame.js'),
    'utf8',
).replace(/^import[\s\S]*?from "[^"]+";\n/gm, '').replace(/^export /gm, '');

const context = vm.createContext({});
vm.runInContext(
    `${source}\n${noteNamesSource}\n${baseStaffGameSource}\nglobalThis.BaseStaffGame = BaseStaffGame;`,
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

test('letter and solfège labels show music symbols without changing pitch spellings', () => {
    assert.equal(game._toDisplayNoteName('Ab'), 'A♭');
    assert.equal(game._toDisplayNoteName('F#'), 'F♯');
    game._showSolfegeNoteNames = () => true;
    assert.equal(game._toDisplayNoteName('Ab'), 'La♭');
    assert.equal(game._toDisplayNoteName('F#'), 'Fa♯');
    assert.equal(game._toDisplayNoteName('Bbb'), 'Si𝄫');
    assert.equal(context.displayNoteName('La♭'), 'La♭');
    assert.equal(context.noteNameFromMidi(68), 'G#4');
    game._showSolfegeNoteNames = () => false;
});

test('game prompts, piano markers, and played note feedback show symbols', () => {
    const gamesRoot = path.join(__dirname, '../../resources/js/music/games');
    for (const file of [
        'shared/PianoKeyboardUi.js',
        'notepython/NotePython.js',
        'keyslab/KeysLab.js',
        'notenest/NoteNest.js',
    ]) {
        const source = fs.readFileSync(path.join(gamesRoot, file), 'utf8')
            .replace(/^import\s[\s\S]*?;\n/gm, '').replace(/^export /gm, '');
        vm.runInContext(source, context);
    }

    const python = vm.runInContext('Object.create(NotePython.prototype)', context);
    python._isSolfege = () => true;
    assert.equal(python._noteDisplay({ letter: 'A', accOffset: -1 }), 'La♭');
    assert.equal(python._noteObj('A', -1).canonical, 'Ab');
    assert.equal(python._noteDisplay({ letter: 'F', accOffset: 1 }), 'Fa♯');

    const keyboard = vm.runInContext('Object.create(PianoKeyboardUi.prototype)', context);
    assert.equal(keyboard._markerLabelFromNoteName('F#4'), 'F♯');

    const keys = vm.runInContext('Object.create(KeysLab.prototype)', context);
    const prompt = {};
    keys._pickKeyPrompt = () => ({ tonic: 'Bb', quality: 'major', full: 'Bb major' });
    keys.prompt = {
        setShort: value => { prompt.short = value; },
        setLong: value => { prompt.long = value; },
    };
    keys._renderKeyPrompt();
    assert.equal(prompt.short, 'B♭ major');
    assert.equal(prompt.long, 'Key of B♭ major');
    assert.equal(keys._currentKeyPrompt.tonic, 'Bb');

    const nest = vm.runInContext('Object.create(NoteNest.prototype)', context);
    nest._midiToNoteName = () => 'G#4';
    nest._showSolfegeNoteNames = () => true;
    assert.equal(nest._playedNoteFeedbackNameWithoutOctave(68), 'Sol♯');
});
