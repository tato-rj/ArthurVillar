const PullToRefresh = require('pulltorefreshjs');

const isStandaloneApp = function() {
    return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches)
        || window.navigator.standalone === true;
};

const isMobileTouchDevice = function() {
    const isMobileViewport = window.matchMedia && window.matchMedia('(max-width: 767.98px)').matches;
    const hasTouch = 'ontouchstart' in window || window.navigator.maxTouchPoints > 0;

    return isMobileViewport && hasTouch;
};

const getScrollableAncestor = function(element) {
    let current = element instanceof Element ? element : null;

    while (current && current !== document.body && current !== document.documentElement) {
        const style = window.getComputedStyle(current);
        const canScroll = /(auto|scroll)/.test(style.overflowY)
            && current.scrollHeight > current.clientHeight + 1;

        if (canScroll) {
            return current;
        }

        current = current.parentElement;
    }

    return null;
};

const initializePullToRefresh = function() {
    if (!isStandaloneApp() || !isMobileTouchDevice()) {
        return;
    }

    let touchTarget = null;
    const interactiveSelector = [
        'a',
        'button',
        'input',
        'select',
        'textarea',
        'label',
        '[role="button"]',
        '[contenteditable="true"]',
    ].join(', ');

    document.addEventListener('touchstart', function(event) {
        touchTarget = event.touches.length === 1 && event.target instanceof Element
            ? event.target
            : null;
    }, { passive: true });

    PullToRefresh.init({
        mainElement: 'body',
        shouldPullToRefresh: function() {
            if (!touchTarget || window.scrollY > 0 || document.documentElement.scrollTop > 0) {
                return false;
            }

            if (touchTarget.closest(interactiveSelector)) {
                return false;
            }

            if (touchTarget.closest('.modal.show, .offcanvas.show, .dropdown-menu.show')) {
                return false;
            }

            const scrollableAncestor = getScrollableAncestor(touchTarget);

            return !scrollableAncestor || scrollableAncestor.scrollTop <= 0;
        },
        onRefresh: function() {
            window.location.reload();
        },
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePullToRefresh);
} else {
    initializePullToRefresh();
}
