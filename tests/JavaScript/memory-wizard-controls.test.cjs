const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const viewSource = fs.readFileSync(
    path.join(__dirname, '../../resources/views/theory/memory-wizard/index.blade.php'),
    'utf8',
);

function loadMemoryWizard() {
    const source = fs.readFileSync(
        path.join(__dirname, '../../resources/js/music/games/memorywizard/MemoryWizard.js'),
        'utf8',
    ).replace(/^import[\s\S]*?from "[^"]+";\n/gm, '').replace(/^export /gm, '');

    class BaseStaffGame {}
    const elements = {
        '#continue': { visible: false },
        '#final-overlay': { visible: false },
    };
    const context = vm.createContext({
        BaseStaffGame,
        $: selector => ({ is: query => query === ':visible' && elements[selector].visible }),
    });
    vm.runInContext(`${source}\nglobalThis.MemoryWizard = MemoryWizard;`, context);

    return { MemoryWizard: context.MemoryWizard, elements };
}

function fakeControl() {
    return {
        visible: null,
        invisible: null,
        toggle(value) { this.visible = value; return this; },
        toggleClass(name, value) {
            if (name === 'invisible') this.invisible = value;
            return this;
        },
    };
}

function createGame(MemoryWizard, targetLength) {
    const game = Object.create(MemoryWizard.prototype);
    game._targetSequence = Array.from({ length: targetLength }, () => ({}));
    game.$playWrap = fakeControl();
    game.$checkWrap = fakeControl();
    game._hasPlayedThisRound = false;
    game._previewPlaybackActive = false;
    game._setInstructions = message => { game.instruction = message; };
    return game;
}

test('Memory Wizard places guidance above the staff and shares the Play and Check position', () => {
    const instructionsAt = viewSource.indexOf('theory.components.instructions');
    const staffAt = viewSource.indexOf('<div id="staff"></div>');
    const controlsAt = viewSource.indexOf('theory.components.controls');

    assert.ok(instructionsAt >= 0);
    assert.ok(staffAt > instructionsAt);
    assert.ok(controlsAt > staffAt);
    assert.match(viewSource, /theory\.components\.controls[^\n]+play-check/);
    assert.doesNotMatch(viewSource, /@include\('theory\.components\.play'\)/);
});

test('Check replaces Play only after the full sequence and Play returns when a note is removed', () => {
    const { MemoryWizard } = loadMemoryWizard();
    const game = createGame(MemoryWizard, 3);

    assert.equal(game._checkAfterUserNotes(), 3);
    game._syncAnswerControls(0);
    assert.equal(game.$playWrap.visible, true);
    assert.equal(game.$checkWrap.visible, false);
    assert.equal(game.instruction, 'Press Play when you’re ready.');

    game._hasPlayedThisRound = true;
    game._syncAnswerControls(2);
    assert.equal(game.$playWrap.visible, true);
    assert.equal(game.$checkWrap.visible, false);
    assert.equal(game.instruction, 'Add the note you heard.');

    game._syncAnswerControls(3);
    assert.equal(game.$playWrap.visible, false);
    assert.equal(game.$checkWrap.visible, true);
    assert.equal(game.$checkWrap.invisible, false);
    assert.equal(game.instruction, 'When you’re ready, check your answer.');

    game._syncAnswerControls(2);
    assert.equal(game.$playWrap.visible, true);
    assert.equal(game.$checkWrap.visible, false);
    assert.equal(game.$checkWrap.invisible, true);
});

test('Play remains available during the preview and both answer controls hide after a round', () => {
    const { MemoryWizard, elements } = loadMemoryWizard();
    const game = createGame(MemoryWizard, 2);

    game._previewPlaybackActive = true;
    game._hasPlayedThisRound = true;
    game._syncAnswerControls(0);
    assert.equal(game.$playWrap.visible, true);
    assert.equal(game.$checkWrap.visible, false);
    assert.equal(game.instruction, 'Listen closely…');

    elements['#continue'].visible = true;
    game._syncAnswerControls(2);
    assert.equal(game.$playWrap.visible, false);
    assert.equal(game.$checkWrap.visible, false);
});
