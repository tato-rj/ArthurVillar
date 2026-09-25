const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../../resources/js/music/leaderboardProfile.js'), 'utf8').replace(/^export /gm, '');
const context = vm.createContext({});
vm.runInContext(`${source}\nglobalThis.remember = rememberLeaderboardProfile;`, context);

function form(dataset = {}, order = [1, 2]) {
    const username = {value: ''};
    const avatars = order.map(id => ({
        id: `avatar-${id}`, value: `https://theory.test/images/avatars/avatar-${id}.svg`, checked: false,
        closest() { return {querySelector: () => ({classList: {toggle: (_, dimmed) => { this.dimmed = dimmed; }}})}; },
    }));
    return {dataset, username, avatars, elements: {namedItem: () => username}, querySelectorAll: () => avatars};
}
function storage() {
    let value = null;
    return {getItem: () => value, setItem: (_, next) => { value = next; }};
}

test('only a successful post saves the chosen name and avatar, then restores them across games', () => {
    const saved = storage();
    const unposted = form();
    unposted.username.value = 'Not posted'; unposted.avatars[0].checked = true;
    context.remember(unposted, () => saved);
    assert.equal(saved.getItem(), null);
    const posted = form({postedName: 'My chosen name', postedAvatar: 'https://theory.test/images/avatars/avatar-2.svg'});
    context.remember(posted, () => saved);
    assert.deepEqual(JSON.parse(saved.getItem()), {name: 'My chosen name', avatar: 'avatar-2'});
    const nextGame = form({}, [2, 1]);
    context.remember(nextGame, () => saved);
    assert.equal(nextGame.username.value, 'My chosen name');
    assert.equal(nextGame.avatars[0].checked, true);
    assert.equal(nextGame.avatars[0].dimmed, false);
    assert.equal(nextGame.avatars[1].dimmed, true);
    const updated = form({postedName: 'New choice', postedAvatar: 'https://theory.test/images/avatars/avatar-1.svg'});
    context.remember(updated, () => saved);
    assert.deepEqual(JSON.parse(saved.getItem()), {name: 'New choice', avatar: 'avatar-1'});
});

test('missing, corrupt, or blocked storage leaves a blank usable form', () => {
    for (const getStorage of [() => storage(), () => ({getItem: () => '{broken'}), () => { throw Error('blocked'); }, () => ({getItem: () => '{"name":"Bad avatar","avatar":"unknown"}'})]) {
        const blank = form();
        assert.doesNotThrow(() => context.remember(blank, getStorage));
        assert.equal(blank.username.value, '');
        assert.equal(blank.avatars.some(avatar => avatar.checked), false);
    }
    assert.doesNotThrow(() => context.remember(form({postedName: 'Chosen', postedAvatar: 'https://theory.test/images/avatars/avatar-1.svg'}), () => { throw Error('blocked'); }));
});

test('remembering does not replace an already entered name or selected avatar', () => {
    const saved = {getItem: () => '{"name":"Previous","avatar":"avatar-2"}'};
    const current = form(); current.username.value = 'Typing now'; current.avatars[0].checked = true;
    context.remember(current, () => saved);
    assert.equal(current.username.value, 'Typing now');
    assert.equal(current.avatars[0].checked, true);
    assert.equal(current.avatars[1].checked, false);
});

function avatarButton() {
    const image = {}, placeholder = {};
    return {image, placeholder, dataset: {avatarBase: 'https://theory.test/images/avatars/'},
        querySelector: selector => selector === '[data-saved-avatar]' ? image : placeholder,
        setAttribute(_, value) { this.label = value; },
    };
}

test('the profile icon shows the last successfully posted avatar and changes with a new score', () => {
    const saved = storage(), button = avatarButton();
    context.renderLeaderboardAvatar(button, () => saved);
    assert.equal(button.image.hidden, true);
    assert.equal(button.placeholder.hidden, false);
    for (const id of [2, 1]) {
        context.remember(form({postedName: 'Chosen name', postedAvatar: `https://theory.test/images/avatars/avatar-${id}.svg`}), () => saved);
        context.renderLeaderboardAvatar(button, () => saved);
        assert.equal(button.image.src, `https://theory.test/images/avatars/avatar-${id}.svg`);
        assert.equal(button.image.hidden, false);
        assert.equal(button.placeholder.hidden, true);
        assert.equal(button.label, "Chosen name's avatar");
    }
    saved.setItem('', null);
    context.renderLeaderboardAvatar(button, () => saved);
    assert.equal(button.placeholder.hidden, false);
    assert.equal(button.image.hidden, true);
});

test('the profile icon rejects invalid image choices and tolerates unavailable storage', () => {
    for (const value of ['{broken', '{"avatar":"https://other.test/image"}', '{"avatar":"avatar-79"}', '{"avatar":"avatar-0"}']) {
        const button = avatarButton();
        context.renderLeaderboardAvatar(button, () => ({getItem: () => value}));
        assert.equal(button.image.hidden, true);
        assert.equal(button.image.src, undefined);
    }
    assert.doesNotThrow(() => context.renderLeaderboardAvatar(avatarButton(), () => { throw Error('blocked'); }));
});

test('posted scores keep one best per game through name and avatar changes', () => {
    const saved = storage();
    const post = (game, score, name = 'Chosen') => context.remember(form({postedName: name, postedAvatar: 'https://theory.test/images/avatars/avatar-1.svg', postedGame: game, postedScore: score}), () => saved);
    post('Note Nest', '120');
    post('Note Nest', '85', 'Renamed');
    post('Beat Hero', '0', 'Renamed');
    assert.deepEqual(JSON.parse(saved.getItem()).games, [{name: 'Note Nest', score: 120}, {name: 'Beat Hero', score: 0}]);
    assert.equal(JSON.parse(saved.getItem()).name, 'Renamed');
    post('Note Nest', '140');
    post('Beat Hero', 'not a score');
    assert.deepEqual(JSON.parse(saved.getItem()).games, [{name: 'Note Nest', score: 140}, {name: 'Beat Hero', score: 0}]);
});

function scoreMenu() {
    const name = {}, empty = {};
    const rows = ['Note Nest', 'Beat Hero'].map(game => ({dataset: {profileGame: game}, score: {}, querySelector() { return this.score; }}));
    return {name, empty, rows, querySelector: selector => selector === '[data-profile-name]' ? name : empty, querySelectorAll: () => rows};
}

test('the dropdown shows only played games and handles existing profiles without scores', () => {
    const menu = scoreMenu();
    context.renderLeaderboardScores(menu, {name: 'My name', games: [{name: 'Note Nest', score: 120}]});
    assert.equal(menu.name.textContent, 'My name');
    assert.equal(menu.rows[0].hidden, false);
    assert.equal(menu.rows[0].score.textContent, '120');
    assert.equal(menu.rows[1].hidden, true);
    assert.equal(menu.empty.hidden, true);
    context.renderLeaderboardScores(menu, {name: 'Old profile', avatar: 'avatar-1'});
    assert.equal(menu.rows.every(row => row.hidden), true);
    assert.equal(menu.empty.hidden, false);
    context.renderLeaderboardScores(menu, {games: [null, {name: 'Beat Hero', score: 'broken'}]});
    assert.equal(menu.empty.hidden, false);
    assert.equal(menu.name.textContent, '');
});
