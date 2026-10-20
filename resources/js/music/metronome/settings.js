export const SOUND_PROFILES = {
    click: { type: 'triangle', frequency: 1400, end: 0.5, duration: 0.035, volume: 0.4, ratios: [1] },
    woodblock: { type: 'sine', frequency: 800, end: 0.92, duration: 0.065, volume: 0.45, ratios: [1, 2.76] },
    beep: { type: 'sine', frequency: 1000, end: 1, duration: 0.075, volume: 0.32, ratios: [1] },
    cowbell: { type: 'square', frequency: 540, end: 1, duration: 0.09, volume: 0.14, ratios: [1, 1.48] },
};

export const DEFAULT_SETTINGS = { beats: 1, color: '#155eef', sound: 'click', type: 'classic' };
export const SETTINGS_KEY = 'metronome.settings.v1';

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

function buttonInk(channels) {
    const light = luminance(channels);
    if (1.05 / (light + 0.05) >= 4.5) return '#ffffff';
    return (light + 0.05) / (luminance([17, 32, 55]) + 0.05) >= 4.5 ? '#112037' : '#000000';
}

export function colorPalette(color) {
    const channels = color.slice(1).match(/../g).map(channel => parseInt(channel, 16));
    const background = mixColor(channels, [255, 255, 255], 0.88);
    const accent = mixColor(channels, [0, 0, 0], 0.18);
    const accentHover = mixColor(accent, [0, 0, 0], 0.08);
    const hover = mixColor(background, accent, 0.07);
    let text = accent;
    // Bright hues need a deeper shade for readable text on the pale tint.
    while ((luminance(hover) + 0.05) / (luminance(text) + 0.05) < 4.5) {
        text = text.map(channel => Math.floor(channel * 0.95));
    }
    return {
        pulse: hexColor(mixColor(channels, [0, 0, 0], 0.22)),
        ink: luminance(channels) > 0.4 ? '#112037' : '#ffffff',
        settings: {
            background: hexColor(background),
            ink: hexColor(text),
            accent: hexColor(accent),
            'on-accent': buttonInk(accent),
            'accent-hover': hexColor(accentHover),
            'on-accent-hover': buttonInk(accentHover),
            hover: hexColor(hover),
            border: hexColor(mixColor(background, text, 0.23)),
        },
    };
}
