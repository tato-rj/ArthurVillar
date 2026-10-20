import { MetronomeClock } from './metronome/clock';
import { clampTempo, DEFAULT_TEMPO, TempoGesture } from './metronome/gesture';

const surface = document.querySelector('[data-metronome]');
const number = document.querySelector('[data-tempo]');
const message = document.querySelector('[data-metronome-message]');
const edgeButtons = document.querySelectorAll('[data-tempo-step]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

let tempo = DEFAULT_TEMPO;
let gesture = null;
let pointerId = null;
let suppressClick = false;
let pulse = null;
let backgroundPulse = null;
let backgroundPulseTempo = DEFAULT_TEMPO;
let edgePress = null;
let edgeRepeatTimer = null;

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
    },
    onBeat: () => {
        if (reducedMotion.matches) return;
        if (backgroundPulse) backgroundPulse.cancel();
        backgroundPulseTempo = tempo;
        backgroundPulse = surface.animate([
            { backgroundColor: '#2f6dc2' },
            { backgroundColor: '#3f84e5' },
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
    message.hidden = true;
    if (clock.running) clock.stop();
    else clock.start();
}

surface.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0 || pointerId !== null || edgePress) return;
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
        if (!event.isPrimary || event.button !== 0 || pointerId !== null || edgePress) return;
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
        if (event.detail === 0) setTempo(tempo + step);
    });
});

document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        setTempo(tempo + (event.key === 'ArrowUp' ? 1 : -1) * (event.shiftKey ? 10 : 1));
    } else if (event.code === 'Space' || event.key === 'Enter') {
        if (event.target?.closest('[data-tempo-step]')) return;
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
});
window.addEventListener('pagehide', () => {
    stopEdgeRepeat();
    clock.stop();
});
updateLabel();
