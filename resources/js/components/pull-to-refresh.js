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

    const refreshThreshold = 110;
    const indicator = document.createElement('div');
    const icon = document.createElement('i');
    const status = document.createElement('span');
    let startX = 0;
    let startY = 0;
    let pullDistance = 0;
    let isCandidate = false;
    let isPulling = false;
    let isRefreshing = false;

    indicator.className = 'app-pull-to-refresh';
    indicator.setAttribute('role', 'status');
    indicator.setAttribute('aria-live', 'polite');
    icon.className = 'fa-solid fa-arrow-rotate-right';
    icon.setAttribute('aria-hidden', 'true');
    status.className = 'sr-only';
    status.textContent = 'Pull to refresh';
    indicator.appendChild(icon);
    indicator.appendChild(status);
    document.body.appendChild(indicator);

    const resetIndicator = function() {
        indicator.classList.remove('is-pulling', 'is-ready', 'is-refreshing');
        indicator.style.setProperty('--app-pull-refresh-y', '-3rem');
        indicator.style.opacity = '0';
        status.textContent = 'Pull to refresh';
        document.documentElement.classList.remove('app-is-pulling-to-refresh');
        pullDistance = 0;
        isPulling = false;
    };

    const removeGestureListeners = function() {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        document.removeEventListener('touchcancel', handleTouchCancel);
        isCandidate = false;
    };

    const finishGesture = function(shouldRefresh) {
        removeGestureListeners();

        if (!shouldRefresh) {
            resetIndicator();
            return;
        }

        isRefreshing = true;
        isPulling = false;
        indicator.classList.remove('is-pulling', 'is-ready');
        indicator.classList.add('is-refreshing');
        indicator.style.setProperty('--app-pull-refresh-y', '1rem');
        indicator.style.opacity = '1';
        status.textContent = 'Refreshing';
        document.documentElement.classList.remove('app-is-pulling-to-refresh');

        window.setTimeout(function() {
            window.location.reload();
        }, 180);
    };

    function handleTouchMove(event) {
        if (!isCandidate || isRefreshing || event.touches.length !== 1) {
            return;
        }

        const deltaX = event.touches[0].clientX - startX;
        const deltaY = event.touches[0].clientY - startY;

        if (!isPulling && (deltaY <= 6 || Math.abs(deltaX) >= deltaY)) {
            if (deltaY < 0 || Math.abs(deltaX) > Math.abs(deltaY)) {
                finishGesture(false);
            }

            return;
        }

        isPulling = true;
        pullDistance = Math.max(0, deltaY);
        event.preventDefault();

        const visualDistance = Math.min(72, Math.sqrt(pullDistance) * 6);
        const isReady = pullDistance >= refreshThreshold;

        indicator.classList.add('is-pulling');
        indicator.classList.toggle('is-ready', isReady);
        indicator.style.setProperty('--app-pull-refresh-y', `${visualDistance - 10}px`);
        indicator.style.opacity = String(Math.min(1, pullDistance / 55));
        status.textContent = isReady ? 'Release to refresh' : 'Pull to refresh';
        document.documentElement.classList.add('app-is-pulling-to-refresh');
    }

    function handleTouchEnd() {
        finishGesture(isPulling && pullDistance >= refreshThreshold);
    }

    function handleTouchCancel() {
        finishGesture(false);
    }

    document.addEventListener('touchstart', function(event) {
        if (isRefreshing || event.touches.length !== 1) {
            return;
        }

        const target = event.target instanceof Element ? event.target : null;

        if (!target || target.closest('.modal.show, .offcanvas.show, .dropdown-menu.show')) {
            return;
        }

        const scrollableAncestor = getScrollableAncestor(target);
        const pageIsAtTop = window.scrollY <= 0 && document.documentElement.scrollTop <= 0;

        if (!pageIsAtTop || (scrollableAncestor && scrollableAncestor.scrollTop > 0)) {
            return;
        }

        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
        pullDistance = 0;
        isCandidate = true;
        isPulling = false;

        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
        document.addEventListener('touchcancel', handleTouchCancel);
    }, { passive: true });

    window.addEventListener('pageshow', function() {
        isRefreshing = false;
        removeGestureListeners();
        resetIndicator();
    });

    resetIndicator();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePullToRefresh);
} else {
    initializePullToRefresh();
}
