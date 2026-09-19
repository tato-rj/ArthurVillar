const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const viewSource = fs.readFileSync(
    path.join(__dirname, '../../resources/views/theory/chord-detective/index.blade.php'),
    'utf8',
);
const controlsSource = fs.readFileSync(
    path.join(__dirname, '../../resources/views/theory/components/controls.blade.php'),
    'utf8',
);

function loadChordDetective() {
    const source = fs.readFileSync(
        path.join(__dirname, '../../resources/js/music/games/chorddetective/ChordDetective.js'),
        'utf8',
    ).replace(/^import[\s\S]*?from "[^"]+";\n/gm, '').replace(/^export /gm, '');

    class BaseStaffGame {}
    const elements = {
        '#continue': { visible: false },
        '#final-overlay': { visible: false },
    };
    const context = vm.createContext({
        BaseStaffGame,
        accidentalClassFromOffset: offset => {
            if (offset === 0) return 'music-font__natural';
            if (offset === 1) return 'music-font__sharp';
            if (offset === -1) return 'music-font__flat';
            if (offset === 2) return 'music-font__doublesharp';
            if (offset === -2) return 'music-font__doubleflat';
            return null;
        },
        $: selector => ({ is: query => query === ':visible' && elements[selector].visible }),
    });
    vm.runInContext(`${source}\nglobalThis.ChordDetective = ChordDetective;`, context);

    return { ChordDetective: context.ChordDetective, elements };
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

function staffForClef(clef) {
    return {
        getClef: () => clef,
        minStepAllowed: () => -4,
        maxStepAllowed: () => 12,
        _stepToMidi: step => {
            const diatonic = [0, 2, 4, 5, 7, 9, 11];
            const baseC = clef === 'bass' ? 36 : 60;
            const baseIndex = clef === 'bass' ? 4 : 2;
            const index = baseIndex + step;
            return baseC + diatonic[((index % 7) + 7) % 7] + Math.floor(index / 7) * 12;
        },
    };
}

test('Chord Detective renders persistent instructions above the staff and combined controls below it', () => {
    const instructionsAt = viewSource.indexOf('theory.components.instructions');
    const staffAt = viewSource.indexOf('<div id="staff"></div>');

    assert.ok(instructionsAt >= 0);
    assert.ok(staffAt > instructionsAt);
    assert.match(viewSource, /theory\.components\.controls[^\n]+play-check/);
    assert.match(controlsSource, /type == 'play-check'/);
    assert.match(controlsSource, /id="check"/);
});

test('Chord Detective switches from Play to Check only when both answer notes are present', () => {
    const { ChordDetective } = loadChordDetective();
    const game = Object.create(ChordDetective.prototype);
    game.$playWrap = fakeControl();
    game.$checkWrap = fakeControl();
    game.$staffEl = { attr: () => null };
    game._checkAfterUserNotes = () => 2;
    game._currentUserNoteCount = () => 0;
    game._stopDictationPlayback = () => {};
    game._setPlayButtons = () => {};
    game._hasPlayedThisRound = true;
    game._setInstructions = message => { game.instruction = message; };

    game._syncAnswerControls(1);
    assert.equal(game.$playWrap.visible, true);
    assert.equal(game.$checkWrap.visible, false);
    assert.equal(game.instruction, 'Add one more note.');

    game._syncAnswerControls(2);
    assert.equal(game.$playWrap.visible, false);
    assert.equal(game.$checkWrap.visible, true);
    assert.equal(game.$checkWrap.invisible, false);
    assert.equal(game.instruction, 'When you’re ready, check your answer.');

    game._syncAnswerControls(1);
    assert.equal(game.$playWrap.visible, true);
    assert.equal(game.$checkWrap.visible, false);
    assert.equal(game.$checkWrap.invisible, true);
    assert.equal(game.instruction, 'Add one more note.');
});

test('Chord Detective keeps its guidance visible when the shared game gate dismisses instructions', () => {
    const { ChordDetective } = loadChordDetective();
    const game = Object.create(ChordDetective.prototype);
    game.$instructions = fakeControl();

    game._removeInstructions();
    assert.equal(game.$instructions.visible, true);
    assert.equal(game._instructionsRemoved, true);

    game._restoreInstructions();
    assert.equal(game.$instructions.visible, true);
    assert.equal(game._instructionsRemoved, false);
});

test('Chord Detective keeps every bass-clef chord tone on or above the third line', () => {
    const { ChordDetective } = loadChordDetective();
    const game = Object.create(ChordDetective.prototype);
    game.staff = staffForClef('bass');

    assert.equal(game._challengeStepBounds().min, 4);
    assert.equal(game._isChallengeStepAllowed(3), false);
    assert.equal(game._isChallengeStepAllowed(4), true);

    for (let i = 0; i < 100; i += 1) {
        const step = game._randomFixedStep();
        assert.ok(step >= 4 && step <= 12);
    }

    const allowed = game._computeChordNotesFromRoot(
        'major',
        8,
        game.staff._stepToMidi(8),
        'down',
    );
    assert.deepEqual(Array.from(allowed, note => note.step), [6, 4]);
    assert.equal(
        game._computeChordNotesFromRoot('major', 7, game.staff._stepToMidi(7), 'down'),
        null,
    );

    for (let rootStep = -4; rootStep <= 12; rootStep += 1) {
        for (const direction of ['up', 'down']) {
            for (let inversion = 0; inversion <= 2; inversion += 1) {
                const voicing = game._computeChordVoicingFromRoot(
                    'major',
                    rootStep,
                    game.staff._stepToMidi(rootStep),
                    direction,
                    inversion,
                );
                if (!voicing) continue;
                assert.ok(voicing.fixed.step >= 4);
                assert.ok(voicing.chordNotes.every(note => note.step >= 4));
            }
        }
    }
});

test('Chord Detective leaves other clef ranges unchanged', () => {
    const { ChordDetective } = loadChordDetective();
    const game = Object.create(ChordDetective.prototype);
    game.staff = staffForClef('treble');

    assert.equal(game._challengeStepBounds().min, -4);
    assert.equal(game._isChallengeStepAllowed(-4), true);
});
