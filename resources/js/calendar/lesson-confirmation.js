const HOLD_START_DELAY = 500;
const HOLD_DURATION = 1000;

export const bindLessonConfirmation = function(button, getHoldKey, confirm) {
    let press = null;
    let timer = null;
    let suppressClick = false;

    button.style.setProperty('--lesson-confirm-hold-duration', `${HOLD_DURATION}ms`);

    const cancel = function() {
        window.clearTimeout(timer);
        timer = null;
        const pointerId = press && press.pointerId;
        press = null;
        button.classList.remove('is-holding', 'is-hold-complete');
        if (pointerId !== null && button.hasPointerCapture(pointerId)) {
            button.releasePointerCapture(pointerId);
        }
    };

    const isCurrentPress = function() {
        return press && !button.disabled && getHoldKey() === press.key;
    };

    const completeHold = function() {
        const shouldConfirm = isCurrentPress();
        cancel();
        if (!shouldConfirm) return;
        button.classList.add('is-hold-complete');
        Promise.resolve(confirm(true)).finally(function() {
            button.classList.remove('is-hold-complete');
        });
    };

    button.addEventListener('pointerdown', function(event) {
        if (event.button !== 0 || !event.isPrimary) return;
        cancel();
        suppressClick = false;
        const key = !button.disabled && getHoldKey();
        if (!key) return;

        suppressClick = true;
        press = { pointerId: event.pointerId, key };
        button.setPointerCapture(event.pointerId);
        timer = window.setTimeout(function() {
            if (!isCurrentPress()) {
                cancel();
                return;
            }
            button.classList.add('is-holding');
            timer = window.setTimeout(completeHold, HOLD_DURATION);
        }, HOLD_START_DELAY);
    });

    button.addEventListener('pointerup', function(event) {
        if (!press || event.pointerId !== press.pointerId) return;
        const shouldConfirm = isCurrentPress();
        cancel();
        if (shouldConfirm) confirm(false);
    });

    // Pointer capture also covers touch; moving outside cancels instead of saving.
    button.addEventListener('pointermove', function(event) {
        if (!press || event.pointerId !== press.pointerId) return;
        const rect = button.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right
            || event.clientY < rect.top || event.clientY > rect.bottom) cancel();
    });
    button.addEventListener('pointerleave', cancel);
    button.addEventListener('pointercancel', cancel);
    button.addEventListener('lostpointercapture', function() {
        if (press) cancel();
    });
    button.addEventListener('contextmenu', function(event) {
        if (press || suppressClick) event.preventDefault();
    });
    button.addEventListener('click', function(event) {
        event.preventDefault();
        // Consume the click generated after pointerup, even if the request has finished.
        if (suppressClick || button.disabled) return;
        confirm(false);
    });
    button.addEventListener('keydown', function(event) {
        if ((event.key === 'Enter' || event.key === ' ') && !event.repeat) {
            cancel();
            suppressClick = false;
        }
    });
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') cancel();
    });
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) cancel();
    });
    window.addEventListener('blur', cancel);

    const modal = button.closest('#calendar-event-modal');
    modal.addEventListener('hide.bs.modal', cancel);
    if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
        window.jQuery(modal).on('hide.bs.modal', cancel);
    }

    return cancel;
};
