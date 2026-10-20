import { clampTempo, DEFAULT_TEMPO } from './gesture';

export class MetronomeClock {
    constructor({ createContext, onStateChange, onBeat, onError }) {
        this.createContext = createContext;
        this.onStateChange = onStateChange;
        this.onBeat = onBeat;
        this.onError = onError;
        this.tempo = DEFAULT_TEMPO;
        this.running = false;
        this.ready = false;
        this.generation = 0;
        this.context = null;
        this.timer = null;
        this.notes = new Set();
        this.beats = [];
        this.beatAnchor = null;
    }

    async start() {
        if (this.running) return;
        const generation = ++this.generation;
        this.running = true;
        this.onStateChange(true);

        try {
            if (!this.context || this.context.state === 'closed') {
                this.context = this.createContext();
                this.context.onstatechange = () => {
                    if (this.ready && this.context.state !== 'running') this.stop();
                };
            }
            await this.context.resume();
            // A second tap can stop playback while the browser unlocks audio.
            if (!this.running || generation !== this.generation) return;
            if (this.context.state !== 'running') throw new Error('Audio is unavailable.');

            this.ready = true;
            this.beatAnchor = null;
            this.nextBeatTime = this.context.currentTime + 0.02;
            this.schedule();
            this.timer = setInterval(() => this.schedule(), 25);
        } catch (error) {
            if (generation !== this.generation) return;
            this.stop();
            this.onError(error);
        }
    }

    stop() {
        this.generation++;
        this.running = false;
        this.ready = false;
        clearInterval(this.timer);
        this.timer = null;
        for (const note of this.notes) this.cancelNote(note);
        this.beats = [];
        this.beatAnchor = null;
        this.onStateChange(false);
    }

    setTempo(value) {
        const tempo = Math.round(clampTempo(value));
        if (tempo === this.tempo) return;
        const previousTempo = this.tempo;
        this.tempo = tempo;
        if (!this.ready) return;

        const now = this.context.currentTime;
        this.updateBeat(now);
        for (const note of this.notes) {
            if (note.time > now) this.cancelNote(note);
        }
        this.beats = [];

        // Preserve the progress through this beat when tempo changes mid-swipe.
        if (this.beatAnchor !== null) {
            const progress = Math.min(1, Math.max(0, (now - this.beatAnchor) / (60 / previousTempo)));
            const interval = 60 / tempo;
            this.beatAnchor = now - progress * interval;
            this.nextBeatTime = now + (1 - progress) * interval;
        }
        this.schedule();
    }

    updateBeat(now) {
        let played = false;
        while (this.beats.length && this.beats[0] <= now) {
            this.beatAnchor = this.beats.shift();
            played = true;
        }
        if (played) this.onBeat();
    }

    schedule() {
        if (!this.ready) return;
        const now = this.context.currentTime;
        this.updateBeat(now);

        // Schedule against the audio clock, so rendering cannot move the clicks.
        // If a tab was stalled, resume once instead of replaying missed beats.
        if (this.nextBeatTime < now) this.nextBeatTime = now + 0.01;
        while (this.nextBeatTime < now + 0.1) {
            this.playClick(this.nextBeatTime);
            this.beats.push(this.nextBeatTime);
            this.nextBeatTime += 60 / this.tempo;
        }
    }

    playClick(time) {
        const oscillator = this.context.createOscillator();
        const gain = this.context.createGain();
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(1400, time);
        oscillator.frequency.exponentialRampToValueAtTime(700, time + 0.025);
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.4, time + 0.001);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.03);
        oscillator.connect(gain);
        gain.connect(this.context.destination);

        const note = { oscillator, gain, time };
        this.notes.add(note);
        oscillator.onended = () => {
            oscillator.disconnect();
            gain.disconnect();
            this.notes.delete(note);
        };
        oscillator.start(time);
        oscillator.stop(time + 0.035);
    }

    cancelNote(note) {
        note.oscillator.stop();
        note.oscillator.disconnect();
        note.gain.disconnect();
        this.notes.delete(note);
    }
}
