export const STORAGE_KEY = 'theory.leaderboard.profile.v1';

function savedGames(saved) {
    return Array.isArray(saved?.games) ? saved.games.filter(game =>
        game && typeof game.name === 'string' && Number.isFinite(game.score) && game.score >= 0
    ).slice(0, 50) : [];
}

export function renderLeaderboardScores(menu, saved) {
    const name = typeof saved?.name === 'string' ? saved.name : '';
    menu.querySelector('[data-profile-name]').textContent = name;
    menu.querySelector('[data-profile-name]').title = name;
    const games = savedGames(saved);
    let count = 0;
    menu.querySelectorAll('[data-profile-game]').forEach(row => {
        const result = games.find(game => game.name === row.dataset.profileGame);
        row.hidden = !result;
        row.querySelector('[data-profile-score]').textContent = result ? Math.round(result.score).toLocaleString() : '';
        if (result) count++;
    });
    menu.querySelector('[data-profile-empty]').hidden = count > 0;
}

export function renderLeaderboardAvatar(button, getStorage = () => window.localStorage) {
    let saved;
    try { saved = JSON.parse(getStorage().getItem(STORAGE_KEY)); } catch (_) { /* Use the default icon. */ }
    const image = button.querySelector('[data-saved-avatar]');
    const placeholder = button.querySelector('[data-avatar-placeholder]');
    const valid = typeof saved?.avatar === 'string' && /^avatar-([1-9]|[1-6][0-9]|7[0-8])$/.test(saved.avatar);
    if (valid) image.src = `${button.dataset.avatarBase}${saved.avatar}.svg`;
    image.hidden = !valid;
    placeholder.hidden = valid;
    button.disabled = !valid;
    button.setAttribute('aria-label', valid && typeof saved.name === 'string' && saved.name.trim() ? `${saved.name}'s avatar` : 'Your avatar');
    const menu = button.parentElement?.querySelector('[data-profile-menu]');
    if (menu) renderLeaderboardScores(menu, valid ? saved : null);
}

export function rememberLeaderboardProfile(form, getStorage = () => window.localStorage) {
    const username = form.elements.namedItem('username');
    const avatars = [...form.querySelectorAll('input[name="avatar_url"]')];
    let storage;
    let saved;
    try {
        storage = getStorage();
        saved = JSON.parse(storage.getItem(STORAGE_KEY));
    } catch (_) { /* Remembering a player is optional when storage is unavailable. */ }

    // These attributes exist only after the server has successfully posted a score.
    const postedAvatar = avatars.find(avatar => avatar.value === form.dataset.postedAvatar);
    if (form.dataset.postedName && postedAvatar) {
        const games = savedGames(saved);
        const game = form.dataset.postedGame;
        const score = Number(form.dataset.postedScore);
        if (game && form.dataset.postedScore?.trim() && Number.isFinite(score) && score >= 0) {
            const previous = games.find(result => result.name === game);
            if (previous) previous.score = Math.max(previous.score, score);
            else games.push({ name: game, score });
        }
        saved = { name: form.dataset.postedName, avatar: postedAvatar.id, ...(games.length ? { games: games.slice(-50) } : {}) };
        try { storage?.setItem(STORAGE_KEY, JSON.stringify(saved)); } catch (_) { /* Keep play available. */ }
    }

    if (!saved || typeof saved.name !== 'string' || !saved.name.trim()) return;
    const avatar = avatars.find(option => option.id === saved.avatar);
    if (!avatar) return;

    if (!username.value) username.value = saved.name;
    if (!avatars.some(option => option.checked)) {
        avatar.checked = true;
        avatars.forEach(option => {
            option.closest('.avatar-option').querySelector('.player-avatar').classList.toggle('opacity-2', option !== avatar);
        });
    }
}
