const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../../resources/js/calendar/index.js'), 'utf8')
    .replace(/^import .*;$/gm, '');

function setup() {
    const requests = [];
    const context = vm.createContext({
        window: { location: { href: 'https://calendar.test/' }, setTimeout, clearTimeout },
        document: { addEventListener() {}, querySelector: () => null },
        require: () => ({}), console: { error() {} }, Intl, URL, Date, AbortController,
        fetch(url, options) {
            return new Promise((resolve, reject) => {
                const request = { url: new URL(url), options, resolve(payload, ok = true) {
                    resolve({ ok, headers: { get: () => null }, json: async () => payload });
                }, reject };
                requests.push(request);
                options.signal.addEventListener('abort', () => reject(Object.assign(new Error('Aborted'), { name: 'AbortError' })));
            });
        },
    });
    vm.runInContext(source + '\nglobalThis.api = {state, isRangeLoaded, fetchPlannedLessons, cacheCalendarPayload, invalidateCalendarDataCache, drainTravelRequests, getOverlappingTimedEventPairs};', context);
    context.api.state.view = 'day';
    context.api.state.date = new Date(2026, 8, 16);
    return { ...context.api, requests };
}

const range = date => ({ start: date, end: date });
const settle = () => new Promise(resolve => setImmediate(resolve));

test('one fetch covers nearby dates and changing views reuses loaded data', async () => {
    const h = setup();
    const pending = h.fetchPlannedLessons(range('2026-09-16'));
    const request = h.requests[0];
    assert.equal(request.url.searchParams.get('range_start'), '2026-09-02');
    assert.equal(request.url.searchParams.get('range_end'), '2026-09-30');
    request.resolve({ plannedLessons: [{ id: 1 }], calendarRange: { start: '2026-09-02', end: '2026-09-30' } });
    assert.equal(await pending, true);
    assert.equal(h.isRangeLoaded(range('2026-09-17')), true);
    assert.equal(h.isRangeLoaded({ start: '2026-09-20', end: '2026-09-26' }), true);
    assert.equal(h.requests.length, 1);
});

test('duplicate navigation requests share a promise and superseded requests are aborted', async () => {
    const h = setup();
    const first = h.fetchPlannedLessons(range('2026-09-16'));
    assert.equal(h.fetchPlannedLessons(range('2026-09-16')), first);
    h.state.date = new Date(2026, 10, 1);
    const second = h.fetchPlannedLessons(range('2026-11-01'));
    assert.equal(h.requests[0].options.signal.aborted, true);
    h.requests[1].resolve({ plannedLessons: [{ id: 2 }] });
    assert.equal(await first, false);
    assert.equal(await second, true);
    assert.equal(h.state.plannedLessons[0].id, 2);
});

test('recent previous ranges are reusable, expired ranges are not, and the cache stays bounded', () => {
    const h = setup();
    h.cacheCalendarPayload({ plannedLessons: [{ id: 1 }] }, range('2026-09-01'), Date.now());
    h.cacheCalendarPayload({ plannedLessons: [{ id: 2 }] }, range('2026-08-01'), Date.now() - 61000);
    assert.equal(h.isRangeLoaded(range('2026-09-01')), true);
    assert.equal(h.state.plannedLessons[0].id, 1);
    assert.equal(h.isRangeLoaded(range('2026-08-01')), false);
    for (let day = 10; day < 30; day++) h.cacheCalendarPayload({}, range(`2026-09-${day}`), Date.now());
    assert.equal(h.state.rangeCache.size, 6);
});

test('failed navigation retains the old data and allows retrying the missing dates', async () => {
    const h = setup();
    h.state.plannedLessons = [{ id: 'existing' }];
    const first = h.fetchPlannedLessons(range('2026-09-16'));
    h.requests[0].resolve({}, false);
    assert.equal(await first, false);
    assert.equal(h.isRangeLoaded(range('2026-09-16')), false);
    assert.equal(h.state.plannedLessons[0].id, 'existing');
    const retry = h.fetchPlannedLessons(range('2026-09-16'));
    h.requests[1].resolve({ plannedLessons: [{ id: 'fresh' }] });
    assert.equal(await retry, true);
});

test('a response started before a lesson mutation cannot restore stale lesson state', async () => {
    const h = setup();
    const pending = h.fetchPlannedLessons(range('2026-09-16'));
    h.invalidateCalendarDataCache();
    h.requests[0].resolve({ plannedLessons: [{ status: 'unconfirmed' }] });
    await settle();
    assert.equal(h.requests.length, 2);
    assert.equal(h.state.plannedLessons.length, 0);
    h.requests[1].resolve({ plannedLessons: [{ status: 'paid' }] });
    await pending;
    assert.equal(h.state.plannedLessons[0].status, 'paid');
});

test('travel work is limited to two requests, pauses for lesson actions, and drops obsolete work', async () => {
    const h = setup();
    const finish = [];
    let started = 0;
    let discarded = false;
    for (let i = 0; i < 4; i++) {
        h.state.travelRequestQueue.push({
            isRelevant: () => i !== 3,
            send: () => { started++; return new Promise(resolve => finish.push(resolve)); },
            resolve: () => { if (i === 3) discarded = true; }, reject: assert.fail,
        });
    }
    h.drainTravelRequests();
    await settle();
    assert.equal(started, 2);
    h.state.pendingLessonMutations.add('saving');
    finish[0](); finish[1]();
    await settle();
    assert.equal(started, 2);
    h.state.pendingLessonMutations.clear();
    h.drainTravelRequests();
    await settle();
    assert.equal(started, 3);
    assert.equal(discarded, true);
    finish[2]();
    await settle();
    assert.equal(h.state.activeTravelRequests, 0);
});

test('overlap detection handles unsorted nested events and excludes touching or canceled events', () => {
    const h = setup();
    const event = (guid, start, end, lessonStatus = 'unpaid') => ({ guid, start, end, lessonStatus });
    const pairs = h.getOverlappingTimedEventPairs([
        event('late', '11:00', '12:00'), event('long', '09:00', '12:00'),
        event('early', '09:00', '09:30'), event('touching', '12:00', '13:00'),
        event('canceled', '09:00', '13:00', 'canceled'),
    ]);
    assert.equal(pairs.length, 2);
    assert.deepEqual(Array.from(pairs, pair => Array.from(pair, event => event.guid).sort().join(':')).sort(), ['early:long', 'late:long']);
});
