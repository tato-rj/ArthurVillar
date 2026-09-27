const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function setup() {
    const dialogs = []; const feedback = []; const buttons = [{ disabled: false }, { disabled: false }];
    const results = { hidden: false };
    const hud = { querySelector: selector => selector === '[data-duel-results]' ? results : {} };
    const window = { location: { href: '/duel' }, __duelConfig: { home: '/games' } };
    const context = vm.createContext({ Date, Promise, setTimeout, clearInterval, window,
        document: { body: { classList: { add() {} } }, getElementById: () => hud,
            querySelector: () => undefined, querySelectorAll: () => buttons, addEventListener() {} },
        $: () => ({ attr() {}, show() {} }),
        dialog: options => { dialogs.push(options); return { querySelector: () => ({ classList: { add() {} } }) }; },
        closeDialog() {},
        animateAnswerFeedback: (label, correct) => { feedback.push(correct); return () => {}; },
        DuelTransport: class { constructor() { this.offset = 0; } },
    });
    const source = fs.readFileSync(path.join(__dirname, '../../resources/js/music/duel/DuelClient.js'), 'utf8')
        .replace(/^import.*;\n/gm, '').replace(/^export /gm, '');
    vm.runInContext(source + '\nglobalThis.Client = DuelClient;', context);
    const state = { id: 'room', role: 'host', revision: 1, status: 'playing', total: 4, sequence: 0,
        starts_at: new Date(Date.now() - 1000).toISOString(),
        players: [{ role: 'host', progress: 0 }, { role: 'guest', progress: 0 }] };
    let creates = 0;
    const client = new context.Client(state, () => { creates++; });
    client.render = () => {};
    return { client, state, dialogs, feedback, buttons, results, window, creates: () => creates };
}

test('remote departure stops gameplay, explains who left, and blocks further gameplay mutations', () => {
    const { client, state, dialogs, results } = setup();
    let stops = 0;
    client.game = { _stopLoop: () => stops++, _stopGameTimer: () => stops++, _cancelTimers: () => stops++ };
    client.receive({ ...state, revision: 2, status: 'cancelled', left_by: 'guest' });
    assert.equal(stops, 3);
    assert.equal(results.hidden, true);
    assert.equal(dialogs.at(-1).message, 'Opponent left the Duel.');
    assert.equal(dialogs.at(-1).exit, true);
    client.enqueue = () => assert.fail('ended games must not submit more gameplay');
    client.progress(1, 3, {}); client.finished({ score: 3, accuracy: 100 });
});

test('refreshing an ended Duel shows the departure without subscribing to a closed channel', () => {
    const { client, dialogs } = setup();
    client.state.status = 'cancelled'; client.state.left_by = 'guest';
    client.transport.subscribe = () => assert.fail('closed Duels do not need a private subscription');
    client.begin();
    assert.equal(dialogs.at(-1).message, 'Opponent left the Duel.');
});

test('Leave Duel bypasses a stalled gameplay queue, rejects double clicks and navigates home after saving', async () => {
    const { client, state, buttons, window } = setup();
    client.queue = new Promise(() => {});
    let resolveRequest; let calls = 0; let disconnects = 0;
    client.transport = { echo: { disconnect: () => disconnects++ }, request: route => {
        assert.equal(route, '/room/leave'); calls++;
        return new Promise(resolve => { resolveRequest = resolve; });
    } };
    const first = client.leave(); const duplicate = client.leave();
    assert.equal(calls, 1);
    assert.equal(buttons.every(button => button.disabled), true);
    assert.equal(window.location.href, '/duel');
    resolveRequest({ ...state, revision: 2, status: 'cancelled', left_by: 'host' });
    await Promise.all([first, duplicate]);
    assert.equal(window.location.href, '/games');
    assert.equal(disconnects, 1);
});

test('a stale start response cannot start gameplay after the opponent leaves during countdown', async () => {
    const { client, state, creates } = setup();
    let resolveRequest;
    client.transport.request = () => new Promise(resolve => { resolveRequest = resolve; });
    const starting = client.tick();
    client.receive({ ...state, revision: 2, status: 'cancelled', left_by: 'guest' });
    resolveRequest(state);
    await starting;
    assert.equal(creates(), 0);
    assert.equal(client.state.status, 'cancelled');
});


test('only new answer feedback from this Duel opponent animates the label', () => {
    const { client, feedback } = setup();
    const event = { duel_id: 'room', role: 'guest', correct: true, id: 'first' };
    client.receiveAnswer({ ...event, role: 'host' });
    client.receiveAnswer({ ...event, duel_id: 'other-room' });
    client.receiveAnswer(event); client.receiveAnswer(event);
    client.receiveAnswer({ ...event, correct: false, id: 'second' });
    client.state.status = 'cancelled';
    client.receiveAnswer({ ...event, id: 'third' });
    assert.deepEqual(feedback, [true, false]);
});


test('idle expiry sends an authenticated leave and navigates immediately without waiting on gameplay requests', async () => {
    const { client, window } = setup();
    const calls = []; client.queue = new Promise(() => {});
    client.idle = { stop: () => calls.push('idle-stop') };
    client.presence = { stop: () => calls.push('presence-stop') };
    client.transport = { leaveOnExit: id => calls.push(`leave:${id}`), echo: { disconnect: () => calls.push('disconnect') } };
    await client.leave({ automatic: true }); await client.leave({ automatic: true });
    assert.equal(window.location.href, '/games');
    assert.deepEqual(calls, ['idle-stop', 'presence-stop', 'leave:room', 'disconnect']);
});

test('ready updates and countdown ticks cannot overwrite the idle confirmation', async () => {
    const { client, state, dialogs, creates } = setup();
    client.idle = { warning: true };
    client.receive({ ...state, revision: 2, status: 'ready' });
    assert.equal(dialogs.length, 0);
    client.state.status = 'countdown'; client.state.starts_at = new Date(Date.now() + 3000).toISOString();
    await client.tick(); assert.equal(dialogs.length, 0); assert.equal(creates(), 0);
});
