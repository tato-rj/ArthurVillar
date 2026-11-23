const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../../resources/js/offline.js'), 'utf8');

function loadPage(fetch) {
    const listeners = {};
    const on = (name, callback) => { listeners[name] = callback; };
    const control = { addEventListener: on, setAttribute() {}, focus() {}, dataset: {} };
    const overlay = {
        hidden: true, classList: { toggle() {} }, setAttribute() {}, querySelector: () => control,
    };
    const navigator = { onLine: true };
    const window = {
        location: new URL('https://calendar.test'), fetch, addEventListener: on,
        requestAnimationFrame: callback => callback(),
        // Run deadlines and confirmation delays immediately. Leave periodic checks idle.
        setTimeout: (callback, delay) => delay <= 5000 ? setImmediate(callback) : null,
        clearTimeout: clearImmediate,
    };
    const document = {
        readyState: 'complete', querySelector: () => overlay, documentElement: overlay,
        addEventListener: on, visibilityState: 'visible',
    };
    vm.runInNewContext(source, { window, document, navigator, AbortController, URL, HTMLElement: class {}, module: {} });
    return { overlay, window, navigator, listeners };
}

test('an HTTP error or missing heartbeat header leaves the loaded page usable', async () => {
    for (const status of [503, 204]) {
        const page = loadPage(async () => new Response(null, { status }));
        await page.listeners.visibilitychange();
        assert.equal(page.overlay.hidden, true);
    }
});

test('a blocked heartbeat leaves the calendar usable when a static asset is reachable', async () => {
    const page = loadPage(async (url, options) => {
        if (new URL(url).pathname === '/_connectivity') throw new TypeError('Request blocked');
        assert.equal(options.method, 'HEAD');
        return new Response(null, { status: 200 });
    });
    await page.listeners.visibilitychange();
    assert.equal(page.overlay.hidden, true);
});

test('slow requests leave the page usable while the browser is online', async () => {
    const page = loadPage((_url, { signal }) => new Promise((_resolve, reject) => {
        signal.addEventListener('abort', () => reject(signal.reason));
    }));
    await page.listeners.visibilitychange();
    assert.equal(page.overlay.hidden, true);
});

test('loss of connectivity shows the overlay and a successful retry restores the page', async () => {
    const page = loadPage(async () => { throw new TypeError('Network unavailable'); });
    await page.listeners.visibilitychange();
    assert.equal(page.overlay.hidden, false);

    page.window.fetch = async () => new Response(null, { status: 204 });
    await page.listeners.click();
    assert.equal(page.overlay.hidden, true);

    page.navigator.onLine = false;
    page.listeners.offline();
    assert.equal(page.overlay.hidden, false);
    page.navigator.onLine = true;
    await page.listeners.online();
    assert.equal(page.overlay.hidden, true);
});
