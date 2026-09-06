import * as THREE from 'three';

// All motion is applied from resting transforms, so repeated demos never drift.
export function createPianoAnimation(groups, reducedMotion, upright = false) {
    const pedals = { 'una-corda': false, sustain: false, ...(upright ? { practice: false } : { sostenuto: false }) };
    const amounts = { 'una-corda': 0, sustain: 0, sostenuto: 0, practice: 0 };
    const notes = new Map();
    const voices = new Set();
    let capturedNote = 60;
    let lastNote = 60;
    let audio;
    const moving = [];
    const action = new Set(['white-keys', 'black-keys', 'key-levers', 'wippens', 'shanks', 'hammers']);
    groups.forEach((group, id) => {
        if (!action.has(id) && id !== 'dampers' && id !== 'damper-rail' && !(id in pedals) && id !== 'soft-pedal' && id !== 'practice-felt') return;
        group.children.forEach(mesh => moving.push({ mesh, id, position: mesh.position.clone(), rotation: mesh.rotation.clone() }));
    });

    // A struck, slightly inharmonic string bank gives a self-contained piano-like tone.
    // Audio is created only in response to a click and requires no downloads.
    async function sound(midi) {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            audio = audio || new AudioContext();
            await audio.resume();
            if (voices.size >= 16) stopVoice(voices.values().next().value);
            const now = audio.currentTime;
            const gain = audio.createGain();
            gain.connect(audio.destination);
            gain.gain.setValueAtTime((pedals['una-corda'] ? .045 : .07) * (pedals.practice ? .18 : 1), now);
            const voice = { midi, gain, oscillators: [], released: false };
            voices.add(voice);
            const fundamental = 440 * Math.pow(2, (midi - 69) / 12);
            for (let harmonic = 1; harmonic <= 7; harmonic++) {
                const frequency = fundamental * harmonic * Math.sqrt(1 + .00012 * harmonic * harmonic);
                if (frequency > audio.sampleRate * .45) continue;
                const oscillator = audio.createOscillator();
                const envelope = audio.createGain();
                oscillator.frequency.value = frequency;
                oscillator.connect(envelope); envelope.connect(gain);
                const strength = Math.pow(harmonic, pedals.practice ? -3 : pedals['una-corda'] ? -2 : -1.5);
                envelope.gain.setValueAtTime(0, now);
                envelope.gain.linearRampToValueAtTime(strength, now + .006);
                envelope.gain.exponentialRampToValueAtTime(.0001, now + 5 / Math.sqrt(harmonic));
                oscillator.start(now); oscillator.stop(now + 5.1);
                oscillator.onended = () => { oscillator.disconnect(); envelope.disconnect(); };
                voice.oscillators.push(oscillator);
            }
            setTimeout(() => { gain.disconnect(); voices.delete(voice); }, 5300);
        } catch (error) {
            console.warn('Piano audio is unavailable:', error);
        }
    }
    function stopVoice(voice) {
        if (voice.released) return;
        voice.released = true;
        voice.gain.gain.setTargetAtTime(0, audio.currentTime, .065);
    }
    function held(midi) {
        return pedals.sustain || (pedals.sostenuto && midi === capturedNote) || midi >= 90;
    }
    function play(midi = lastNote) {
        lastNote = midi;
        notes.set(midi, performance.now());
        sound(midi);
    }
    function togglePedal(id) {
        if (!(id in pedals)) return;
        pedals[id] = !pedals[id];
        if (id === 'sostenuto' && pedals[id]) {
            // Demonstrate one note being played, then caught by the middle pedal.
            capturedNote = Math.min(lastNote, 89);
            play(capturedNote);
        }
    }
    function update(now, delta) {
        const alpha = reducedMotion ? 1 : 1 - Math.exp(-delta * 14);
        Object.keys(pedals).forEach(id => { amounts[id] = THREE.MathUtils.lerp(amounts[id], Number(pedals[id]), alpha); });
        voices.forEach(voice => {
            if (now - (notes.get(voice.midi) ?? -Infinity) > 450 && !held(voice.midi)) stopVoice(voice);
        });
        moving.forEach(({ mesh, id, position, rotation }) => {
            mesh.position.copy(position); mesh.rotation.copy(rotation);
            const midi = mesh.userData.midi;
            const age = (now - (notes.get(midi) ?? -Infinity)) / 1000;
            const press = age < .45 ? Math.min(age / .05, 1) : Math.max(0, 1 - (age - .45) / .15);
            if (action.has(id) && !upright) mesh.position.x += .022 * amounts['una-corda'];
            if (upright && (id === 'hammers' || id === 'shanks')) mesh.position.z -= .045 * amounts['una-corda'];
            if (id === 'white-keys' || id === 'black-keys') {
                // Rotate around the rear of the visible key, depressing its front.
                const angle = .065 * press;
                const arm = id === 'white-keys' ? .22 : .16;
                mesh.rotation.x += angle;
                mesh.position.y -= Math.sin(angle) * arm;
                mesh.position.z += (Math.cos(angle) - 1) * arm;
            }
            if (id === 'key-levers' || id === 'wippens') mesh.position.y += .025 * press;
            if (id === 'hammers' || id === 'shanks') {
                const strike = age < .16 ? Math.sin(Math.max(0, age) / .16 * Math.PI) : 0;
                if (upright) mesh.position.z -= .07 * (1 - .55 * amounts.practice) * strike;
                else mesh.position.y += .035 * strike;
            }
            if (id === 'dampers') {
                const lift = Math.max(press, amounts.sustain, midi === capturedNote ? amounts.sostenuto : 0);
                if (upright) mesh.position.z += .07 * lift;
                else mesh.position.y += .09 * lift;
            }
            if (id === 'practice-felt') mesh.position.y -= .26 * amounts.practice;
            if (id === 'damper-rail') mesh.position.y += .045 * amounts.sustain;
            const pedalId = id === 'soft-pedal' ? 'una-corda' : id;
            if (pedalId in pedals) {
                // The first mesh is the pedal; the connecting rod translates with it.
                mesh.position.y -= .025 * amounts[pedalId];
                if (mesh === groups.get(id).children[0]) mesh.rotation.x += .13 * amounts[pedalId];
            }
        });
        notes.forEach((start, midi) => { if (now - start > 1500) notes.delete(midi); });
    }
    function reset() {
        Object.keys(pedals).forEach(id => { pedals[id] = false; amounts[id] = 0; });
        notes.clear(); voices.forEach(stopVoice);
    }
    return { play, togglePedal, update, reset, pedals };
}
