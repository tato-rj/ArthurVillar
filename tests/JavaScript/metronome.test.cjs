const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.join(__dirname, '../../resources/js/music');
const read = name => fs.readFileSync(path.join(root, name), 'utf8')
    .replace(/^import .*;\n/gm, '')
    .replace(/^export /gm, '');
const source = ['gesture', 'settings', 'conductor', 'clock'].map(name => read(`metronome/${name}.js`)).join('\n');

function setup({ deferredResume = false, resumeError = false } = {}) {
    const timers = new Map();
    const timeouts = new Map();
    let wallTime = 0;
    let timerId = 0;
    const oscillators = [];
    const states = [];
    const errors = [];
    const beatIndices = [];
    let beatCount = 0;
    let resolveResume;
    const audioParam = () => ({
        setValueAtTime(value, time) { this.value = value; this.time = time; },
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
        requestAnimationFrame() { return ++timerId; },
        cancelAnimationFrame() {},
    });
    vm.runInContext(`${source}\nglobalThis.api = { TempoGesture, MetronomeClock, normalizeSettings, loadSettings, colorPalette, conductorPoint, conductorPreparationPoint, conductorPreparationBeats, CONDUCTING_PATTERNS };`, context);
    const clock = new context.api.MetronomeClock({
        createContext: () => audio,
        onStateChange: value => states.push(value),
        onBeat: index => { beatCount++; beatIndices.push(index); },
        onError: error => errors.push(error),
    });
    return {
        context, clock, audio, timers, oscillators, states, errors, beatIndices,
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

function setupPage(savedSettings = null) {
    const page = setup();
    const listeners = {};
    const attributes = {};
    const classes = new Set();
    const animate = () => ({ cancel() {}, updatePlaybackRate() {}, playState: 'running' });
    function element(extra = {}) {
        const attrs = {};
        return {
            listeners: {}, dataset: {}, attributes: attrs, value: '', checked: false,
            classList: { toggle() {}, remove() {} },
            style: { setProperty(name, value) { this[name] = value; } },
            setAttribute: (name, value) => { attrs[name] = value; },
            addEventListener(name, handler) { this.listeners[name] = handler; },
            ...extra,
        };
    }
    const surface = {
        dataset: {},
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
        closest: selector => selector.includes('[data-tempo-step]'),
        addEventListener(name, callback) { this.listeners[name] = callback; },
    }));
    const number = { textContent: '120', animate };
    const message = { hidden: true };
    const documentListeners = {};
    const windowListeners = {};
    const settingsButton = element();
    const settingsDialog = element({
        open: false,
        showModal() { this.open = true; },
        close() { this.open = false; this.listeners.close(); },
    });
    const closeButton = element();
    const beatInputs = [1, 2, 3, 4].map(value => element({ value: String(value) }));
    const typeInputs = ['classic', 'conductor'].map(value => element({ value }));
    const colorInput = element();
    const colorValue = element();
    const soundInput = element();
    const conductorParts = Object.fromEntries(['path', 'dot', 'halo', 'markers'].map(name => [name, element()]));
    conductorParts.markers.querySelectorAll = () => [];
    const svg = element({
        querySelector: selector => conductorParts[selector.replace('[data-conductor-', '').replace(']', '')],
    });
    const theme = element();
    const storage = new Map(savedSettings ? [['metronome.settings.v1', savedSettings]] : []);
    page.context.document = {
        documentElement: element(),
        querySelectorAll: selector => ({
            '[data-tempo-step]': edges,
            '[name="metronome-beats"]': beatInputs,
            '[name="metronome-type"]': typeInputs,
            '[data-settings-close]': [closeButton],
        })[selector] || [],
        querySelector: selector => ({
            '[data-metronome]': surface, '[data-tempo]': number, '[data-metronome-message]': message,
            '[data-settings-open]': settingsButton, '[data-settings-dialog]': settingsDialog,
            '[data-settings-color]': colorInput, '[data-color-value]': colorValue,
            '[data-settings-sound]': soundInput, '[data-conductor]': svg, 'meta[name="theme-color"]': theme,
        })[selector],
        addEventListener: (name, callback) => { documentListeners[name] = callback; },
    };
    page.context.window = {
        AudioContext: function () { return page.audio; },
        matchMedia: () => ({ matches: false, addEventListener() {} }),
        localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) },
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
    return { ...page, edges, edge, attributes, number, pointer, click, listeners, documentListeners, windowListeners,
        settingsButton, settingsDialog, closeButton, beatInputs, typeInputs, colorInput, soundInput, storage, surface,
        conductorParts, theme };
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

test('each beat group plays a normal first beat and lower remaining beats, then repeats', async () => {
    for (const count of [1, 2, 3, 4]) {
        const page = setup();
        page.clock.setBeats(count);
        await page.clock.start();
        for (let i = 1; i < count * 2; i++) page.advance(i * 0.5 - 0.05);
        const frequencies = page.oscillators.map(oscillator => oscillator.frequency.value);
        assert.deepEqual(frequencies, Array.from({ length: count * 2 }, (_, i) => i % count === 0 ? 1400 : 1400 * 0.82));
        page.clock.stop();
        await page.clock.start();
        assert.equal(page.oscillators.at(-1).frequency.value, 1400);
    }
});

test('all four sound options produce distinct voices and preserve the lower beat pitch', async () => {
    const signatures = new Set();
    for (const sound of ['click', 'woodblock', 'beep', 'cowbell']) {
        const page = setup();
        page.clock.setSound(sound);
        page.clock.setBeats(2);
        await page.clock.start();
        const first = page.oscillators.slice();
        signatures.add(first.map(voice => `${voice.type}:${voice.frequency.value}`).join(','));
        page.advance(0.45);
        page.oscillators.slice(first.length).forEach((voice, i) => {
            assert.ok(Math.abs(voice.frequency.value / first[i].frequency.value - 0.82) < 0.00001);
        });
        page.clock.stop();
        assert.ok(page.oscillators.every(voice => voice.disconnected));
    }
    assert.equal(signatures.size, 4);
});

test('changing beat groups or sounds replaces queued audio and begins the new group on a normal beat', async () => {
    const page = setup();
    page.clock.setBeats(4);
    await page.clock.start();
    page.advance(0.45);
    const queued = page.oscillators[1];
    page.clock.setBeats(3);
    assert.equal(queued.disconnected, true);
    assert.equal(page.oscillators.at(-1).startTime, 0.52);
    assert.equal(page.oscillators.at(-1).frequency.value, 1400);
    const replacement = page.oscillators.at(-1);
    page.clock.setSound('beep');
    assert.equal(replacement.disconnected, true);
    assert.equal(page.oscillators.at(-1).startTime, 0.52);
    assert.equal(page.oscillators.at(-1).frequency.value, 1000);
});

test('tempo edits preserve beat grouping and conductor progress', async () => {
    const page = setup();
    page.clock.setBeats(3);
    await page.clock.start();
    page.advance(0.27);
    assert.equal(page.clock.getBeatPosition().beat, 0);
    assert.equal(page.clock.getBeatPosition().progress, 0.5);
    page.clock.setTempo(60);
    assert.equal(page.clock.getBeatPosition().progress, 0.5);
    page.advance(0.7);
    assert.equal(page.oscillators.at(-1).frequency.value, 1400 * 0.82);
    page.advance(0.8);
    assert.equal(page.clock.getBeatPosition().beat, 1);
});

test('a tempo edit before the first click keeps that first click immediate', async () => {
    const page = setup();
    await page.clock.start();
    page.clock.setTempo(80);
    assert.equal(page.oscillators.at(-1).startTime, 0.02);
});

test('conducting paths meet exactly at each beat and the four-beat pattern goes down, left, right, up', () => {
    const { conductorPoint, CONDUCTING_PATTERNS } = setup().context.api;
    for (const count of [1, 2, 3, 4]) {
        for (let beat = 0; beat < count; beat++) {
            assert.deepEqual(Array.from(conductorPoint(count, beat, 0)), Array.from(CONDUCTING_PATTERNS[count][beat].point));
            assert.deepEqual(Array.from(conductorPoint(count, beat, 1)), Array.from(conductorPoint(count, (beat + 1) % count, 0)));
        }
    }
    const points = CONDUCTING_PATTERNS[4].map(segment => segment.point);
    assert.ok(points[0][1] > points[1][1] && points[0][1] > points[2][1]);
    assert.ok(points[1][0] < points[0][0] && points[2][0] > points[0][0]);
    assert.ok(points[3][1] < points[0][1]);
});

test('settings isolate keyboard and edge controls from playback and tempo', async () => {
    const page = setupPage();
    page.click();
    await Promise.resolve();
    page.settingsButton.listeners.click();
    assert.equal(page.settingsDialog.open, true);
    for (const key of ['ArrowUp', 'ArrowDown', 'Enter', 'Escape']) {
        page.documentListeners.keydown({ key, preventDefault() { assert.fail('Dialog keys should keep their native behavior.'); } });
    }
    page.edge(0, 'pointerdown');
    page.edge(0, 'click', { detail: 0 });
    page.tick(1000);
    assert.equal(page.number.textContent, '120');
    assert.equal(page.attributes['aria-pressed'], 'true');
    page.closeButton.listeners.click();
    assert.equal(page.settingsDialog.open, false);
    assert.equal(page.attributes['aria-pressed'], 'true');
});

test('settings apply immediately, stay readable for light colors, and persist across visits', () => {
    const page = setupPage();
    page.beatInputs[3].checked = true;
    page.beatInputs[3].listeners.change();
    page.typeInputs[1].checked = true;
    page.typeInputs[1].listeners.change();
    page.colorInput.value = '#ffffff';
    page.colorInput.listeners.input();
    page.soundInput.value = 'cowbell';
    page.soundInput.listeners.change();
    assert.equal(page.surface.dataset.mode, 'conductor');
    assert.equal(page.context.document.documentElement.style['--metronome-ink'], '#112037');
    assert.equal(page.theme.attributes.content, '#ffffff');
    const saved = page.storage.get('metronome.settings.v1');
    assert.deepEqual(JSON.parse(saved), { beats: 4, color: '#ffffff', sound: 'cowbell', type: 'conductor' });
    const next = setupPage(saved);
    assert.equal(next.beatInputs[3].checked, true);
    assert.equal(next.surface.dataset.mode, 'conductor');
    assert.equal(next.soundInput.value, 'cowbell');
    assert.equal(next.colorInput.value, '#ffffff');
});

test('invalid or unavailable saved settings fall back to usable defaults', () => {
    const { normalizeSettings, loadSettings } = setup().context.api;
    const defaults = { beats: 1, color: '#155eef', sound: 'click', type: 'classic' };
    assert.deepEqual(JSON.parse(JSON.stringify(normalizeSettings({ beats: 99, color: 'invalid', sound: 'toString', type: 'unknown' }))), defaults);
    assert.deepEqual(JSON.parse(JSON.stringify(loadSettings({ getItem() { throw new Error('Blocked'); } }))), defaults);
    assert.equal(setupPage('{invalid json').surface.dataset.mode, 'classic');
});


test('conductor preparation drops from the top to beat one for every pattern', () => {
    const { conductorPreparationPoint, conductorPoint, CONDUCTING_PATTERNS } = setup().context.api;
    for (const count of [1, 2, 3, 4]) {
        const start = conductorPreparationPoint(count, 0);
        const end = conductorPreparationPoint(count, 1);
        assert.ok(start[1] < end[1]);
        assert.deepEqual(Array.from(end), Array.from(conductorPoint(count, 0, 0)));
        if (count > 1) assert.deepEqual(Array.from(start), Array.from(CONDUCTING_PATTERNS[count][count - 1].point));
        let previousY = start[1];
        for (let step = 1; step <= 20; step++) {
            const position = conductorPreparationPoint(count, step / 20);
            assert.ok(position[1] > previousY, 'The preparation stroke should descend without reversing.');
            previousY = position[1];
        }
    }
});

test('conductor lead-in is silent and tempo edits keep the first click aligned with the drop', async () => {
    const page = setup();
    page.clock.setBeats(4);
    await page.clock.start({ leadInBeats: 1 });
    assert.equal(page.clock.getBeatPosition().beat, 3);
    assert.equal(page.clock.getBeatPosition().preparing, true);
    assert.equal(page.oscillators.length, 0);
    page.advance(0.25);
    assert.equal(page.clock.getBeatPosition().progress, 0.5);
    page.clock.setTempo(60);
    assert.equal(page.clock.getBeatPosition().progress, 0.5);
    page.advance(0.7);
    assert.equal(page.oscillators[0].startTime, 0.75);
    assert.equal(page.beatCount, 0);
    page.advance(0.75);
    assert.equal(page.clock.getBeatPosition().preparing, false);
    assert.equal(page.clock.getBeatPosition().beat, 0);
    assert.equal(page.clock.getBeatPosition().progress, 0);
    assert.deepEqual(page.beatIndices, [0]);
    assert.equal(page.oscillators[0].frequency.value, 1400);
    page.clock.stop();
    assert.equal(page.clock.getBeatPosition().preparing, true);
    assert.equal(page.clock.getBeatPosition().progress, 0);
});

test('the conductor dot waits at the last beat and returns there when stopped', async () => {
    for (const count of [1, 2, 3, 4]) {
        const page = setupPage(JSON.stringify({ beats: count, type: 'conductor' }));
        const clock = vm.runInContext('clock', page.context);
        const { conductorPreparationPoint, conductorPreparationBeats, conductorPoint } = page.context.api;
        const dropDuration = conductorPreparationBeats(count) * 0.5;
        const position = () => [page.conductorParts.dot.attributes.cx, page.conductorParts.dot.attributes.cy];
        assert.deepEqual(position(), Array.from(conductorPreparationPoint(count, 0)));
        page.click();
        await new Promise(setImmediate);
        page.advance(dropDuration / 2);
        vm.runInContext('drawConductor()', page.context);
        assert.deepEqual(position(), Array.from(conductorPreparationPoint(count, 0.5)));
        page.advance(dropDuration - 0.05);
        page.advance(dropDuration);
        assert.deepEqual(position(), Array.from(conductorPoint(count, 0, 0)));
        page.click();
        assert.equal(clock.running, false);
        assert.deepEqual(position(), Array.from(conductorPreparationPoint(count, 0)));
        page.click();
        await new Promise(setImmediate);
        assert.equal(clock.getBeatPosition().preparing, true);
        assert.deepEqual(position(), Array.from(conductorPreparationPoint(count, 0)));
    }
});


test('opening drops match the repeating stroke speed at slow, normal, and fast tempos', async () => {
    for (const count of [1, 2, 3, 4]) {
        for (const tempo of [40, 120, 240]) {
            const page = setup();
            const { conductorPreparationBeats, conductorPreparationPoint, conductorPoint } = page.context.api;
            const fraction = conductorPreparationBeats(count);
            const interval = 60 / tempo;
            page.clock.setBeats(count);
            page.clock.setTempo(tempo);
            await page.clock.start({ leadInBeats: fraction });
            for (let step = 0; step < 10; step++) {
                const elapsed = step / 10 * fraction * interval;
                page.advance(elapsed);
                const position = page.clock.getBeatPosition();
                const opening = conductorPreparationPoint(count, position.progress);
                const repeating = conductorPoint(count, count - 1, 1 - fraction + elapsed / interval);
                opening.forEach((value, axis) => assert.ok(Math.abs(value - repeating[axis]) < 0.000001));
            }
            page.advance(fraction * interval - 0.05);
            const first = page.oscillators[0];
            assert.ok(Math.abs(first.startTime - fraction * interval) < 0.000001);
        }
    }
});

test('changing tempo during a half-beat drop preserves its phase and then resumes full beats', async () => {
    const page = setup();
    await page.clock.start({ leadInBeats: 0.5 });
    page.advance(0.125);
    page.clock.setTempo(60);
    assert.equal(page.clock.getBeatPosition().progress, 0.5);
    page.advance(0.3);
    assert.equal(page.oscillators[0].startTime, 0.375);
    page.advance(0.375);
    assert.equal(page.clock.getBeatPosition().progress, 0);
    assert.equal(page.clock.getBeatPosition().preparing, false);
    page.advance(1.3);
    assert.equal(page.oscillators[1].startTime, 1.375);
});

test('the dot follows scheduled click times between scheduler ticks without pausing at the beat', async () => {
    const page = setup();
    page.clock.setBeats(4);
    await page.clock.start({ leadInBeats: 1 });
    page.advance(0.45);
    page.audio.currentTime = 0.51;
    const position = page.clock.getBeatPosition();
    assert.equal(position.beat, 0);
    assert.equal(position.preparing, false);
    assert.ok(Math.abs(position.progress - 0.02) < 0.000001);
    assert.equal(page.beatCount, 0, 'Reading the animation position does not fire beat callbacks.');
    page.advance(0.51);
    assert.equal(page.beatCount, 1);
    assert.equal(page.clock.getBeatPosition().progress, position.progress);
});


test('conductor motion keeps a continuous velocity through every rounded turn and beat', () => {
    const { conductorPoint, CONDUCTING_PATTERNS } = setup().context.api;
    const delta = 0.00001;
    for (const count of [1, 2, 3, 4]) {
        CONDUCTING_PATTERNS[count].forEach((segment, beat) => {
            segment.curves.forEach(curve => {
                const before = conductorPoint(count, beat, curve.at - delta);
                const at = conductorPoint(count, beat, curve.at);
                const after = curve.at === 1
                    ? conductorPoint(count, (beat + 1) % count, delta)
                    : conductorPoint(count, beat, curve.at + delta);
                const velocityChange = Math.hypot(...at.map((value, axis) =>
                    (after[axis] - 2 * value + before[axis]) / delta));
                assert.ok(velocityChange < 2,
                    `Pattern ${count}, beat ${beat + 1}: the ball must not snap to a different velocity at a turn.`);
            });
        });
    }
});
