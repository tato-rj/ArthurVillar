import { DEFAULT_TEMPO, MIN_TEMPO, MAX_TEMPO } from './gesture';

export const SOUND_PROFILES = {
    click: { type: 'triangle', frequency: 1400, end: 0.5, duration: 0.035, volume: 0.4, ratios: [1] },
    woodblock: { type: 'sine', frequency: 800, end: 0.92, duration: 0.065, volume: 0.45, ratios: [1, 2.76] },
    beep: { type: 'sine', frequency: 1000, end: 1, duration: 0.075, volume: 0.32, ratios: [1] },
    cowbell: { type: 'square', frequency: 540, end: 1, duration: 0.09, volume: 0.14, ratios: [1, 1.48] },
};

export const DEFAULT_SETTINGS = { beats: 1, color: '#155eef', sound: 'click', type: 'classic' };
export const SETTINGS_KEY = 'metronome.settings.v1';
export const TEMPO_KEY = 'metronome.tempo.v1';

export function loadTempo(storage) {
    try {
        const value = JSON.parse(storage.getItem(TEMPO_KEY));
        return Number.isInteger(value) && value >= MIN_TEMPO && value <= MAX_TEMPO
            ? value : DEFAULT_TEMPO;
    } catch (error) {
        return DEFAULT_TEMPO;
    }
}

export function normalizeSettings(value) {
    const input = value && typeof value === 'object' ? value : {};
    return {
        beats: [1, 2, 3, 4].includes(Number(input.beats)) ? Number(input.beats) : DEFAULT_SETTINGS.beats,
        color: typeof input.color === 'string' && /^#[0-9a-f]{6}$/i.test(input.color)
            ? input.color.toLowerCase() : DEFAULT_SETTINGS.color,
        sound: Object.prototype.hasOwnProperty.call(SOUND_PROFILES, input.sound) ? input.sound : DEFAULT_SETTINGS.sound,
        type: input.type === 'conductor' ? 'conductor' : 'classic',
    };
}

export function loadSettings(storage) {
    try {
        return normalizeSettings(JSON.parse(storage.getItem(SETTINGS_KEY)));
    } catch (error) {
        return { ...DEFAULT_SETTINGS };
    }
}

function luminance(channels) {
    const linear = channels.map(channel => {
        const value = channel / 255;
        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
    return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

function hexColor(channels) {
    return `#${channels.map(channel => channel.toString(16).padStart(2, '0')).join('')}`;
}

function mixColor(from, to, amount) {
    return from.map((channel, index) => Math.round(channel + (to[index] - channel) * amount));
}

export function colorPalette(color) {
    const channels = color.slice(1).match(/../g).map(channel => parseInt(channel, 16));
    return {
        pulse: hexColor(mixColor(channels, [0, 0, 0], 0.42)),
        ink: luminance(channels) > 0.4 ? '#112037' : '#ffffff',
    };
}
