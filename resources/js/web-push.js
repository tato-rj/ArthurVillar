const config = window.webPushConfig;

if (config) {
    const supportsWebPush = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;

    const base64UrlToUint8Array = function(value) {
        const padding = '='.repeat((4 - value.length % 4) % 4);
        const base64 = (value + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);

        return Uint8Array.from([...rawData].map(character => character.charCodeAt(0)));
    };

    const setStatus = function(message, enabled) {
        document.querySelectorAll('[data-web-push-status]').forEach(function(element) {
            element.textContent = message;
            element.classList.toggle('text-success', enabled === true);
            element.classList.toggle('text-danger', enabled === false);
        });

        document.querySelectorAll('[data-enable-push-notifications]').forEach(function(button) {
            button.hidden = enabled === true;
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

    const refreshStatus = async function() {
        if (!supportsWebPush) {
            setStatus('Web Push is not supported by this browser.', false);
            return;
        }

        if (Notification.permission === 'denied') {
            setStatus('Notifications are blocked in this device’s settings.', false);
            return;
        }

        const subscription = await (await registration).pushManager.getSubscription();

        if (subscription) {
            await axios.post(config.subscribeUrl, subscriptionPayload(subscription));
            setStatus('Notifications are enabled on this device.', true);
        } else {
            setStatus('Notifications must be enabled on at least one device.');
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
            refreshStatus().catch(function() {
                setStatus('Could not check notification status on this device.', false);
            });
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

            const worker = await registration;
            let subscription = await worker.pushManager.getSubscription();

            if (!subscription) {
                subscription = await worker.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: base64UrlToUint8Array(config.publicKey),
                });
            }

            await axios.post(config.subscribeUrl, subscriptionPayload(subscription));
            setStatus('Notifications are enabled on this device.', true);
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Could not enable notifications.';
            setStatus(message, false);
        } finally {
            button.disabled = false;
        }
    });

    document.addEventListener('DOMContentLoaded', function() {
        if (document.querySelector('[data-web-push-status]')) {
            refreshStatus().catch(function() {
                setStatus('Could not check notification status on this device.', false);
            });
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
                refreshStatus().catch(function() {
                    setStatus('Could not check notification status on this device.', false);
                });
            }
        });

        observer.observe(document.body, {childList: true, subtree: true});
    });
}
