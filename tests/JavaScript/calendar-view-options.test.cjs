const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../../resources/js/calendar/index.js'), 'utf8')
    .replace(/^import .*;$/gm, '');

function setup(animateEvents, search = '', showCancellations = false) {
    const location = new URL(`https://calendar.test/${search}`);
    const context = vm.createContext({
        window: {
            calendarAnimateEvents: animateEvents,
            location,
            history: { replaceState: (_state, _title, url) => { location.href = url; } },
            calendarShowCancellations: showCancellations,
            matchMedia: () => ({ matches: false }),
        },
        document: { addEventListener() {}, querySelector: () => null },
        require: () => ({}),
        Intl,
        URL, URLSearchParams,
        Date,
        AbortController,
    });

    vm.runInContext(source + '\nglobalThis.api = {state, animateCalendarLessonItems, calendarValuesMatchSearch, getUrlState, setCalendarSearchQuery, setSelectedDate, updateCalendarUrl};', context);
    context.api.state.view = 'day';

    return context.api;
}

function createEventItem() {
    const classes = new Set();
    const styles = new Map();

    return {
        dataset: { lessonStatus: 'unpaid' },
        classList: {
            add: value => classes.add(value),
            remove: value => classes.delete(value),
        },
        style: {
            setProperty: (name, value) => styles.set(name, value),
            removeProperty: name => styles.delete(name),
        },
        addEventListener() {},
        removeEventListener() {},
        classes,
        styles,
    };
}

test('event animation preference preserves or suppresses the staggered entrance', () => {
    const animated = setup(true);
    const animatedItem = createEventItem();

    animated.animateCalendarLessonItems({ querySelectorAll: () => [animatedItem] });

    assert.equal(animatedItem.classes.has('calendar-calendar-lesson-stagger-show'), true);
    assert.equal(animatedItem.styles.get('--calendar-lesson-show-delay'), '0ms');

    const staticView = setup(false);
    const staticItem = createEventItem();
    staticItem.classes.add('calendar-calendar-lesson-stagger-show');
    staticItem.styles.set('--calendar-lesson-show-delay', '90ms');

    staticView.animateCalendarLessonItems({ querySelectorAll: () => [staticItem] });

    assert.equal(staticItem.classes.has('calendar-calendar-lesson-stagger-show'), false);
    assert.equal(staticItem.styles.has('--calendar-lesson-show-delay'), false);
    assert.equal(staticItem.dataset.lessonStaggerShown, 'true');
});

test('older calendar links pick up the saved preference while current links retain explicit filters', () => {
    const defaults = 'recurring,single,general,google';
    const fromUrl = (types, version, enabled) => Array.from(
        setup(true, `?view=week&event_types=${types}&event_filter_version=${version}`, enabled).getUrlState().eventTypes
    );
    assert.ok(fromUrl(defaults, 3, true).includes('canceled'));
    assert.deepEqual(fromUrl('recurring', 3, true), ['recurring']);
    assert.ok(!fromUrl(defaults, 4, true).includes('canceled'));
    assert.ok(fromUrl(defaults, 4, false).includes('canceled'));
});

test('search uses Schedule until cleared and restores the previous calendar view', () => {
    for (const view of ['day', '2-days', 'week', 'month', 'schedule']) {
        const calendar = setup(true);
        const originalDate = new Date(2026, 10, 21, 12);
        const originalWeekStart = view === 'week' ? new Date(2026, 10, 18, 12) : null;
        calendar.state.view = view;
        calendar.setSelectedDate(originalDate);
        calendar.state.scheduleWindowStart = originalWeekStart;

        calendar.setCalendarSearchQuery('Ali');
        assert.equal(calendar.state.view, 'schedule');
        assert.ok(calendar.calendarValuesMatchSearch(['Alice']));
        assert.ok(!calendar.calendarValuesMatchSearch(['Bob']));

        calendar.setSelectedDate(new Date(2026, 11, 1, 12));
        calendar.setCalendarSearchQuery('Alice');
        calendar.updateCalendarUrl();
        assert.equal(calendar.getUrlState().view, view);
        assert.deepEqual(calendar.getUrlState().date, originalDate);

        calendar.setCalendarSearchQuery('  ');
        assert.equal(calendar.state.view, view);
        assert.deepEqual(calendar.state.date, originalDate);
        assert.deepEqual(calendar.state.scheduleWindowStart, originalWeekStart);
        assert.ok(calendar.calendarValuesMatchSearch(['Bob']));
    }
});
