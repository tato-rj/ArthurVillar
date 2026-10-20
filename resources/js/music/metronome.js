import { MetronomeClock } from './metronome/clock';
import { clampTempo, DEFAULT_TEMPO, TempoGesture } from './metronome/gesture';
import { colorPalette, DEFAULT_SETTINGS, loadSettings, normalizeSettings, SETTINGS_KEY } from './metronome/settings';
import { ConductorView } from './metronome/conductor';

const surface = document.querySelector('[data-metronome]');
const number = document.querySelector('[data-tempo]');
const message = document.querySelector('[data-metronome-message]');
const edgeButtons = document.querySelectorAll('[data-tempo-step]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const settingsButton = document.querySelector('[data-settings-open]');
const settingsDialog = document.querySelector('[data-settings-dialog]');
const beatInputs = document.querySelectorAll('[name="metronome-beats"]');
const typeInputs = document.querySelectorAll('[name="metronome-type"]');
const colorInput = document.querySelector('[data-settings-color]');
const colorValue = document.querySelector('[data-color-value]');
const soundInput = document.querySelector('[data-settings-sound]');
const conductorSvg = document.querySelector('[data-conductor]');
const conductor = new ConductorView(conductorSvg);

let tempo = DEFAULT_TEMPO;
let gesture = null;
let pointerId = null;
let suppressClick = false;
let pulse = null;
let backgroundPulse = null;
let backgroundPulseTempo = DEFAULT_TEMPO;
let edgePress = null;
let edgeRepeatTimer = null;
let conductorFrame = null;
let settings = { ...DEFAULT_SETTINGS };
try {
    settings = loadSettings(window.localStorage);
} catch (error) {
    // Private browsing can make storage unavailable; all controls still work.
}
let palette = colorPalette(settings.color);

const clock = new MetronomeClock({
    createContext: () => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) throw new Error('Web Audio is unavailable.');
        return new AudioContext({ latencyHint: 'interactive' });
    },
    onStateChange: running => {
        surface.setAttribute('aria-pressed', String(running));
        updateLabel();
        if (!running && pulse) pulse.cancel();
        if (!running && backgroundPulse) backgroundPulse.cancel();
        syncConductor();
    },
    onBeat: beat => {
        if (settings.type === 'conductor') {
            conductor.render(beat, 0);
            syncConductor();
        }
        if (reducedMotion.matches) return;
        if (backgroundPulse) backgroundPulse.cancel();
        backgroundPulseTempo = tempo;
        backgroundPulse = surface.animate([
            { backgroundColor: palette.pulse },
            { backgroundColor: settings.color },
        ], { duration: 60000 / tempo, easing: 'ease-out' });
        if (pulse) pulse.cancel();
        pulse = number.animate([
            { transform: 'scale(1.025)', opacity: 1 },
            { transform: 'scale(1)', opacity: 0.88 },
        ], { duration: 180, easing: 'ease-out' });
    },
    onError: () => {
        message.textContent = 'Sound couldn’t start. Tap to try again.';
        message.hidden = false;
    },
});

function updateLabel() {
    surface.setAttribute('aria-label', `${clock.running ? 'Stop' : 'Start'} metronome. ${tempo} beats per minute.`);
    edgeButtons.forEach(button => {
        const action = Number(button.dataset.tempoStep) > 0 ? 'Increase' : 'Decrease';
        button.setAttribute('aria-label', `${action} tempo by 1. ${tempo} beats per minute.`);
    });
}

function setTempo(value) {
    tempo = Math.round(clampTempo(value));
    number.textContent = String(tempo);
    if (backgroundPulse && backgroundPulse.playState === 'running') {
        // Keep the current fade in step with tempo changes during a swipe.
        backgroundPulse.updatePlaybackRate(tempo / backgroundPulseTempo);
    }
    clock.setTempo(tempo);
    updateLabel();
}

function toggle() {
    if (settingsDialog.open) return;
    message.hidden = true;
    if (clock.running) clock.stop();
    else clock.start({ leadIn: settings.type === 'conductor' });
}

function drawConductor() {
    conductorFrame = null;
    const position = clock.getBeatPosition();
    const progress = reducedMotion.matches ? 0 : position.progress;
    if (position.preparing) conductor.prepare(progress);
    else conductor.render(position.beat, progress);
    if (clock.running && settings.type === 'conductor' && !settingsDialog.open && !document.hidden && !reducedMotion.matches) {
        conductorFrame = requestAnimationFrame(drawConductor);
    }
}

function syncConductor() {
    if (conductorFrame !== null) cancelAnimationFrame(conductorFrame);
    conductorFrame = null;
    if (settings.type === 'conductor') drawConductor();
}

function applySettings(value, persist = true) {
    const previous = settings;
    settings = normalizeSettings(value);
    palette = colorPalette(settings.color);
    if (previous.color !== settings.color && backgroundPulse) backgroundPulse.cancel();
    document.documentElement.style.setProperty('--metronome-color', settings.color);
    document.documentElement.style.setProperty('--metronome-ink', palette.ink);
    document.querySelector('meta[name="theme-color"]').setAttribute('content', settings.color);
    surface.dataset.mode = settings.type;
    clock.setBeats(settings.beats);
    clock.setSound(settings.sound);
    if (conductor.beats !== settings.beats) conductor.setBeats(settings.beats);
    beatInputs.forEach(input => { input.checked = Number(input.value) === settings.beats; });
    typeInputs.forEach(input => { input.checked = input.value === settings.type; });
    colorInput.value = settings.color;
    colorValue.textContent = settings.color.toUpperCase();
    soundInput.value = settings.sound;
    syncConductor();
    if (persist) {
        try {
            window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        } catch (error) {
            // Settings remain usable for the current visit.
        }
    }
}

settingsButton.addEventListener('click', () => {
    stopEdgeRepeat();
    gesture = null;
    pointerId = null;
    surface.classList.remove('is-dragging');
    settingsDialog.showModal();
    settingsButton.setAttribute('aria-expanded', 'true');
    syncConductor();
});
document.querySelectorAll('[data-settings-close]').forEach(button => {
    button.addEventListener('click', () => settingsDialog.close());
});
settingsDialog.addEventListener('close', () => {
    settingsButton.setAttribute('aria-expanded', 'false');
    syncConductor();
});
beatInputs.forEach(input => input.addEventListener('change', () => {
    if (input.checked) applySettings({ ...settings, beats: Number(input.value) });
}));
typeInputs.forEach(input => input.addEventListener('change', () => {
    if (input.checked) applySettings({ ...settings, type: input.value });
}));
colorInput.addEventListener('input', () => applySettings({ ...settings, color: colorInput.value }));
soundInput.addEventListener('change', () => applySettings({ ...settings, sound: soundInput.value }));
reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
        if (pulse) pulse.cancel();
        if (backgroundPulse) backgroundPulse.cancel();
    }
    syncConductor();
});

surface.addEventListener('pointerdown', event => {
    if (settingsDialog.open || !event.isPrimary || event.button !== 0 || pointerId !== null || edgePress) return;
    pointerId = event.pointerId;
    suppressClick = false;
    gesture = new TempoGesture(tempo, event.clientX, event.clientY, event.timeStamp);
    surface.setPointerCapture(pointerId);
});

function movePointer(event) {
    if (event.pointerId !== pointerId || !gesture) return;
    setTempo(gesture.move(event.clientX, event.clientY, event.timeStamp));
    suppressClick = gesture.moved;
    surface.classList.toggle('is-dragging', gesture.moved);
}

surface.addEventListener('pointermove', movePointer);
surface.addEventListener('pointerup', event => {
    if (event.pointerId !== pointerId) return;
    movePointer(event);
    gesture = null;
    pointerId = null;
    surface.classList.remove('is-dragging');
});

function cancelGesture(event) {
    if (event.pointerId !== pointerId) return;
    suppressClick = true;
    gesture = null;
    pointerId = null;
    surface.classList.remove('is-dragging');
}

surface.addEventListener('pointercancel', cancelGesture);
surface.addEventListener('lostpointercapture', cancelGesture);
surface.addEventListener('click', event => {
    // Keyboard and assistive-technology clicks have no pointer click count.
    if (event.detail > 0 && suppressClick) {
        event.preventDefault();
        return;
    }
    toggle();
});

function stopEdgeRepeat() {
    clearTimeout(edgeRepeatTimer);
    edgeRepeatTimer = null;
    edgePress = null;
}

function repeatEdgeStep() {
    if (!edgePress) return;
    setTempo(tempo + edgePress.step);
    edgeRepeatTimer = setTimeout(repeatEdgeStep, 75);
}

edgeButtons.forEach(button => {
    const step = Number(button.dataset.tempoStep);
    button.addEventListener('pointerdown', event => {
        if (settingsDialog.open || !event.isPrimary || event.button !== 0 || pointerId !== null || edgePress) return;
        edgePress = { button, pointerId: event.pointerId, step };
        button.setPointerCapture(event.pointerId);
        setTempo(tempo + step);
        edgeRepeatTimer = setTimeout(repeatEdgeStep, 350);
    });

    const release = event => {
        if (edgePress && edgePress.button === button && edgePress.pointerId === event.pointerId) {
            stopEdgeRepeat();
        }
    };
    button.addEventListener('pointerup', release);
    button.addEventListener('pointercancel', release);
    button.addEventListener('lostpointercapture', release);
    button.addEventListener('contextmenu', event => event.preventDefault());
    button.addEventListener('click', event => {
        // Pointer presses already step immediately; keep native keyboard/AT clicks.
        if (!settingsDialog.open && event.detail === 0) setTempo(tempo + step);
    });
});

document.addEventListener('keydown', event => {
    if (settingsDialog.open || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        setTempo(tempo + (event.key === 'ArrowUp' ? 1 : -1) * (event.shiftKey ? 10 : 1));
    } else if (event.code === 'Space' || event.key === 'Enter') {
        if (event.target?.closest('[data-tempo-step], [data-settings-open]')) return;
        event.preventDefault();
        if (!event.repeat) toggle();
    } else if (event.key === 'Escape') {
        stopEdgeRepeat();
        clock.stop();
    }
});

window.addEventListener('blur', stopEdgeRepeat);
document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopEdgeRepeat();
    syncConductor();
});
window.addEventListener('pagehide', () => {
    stopEdgeRepeat();
    clock.stop();
});
applySettings(settings, false);
updateLabel();
