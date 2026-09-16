const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Run the production calendar code without booting CalendarJS or a page navigation.
const source = fs.readFileSync(path.join(__dirname, '../../resources/js/calendar/index.js'), 'utf8')
    .replace(/^import .*;$/gm, '');

function element(dataset = {}) {
    const attributes = new Map();
    const classes = new Set();
    return {
        dataset, disabled: false, hidden: false, innerHTML: 'Confirm',
        style: { removeProperty() {}, setProperty() {} },
        classList: {
            contains: name => classes.has(name),
            add: (...names) => names.forEach(name => classes.add(name)),
            remove: (...names) => names.forEach(name => classes.delete(name)),
        },
        toggleAttribute(name, enabled) { enabled ? attributes.set(name, '') : attributes.delete(name); },
        setAttribute: (name, value) => attributes.set(name, value),
        getAttribute: name => attributes.get(name),
        hasAttribute: name => attributes.has(name),
        removeAttribute: name => attributes.delete(name),
        closest: () => null,
        querySelector: () => null,
        querySelectorAll: () => [],
    };
}

function setup() {
    const button = element();
    const error = element();
    const modal = element({ eventModalType: 'lesson', eventGuid: 'planned-lesson-1-2026-07-08-15:30' });
    modal.querySelector = selector => selector === '[data-lesson-action-error]' ? error : null;
    modal.querySelectorAll = () => [button];
    const item = element({ eventGuid: modal.dataset.eventGuid });
    const unrelated = element({ eventGuid: 'unrelated' });
    const context = vm.createContext({
        window: {},
        document: {
            addEventListener() {},
            querySelector: () => null,
            getElementById: () => null,
            querySelectorAll: selector => selector.includes('[data-event-guid]') ? [item, unrelated] : [],
        },
        require: () => ({}), console: { error() {} }, Intl, URL, setTimeout, clearTimeout,
    });
    vm.runInContext(source + '\nglobalThis.api = {state, mutateLesson, updateLessonEventState, getPlannedLessonEvents, getVisibleCalendarEvents};', context);
    const api = context.api;
    const event = {
        guid: modal.dataset.eventGuid, lessonPlanId: 1, date: '2026-07-08',
        originalDate: '2026-07-08', originalStartTime: '15:30', start: '15:30', end: '16:15',
        lessonStatus: 'unconfirmed', calendarStatus: 'unconfirmed', feeAmount: 6000,
    };
    const occurrence = { date: event.date, start: event.start, end: event.end, lesson_status: 'unconfirmed' };
    const otherOccurrence = { ...occurrence, date: '2026-07-15' };
    const plan = { id: 1, start_time: '15:30', occurrences: [occurrence, otherOccurrence] };
    api.state.events = [event];
    api.state.plannedLessons = [plan];
    item.event = { ...event, date: '2026-07-05', scheduleSourceDate: event.date };
    const instanceEvent = { ...item.event };
    api.state.instance = { getData: () => [instanceEvent] };
    let refreshes = 0;
    const refresh = async () => { refreshes++; };
    return { ...api, modal, button, error, item, unrelated, event, occurrence, otherOccurrence,
        instanceEvent, refresh, refreshes: () => refreshes };
}

test('confirm, pay, undo payment and undo attendance update one lesson without a calendar refresh', async () => {
    const h = setup();
    for (const payload of [
        { status: 'unpaid', lesson_id: 15, edit_url: '/lessons/15', payment_url: '/lessons/15/payments' },
        { status: 'paid', fee_amount: 5500 },
        { status: 'unpaid', lesson_id: 15 },
        { status: 'unconfirmed', lesson_deleted: true, lesson_id: '', fee_amount: 6000 },
    ]) {
        await h.mutateLesson(h.modal, () => Promise.resolve(payload), h.refresh);
        assert.equal(h.event.lessonStatus, payload.status);
        assert.equal(h.occurrence.lesson_status, payload.status);
        assert.equal(h.item.getAttribute('data-lesson-status'), payload.status);
        assert.equal(h.item.event.lessonStatus, payload.status);
        assert.equal(h.instanceEvent.lessonStatus, payload.status);
        assert.equal(h.modal.dataset.lessonStatus, payload.status);
        assert.equal(h.button.disabled, false);
        assert.equal(h.refreshes(), 0);
        assert.equal(h.error.hidden, true);
        const rebuilt = h.getPlannedLessonEvents({}).find(event => event.date === h.event.date);
        assert.equal(rebuilt.lessonStatus, payload.status);
        assert.equal(rebuilt.feeAmount, h.event.feeAmount);
    }
    assert.equal(h.event.paymentUrl, '');
    assert.equal(h.event.lessonId, '');
    assert.equal(h.otherOccurrence.lesson_status, 'unconfirmed');
    assert.equal(h.unrelated.getAttribute('data-lesson-status'), undefined);
    assert.equal(h.instanceEvent.date, '2026-07-05');
    assert.equal(h.item.event.scheduleSourceDate, '2026-07-08');
});

test('single lessons with the same numeric plan ID cannot change a recurring occurrence', async () => {
    const h = setup();
    const singleOccurrence = { ...h.occurrence };
    h.state.singleLessonPlans = [{ id: 1, type: 'single-lesson-plan', occurrences: [singleOccurrence] }];
    h.event.lessonPlanId = '';
    h.event.singleLessonPlanId = 1;
    await h.mutateLesson(h.modal, async () => ({ status: 'early-payment', early_payment_id: 7 }), h.refresh);
    assert.equal(singleOccurrence.early_payment_id, 7);
    assert.equal(h.occurrence.lesson_status, 'unconfirmed');
    await h.mutateLesson(h.modal, async () => ({ status: 'paid', lesson_id: 9, early_payment_id: '', payment_exempt: true }), h.refresh);
    assert.equal(singleOccurrence.early_payment_id, '');
    assert.equal(singleOccurrence.fee_amount, 0);
    assert.equal(h.refreshes(), 0);
});

test('reverting early payment on a rescheduled occurrence retains rescheduled styling', async () => {
    const h = setup();
    h.event.scheduleOverrideId = 4;
    await h.mutateLesson(h.modal, async () => ({ status: 'early-payment', early_payment_id: 7 }), h.refresh);
    await h.mutateLesson(h.modal, async () => ({ status: 'unconfirmed', early_payment_id: '' }), h.refresh);
    assert.equal(h.item.getAttribute('data-lesson-status'), 'rescheduled');
    assert.equal(h.occurrence.calendar_status, 'rescheduled');
    assert.equal(h.modal.dataset.scheduleOverrideId, 4);
    assert.equal(h.refreshes(), 0);
});

test('cancel and undo honor event filters without removing or rebuilding calendar nodes', async () => {
    const h = setup();
    await h.mutateLesson(h.modal, async () => ({ status: 'canceled', lesson_id: 5 }), h.refresh);
    assert.equal(h.item.hidden, true);
    assert.equal(h.error.hidden, true);
    assert.equal(h.state.travelRouteDateRevisions.get(h.event.date), 1);
    assert.equal(h.getVisibleCalendarEvents().length, 0);
    await h.mutateLesson(h.modal, async () => ({ status: 'unconfirmed', lesson_deleted: true }), h.refresh);
    assert.equal(h.item.hidden, false);
    assert.equal(h.error.hidden, true);
    assert.equal(h.state.travelRouteDateRevisions.get(h.event.date), 2);
    assert.equal(h.getVisibleCalendarEvents().length, 1);
    assert.equal(h.refreshes(), 0);
});

test('slow requests block repeat actions and failures unlock controls without changing the lesson', async () => {
    const h = setup();
    let reject;
    const pending = h.mutateLesson(h.modal, () => new Promise((resolve, fail) => { reject = fail; }), h.refresh);
    assert.equal(h.button.disabled, true);
    let duplicateSent = false;
    await h.mutateLesson(h.modal, async () => { duplicateSent = true; }, h.refresh);
    assert.equal(duplicateSent, false);
    reject(new Error('Payment could not be saved.'));
    await pending;
    assert.equal(h.error.textContent, 'Payment could not be saved.');
    assert.equal(h.button.disabled, false);
    assert.equal(h.event.lessonStatus, 'unconfirmed');
    assert.equal(h.refreshes(), 0);
});

test('a delayed response updates its original lesson when another lesson dialog is open', async () => {
    const h = setup();
    let resolve;
    const pending = h.mutateLesson(h.modal, () => new Promise(done => { resolve = done; }), h.refresh);
    h.modal.dataset.eventGuid = 'another-lesson';
    h.modal.dataset.lessonStatus = 'early-payment';
    resolve({ status: 'paid', fee_amount: 5000 });
    await pending;
    assert.equal(h.event.lessonStatus, 'paid');
    assert.equal(h.occurrence.fee_amount, 5000);
    assert.equal(h.modal.dataset.lessonStatus, 'early-payment');
    assert.equal(h.modal.dataset.eventGuid, 'another-lesson');
    assert.equal(h.state.pendingLessonMutations.size, 0);
    assert.equal(h.refreshes(), 0);
});

test('mutations that move or remove occurrences still refresh schedule geometry', async () => {
    const h = setup();
    h.modal.dataset.eventModalType = 'general-event'; // Do not reopen a replaced dialog.
    await h.mutateLesson(h.modal, async () => ({ status: 'unconfirmed', schedule_override_deleted: true }), h.refresh);
    assert.equal(h.refreshes(), 1);
});
