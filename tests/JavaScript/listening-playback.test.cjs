const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const view = fs.readFileSync(path.join(__dirname, '../../resources/views/listening/show.blade.php'), 'utf8');
const script = view.match(/<script type="text\/javascript">([\s\S]*?)<\/script>/)[1]
  .replace('@json((string) $recording->id)', '"1"');

function element(extra = {}) {
  const classes = new Set();
  return {
    textContent: '',
    href: '',
    dataset: {},
    classList: {
      add: name => classes.add(name),
      remove: name => classes.delete(name),
      toggle: (name, force) => force ? classes.add(name) : classes.delete(name),
      contains: name => classes.has(name)
    },
    setAttribute(name, value) { this[name] = value; },
    removeAttribute(name) { delete this[name]; },
    addEventListener(name, handler) { this.listeners[name] = handler; },
    listeners: {},
    ...extra
  };
}

function setup({ count = 3, mode = null } = {}) {
  const storage = new Map([['listening.playbackModeV2', mode || '']]);
  const modeButtons = ['shuffle', 'repeat', 'infinite'].map(playbackMode => element({
    dataset: { playbackMode }, 'aria-pressed': 'false'
  }));
  const trackRows = Array.from({ length: count }, (_, index) => {
    const container = element(index === 0 ? {} : { submit: '' });
    const bars = element();
    const button = element();
    return element({
      dataset: {
        recordingId: String(index + 1), audioUrl: `/audio/${index + 1}.mp3`,
        playUrl: `/piece/${index + 1}`, title: `Piece ${index + 1}`,
        composer: `Composer ${index + 1}`, artist: 'Artist', composedIn: '1700',
        periodColor: 'primary', periodName: 'Baroque', sourceUrl: '/youtube'
      },
      querySelector(selector) {
        return { '.track-container': container, '.playing-bars': bars, '.track-play-button': button }[selector];
      }
    });
  });
  const ids = new Map([
    ...['player-title', 'player-composer', 'player-artist', 'player-composed-in', 'autoplay-error',
      'player-period', 'player-about', 'player-composer-button', 'player-youtube']
      .map(id => [id, element()])
  ]);
  const document = {
    getElementById: id => ids.get(id) || null,
    querySelectorAll: selector => selector === '[data-playback-mode]' ? modeButtons : trackRows
  };
  const history = { url: null, state: null, replaceState(state, title, url) { this.url = url; } };
  let player;
  class Plyr {
    constructor() { this.handlers = {}; this.playCount = 0; this.currentTime = 99; player = this; }
    on(names, handler) {
      for (const name of names.split(' ')) (this.handlers[name] ||= []).push(handler);
    }
    play() { this.playCount++; return Promise.resolve(); }
    emit(name) { for (const handler of this.handlers[name] || []) handler(); }
  }
  function $(target) {
    if (target === document) return { ready: callback => callback() };
    return { show() {}, on() {}, addClass() {}, removeClass() {} };
  }
  vm.runInNewContext(script, {
    document, history, Plyr, $, localStorage: {
      getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value)
    }, Math, Array
  });
  return { player, modeButtons, trackRows, ids, history, storage };
}

test('no mode stops after the current piece; infinite wraps to the first piece', () => {
  const page = setup();
  page.player.emit('ended');
  assert.equal(page.player.playCount, 0);

  page.modeButtons[2].listeners.click();
  assert.equal(page.modeButtons[2]['aria-pressed'], 'true');
  assert.equal(page.storage.get('listening.playbackModeV2'), 'infinite');
  page.player.emit('ended');
  assert.equal(page.player.source.sources[0].src, '/audio/2.mp3');
  assert.equal(page.player.playCount, 1);
  assert.equal(page.ids.get('player-title').textContent, 'Piece 2');
  assert.equal(page.history.url, '/piece/2');

  page.player.emit('ended');
  assert.equal(page.player.source.sources[0].src, '/audio/3.mp3');
  page.player.emit('ended');
  assert.equal(page.player.source.sources[0].src, '/audio/1.mp3');
  assert.equal(page.player.playCount, 3);
});

test('shuffle visits each other piece once before stopping', () => {
  const page = setup({ count: 4, mode: 'shuffle' });
  const played = [];
  for (let index = 0; index < 4; index++) {
    page.player.emit('ended');
    if (page.player.source) played.push(page.player.source.sources[0].src);
  }
  assert.equal(page.player.playCount, 3);
  assert.deepEqual(new Set(played), new Set(['/audio/2.mp3', '/audio/3.mp3', '/audio/4.mp3']));
});

test('repeat restarts the current piece without changing its details or URL', () => {
  const page = setup({ mode: 'repeat' });
  page.player.emit('ended');
  assert.equal(page.player.currentTime, 0);
  assert.equal(page.player.playCount, 1);
  assert.equal(page.player.source, undefined);
  assert.equal(page.history.url, null);
});

test('infinite restarts a playlist containing one piece', () => {
  const page = setup({ count: 1, mode: 'infinite' });
  page.player.emit('ended');
  assert.equal(page.player.currentTime, 0);
  assert.equal(page.player.playCount, 1);
});

test('clicking the active mode turns automatic playback off', () => {
  const page = setup({ mode: 'repeat' });
  page.modeButtons[1].listeners.click();
  assert.equal(page.modeButtons[1]['aria-pressed'], 'false');
  assert.equal(page.storage.get('listening.playbackModeV2'), '');
  page.player.emit('ended');
  assert.equal(page.player.playCount, 0);
});

test('selecting another icon clears the previous selection', () => {
  const page = setup({ mode: 'shuffle' });
  page.modeButtons[1].listeners.click();
  assert.equal(page.modeButtons[0]['aria-pressed'], 'false');
  assert.equal(page.modeButtons[1]['aria-pressed'], 'true');
});

test('a blocked automatic start leaves a clear manual play instruction', async () => {
  const page = setup({ mode: 'infinite' });
  page.player.play = () => Promise.reject(new Error('NotAllowedError'));
  page.player.emit('ended');
  await Promise.resolve();
  assert.match(page.ids.get('autoplay-error').textContent, /Press play to continue/);
});
