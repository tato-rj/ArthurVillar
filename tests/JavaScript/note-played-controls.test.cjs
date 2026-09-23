const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const gamesRoot = path.join(__dirname, '../../resources/js/music/games');
const nestSource = fs.readFileSync(path.join(gamesRoot, 'notenest/NoteNest.js'), 'utf8')
    .replace(/^import\s[\s\S]*?;\n/gm, '').replace(/^export /gm, '');
const matchSource = fs.readFileSync(path.join(gamesRoot, 'notematch/NoteMatch.js'), 'utf8')
    .replace(/^import\s[\s\S]*?;\n/gm, '').replace(/^export /gm, '');

function control() {
    return {
        length: 1,
        visible: true,
        classes: new Set(),
        value: '',
        show() { this.visible = true; return this; },
        hide() { this.visible = false; return this; },
        addClass(names) { names.split(' ').forEach(name => this.classes.add(name)); return this; },
        removeClass(names) { names.split(' ').forEach(name => this.classes.delete(name)); return this; },
        text(value) { this.value = value; return this; },
        html(value) { if (value === undefined) return this.value; this.value = value; return this; },
    };
}

function loadGame(type = 'NoteNest') {
    const check = control();
    const timers = [];
    class BaseStaffGame {}
    const context = vm.createContext({
        BaseStaffGame,
        $: selector => selector === '#check' ? check : control(),
        createStablePitchState: () => ({}),
        setTimeout: callback => { timers.push(callback); return timers.length; },
        requestAnimationFrame: () => 1,
    });
    vm.runInContext(`${nestSource}\n${matchSource}\nglobalThis.Game = ${type};`, context);
    const game = Object.create(context.Game.prototype);
    game.$checkWrap = check;
    game.$playNoteWrap = control();
    game.$playNoteStart = control();
    game.$playNoteStatus = control();
    game.$playNoteBtn = control();
    game._playNoteButtonDefaultHtml = 'Tap here and play the note';
    game._requiresPlayedNote = () => true;
    game._currentUserNoteCount = () => 1;
    game._checkAfterUserNotes = () => 1;
    game._stopPitchInput = () => {};
    return { game, check, timers, context };
}

for (const type of ['NoteNest', 'NoteMatch']) {
    test(`${type} replaces the mic status with Check my answer and Try again`, () => {
        const { game, check, timers } = loadGame(type);
        game._handlePlayedNoteHeard(60, 'C4', 261.6);

        assert.equal(game.$playNoteStatus.value, 'Note heard!');
        assert.ok(game.$playNoteStatus.classes.has('bg-green-lighter'));
        assert.equal(game.$playNoteStatus.visible, true);
        assert.equal(game.$playNoteStart.visible, false);
        assert.equal(check.visible, false);

        timers[0]();
        assert.equal(game._playedNoteConfirmed, true);
        assert.equal(game.$playNoteStatus.visible, false);
        assert.equal(check.visible, true);
        assert.equal(game.$playNoteStart.visible, true);
        assert.equal(game.$playNoteBtn.value, 'Tap here and try again');
    });
}

test('starting detection shows the connecting state in the button slot', () => {
    const { game, check } = loadGame();
    game._setPlayFeedbackState = () => {};
    game._lastPlayedNote = { midi: 60 };
    game._playedNoteConfirmed = true;
    game._beginPitchRecording();

    assert.equal(game._lastPlayedNote, null);
    assert.equal(game._playedNoteConfirmed, false);
    assert.equal(game.$playNoteStatus.value, 'Connecting to the mic...');
    assert.ok(game.$playNoteStatus.classes.has('bg-grey-lighter'));
    assert.equal(game.$playNoteStatus.visible, true);
    assert.equal(game.$playNoteStart.visible, false);
    assert.equal(check.visible, false);
});

test('microphone access changes the status to yellow listening', async () => {
    const { game, context } = loadGame();
    const analyser = { fftSize: 0 };
    context.window = {
        isSecureContext: true,
        AudioContext: class {
            resume() {}
            createMediaStreamSource() { return { connect() {} }; }
            createAnalyser() { return analyser; }
        },
    };
    context.navigator = {
        mediaDevices: { getUserMedia: async () => ({ getTracks: () => [] }) },
    };
    game._pitchRequestId = 1;
    game._listenForPitch = () => {};
    await game._startPitchInput();

    assert.equal(game.$playNoteStatus.value, "Go ahead, I'm listening");
    assert.ok(game.$playNoteStatus.classes.has('bg-yellow-lighter'));
    assert.equal(game.$playNoteStart.visible, false);
    assert.equal(game.$playNoteStatus.visible, true);
});

for (const type of ['NoteNest', 'NoteMatch']) {
    test(`${type} keeps the play button hidden when the microphone is unavailable`, async () => {
        const { game, check, context } = loadGame(type);
        context.window = { isSecureContext: false };
        await game._startPitchInput();

        assert.equal(game.$playNoteStatus.value, 'Mic unavailable. Use HTTPS or localhost.');
        assert.equal(game.$playNoteStatus.visible, true);
        assert.equal(game.$playNoteStart.visible, false);
        assert.equal(check.visible, false);

        game._syncPlayedNoteGate();
        assert.equal(game.$playNoteStatus.visible, true);
        assert.equal(game.$playNoteStart.visible, false);
        assert.equal(check.visible, false);
    });
}

test('denied microphone permission leaves the error visible without a retry button', async () => {
    const { game, check, context } = loadGame();
    context.window = { isSecureContext: true, AudioContext: class {} };
    context.navigator = {
        mediaDevices: { getUserMedia: async () => { throw new Error('denied'); } },
    };
    game._pitchRequestId = 1;
    await game._startPitchInput();

    assert.equal(game.$playNoteStatus.value, 'Mic blocked. Allow access, then refresh the page.');
    assert.equal(game.$playNoteStart.visible, false);
    assert.equal(check.visible, false);
});

test('a late microphone response is stopped after the round resets', async () => {
    const { game, context } = loadGame();
    let resolveMic;
    let stopped = false;
    context.window = { isSecureContext: true, AudioContext: class {} };
    context.navigator = {
        mediaDevices: { getUserMedia: () => new Promise(resolve => { resolveMic = resolve; }) },
    };
    game._pitchRequestId = 1;
    const pending = game._startPitchInput();
    game._pitchRequestId += 1;
    resolveMic({ getTracks: () => [{ stop: () => { stopped = true; } }] });
    await pending;

    assert.equal(stopped, true);
    assert.equal(game._pitchAnalyser, undefined);
});
