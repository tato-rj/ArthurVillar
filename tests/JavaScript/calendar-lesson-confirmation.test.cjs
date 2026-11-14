const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../../resources/js/calendar/lesson-confirmation.js'), 'utf8')
    .replace('export const bindLessonConfirmation', 'const bindLessonConfirmation');

function target() {
    const listeners = new Map();
    return {
        addEventListener(name, callback) {
            if (!listeners.has(name)) listeners.set(name, []);
            listeners.get(name).push(callback);
        },
        fire(name, values = {}) {
            const event = { button: 0, isPrimary: true, pointerId: 1, detail: 1, preventDefault() {}, ...values };
            for (const callback of listeners.get(name) || []) callback(event);
        },
    };
}

function setup() {
    let now = 0;
    let nextTimer = 0;
    let key = 'lesson-1';
    let captured = null;
    const timers = new Map();
    const classes = new Set();
    const calls = [];
    const modal = target();
    const document = target();
    const window = {
        ...target(),
        setTimeout(callback, delay) {
            timers.set(++nextTimer, { callback, at: now + delay });
            return nextTimer;
        },
        clearTimeout: id => timers.delete(id),
    };
    const button = {
        ...target(), disabled: false,
        style: { setProperty() {} },
        classList: {
            add: (...names) => names.forEach(name => classes.add(name)),
            remove: (...names) => names.forEach(name => classes.delete(name)),
        },
        closest: () => modal,
        setPointerCapture: id => { captured = id; },
        hasPointerCapture: id => captured === id,
        releasePointerCapture: () => { captured = null; },
        getBoundingClientRect: () => ({ left: 0, right: 200, top: 0, bottom: 40 }),
    };
    const context = vm.createContext({ window, document });
    vm.runInContext(source + '\nglobalThis.bind = bindLessonConfirmation;', context);
    const cancel = context.bind(button, () => key, includePayment => calls.push(includePayment));
    return {
        button, window, document, modal, classes, calls, cancel,
        setKey: value => { key = value; },
        tick(ms) {
            now += ms;
            for (const [id, timer] of [...timers]) {
                if (timer.at <= now) {
                    timers.delete(id);
                    timer.callback();
                }
            }
        },
    };
}

test('releasing before the fill starts or finishes confirms only attendance once', () => {
    for (const pointerType of ['mouse', 'touch', 'pen']) {
        for (const waitForFill of [false, true]) {
            const h = setup();
            h.button.fire('pointerdown', { pointerType });
            h.tick(499);
            if (waitForFill) {
                h.tick(1);
                h.tick(999);
            }
            assert.deepEqual(h.calls, []);
            assert.equal(h.classes.has('is-holding'), waitForFill);
            h.button.fire('pointerup');
            h.button.fire('click');
            h.tick(3000);
            assert.deepEqual(h.calls, [false]);
            assert.equal(h.classes.has('is-holding'), false);
        }
    }
});

test('the fill starts after half a second and confirms both one second later', () => {
    const h = setup();
    h.button.fire('pointerdown');
    h.tick(499);
    assert.equal(h.classes.has('is-holding'), false);
    h.tick(1);
    assert.ok(h.classes.has('is-holding'));
    h.tick(999);
    assert.deepEqual(h.calls, []);
    h.tick(1);
    assert.deepEqual(h.calls, [true]);
    assert.ok(h.classes.has('is-hold-complete'));
    h.tick(5000);
    h.button.fire('pointerup');
    h.button.fire('click');
    assert.deepEqual(h.calls, [true]);
});

test('canceling, leaving the button, hiding the modal or losing focus never confirms', () => {
    const cancelActions = [
        h => h.button.fire('pointercancel'),
        h => h.button.fire('pointerleave'),
        h => h.button.fire('pointermove', { clientX: 201, clientY: 20 }),
        h => h.button.fire('lostpointercapture'),
        h => h.document.fire('keydown', { key: 'Escape' }),
        h => { h.document.hidden = true; h.document.fire('visibilitychange'); },
        h => h.window.fire('blur'),
        h => h.modal.fire('hide.bs.modal'),
        h => h.cancel(),
    ];
    for (const cancel of cancelActions) {
        for (const elapsed of [250, 500]) {
            const h = setup();
            h.button.fire('pointerdown');
            h.tick(elapsed);
            cancel(h);
            h.tick(2000);
            h.button.fire('pointerup');
            h.button.fire('click');
            assert.deepEqual(h.calls, []);
            assert.equal(h.classes.has('is-holding'), false);
            h.button.fire('pointerdown');
            h.button.fire('pointerup');
            h.button.fire('click');
            assert.deepEqual(h.calls, [false]);
        }
    }
});

test('switching lessons or disabling the button during a hold discards the gesture', () => {
    for (const finishEarly of [true, false]) {
        for (const change of [h => h.setKey('lesson-2'), h => h.setKey(null), h => { h.button.disabled = true; }]) {
            const h = setup();
            h.button.fire('pointerdown');
            h.tick(500);
            change(h);
            if (finishEarly) h.button.fire('pointerup');
            h.tick(2000);
            h.button.fire('click');
            assert.deepEqual(h.calls, []);
        }
    }
});

test('lessons without a payment step retain ordinary click and keyboard behavior', () => {
    const h = setup();
    h.setKey(null);
    h.button.fire('pointerdown');
    h.tick(3000);
    assert.deepEqual(h.calls, []);
    assert.equal(h.classes.has('is-holding'), false);
    h.button.fire('pointerup');
    h.button.fire('click');
    h.button.fire('keydown', { key: 'Enter' });
    h.button.fire('click', { detail: 0 });
    assert.deepEqual(h.calls, [false, false]);
});

test('keyboard confirmation works after a canceled hold and disabled controls do nothing', () => {
    const h = setup();
    h.button.fire('pointerdown');
    h.cancel();
    h.button.fire('keydown', { key: ' ' });
    h.button.fire('click', { detail: 0 });
    assert.deepEqual(h.calls, [false]);
    h.button.disabled = true;
    h.button.fire('pointerdown');
    h.tick(2000);
    h.button.fire('click');
    assert.deepEqual(h.calls, [false]);
});

test('secondary pointers and non-primary mouse buttons cannot start or finish a hold', () => {
    const h = setup();
    h.button.fire('pointerdown', { button: 2 });
    h.button.fire('pointerdown', { isPrimary: false });
    h.tick(2000);
    assert.deepEqual(h.calls, []);
    h.button.fire('pointerdown');
    h.button.fire('pointerup', { pointerId: 2 });
    h.tick(500);
    h.tick(1000);
    assert.deepEqual(h.calls, [true]);
});
