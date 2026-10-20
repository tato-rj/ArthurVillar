const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.join(__dirname, '../../resources/js/music');
const read = name => fs.readFileSync(path.join(root, name), 'utf8')
    .replace(/^import .*;\n/gm, '')
    .replace(/^export /gm, '');
const source = `${read('metronome/gesture.js')}\n${read('metronome/clock.js')}`;

function setup({ deferredResume = false, resumeError = false } = {}) {
    const timers = new Map();
    const timeouts = new Map();
    let wallTime = 0;
    let timerId = 0;
    const oscillators = [];
    const states = [];
    const errors = [];
    let beatCount = 0;
    let resolveResume;
    const audioParam = () => ({
        setValueAtTime() {},
        linearRampToValueAtTime() {},
        exponentialRampToValueAtTime() {},
    });
    const audio = {
        currentTime: 0,
        state: 'suspended',
        destination: {},
        resume() {
            if (resumeError) return Promise.reject(new Error('Blocked'));
            if (deferredResume) return new Promise(resolve => {
                resolveResume = () => { this.state = 'running'; resolve(); };
            });
            this.state = 'running';
            return Promise.resolve();
        },
        createOscillator() {
            const oscillator = {
                frequency: audioParam(),
                connect() {},
                disconnect() { this.disconnected = true; },
                start(time) { this.startTime = time; },
                stop(time) { this.stopTime = time === undefined ? audio.currentTime : time; },
            };
            oscillators.push(oscillator);
            return oscillator;
        },
        createGain() {
            return { gain: audioParam(), connect() {}, disconnect() {} };
        },
    };
    const context = vm.createContext({
        setInterval(fn) { timers.set(++timerId, fn); return timerId; },
        clearInterval(id) { timers.delete(id); },
        setTimeout(fn, delay) {
            timeouts.set(++timerId, { fn, at: wallTime + delay });
            return timerId;
        },
        clearTimeout(id) { timeouts.delete(id); },
    });
    vm.runInContext(`${source}\nglobalThis.api = { TempoGesture, MetronomeClock };`, context);
    const clock = new context.api.MetronomeClock({
        createContext: () => audio,
        onStateChange: value => states.push(value),
        onBeat: () => beatCount++,
        onError: error => errors.push(error),
    });
    return {
        context, clock, audio, timers, oscillators, states, errors,
        get beatCount() { return beatCount; },
        resume: () => resolveResume(),
        tick(milliseconds) {
            const until = wallTime + milliseconds;
            while (timeouts.size) {
                const [id, timeout] = [...timeouts].sort((a, b) => a[1].at - b[1].at)[0];
                if (timeout.at > until) break;
                wallTime = timeout.at;
                timeouts.delete(id);
                timeout.fn();
            }
            wallTime = until;
        },
        advance(time) {
            audio.currentTime = time;
            for (const tick of timers.values()) tick();
        },
    };
}

test('slow swipes allow fine changes; fast swipes cover more tempo in either direction', () => {
    const { TempoGesture } = setup().context.api;
    const slow = new TempoGesture(120, 0, 200, 0);
    const fast = new TempoGesture(120, 0, 200, 0);
    assert.equal(slow.move(0, 160, 400), 129);
    assert.equal(fast.move(0, 160, 20), 152);
    assert.equal(slow.move(0, 200, 800), 120);
    assert.equal(fast.move(0, 200, 40), 120);
});

test('constant-speed swipes are independent of pointer event frequency', () => {
    const { TempoGesture } = setup().context.api;
    const one = new TempoGesture(120, 0, 200, 0);
    const many = new TempoGesture(120, 0, 200, 0);
    const expected = one.move(0, 100, 100);
    let actual;
    for (let step = 1; step <= 20; step++) actual = many.move(0, 200 - step * 5, step * 5);
    assert.equal(actual, expected);
});

test('tap jitter keeps the tempo unchanged and bounds can be reversed immediately', () => {
    const { TempoGesture } = setup().context.api;
    const tap = new TempoGesture(120, 100, 100, 0);
    assert.equal(tap.move(102, 98, 100), 120);
    assert.equal(tap.moved, false);
    const swipe = new TempoGesture(120, 0, 500, 0);
    assert.equal(swipe.move(0, 0, 20), 300);
    assert.ok(swipe.move(0, 10, 40) < 300);
    assert.equal(swipe.move(0, 1000, 60), 20);
    assert.ok(swipe.move(0, 990, 80) > 20);
});

test('clicks follow the audio clock at 120 BPM and stop cancels queued sound', async () => {
    const page = setup();
    await page.clock.start();
    assert.equal(page.oscillators[0].startTime, 0.02);
    page.advance(0.45);
    assert.equal(page.oscillators[1].startTime, 0.52);
    page.advance(0.95);
    assert.equal(page.oscillators[2].startTime, 1.02);
    page.clock.stop();
    assert.equal(page.timers.size, 0);
    assert.equal(page.clock.running, false);
    assert.ok(page.oscillators.every(note => note.disconnected));
    assert.equal(page.clock.beats.length, 0);
});

test('a tempo change preserves beat progress and replaces queued clicks', async () => {
    const page = setup();
    await page.clock.start();
    page.advance(0.45);
    const oldClick = page.oscillators[1];
    page.clock.setTempo(60);
    assert.equal(oldClick.disconnected, true);
    // 86% through the old beat leaves 14% of a one-second beat.
    assert.ok(Math.abs(page.clock.nextBeatTime - 0.59) < 0.000001);
    page.advance(0.51);
    assert.ok(Math.abs(page.oscillators[2].startTime - 0.59) < 0.000001);
    assert.equal(page.beatCount, 1);
});

test('stopping while audio unlocks cannot restart playback asynchronously', async () => {
    const page = setup({ deferredResume: true });
    const starting = page.clock.start();
    page.clock.stop();
    page.resume();
    await starting;
    assert.equal(page.clock.running, false);
    assert.equal(page.timers.size, 0);
    assert.equal(page.oscillators.length, 0);
});

test('audio failures restore the stopped state and report the failure', async () => {
    const page = setup({ resumeError: true });
    await page.clock.start();
    assert.equal(page.clock.running, false);
    assert.equal(page.timers.size, 0);
    assert.equal(page.errors.length, 1);
    assert.deepEqual(page.states, [true, false]);
});

test('a stalled scheduler resumes without a burst of missed beats', async () => {
    const page = setup();
    await page.clock.start();
    page.advance(10);
    assert.equal(page.oscillators.length, 2);
    assert.equal(page.oscillators[1].startTime, 10.01);
});

function setupPage() {
    const page = setup();
    const listeners = {};
    const attributes = {};
    const classes = new Set();
    const animate = () => ({ cancel() {}, updatePlaybackRate() {}, playState: 'running' });
    const surface = {
        animate,
        setAttribute: (name, value) => { attributes[name] = value; },
        setPointerCapture() {},
        addEventListener: (name, callback) => { listeners[name] = callback; },
        classList: {
            toggle: (name, on) => on ? classes.add(name) : classes.delete(name),
            remove: name => classes.delete(name),
        },
    };
    const edges = [-1, 1].map(step => ({
        dataset: { tempoStep: String(step) },
        listeners: {},
        setAttribute() {},
        setPointerCapture() {},
        closest: selector => selector === '[data-tempo-step]',
        addEventListener(name, callback) { this.listeners[name] = callback; },
    }));
    const number = { textContent: '120', animate };
    const message = { hidden: true };
    const documentListeners = {};
    const windowListeners = {};
    page.context.document = {
        querySelectorAll: selector => selector === '[data-tempo-step]' ? edges : [],
        querySelector: selector => ({
            '[data-metronome]': surface, '[data-tempo]': number, '[data-metronome-message]': message,
        })[selector],
        addEventListener: (name, callback) => { documentListeners[name] = callback; },
    };
    page.context.window = {
        AudioContext: function () { return page.audio; },
        matchMedia: () => ({ matches: false }),
        addEventListener: (name, callback) => { windowListeners[name] = callback; },
    };
    vm.runInContext(read('metronome.js'), page.context);
    const pointer = (type, x, y, time, extra = {}) => listeners[type]({
        pointerId: 1, isPrimary: true, button: 0, clientX: x, clientY: y, timeStamp: time, ...extra,
    });
    const click = () => listeners.click({ detail: 1, preventDefault() {} });
    const edge = (index, type, extra = {}) => edges[index].listeners[type]({
        pointerId: 1, isPrimary: true, button: 0, detail: 1, target: edges[index],
        preventDefault() {}, ...extra,
    });
    return { ...page, edges, edge, attributes, number, pointer, click, listeners, documentListeners, windowListeners };
}

test('taps toggle playback and releasing a swipe does not toggle it', async () => {
    const page = setupPage();
    page.pointer('pointerdown', 100, 200, 0);
    page.pointer('pointerup', 100, 200, 50);
    page.click();
    await Promise.resolve();
    assert.equal(page.attributes['aria-pressed'], 'true');
    page.pointer('pointerdown', 100, 200, 100);
    page.pointer('pointermove', 100, 150, 125);
    page.pointer('pointerup', 100, 100, 150);
    page.click();
    assert.equal(page.number.textContent, '200');
    assert.equal(page.attributes['aria-pressed'], 'true');
    page.pointer('pointerdown', 100, 200, 200);
    page.pointer('pointerup', 100, 200, 250);
    page.click();
    assert.equal(page.attributes['aria-pressed'], 'false');
});

test('canceled gestures do not toggle playback; keyboard remains usable', () => {
    const page = setupPage();
    page.pointer('pointerdown', 100, 200, 0);
    page.pointer('pointercancel', 100, 200, 50);
    page.click();
    assert.equal(page.attributes['aria-pressed'], undefined);
    const key = (key, extra = {}) => page.documentListeners.keydown({ key, preventDefault() {}, ...extra });
    key('ArrowUp');
    assert.equal(page.number.textContent, '121');
    key('ArrowDown', { shiftKey: true });
    assert.equal(page.number.textContent, '111');
    key('Enter');
    assert.equal(page.attributes['aria-pressed'], 'true');
    key('Escape');
    assert.equal(page.attributes['aria-pressed'], 'false');
});

test('edge taps step once without toggling playback or repeating after release', async () => {
    const page = setupPage();
    page.edge(0, 'pointerdown');
    assert.equal(page.number.textContent, '119');
    page.edge(0, 'pointerup');
    page.edge(0, 'click');
    page.tick(1000);
    assert.equal(page.number.textContent, '119');
    assert.equal(page.attributes['aria-pressed'], undefined);

    page.click();
    await Promise.resolve();
    page.edge(1, 'pointerdown');
    page.edge(1, 'pointerup');
    page.edge(1, 'click');
    assert.equal(page.number.textContent, '120');
    assert.equal(page.attributes['aria-pressed'], 'true');
});

test('holding an edge repeats after a delay and release stops further changes', () => {
    const page = setupPage();
    page.edge(1, 'pointerdown');
    assert.equal(page.number.textContent, '121');
    page.tick(300);
    assert.equal(page.number.textContent, '121');
    page.tick(500);
    assert.ok(Number(page.number.textContent) > 125);
    page.edge(1, 'pointerup');
    page.edge(1, 'click');
    const releasedTempo = page.number.textContent;
    page.tick(2000);
    assert.equal(page.number.textContent, releasedTempo);
});

test('edge holds stop on cancellation, capture loss, window blur, hiding, or navigation', () => {
    for (const interrupt of [
        page => page.edge(1, 'pointercancel'),
        page => page.edge(1, 'lostpointercapture'),
        page => page.windowListeners.blur(),
        page => { page.context.document.hidden = true; page.documentListeners.visibilitychange(); },
        page => page.windowListeners.pagehide(),
    ]) {
        const page = setupPage();
        page.edge(1, 'pointerdown');
        page.tick(500);
        interrupt(page);
        const stoppedTempo = page.number.textContent;
        page.tick(2000);
        assert.equal(page.number.textContent, stoppedTempo);
    }
});

test('edge controls respect tempo limits, ignore secondary pointers, and support keyboard clicks', () => {
    const page = setupPage();
    page.edge(0, 'pointerdown', { isPrimary: false, pointerId: 2 });
    page.tick(1000);
    assert.equal(page.number.textContent, '120');
    page.edge(0, 'pointerdown');
    page.tick(30000);
    assert.equal(page.number.textContent, '20');
    page.edge(0, 'pointerup');
    page.edge(1, 'pointerdown');
    page.tick(30000);
    assert.equal(page.number.textContent, '300');
    page.edge(1, 'pointerup');
    page.documentListeners.keydown({
        key: 'Enter', target: page.edges[0],
        preventDefault() { assert.fail('Native edge activation should be allowed.'); },
    });
    page.edge(0, 'click', { detail: 0 });
    assert.equal(page.number.textContent, '299');
    assert.equal(page.attributes['aria-pressed'], undefined);
});
