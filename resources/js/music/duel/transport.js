import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

export class DuelTransport {
    constructor(config = window.__duelConfig) {
        this.config = config;
        this.offset = 0;
        this.echo = null;
    }

    async request(path = '', data = null) {
        const began = Date.now();
        const response = await fetch(`${this.config.base}${path}`, {
            method: data === null ? 'GET' : 'POST', credentials: 'same-origin',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content },
            ...(data === null ? {} : { body: JSON.stringify(data) }),
        });
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
            const error = new Error(Object.values(payload.errors || {}).flat()[0] || payload.message || 'Could not reach the Duel server. Please try again.');
            error.status = response.status; throw error;
        }
        if (payload.server_now) this.offset = Date.parse(payload.server_now) - (began + Date.now()) / 2;
        return payload;
    }

    leaveOnExit(id) {
        const body = new FormData();
        body.append('_token', document.querySelector('meta[name="csrf-token"]').content);
        const url = `${this.config.base}/${id}/leave`;
        try { if (navigator.sendBeacon?.(url, body)) return; } catch (_) {}
        fetch(url, { method: 'POST', credentials: 'same-origin', body, keepalive: true }).catch(() => {});
    }

    subscribe(id, { update, answer, connected, disconnected, error }) {
        this.echo?.disconnect();
        this.echo = new Echo({
            broadcaster: 'reverb', client: new Pusher(this.config.key, {
                wsHost: this.config.host, wsPort: this.config.port, wssPort: this.config.port,
                forceTLS: this.config.scheme === 'https', enabledTransports: ['ws', 'wss'], cluster: '',
                channelAuthorization: { endpoint: this.config.auth, transport: 'ajax', headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content, Accept: 'application/json',
                } },
            }),
        });
        this.echo.connector.pusher.connection.bind('disconnected', disconnected);
        this.echo.connector.pusher.connection.bind('unavailable', disconnected);
        this.echo.private(`theory.duel.${id}`).listen('.DuelUpdated', event => update(event.state))
            .listen('.DuelAnswerSubmitted', event => answer?.(event))
            .subscribed(connected).error(error);
    }
}
