const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../../resources/js/calendar/index.js'), 'utf8')
    .replace(/^import .*;$/gm, '');

function setup(animateEvents) {
    const context = vm.createContext({
        window: {
            calendarAnimateEvents: animateEvents,
            location: { href: 'https://calendar.test/' },
            matchMedia: () => ({ matches: false }),
        },
        document: { addEventListener() {}, querySelector: () => null },
        require: () => ({}),
        Intl,
        URL,
        Date,
        AbortController,
    });

    vm.runInContext(source + '\nglobalThis.api = {state, animateCalendarLessonItems};', context);
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
