const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(
    path.join(__dirname, '../../resources/js/music/games/shared/playedNotePitch.js'),
    'utf8',
).replace(/^export /gm, '');
const context = vm.createContext({});
vm.runInContext(source, context);
const { createStablePitchState, detectPlayedNotePitch, updateStablePitchState } = context;
const frequencyAt = cents => 440 * 2 ** (cents / 1200);

function firstSettled(pitchAt, step = 20, end = 2000) {
    let state = createStablePitchState();
    for (let time = 0; time <= end; time += step) {
        state = updateStablePitchState(state, pitchAt(time), time);
        if (state.settled) return { time, state };
    }
    return null;
}

test('a steady note requires a sustained hold at different sampling rates', () => {
    for (const step of [8, 16, 33, 100, 200, 250]) {
        const result = firstSettled(() => 440, step);
        const earliest = Math.max(700, step * 4);
        assert.ok(result.time >= earliest && result.time < earliest + step);
        assert.equal(result.state.midi, 69);
    }
});

test('a short initial pitch and a vocal slide are ignored until the final note settles', () => {
    const result = firstSettled(time => {
        if (time < 240) return frequencyAt(-200);
        if (time < 600) return frequencyAt(-200 + (time - 240) / 360 * 200);
        return 440;
    });
    assert.ok(result.time >= 1200, 'the initial pitch and glide must not be recorded');
    assert.equal(result.state.midi, 69);
    assert.ok(Math.abs(result.state.frequency - 440) < 1);
});

test('a continuing slow glide does not count as a settled pitch', () => {
    assert.equal(firstSettled(time => frequencyAt(time * 0.06)), null);
});

test('small vibrato around a steady pitch is accepted', () => {
    const result = firstSettled(time => frequencyAt(20 * Math.sin(2 * Math.PI * 5 * time / 1000)));
    assert.ok(result.time >= 700 && result.time <= 800);
    assert.equal(result.state.midi, 69);
});

test('changing notes starts a new settling period and records the new note', () => {
    const result = firstSettled(time => time < 600 ? 440 : frequencyAt(200));
    assert.equal(result.time, 1300);
    assert.equal(result.state.midi, 71);
});

test('silence and long pauses cannot complete a partly held note', () => {
    let state = createStablePitchState();
    for (let time = 0; time <= 600; time += 100) {
        state = updateStablePitchState(state, 440, time);
    }
    const silence = updateStablePitchState(state, null, 650);
    assert.equal(silence.count, 0);
    assert.equal(updateStablePitchState(silence, 440, 700).settled, false);

    const afterPause = updateStablePitchState(state, 440, 1200);
    assert.equal(afterPause.count, 1);
    assert.equal(afterPause.settled, false);
});

test('repeated readings of the same audio timestamp do not add stability', () => {
    const state = updateStablePitchState(createStablePitchState(), 440, 0);
    assert.equal(updateStablePitchState(state, 440, 0), state);
    assert.equal(state.settled, false);
});

test('normal quiet piano input is detected and sensitivity controls the volume gate', () => {
    const sampleRate = 48000;
    const buffer = Float32Array.from({ length: 8192 }, (_, i) =>
        0.002 * Math.sin(2 * Math.PI * 440 * i / sampleRate));
    const normal = detectPlayedNotePitch(buffer, sampleRate);
    assert.ok(normal, 'the default should hear a quiet note');
    assert.ok(Math.abs(normal.frequency - 440) < 1);
    assert.equal(detectPlayedNotePitch(buffer, sampleRate, { sensitivity: 0 }), null);
    assert.ok(detectPlayedNotePitch(buffer, sampleRate, { sensitivity: 100 }));
});

test('minimum sensitivity needs a very loud tone and rejects a loud cough-like burst', () => {
    const sampleRate = 48000;
    const tone = amplitude => Float32Array.from({ length: 8192 }, (_, i) =>
        amplitude * Math.sin(2 * Math.PI * 440 * i / sampleRate));
    assert.equal(detectPlayedNotePitch(tone(0.08), sampleRate, { sensitivity: 0 }), null);
    assert.ok(detectPlayedNotePitch(tone(0.2), sampleRate, { sensitivity: 0 }));

    let seed = 7;
    const burst = Float32Array.from({ length: 8192 }, (_, i) => {
        seed = (seed * 1664525 + 1013904223) >>> 0;
        const envelope = i < 4800 ? Math.sin(Math.PI * i / 4800) : 0;
        return (seed / 0x100000000 * 2 - 1) * 0.2 * envelope;
    });
    assert.equal(detectPlayedNotePitch(burst, sampleRate, { sensitivity: 0 }), null);
});

test('capture time can be lengthened for a singing voice', () => {
    let state = createStablePitchState();
    for (let time = 0; time <= 1600; time += 20) {
        state = updateStablePitchState(state, 440, time, 1500);
        if (time < 1500) assert.equal(state.settled, false);
    }
    assert.equal(state.settled, true);
    assert.equal(state.midi, 69);
});

test('the game records only after stable audio time, restarting the hold after silence', () => {
    const gameSource = fs.readFileSync(
        path.join(__dirname, '../../resources/js/music/games/notenest/NoteNest.js'),
        'utf8',
    ).replace(/^import\s[\s\S]*?;\n/gm, '').replace(/^export /gm, '');
    context.BaseStaffGame = class {};
    context.requestAnimationFrame = () => 1;
    vm.runInContext(gameSource, context);
    const game = vm.runInContext('Object.create(NoteNest.prototype)', context);
    game._pitchAnalyser = { getFloatTimeDomainData() {} };
    game._pitchData = new Float32Array(1);
    game._pitchAudioContext = { currentTime: 0, sampleRate: 48000 };
    game._stablePitch = createStablePitchState();
    game._isIgnoringAppAudio = () => false;
    game._midiToNoteName = midi => String(midi);
    let recording = null;
    game._handlePlayedNoteHeard = midi => { recording = { midi, time: game._pitchAudioContext.currentTime * 1000 }; };

    for (let time = 0; time <= 1400 && !recording; time += 20) {
        game._pitchAudioContext.currentTime = time / 1000;
        game._detectPitch = () => time === 400 ? null : { frequency: time < 200 ? 440 : frequencyAt(200) };
        game._listenForPitch();
    }
    assert.ok(recording.time >= 1120);
    assert.equal(recording.midi, 71);
});
