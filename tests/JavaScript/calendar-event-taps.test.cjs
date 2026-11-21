const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../../resources/js/calendar/index.js'), 'utf8')
    .replace(/^import .*;$/gm, '');

function setup() {
    const handlers = new Map();
    const opened = [];
    const item = { isConnected: true };
    const target = { item };
    let hit = target;
    const context = vm.createContext({
        window: {},
        document: { addEventListener() {}, elementFromPoint: () => hit },
        require: () => ({}),
    });
    vm.runInContext(source + '\nglobalThis.bind = bindScheduleEventTap;', context);
    context.bind({ addEventListener: (type, handler) => handlers.set(type, handler) },
        point => point.target.item, selected => opened.push(selected));

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
        item, point, opened, touch, setHit: value => { hit = value; },
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
