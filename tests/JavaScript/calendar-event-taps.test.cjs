const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../../resources/js/calendar/touch-activation.js'), 'utf8')
    .replace(/^export /gm, '');

function setup(binding = 'event', isOutsideOpenPopup = () => false) {
    const handlers = new Map();
    const opened = [];
    const item = { isConnected: true };
    const target = { item, matches: () => false };
    let hit = target;
    const root = {
        classList: { contains: name => name === 'show' },
        contains: () => true,
        addEventListener: (type, handler) => handlers.set(type, handler),
    };
    const context = vm.createContext({ document: { elementFromPoint: () => hit } });
    vm.runInContext(source, context);
    const panel = new EventTarget();
    if (binding !== 'event') {
        panel.classList = root.classList;
        panel.dataset = {};
        const dismiss = () => opened.push('dismissed');
        const toggle = { click: () => opened.push('reopened') };
        context.bindCalendarOffcanvas(panel, toggle, dismiss);
        context.bindCalendarControlTaps(root, dismiss, dismiss, isOutsideOpenPopup);
    } else {
        context.bindCalendarTap(root, point => point.target.item, selected => opened.push(selected));
    }

    const point = { identifier: 1, clientX: 50, clientY: 80, target };
    const touch = (type, fields) => {
        const event = {
            cancelable: true, defaultPrevented: false, timeStamp: 0,
            touches: [], changedTouches: [],
            preventDefault() { this.defaultPrevented = true; },
            ...fields,
        };
        handlers.get(type)(event);
        return event;
    };
    return {
        root, panel, target, item, point, opened, touch, setHit: value => { hit = value; },
        start: () => touch('touchstart', { touches: [point] }),
        end: (fields = {}) => touch('touchend', { changedTouches: [point], timeStamp: 75, ...fields }),
    };
}

test('a tap after a header swipe opens the event once without a browser click', () => {
    const h = setup();
    h.touch('touchstart', { touches: [{ ...h.point, target: {} }] });
    h.touch('touchmove', { touches: [{ ...h.point, clientX: 120 }] });
    assert.equal(h.end().defaultPrevented, false);

    h.start();
    assert.equal(h.end().defaultPrevented, true);
    assert.deepEqual(h.opened, [h.item]);
    assert.equal(h.end().defaultPrevented, false);
    assert.deepEqual(h.opened, [h.item]);
});

test('movement, canceled touches, multiple fingers, and long presses never activate the tap handler', () => {
    const cases = [
        h => {
            h.touch('touchmove', { touches: [{ ...h.point, clientY: 110 }] });
            return h.end();
        },
        h => {
            h.touch('touchcancel');
            return h.end();
        },
        h => h.end({ touches: [{ ...h.point, identifier: 2 }] }),
        h => h.end({ timeStamp: 700 }),
    ];

    for (const complete of cases) {
        const h = setup();
        h.start();
        assert.equal(complete(h).defaultPrevented, false);
        assert.deepEqual(h.opened, []);
        h.start();
        assert.equal(h.end().defaultPrevented, true);
        assert.deepEqual(h.opened, [h.item]);
    }
});

test('a touch that ends on a different event never opens a replaced calendar item', () => {
    for (const isConnected of [false, true]) {
        const h = setup();
        h.start();
        h.item.isConnected = isConnected;
        h.setHit({ item: { isConnected: true } });
        assert.equal(h.end().defaultPrevented, false);
        assert.deepEqual(h.opened, []);
    }
});

test('modal taps activate a checkbox through its label once and respect its disabled fieldset', () => {
    const h = setup('modal');
    let clicks = 0;
    let disabled = false;
    const checkbox = {
        isConnected: true, tagName: 'INPUT', type: 'checkbox',
        matches: selector => disabled && selector.includes(':disabled'), closest: () => h.root,
        focus() {}, click() { clicks++; },
    };
    h.target.closest = () => ({ tagName: 'LABEL', control: checkbox });
    h.start();
    assert.equal(h.end().defaultPrevented, true);
    assert.equal(clicks, 1);

    h.start();
    disabled = true;
    assert.equal(h.end().defaultPrevented, false);
    assert.equal(clicks, 1);
});

test('dragging across the modal backdrop leaves it open and a fresh backdrop tap dismisses it', () => {
    const h = setup('modal');
    h.root.isConnected = true;
    h.root.dataset = {};
    h.root.matches = selector => selector.includes('.modal');
    h.point.target = h.root;
    h.setHit(h.root);
    h.start();
    h.touch('touchmove', { touches: [{ ...h.point, clientY: 110 }] });
    assert.equal(h.end().defaultPrevented, false);
    assert.deepEqual(h.opened, []);
    h.start();
    assert.equal(h.end().defaultPrevented, true);
    assert.deepEqual(h.opened, ['dismissed']);
});

test('a mini-calendar backdrop tap dismisses once and a tap on a month control stays inside the picker', () => {
    const h = setup('mini-calendar');
    const backdrop = {
        isConnected: true, matches: selector => selector.includes('.offcanvas-backdrop'),
        parentElement: { querySelector: () => h.panel },
    };
    const button = { isConnected: true, matches: () => false, closest: () => null, click: () => h.opened.push('month') };
    h.point.target = backdrop;
    h.setHit(backdrop);

    h.start();
    h.touch('touchmove', { touches: [{ ...h.point, clientY: 120 }] });
    assert.equal(h.end().defaultPrevented, false);
    h.start();
    h.setHit({ matches: () => false, closest: selector => selector.includes('button') ? button : null });
    assert.equal(h.end().defaultPrevented, false);
    assert.deepEqual(h.opened, []);

    h.setHit(backdrop);
    h.start();
    assert.equal(h.end().defaultPrevented, true);
    assert.equal(h.end().defaultPrevented, false);
    h.point.target = h.target;
    h.setHit(h.target);
    h.target.closest = selector => selector.includes('button') ? button : null;
    h.start();
    assert.equal(h.end().defaultPrevented, true);
    assert.deepEqual(h.opened, ['dismissed', 'month']);
});

test('two dismissals while the mini-calendar is opening close it once after the opening transition', () => {
    const h = setup('mini-calendar');
    h.panel.classList = { contains: name => name === 'showing' };
    for (let i = 0; i < 2; i++) {
        assert.equal(h.panel.dispatchEvent(new Event('hide.bs.offcanvas', { cancelable: true })), false);
    }
    assert.deepEqual(h.opened, []);

    h.panel.classList = { contains: name => name === 'show' };
    h.panel.dispatchEvent(new Event('shown.bs.offcanvas'));
    assert.equal(h.panel.dispatchEvent(new Event('hide.bs.offcanvas', { cancelable: true })), true);
    h.panel.dispatchEvent(new Event('shown.bs.offcanvas'));
    assert.deepEqual(h.opened, ['dismissed']);
});

test('reopening a closing mini-calendar waits until Bootstrap has finished dismissing it', () => {
    const h = setup('mini-calendar');
    h.panel.classList = { contains: name => name === 'hiding' };
    assert.equal(h.panel.dispatchEvent(new Event('show.bs.offcanvas', { cancelable: true })), false);
    assert.deepEqual(h.opened, []);

    h.panel.classList = { contains: () => false };
    h.panel.dispatchEvent(new Event('hidden.bs.offcanvas'));
    assert.equal(h.panel.dispatchEvent(new Event('show.bs.offcanvas', { cancelable: true })), true);
    h.panel.dispatchEvent(new Event('hidden.bs.offcanvas'));
    assert.deepEqual(h.opened, ['reopened']);
});

test('calendar buttons work after a missing compatibility click while text and native pickers keep their default gestures', () => {
    const h = setup('controls');
    const button = { tagName: 'BUTTON', isConnected: true, matches: () => false, closest: () => null, click: () => h.opened.push('tools') };
    h.target.closest = () => button;
    h.start();
    assert.equal(h.end().defaultPrevented, true);
    assert.deepEqual(h.opened, ['tools']);

    for (const type of ['text', 'search', 'date', 'time', 'color', 'range', 'file']) {
        h.target.closest = () => ({ ...button, tagName: 'INPUT', type });
        h.start();
        assert.equal(h.end().defaultPrevented, false);
    }
    assert.deepEqual(h.opened, ['tools']);
});

test('an empty-space tap dismisses an open toolbar popup while a swipe leaves it open', () => {
    let open = true;
    const h = setup('controls', () => open);
    Object.assign(h.target, { isConnected: true, closest: () => null, click: () => { open = false; } });
    h.start();
    h.touch('touchmove', { touches: [{ ...h.point, clientY: 110 }] });
    assert.equal(h.end().defaultPrevented, false);
    assert.equal(open, true);
    h.start();
    assert.equal(h.end().defaultPrevented, true);
    assert.equal(open, false);
    h.start();
    assert.equal(h.end().defaultPrevented, false);
});
