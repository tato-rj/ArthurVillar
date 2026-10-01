export function dialog({ message = '', code = '', join = false, ready = false, cancel = false, leave = false, exit = false, idle = false, seconds = 10, error = '' } = {}) {
    const root = document.getElementById('duel-modal');
    root.querySelector('[data-duel-message]').textContent = message;
    root.querySelector('[data-duel-message]').classList.remove('duel-countdown');
    root.querySelector('[data-duel-code]').textContent = code;
    root.querySelector('[data-duel-code]').hidden = !code;
    root.querySelector('[data-duel-join-form]').hidden = !join;
    root.querySelector('[data-duel-ready]').hidden = !ready;
    root.querySelector('[data-duel-cancel]').hidden = !cancel;
    root.querySelector('[data-duel-leave]').hidden = !leave;
    root.querySelector('[data-duel-exit]').hidden = !exit;
    root.querySelector('[data-duel-idle]').hidden = !idle;
    root.querySelector('[data-duel-idle-count]').textContent = String(seconds);
    root.querySelector('[data-duel-active]').hidden = !idle;
    $(root.querySelector('[data-duel-error]')).text(error).toggle(Boolean(error));
    root.querySelector('.btn-close').hidden = !join;
    $(root).modal('show');
    return root;
}
export function closeDialog() { $('#duel-modal').modal('hide'); }
