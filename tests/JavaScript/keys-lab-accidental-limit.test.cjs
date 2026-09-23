const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(
    path.join(__dirname, '../../resources/js/music/games/keyslab/KeysLab.js'),
    'utf8',
).replace(/^import\s[\s\S]*?;\n/gm, '').replace(/^export /gm, '');
const context = vm.createContext({ BaseStaffGame: class {} });
vm.runInContext(`${source}\nglobalThis.KeysLab = KeysLab;`, context);

function gameWithLimit(limit, quality = 'major') {
    const game = Object.create(context.KeysLab.prototype);
    game.opts = { numberOfAccidentals: limit, keyQualities: [quality] };
    game._normalizeOnOff = value => value === true || value === 'on';
    return game;
}

test('each slider value is the actual maximum key signature size', () => {
    for (let limit = 1; limit <= 7; limit += 1) {
        for (const quality of ['major', 'minor']) {
            const game = gameWithLimit(limit, quality);
            const keys = quality === 'major' ? context.KeysLab.MAJOR_KEYS : context.KeysLab.MINOR_KEYS;
            const filtered = game._filterKeysByAccidentalLimit(keys, quality);
            assert.ok(filtered.some(key => game._signatureCountForKey(key, quality) === limit));
            assert.ok(filtered.every(key => game._signatureCountForKey(key, quality) <= limit));
        }
    }
});

test('modal prompts use their parent major key signature', () => {
    const game = gameWithLimit(2);
    for (const [tonic, quality, parentMajor, type, count] of [
        ['G', 'dorian', 'F', 'flat', 1],
        ['F', 'mixolydian', 'Bb', 'flat', 2],
        ['D', 'dorian', 'C', null, 0],
        ['F#', 'locrian', 'G', 'sharp', 1],
    ]) {
        const degree = context.KeysLab.MODES.indexOf(quality);
        assert.equal(game._modeTonicFromMajor(parentMajor, degree), tonic);
        game._currentKeyPrompt = { tonic, quality, parentMajor };
        assert.equal(game._expectedSignatureForPrompt().type, type);
        assert.equal(game._expectedSignatureForPrompt().count, count);
        game.staff = { getClef: () => 'treble' };
        assert.equal(game._buildExpectedEntries().length, count);
    }
});

test('modes replace major and minor prompts when enabled and obey every accidental limit', () => {
    const game = gameWithLimit(2);
    for (const keyQuality of ['major', 'minor']) {
        game.opts.keyQualities = [keyQuality];
        game.opts.modes = false;
        vm.runInContext('Math.random = () => 0.99', context);
        assert.equal(game._pickKeyPrompt().quality, keyQuality);

        game.opts.modes = true;
        for (const chance of [0, 0.15, 0.3, 0.5, 0.7, 0.85, 0.99]) {
            vm.runInContext(`Math.random = () => ${chance}`, context);
            assert.ok(context.KeysLab.MODES.includes(game._pickKeyPrompt().quality));
        }
    }

    for (let limit = 1; limit <= 7; limit += 1) {
        game.opts.numberOfAccidentals = limit;
        const parents = game._filterKeysByAccidentalLimit(context.KeysLab.MAJOR_KEYS, 'major');
        for (const parentMajor of parents) {
            for (const [degree, quality] of context.KeysLab.MODES.entries()) {
                const tonic = game._modeTonicFromMajor(parentMajor, degree);
                assert.match(tonic, /^[A-G][#b]?$/);
                game._currentKeyPrompt = { tonic, quality, parentMajor };
                assert.ok(game._expectedSignatureForPrompt().count <= limit);
            }
        }
    }
});

test('an empty staff can be checked and is correct for a natural key signature', () => {
    const game = gameWithLimit(1);
    game._collectUserSignatureEntries = () => [];
    assert.equal(game._checkAfterUserNotes(), 0);

    for (const [tonic, quality] of [['C', 'major'], ['A', 'minor']]) {
        game._currentKeyPrompt = { tonic, quality };
        assert.equal(game._isUserSignatureCorrect(), true);
    }

    game._currentKeyPrompt = { tonic: 'D', quality: 'dorian', parentMajor: 'C' };
    assert.equal(game._isUserSignatureCorrect(), true);

    game._currentKeyPrompt = { tonic: 'G', quality: 'major' };
    game.staff = { getClef: () => 'treble' };
    assert.equal(game._isUserSignatureCorrect(), false);
});
