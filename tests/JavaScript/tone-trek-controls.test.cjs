const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const viewSource = fs.readFileSync(
    path.join(__dirname, '../../resources/views/theory/tone-trek/index.blade.php'),
    'utf8',
);

function loadToneTrek() {
    const source = fs.readFileSync(
        path.join(__dirname, '../../resources/js/music/games/tonetrek/ToneTrek.js'),
        'utf8',
    ).replace(/^import[\s\S]*?from "[^"]+";\n/gm, '').replace(/^export /gm, '');

    class BaseStaffGame {}
    const context = vm.createContext({ BaseStaffGame });
    vm.runInContext(`${source}\nglobalThis.ToneTrek = ToneTrek;`, context);
    return context.ToneTrek;
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

test('Tone Trek renders its persistent guidance above the game grid', () => {
    const instructionsAt = viewSource.indexOf('theory.components.instructions');
    const gridAt = viewSource.indexOf('theory.tone-trek.grid');
    const controlsAt = viewSource.indexOf('theory.components.controls');

    assert.ok(instructionsAt >= 0);
    assert.ok(gridAt > instructionsAt);
    assert.ok(controlsAt > gridAt);
    assert.doesNotMatch(viewSource, /@slot\('instructions'\)/);
});

test('Tone Trek shows Check only after every note has been added', () => {
    const ToneTrek = loadToneTrek();
    const game = Object.create(ToneTrek.prototype);
    game._roundLocked = false;
    game.$checkWrap = fakeControl();
    game._setInstructions = message => { game.instruction = message; };

    game._syncBlocksCompletionUi(false);
    assert.equal(game.$checkWrap.visible, false);
    assert.equal(game.$checkWrap.invisible, true);
    assert.equal(game.instruction, 'Tap an interval to hear it, then add the next note.');

    game._syncBlocksCompletionUi(true);
    assert.equal(game.$checkWrap.visible, true);
    assert.equal(game.$checkWrap.invisible, false);
    assert.equal(game.instruction, 'When you’re ready, check your answer.');

    game._syncBlocksCompletionUi(false);
    assert.equal(game.$checkWrap.visible, false);
    assert.equal(game.$checkWrap.invisible, true);
});

test('Tone Trek updates guidance without removing it from the page', () => {
    const source = fs.readFileSync(
        path.join(__dirname, '../../resources/js/music/games/tonetrek/ToneTrek.js'),
        'utf8',
    );

    assert.doesNotMatch(source, /\$\("#instructions"\)\.remove\(\)/);
    assert.match(source, /Not quite—adjust the marked notes and try again\./);
    assert.match(source, /You got it! Continue when you’re ready\./);
});
