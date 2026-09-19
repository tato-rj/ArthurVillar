const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const viewSource = fs.readFileSync(
    path.join(__dirname, '../../resources/views/theory/pitch-detective/index.blade.php'),
    'utf8',
);
const controlsSource = fs.readFileSync(
    path.join(__dirname, '../../resources/views/theory/components/controls.blade.php'),
    'utf8',
);

function loadPitchDetective() {
    const source = fs.readFileSync(
        path.join(__dirname, '../../resources/js/music/games/pitchdetective/PitchDetective.js'),
        'utf8',
    ).replace(/^import[\s\S]*?from "[^"]+";\n/gm, '').replace(/^export /gm, '');

    class BaseStaffGame {}
    const elements = {
        '#continue': { visible: false },
        '#final-overlay': { visible: false },
    };
    const context = vm.createContext({
        BaseStaffGame,
        accidentalClassFromOffset: offset => offset === 0 ? 'music-font__natural' : null,
        parseIntervalAbbr: value => {
            const match = /^([PMAmd]+)(\d+)$/.exec(String(value));
            return match ? { quality: match[1], number: Number(match[2]) } : null;
        },
        $: selector => ({ is: query => query === ':visible' && elements[selector].visible }),
    });
    vm.runInContext(`${source}\nglobalThis.PitchDetective = PitchDetective;`, context);

    return { PitchDetective: context.PitchDetective, elements };
}

function fakeControl() {
    return {
        visible: null,
        invisible: null,
        show() { this.visible = true; return this; },
        hide() { this.visible = false; return this; },
        toggle(value) { this.visible = value; return this; },
        toggleClass(name, value) {
            if (name === 'invisible') this.invisible = value;
            return this;
        },
    };
}

test('Pitch Detective renders instructions above the staff and combined answer controls below it', () => {
    const instructionsAt = viewSource.indexOf("theory.components.instructions");
    const staffAt = viewSource.indexOf('<div id="staff"></div>');

    assert.ok(instructionsAt >= 0);
    assert.ok(staffAt > instructionsAt);
    assert.match(viewSource, /theory\.components\.controls[^\n]+play-check/);
    assert.match(controlsSource, /type == 'play-check'/);
    assert.match(controlsSource, /id="check"/);
});

test('adding a note substitutes Check Answer for Play and deleting it restores Play', () => {
    const { PitchDetective } = loadPitchDetective();
    const game = Object.create(PitchDetective.prototype);
    game.$playWrap = fakeControl();
    game.$checkWrap = fakeControl();
    game.$staffEl = { attr: () => null };
    game._checkAfterUserNotes = () => 1;
    game._currentUserNoteCount = () => 0;
    game._stopDictationPlayback = () => {};
    game._setPlayButtons = () => {};
    game._hasPlayedThisRound = false;
    game._setInstructions = message => { game.instruction = message; };

    game._syncAnswerControls(1);
    assert.equal(game.$playWrap.visible, false);
    assert.equal(game.$checkWrap.visible, true);
    assert.equal(game.$checkWrap.invisible, false);
    assert.equal(game.instruction, 'When you’re ready, check your answer.');

    game._syncAnswerControls(0);
    assert.equal(game.$playWrap.visible, true);
    assert.equal(game.$checkWrap.visible, false);
    assert.equal(game.$checkWrap.invisible, true);
    assert.equal(game.instruction, 'Press Play when you’re ready.');

    game._hasPlayedThisRound = true;
    game._syncAnswerControls(0);
    assert.equal(game.instruction, 'Add the note you heard.');
});

test('Pitch Detective keeps its guidance visible when the shared game gate dismisses instructions', () => {
    const { PitchDetective } = loadPitchDetective();
    const game = Object.create(PitchDetective.prototype);
    game.$instructions = fakeControl();

    game._removeInstructions();
    assert.equal(game.$instructions.visible, true);
    assert.equal(game._instructionsRemoved, true);

    game._restoreInstructions();
    assert.equal(game.$instructions.visible, true);
    assert.equal(game._instructionsRemoved, false);
});

test('Pitch Detective keeps bass-clef challenges on or above the third line', () => {
    const { PitchDetective } = loadPitchDetective();
    const game = Object.create(PitchDetective.prototype);
    game.staff = {
        getClef: () => 'bass',
        minStepAllowed: () => -4,
        maxStepAllowed: () => 12,
        _stepToMidi: step => {
            const diatonic = [0, 2, 4, 5, 7, 9, 11];
            const index = 4 + step;
            return 36 + diatonic[((index % 7) + 7) % 7] + Math.floor(index / 7) * 12;
        },
    };

    assert.equal(game._challengeStepBounds().min, 4);
    assert.equal(game._isChallengeStepAllowed(3), false);
    assert.equal(game._isChallengeStepAllowed(4), true);

    for (let i = 0; i < 100; i += 1) {
        const step = game._randomFixedStep();
        assert.ok(step >= 4 && step <= 12);
    }

    const a3Midi = game.staff._stepToMidi(8);
    assert.equal(game._computeSecondFromFixed('P5', 7, game.staff._stepToMidi(7), 'down'), null);
    assert.equal(game._computeSecondFromFixed('P5', 8, a3Midi, 'down').step, 4);
});

test('Pitch Detective leaves other clef ranges unchanged', () => {
    const { PitchDetective } = loadPitchDetective();
    const game = Object.create(PitchDetective.prototype);
    game.staff = {
        getClef: () => 'treble',
        minStepAllowed: () => -4,
        maxStepAllowed: () => 12,
    };

    assert.equal(game._challengeStepBounds().min, -4);
    assert.equal(game._isChallengeStepAllowed(-4), true);
});
