const config = window.webPushConfig;

if (config) {
    const supportsWebPush = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;

    const base64UrlToUint8Array = function(value) {
        const padding = '='.repeat((4 - value.length % 4) % 4);
        const base64 = (value + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);

        return Uint8Array.from([...rawData].map(character => character.charCodeAt(0)));
    };

    let subscriptionSync = null;

    const setStatus = function(message, enabled, actionRequired) {
        document.querySelectorAll('[data-web-push-status]').forEach(function(element) {
            element.textContent = message || '';
            element.hidden = enabled === true || !message;
            element.classList.toggle('text-danger', enabled === false);
        });

        document.querySelectorAll('[data-enable-push-notifications]').forEach(function(button) {
            button.hidden = actionRequired !== true;
        });
    };

    const registration = supportsWebPush
        ? navigator.serviceWorker.register(config.serviceWorkerUrl)
        : Promise.reject(new Error('Web Push is not supported by this browser.'));

    const subscriptionPayload = function(subscription) {
        const payload = subscription.toJSON();
        payload.content_encoding = PushManager.supportedContentEncodings
            ? PushManager.supportedContentEncodings[0]
            : null;

        return payload;
    };

    const syncSubscription = function(subscription) {
        if (!subscriptionSync) {
            subscriptionSync = axios.post(config.subscribeUrl, subscriptionPayload(subscription))
                .catch(function(error) {
                    subscriptionSync = null;
                    throw error;
                });
        }

        return subscriptionSync;
    };

    const subscribeDevice = async function() {
        if (!config.publicKey) {
            throw new Error('Push notifications are not configured on the server.');
        }

        const worker = await registration;
        let subscription = await worker.pushManager.getSubscription();

        if (!subscription) {
            subscription = await worker.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: base64UrlToUint8Array(config.publicKey),
            });
        }

        setStatus('', true, false);
        await syncSubscription(subscription);

        return subscription;
    };

    const refreshStatus = async function() {
        if (!supportsWebPush) {
            setStatus('Web Push is not supported by this browser.', false, false);
            return;
        }

        if (Notification.permission === 'denied') {
            setStatus('Notifications are blocked in this device’s settings.', false, false);
            return;
        }

        if (Notification.permission === 'default') {
            setStatus('Notifications must be enabled on this device.', null, true);
            return;
        }

        try {
            await subscribeDevice();
        } catch (error) {
            let subscription = null;

            try {
                const worker = await registration;
                subscription = await worker.pushManager.getSubscription();
            } catch (registrationError) {
                subscription = null;
            }

            if (subscription) {
                // The browser is subscribed. Keep the form quiet and retry the
                // server synchronization the next time state is checked.
                setStatus('', true, false);
                return;
            }

            const message = error.response?.data?.message || error.message || 'Could not restore notifications on this device.';
            setStatus(message, false, true);
        }
    };

    document.addEventListener('change', function(event) {
        if (!event.target.matches('[data-event-notification-toggle]')) {
            return;
        }

        const settings = event.target.closest('[data-event-notification-settings]');
        const options = settings.querySelector('[data-event-notification-options]');
        options.hidden = !event.target.checked;

        if (event.target.checked) {
            refreshStatus();
        }
    });

    document.addEventListener('click', async function(event) {
        const button = event.target.closest('[data-enable-push-notifications]');

        if (!button) {
            return;
        }

        button.disabled = true;

        try {
            if (!supportsWebPush || !config.publicKey) {
                throw new Error(!config.publicKey
                    ? 'Push notifications are not configured on the server.'
                    : 'Web Push is not supported by this browser.');
            }

            const permission = await Notification.requestPermission();

            if (permission !== 'granted') {
                throw new Error('Notification permission was not granted.');
            }

            await subscribeDevice();
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Could not enable notifications.';
            setStatus(message, false, true);
        } finally {
            button.disabled = false;
        }
    });

    document.addEventListener('DOMContentLoaded', function() {
        if (document.querySelector('[data-web-push-status]')) {
            refreshStatus();
        }

        const observer = new MutationObserver(function(mutations) {
            const addedNotificationForm = mutations.some(function(mutation) {
                return Array.from(mutation.addedNodes).some(function(node) {
                    return node.nodeType === Node.ELEMENT_NODE
                        && (node.matches('[data-event-notification-settings]')
                            || node.querySelector('[data-event-notification-settings]'));
                });
            });

            if (addedNotificationForm) {
                refreshStatus();
            }
        });

        observer.observe(document.body, {childList: true, subtree: true});
    });
}
