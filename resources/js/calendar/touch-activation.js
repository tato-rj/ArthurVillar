export const tapMovementTolerance = 8;
export const tapHoldDelay = 600;

// A mobile browser can deliver a complete tap without its compatibility click after a swipe.
export function bindCalendarTap(root, getTarget, activate) {
    let tap = null;

    const stayedOnPoint = (touch, start) => touch && touch.identifier === start.identifier
        && Math.abs(touch.clientX - start.clientX) <= tapMovementTolerance
        && Math.abs(touch.clientY - start.clientY) <= tapMovementTolerance;

    root.addEventListener('touchstart', function(event) {
        tap = null;
        if (event.touches.length !== 1) return;

        const touch = event.touches[0];
        const target = getTarget(touch);
        if (target) {
            const { identifier, clientX, clientY } = touch;
            tap = { target, identifier, clientX, clientY, time: event.timeStamp };
        }
    }, { passive: true });

    root.addEventListener('touchmove', function(event) {
        if (tap && (event.touches.length !== 1 || !stayedOnPoint(event.touches[0], tap))) tap = null;
    }, { passive: true });

    root.addEventListener('touchcancel', () => { tap = null; });

    root.addEventListener('touchend', function(event) {
        const start = tap;
        tap = null;
        if (!start || !start.target.isConnected || event.defaultPrevented || !event.cancelable
            || event.touches.length || event.timeStamp - start.time >= tapHoldDelay) return;

        const touch = event.changedTouches[0];
        if (!stayedOnPoint(touch, start)) return;

        const { clientX, clientY } = touch;
        const target = document.elementFromPoint(clientX, clientY);
        if (!target || getTarget({ target, clientX, clientY }) !== start.target) return;

        // Cancel the native follow-up before activating so a tap submits or toggles exactly once.
        event.preventDefault();
        activate(start.target);
    }, { passive: false });
}

export function bindMiniCalendarOverlay(panel, dismiss) {
    // Bootstrap inserts the backdrop alongside the panel and toggle in this wrapper.
    const overlay = panel.parentElement;
    bindCalendarTap(overlay, function({ target }) {
        const control = target.closest('button, [data-mini-label], .offcanvas-backdrop');
        return overlay.contains(control) ? control : null;
    }, function(control) {
        if (control.classList.contains('offcanvas-backdrop')) {
            dismiss();
        } else {
            control.click();
        }
    });

    // Bootstrap's transition callbacks also manage focus, scroll locking, and dialog attributes.
    // Let the current transition finish before running the opposite action.
    panel.addEventListener('hide.bs.offcanvas', function(event) {
        if (panel.classList.contains('showing')) {
            event.preventDefault();
            panel.addEventListener('shown.bs.offcanvas', dismiss, { once: true });
        }
    });
    const reopen = () => overlay.querySelector('[data-bs-toggle="offcanvas"]').click();
    panel.addEventListener('show.bs.offcanvas', function(event) {
        if (panel.classList.contains('hiding')) {
            event.preventDefault();
            panel.addEventListener('hidden.bs.offcanvas', reopen, { once: true });
        }
    });
}

export function bindEventModalTaps(modal, dismiss) {
    const getControl = function({ target }) {
        if (!modal.classList.contains('show') || !modal.contains(target)) return null;
        if (target === modal) return modal;

        // Text fields and selects need the browser's native editing and picker gestures.
        const element = target.closest('button, input, label, a[href]');
        const control = element?.tagName === 'LABEL' ? element.control : element;
        return control?.matches('button, input[type="checkbox"], input[type="radio"], input[type="submit"], a[href]')
            && !control.matches(':disabled') ? control : null;
    };

    bindCalendarTap(modal, getControl, function(control) {
        if (control === modal) {
            dismiss(modal);
        } else {
            control.focus({ preventScroll: true });
            control.click();
        }
    });
}
