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

function setup({ count = 3, preference = false, mode = 'all' } = {}) {
  const storage = new Map([
    ['listening.autoplayNext', String(preference)],
    ['listening.playbackMode', mode]
  ]);
  const toggle = element({ checked: false });
  const modes = ['all', 'shuffle', 'repeat'].map(value => element({ value }));
  modes.forEach(input => Object.defineProperty(input, 'checked', {
    get() { return !!this._checked; },
    set(value) {
      if (value) modes.forEach(other => { other._checked = false; });
      this._checked = value;
    }
  }));
  modes[0].checked = true;
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
    ['autoplay-next', toggle],
    ...['player-title', 'player-composer', 'player-artist', 'player-composed-in', 'autoplay-error',
      'player-period', 'player-about', 'player-composer-button', 'player-youtube']
      .map(id => [id, element()])
  ]);
  const document = {
    getElementById: id => ids.get(id) || null,
    querySelectorAll: selector => selector === 'input[name="playback-mode"]' ? modes : trackRows
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
  return { player, toggle, modes, trackRows, ids, history, storage };
}

test('play all is opt-in and stops after the final piece', () => {
  const page = setup();
  page.player.emit('ended');
  assert.equal(page.player.playCount, 0);

  page.toggle.checked = true;
  page.toggle.listeners.change();
  page.player.emit('ended');
  assert.equal(page.player.source.sources[0].src, '/audio/2.mp3');
  assert.equal(page.player.playCount, 1);
  assert.equal(page.ids.get('player-title').textContent, 'Piece 2');
  assert.equal(page.history.url, '/piece/2');

  page.player.emit('ended');
  assert.equal(page.player.source.sources[0].src, '/audio/3.mp3');
  page.player.emit('ended');
  assert.equal(page.player.playCount, 2);
});

test('shuffle visits each other piece once before stopping', () => {
  const page = setup({ count: 4, preference: true, mode: 'shuffle' });
  const played = [];
  for (let index = 0; index < 4; index++) {
    page.player.emit('ended');
    if (page.player.source) played.push(page.player.source.sources[0].src);
  }
  assert.equal(page.player.playCount, 3);
  assert.deepEqual(new Set(played), new Set(['/audio/2.mp3', '/audio/3.mp3', '/audio/4.mp3']));
});

test('repeat restarts the current piece without changing its details or URL', () => {
  const page = setup({ preference: true, mode: 'repeat' });
  page.player.emit('ended');
  assert.equal(page.player.currentTime, 0);
  assert.equal(page.player.playCount, 1);
  assert.equal(page.player.source, undefined);
  assert.equal(page.history.url, null);
});

test('a blocked automatic start leaves a clear manual play instruction', async () => {
  const page = setup({ preference: true });
  page.player.play = () => Promise.reject(new Error('NotAllowedError'));
  page.player.emit('ended');
  await Promise.resolve();
  assert.match(page.ids.get('autoplay-error').textContent, /Press play to continue/);
});
