const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function setup({ bpm = 80, speedUpEachRound = true, sound = true } = {}) {
    const root = path.join(__dirname, '../../resources/js/music/games');
    const readSource = file => fs.readFileSync(path.join(root, file), 'utf8')
        .replace(/^import\s[\s\S]*?;\n/gm, '').replace(/^export /gm, '');
    const timers = new Map();
    const voices = [];
    const moves = [];
    let nextId = 0;
    let now = 0;
    class Synth {
        constructor() { this.notes = []; this.disposed = false; voices.push(this); }
        toDestination() { return this; }
        triggerAttackRelease(note, duration, time) {
            assert.equal(this.disposed, false);
            assert.ok(!this.notes.length || time > this.notes.at(-1).time);
            this.notes.push({ note, duration, time });
        }
        dispose() { this.disposed = true; }
    }
    class NoiseSynth extends Synth {
        triggerAttackRelease(duration, time) { super.triggerAttackRelease('noise', duration, time); }
    }
    const context = vm.createContext({
        performance: { now: () => now },
        window: { Tone: { Synth, PolySynth: Synth, MembraneSynth: Synth, NoiseSynth, now: () => now / 1000 } },
        GameAudio: { scale: (_, base) => base },
        setTimeout: (callback, delay) => {
            timers.set(++nextId, { callback, at: now + delay });
            return nextId;
        },
        clearTimeout: id => timers.delete(id),
    });
    vm.runInContext([
        readSource('shared/tempo.js'),
        readSource('notepython/NotePythonMusic.js'),
        readSource('notepython/NotePython.js'),
    ].join('\n'), context);
    const game = vm.runInContext('Object.create(NotePython.prototype)', context);
    game.opts = { bpm, speedUpEachRound };
    game._currentBpm = bpm;
    game._snake = [{}, {}, {}, {}, {}];
    game._normalizeOnOff = value => value === true || value === 'on';
    game._isSoundEnabled = () => sound;
    game.$board = { find: () => ({ removeClass() {} }) };
    game._music = vm.runInContext('new NotePythonMusic()', context);
    game._advanceSnake = () => moves.push({ at: now, duration: game._snakeSpeedMs() });
    const advanceTo = time => {
        while (timers.size) {
            const [id, timer] = [...timers].sort((a, b) => a[1].at - b[1].at)[0];
            if (timer.at > time) break;
            now = timer.at;
            timers.delete(id);
            timer.callback();
        }
        now = time;
    };
    return { game, timers, voices, moves, advanceTo, elapse: ms => { now += ms; } };
}

function closeTo(actual, expected) {
    assert.ok(Math.abs(actual - expected) < 0.00001, `${actual} should be ${expected}`);
}

test('speed increases preserve the current beat, active instruments, and musical position', () => {
    const { game, timers, voices, moves, advanceTo } = setup();
    game._startLoop();
    advanceTo(100);
    game._snakeHop = { startedAt: 0 };
    const hop = game._snakeHop;
    const timer = game._tickTimer;
    game._advanceRoundTempo();

    assert.equal(game._tickTimer, timer, 'the existing beat must not be postponed');
    assert.equal(game._snakeHop, hop, 'an in-progress hop must not be stopped');
    assert.equal(voices.length, 7, 'do not recreate the instruments');
    assert.ok(voices.every(voice => !voice.disposed));
    assert.equal(voices[1].notes.length, 1, 'do not insert a new off-beat note');
    assert.equal(game._currentBpm, 80, 'finish the current eighth note');

    advanceTo(375);
    assert.equal(game._currentBpm, 90);
    assert.equal(moves[0].at, 375);
    closeTo(moves[0].duration, 30000 / 90);
    assert.equal(voices[0].notes[0].note, 'E4');
    assert.equal(voices[0].notes.length, 1, 'song slot 1 is a rest, not a restarted melody');
    closeTo(voices[1].notes[1].time, 0.375);
    closeTo(voices[2].notes[3].time, 0.375 + 15 / 90);

    advanceTo(375 + 30000 / 90);
    closeTo(moves[1].at, 375 + 30000 / 90);
    assert.equal(voices[0].notes[1].note, 'G4', 'continue to song slot 2');
    assert.equal(timers.size, 1, 'keep just one movement timer');
    assert.equal(game.opts.bpm, 80, 'retain the selected starting tempo');
});

test('successive tempo changes keep audio and movement on the same eighth-note boundaries', () => {
    const { game, voices, moves, advanceTo } = setup();
    game._startLoop();
    let boundary = game._snakeSpeedMs();
    for (const bpm of [90, 100, 110, 120, 130, 140, 150, 160]) {
        advanceTo(boundary - 20);
        game._advanceRoundTempo();
        advanceTo(boundary);
        assert.equal(game._currentBpm, bpm);
        closeTo(moves.at(-1).at, boundary);
        closeTo(voices[1].notes.at(-1).time, boundary / 1000);
        closeTo(voices[2].notes.at(-1).time, boundary / 1000 + 15 / bpm);
        boundary += 30000 / bpm;
    }
    assert.equal(voices.length, 7);
    assert.ok(voices.every(voice => !voice.disposed));
});

test('tempo stays fixed when the bonus is off and caps at 160 BPM', () => {
    const regular = setup({ speedUpEachRound: false });
    regular.game._startLoop();
    regular.game._advanceRoundTempo();
    regular.advanceTo(375);
    assert.equal(regular.game._currentBpm, 80);

    const fast = setup({ bpm: 155 });
    fast.game._startLoop();
    fast.game._advanceRoundTempo();
    fast.advanceTo(30000 / 155);
    fast.game._advanceRoundTempo();
    assert.equal(fast.game._currentBpm, 160);
    assert.equal(fast.voices.length, 7);
});

test('pausing before the tempo boundary cancels movement and resumes at the new speed', () => {
    const { game, timers, voices, moves, advanceTo } = setup();
    game._startLoop();
    advanceTo(100);
    game._advanceRoundTempo();
    game._stopLoop();
    game._pausedByModal = true;
    assert.equal(game._currentBpm, 90);
    assert.equal(timers.size, 0);
    assert.ok(voices.every(voice => voice.disposed));
    advanceTo(1000);
    assert.equal(moves.length, 0);
    game._advanceRoundTempo();
    game._pausedByModal = false;
    game._startLoop();
    advanceTo(1300);
    assert.equal(moves[0].at, 1300);
    assert.equal(game._currentBpm, 100);
    assert.equal(timers.size, 1);
});

test('muted gameplay changes speed without creating audio', () => {
    const { game, voices, moves, advanceTo } = setup({ sound: false });
    game._startLoop();
    game._advanceRoundTempo();
    advanceTo(375);
    assert.equal(game._currentBpm, 90);
    closeTo(moves[0].duration, 30000 / 90);
    assert.equal(voices.length, 0);
});

test('rendering time does not extend the beat and ending a game cancels the next tick', () => {
    const { game, timers, advanceTo, elapse } = setup();
    game._advanceSnake = () => elapse(12);
    game._startLoop();
    advanceTo(400);
    assert.equal([...timers.values()][0].at, 750);
    game._advanceSnake = () => { game._isGameOver = true; game._stopLoop(); };
    advanceTo(750);
    assert.equal(timers.size, 0);
    assert.equal(game._tickTimer, null);
});
