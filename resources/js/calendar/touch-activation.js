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

export function bindCalendarOffcanvas(panel, toggle, dismiss) {
    // Bootstrap's transition callbacks also manage focus, scroll locking, and dialog attributes.
    // Let the current transition finish before running the opposite action.
    panel.addEventListener('hide.bs.offcanvas', function(event) {
        if (panel.classList.contains('showing')) {
            event.preventDefault();
            panel.addEventListener('shown.bs.offcanvas', dismiss, { once: true });
        }
    });
    const reopen = () => toggle.click();
    panel.addEventListener('show.bs.offcanvas', function(event) {
        if (panel.classList.contains('hiding')) {
            event.preventDefault();
            panel.addEventListener('hidden.bs.offcanvas', reopen, { once: true });
        }
    });
}

// Delegate on the calendar page so portaled menus and forms loaded later use the same tap handling.
export function bindCalendarControlTaps(root, dismissModal, dismissOffcanvas, isOutsideOpenPopup) {
    const getControl = function({ target }) {
        if (target.matches('.modal.show, .offcanvas-backdrop.show, [data-calendar-create-backdrop]')) return target;

        const element = target.closest('button, a[href], label, input, select, textarea, [contenteditable], [role="button"], .calendar-month-event, [data-calendar-offcanvas-view]');
        // The search and filter menus also use clicks on otherwise empty space to dismiss.
        if (!element) return typeof target.click === 'function' && isOutsideOpenPopup(target) ? target : null;
        const control = element.tagName === 'LABEL' ? element.control : element;
        if (!control || control.matches(':disabled, select, textarea, [contenteditable]')) return null;
        // Leave text entry, native pickers, and range sliders to the browser.
        if (control.tagName === 'INPUT' && !['checkbox', 'radio', 'submit', 'button', 'reset'].includes(control.type)) return null;
        return control;
    };

    bindCalendarTap(root, getControl, function(control) {
        if (control.matches('.offcanvas-backdrop')) {
            const panel = control.parentElement.querySelector(':scope > .offcanvas[aria-modal="true"]:not(.hiding)');
            if (panel && panel.dataset.bsBackdrop !== 'static') dismissOffcanvas(panel);
        } else if (control.matches('.modal')) {
            if (control.dataset.bsBackdrop !== 'static') dismissModal(control);
        } else {
            if (control.closest('.modal')) control.focus({ preventScroll: true });
            control.click();
        }
    });
}
