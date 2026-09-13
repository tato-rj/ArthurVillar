const PROBE_PATH = '/_connectivity';
const PROBE_TIMEOUT = 5000;
const CONFIRMATION_DELAY = 650;
const ONLINE_CHECK_INTERVAL = 45000;
const OFFLINE_CHECK_INTERVAL = 10000;

const delay = (milliseconds) => new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
});

const startOfflineDetection = () => {
    const offlineState = document.querySelector('[data-offline-state]');

    if (!offlineState || typeof window.fetch !== 'function') {
        return;
    }

    const retryButton = offlineState.querySelector('[data-offline-retry]');
    const retryLabel = offlineState.querySelector('[data-offline-retry-label]');
    const description = offlineState.querySelector('[data-offline-description]');
    const defaultMessage = description.dataset.defaultMessage;
    let activeCheck = null;
    let nextCheck = null;
    let previouslyFocusedElement = null;

    const setChecking = (isChecking) => {
        offlineState.classList.toggle('is-checking', isChecking);
        retryButton.disabled = isChecking;
        retryButton.setAttribute('aria-busy', String(isChecking));
        retryLabel.textContent = isChecking ? 'Checking…' : 'Try again';
    };

    const setOffline = (isOffline) => {
        const wasHidden = offlineState.hidden;

        offlineState.hidden = !isOffline;
        offlineState.setAttribute('aria-hidden', String(!isOffline));
        document.documentElement.classList.toggle('is-offline', isOffline);

        if (isOffline && wasHidden) {
            previouslyFocusedElement = document.activeElement;
            window.requestAnimationFrame(() => retryButton.focus({ preventScroll: true }));
        }

        if (!isOffline && !wasHidden) {
            description.textContent = defaultMessage;
            setChecking(false);

            if (previouslyFocusedElement instanceof HTMLElement) {
                previouslyFocusedElement.focus({ preventScroll: true });
            }

            previouslyFocusedElement = null;
        }
    };

    const probe = async () => {
        if (!navigator.onLine) {
            return false;
        }

        const controller = typeof AbortController === 'function'
            ? new AbortController()
            : null;
        const timeout = window.setTimeout(() => controller?.abort(), PROBE_TIMEOUT);
        const url = new URL(PROBE_PATH, window.location.origin);
        url.searchParams.set('_', Date.now().toString());

        try {
            const response = await window.fetch(url.toString(), {
                cache: 'no-store',
                credentials: 'same-origin',
                headers: {
                    Accept: 'text/plain',
                },
                signal: controller?.signal,
            });

            return response.status === 204
                && response.headers.get('X-Connectivity') === 'online';
        } catch (error) {
            return false;
        } finally {
            window.clearTimeout(timeout);
        }
    };

    const checkConnectivity = ({ confirmFailure = true, manual = false } = {}) => {
        if (activeCheck) {
            return activeCheck;
        }

        if (manual) {
            setChecking(true);
            description.textContent = defaultMessage;
        }

        activeCheck = (async () => {
            let isOnline = await probe();

            // Requiring two failed heartbeats avoids covering the page for a
            // single dropped request on an otherwise usable connection.
            if (!isOnline && confirmFailure && navigator.onLine) {
                await delay(CONFIRMATION_DELAY);
                isOnline = await probe();
            }

            setOffline(!isOnline);

            if (!isOnline && manual) {
                description.textContent = 'Still offline. The piano is committed to the bit.';
            }

            return isOnline;
        })().finally(() => {
            activeCheck = null;

            if (manual) {
                setChecking(false);
            }
        });

        return activeCheck;
    };

    const scheduleCheck = () => {
        window.clearTimeout(nextCheck);
        nextCheck = window.setTimeout(async () => {
            if (document.visibilityState !== 'hidden') {
                await checkConnectivity();
            }

            scheduleCheck();
        }, offlineState.hidden ? ONLINE_CHECK_INTERVAL : OFFLINE_CHECK_INTERVAL);
    };

    retryButton.addEventListener('click', async () => {
        await checkConnectivity({ confirmFailure: false, manual: true });
        scheduleCheck();
    });

    window.addEventListener('offline', () => {
        setOffline(true);
        scheduleCheck();
    });

    window.addEventListener('online', async () => {
        await checkConnectivity({ confirmFailure: false });
        scheduleCheck();
    });

    document.addEventListener('visibilitychange', async () => {
        if (document.visibilityState === 'visible') {
            await checkConnectivity();
            scheduleCheck();
        }
    });

    if (!navigator.onLine) {
        setOffline(true);
        scheduleCheck();
        return;
    }

    checkConnectivity().finally(scheduleCheck);
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startOfflineDetection, { once: true });
} else {
    startOfflineDetection();
}

module.exports = startOfflineDetection;
