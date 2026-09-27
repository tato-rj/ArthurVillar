const assert = require('node:assert/strict');
function fetch(url, options) {
    return new Promise((resolve, reject) => {
        const req = require(url.startsWith('https:') ? 'node:https' : 'node:http').request(url, options, res => {
            let text = ''; res.setEncoding('utf8'); res.on('data', part => text += part);
            res.on('end', () => resolve({ status: res.statusCode, headers: { getSetCookie: () => res.headers['set-cookie'] || [] }, text: async () => text }));
        });
        req.on('error', reject); if(options.body) req.write(options.body); req.end();
    });
}
const WebSocket = require(process.cwd() + '/node_modules/ws');
// Run only against a disposable local development database with serve + Reverb running.
const origin = process.env.DUEL_TEST_ORIGIN || 'http://theory.localhost:8007';
const endpoint = process.env.DUEL_TEST_HTTP_ORIGIN || 'http://127.0.0.1:8007';
async function browser() {
    const cookies = new Map(); let csrf;
    const request = async (path, body) => {
        const response = await fetch(endpoint + path, { method: body ? 'POST' : 'GET', headers: {
            Host: new URL(origin).host, Origin: origin, Accept: body ? 'application/json' : '*/*',
            'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest',
            Cookie: [...cookies].map(([k,v]) => `${k}=${v}`).join('; '), ...(csrf ? {'X-CSRF-TOKEN': csrf} : {}),
        }, ...(body ? { body: JSON.stringify(body) } : {}) });
        for (const entry of response.headers.getSetCookie()) { const [name, ...value] = entry.split(';')[0].split('='); cookies.set(name, value.join('=')); }
        const text = await response.text();
        if (path === '/' && !text.includes('csrf-token')) throw new Error('Root response '+response.status+' missing csrf; length '+text.length);
        if (!body && path === '/') { csrf = text.match(/name="csrf-token" content="([^"]+)"/)[1]; return JSON.parse(text.match(/window\.__duelConfig = ([^\n]+);/)[1]); }
        const result = JSON.parse(text); return { status: response.status, ...result };
    };
    const depart = async (id, connectionId) => {
        // Match sendBeacon: body CSRF token, session cookie, no AJAX/CSRF headers.
        const body = new URLSearchParams({ _token: csrf, connection_id: connectionId }).toString();
        const response = await fetch(endpoint + `/duels/${id}/depart`, { method: 'POST', headers: {
            Host: new URL(origin).host, Origin: origin, 'Content-Type': 'application/x-www-form-urlencoded',
            Cookie: [...cookies].map(([k,v]) => `${k}=${v}`).join('; '),
        }, body });
        assert.equal(response.status, 200); return JSON.parse(await response.text());
    };
    const config = await request('/'); return { request, config, depart };
}
async function connect(client, room) {
    const events = []; const answers = []; const ws = new WebSocket(`${client.config.scheme === 'https' ? 'wss' : 'ws'}://${process.env.DUEL_TEST_WS_HOST || '127.0.0.1'}:${client.config.port}/app/${client.config.key}?protocol=7&client=js&version=8.6.0&flash=false`, { origin });
    let socketId; let subscribed = false;
    ws.on('message', message => {
        const event = JSON.parse(message); const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (event.event === 'pusher:connection_established') socketId = data.socket_id;
        if (event.event === 'pusher_internal:subscription_succeeded') subscribed = true;
        if (event.event === 'DuelUpdated') events.push(data);
        if (event.event === 'DuelAnswerSubmitted') answers.push(data);
    });
    await until(() => socketId);
    const auth = await client.request('/duels/broadcast-auth', { socket_id: socketId, channel_name: 'private-theory.duel.'+room.id });
    assert.equal(auth.status, 200);
    ws.send(JSON.stringify({ event: 'pusher:subscribe', data: { auth: auth.auth, channel: 'private-theory.duel.'+room.id } }));
    await until(() => subscribed);
    return { ws, events, answers };
}
async function until(condition, timeout = 6000) {
    const start = Date.now(); while (!condition()) { if (Date.now()-start>timeout) throw Error('Timed out waiting for Reverb'); await new Promise(r=>setTimeout(r,20)); }
}
(async () => {
    const host = await browser(); const guest = await browser(); const stranger = await browser();
    const room = await host.request('/duels', { game: 'intervals-lab', settings: { numOfChallenges: 2, intervals: ['P4'] } });
    assert.equal(room.status, 'waiting_for_opponent');
    const h = await connect(host, room); const joinedAt = Date.now();
    const joined = await guest.request('/duels/join', { code: room.code }); assert.equal(joined.role, 'guest');
    await until(() => h.events.some(e => e.change === 'opponent_joined'));
    const joinLatency = Date.now() - joinedAt;
    const g = await connect(guest, room);
    assert.equal((await stranger.request('/duels/broadcast-auth', { socket_id: '123.456', channel_name: 'private-theory.duel.'+room.id })).status, 403);
    const oneReady = await guest.request(`/duels/${room.id}/ready`, {}); assert.equal(oneReady.status, 'ready'); assert.equal(oneReady.starts_at, null);
    const countdown = await host.request(`/duels/${room.id}/ready`, {}); assert.equal(countdown.status, 'countdown');
    await until(() => g.events.some(e => e.state.starts_at === countdown.starts_at));
    await new Promise(r => setTimeout(r, Math.max(0, Date.parse(countdown.starts_at)-Date.now())+80));
    assert.equal((await host.request(`/duels/${room.id}`)).status, 'playing');
    for (const [client, remote, role, correct] of [[host,g,'host',true],[guest,h,'guest',false]]) {
        const feedback = await client.request(`/duels/${room.id}/answer`, { correct });
        assert.equal(feedback.accepted, true);
        await until(() => remote.answers.some(e => e.role === role && e.correct === correct));
        assert.deepEqual(Object.keys(remote.answers.at(-1)).sort(), ['correct','duel_id','id','role']);
        for (let current=1;current<=2;current++) {
            const result=await client.request(`/duels/${room.id}/progress`, { sequence:current, progress:current, score:current*3 }); assert.equal(result.status, 'playing');
            await until(() => remote.events.some(e => e.change === 'progress' && e.state.players.some(p=>p.role === result.role && p.progress === current)));
        }
        const finish=await client.request(`/duels/${room.id}/finish`, {score:12,accuracy:100});
        assert.equal(finish.status, client === host ? 'playing' : 'finished');
    }
    await until(() => h.events.some(e=>e.state.status === 'finished') && g.events.some(e=>e.state.status === 'finished'));
    assert.equal((await host.request(`/duels/${room.id}`)).players.filter(p=>p.finished_at).length, 2);
    assert.equal((await guest.request(`/duels/${room.id}`)).role, 'guest');
    h.ws.close();g.ws.close();
    for (const leavingRole of ['host', 'guest']) {
        const a = await browser(); const b = await browser();
        const next = await a.request('/duels', { game: 'intervals-lab', settings: { numOfChallenges: 2 } });
        assert.equal(next.status, 'waiting_for_opponent', next.message);
        const hostSocket = await connect(a, next);
        await b.request('/duels/join', { code: next.code });
        const guestSocket = await connect(b, next);
        await b.request(`/duels/${next.id}/ready`, {});
        const start = await a.request(`/duels/${next.id}/ready`, {});
        await until(() => Date.now() > Date.parse(start.starts_at));
        const leaver = leavingRole === 'host' ? a : b;
        const opponent = leavingRole === 'host' ? b : a;
        const remote = leavingRole === 'host' ? guestSocket : hostSocket;
        const left = await leaver.request(`/duels/${next.id}/leave`, {});
        assert.equal(left.status, 'cancelled'); assert.equal(left.left_by, leavingRole);
        await until(() => remote.events.some(event => event.change === 'leave' && event.state.left_by === leavingRole));
        const restored = await opponent.request(`/duels/${next.id}`);
        assert.equal(restored.status, 'cancelled'); assert.equal(restored.left_by, leavingRole);
        assert.equal((await opponent.request(`/duels/${next.id}/ready`, {})).status, 409);
        hostSocket.ws.close(); guestSocket.ws.close();
    }
    const closingHost = await browser(); const survivor = await browser();
    const closedRoom = await closingHost.request('/duels', { game: 'intervals-lab', settings: { numOfChallenges: 2 } });
    await survivor.request('/duels/join', { code: closedRoom.code });
    const survivorSocket = await connect(survivor, closedRoom);
    const oldConnection = 'a'.repeat(32); const refreshedConnection = 'b'.repeat(32);
    await closingHost.request(`/duels/${closedRoom.id}/connect`, { connection_id: oldConnection });
    await closingHost.depart(closedRoom.id, oldConnection);
    await until(() => survivorSocket.events.some(event => event.state.players.some(p => p.role === 'host' && p.disconnected)));
    await closingHost.request(`/duels/${closedRoom.id}/connect`, { connection_id: refreshedConnection });
    await closingHost.depart(closedRoom.id, oldConnection);
    const restored = await survivor.request(`/duels/${closedRoom.id}`);
    assert.equal(restored.status, 'ready'); assert.equal(restored.players.find(p => p.role === 'host').disconnected, false);
    await closingHost.depart(closedRoom.id, refreshedConnection);
    await new Promise(resolve => setTimeout(resolve, 31000));
    const ended = await survivor.request(`/duels/${closedRoom.id}/heartbeat`, {});
    assert.equal(ended.status, 'cancelled'); assert.equal(ended.left_by, 'host');
    await until(() => survivorSocket.events.some(event => event.change === 'leave' && event.state.left_by === 'host'));
    survivorSocket.ws.close();
    console.log(JSON.stringify({ result:'PASS', join_notification_ms:joinLatency, tested:['two cookie sessions','private subscriptions','guest ready waits','shared future timestamp','two-way Reverb answer feedback','two-way Reverb progress','first finisher leaves other active','both results','refresh state','stranger subscription denied','host and guest leave notify opponent and survive refresh','CSRF protected browser departure','refresh ignores stale departure','browser close broadcasts leave after grace'] }));
})().catch(error=>{console.error(error.stack);process.exit(1);});
