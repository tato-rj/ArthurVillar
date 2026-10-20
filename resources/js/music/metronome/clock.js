import { clampTempo, DEFAULT_TEMPO } from './gesture';
import { SOUND_PROFILES } from './settings';

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
        this.beatSpan = 1;
        this.beatsPerBar = 1;
        this.sound = 'click';
        this.nextBeatIndex = 0;
        this.lastBeatIndex = null;
    }

    async start({ leadInBeats = 0 } = {}) {
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
            this.beatSpan = leadInBeats || 1;
            this.beatAnchor = leadInBeats ? this.context.currentTime : null;
            this.nextBeatIndex = 0;
            this.lastBeatIndex = null;
            this.nextBeatTime = this.context.currentTime + (leadInBeats ? leadInBeats * 60 / this.tempo : 0.02);
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
        this.lastBeatIndex = null;
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
        if (this.beatAnchor === null && this.beats.length) this.nextBeatTime = this.beats[0].time;
        for (const note of this.notes) {
            if (note.time > now) this.cancelNote(note);
        }
        this.beats = [];
        this.nextBeatIndex = this.lastBeatIndex === null ? 0 : (this.lastBeatIndex + 1) % this.beatsPerBar;

        // Preserve the progress through this beat when tempo changes mid-swipe.
        if (this.beatAnchor !== null) {
            const progress = Math.min(1, Math.max(0, (now - this.beatAnchor) / (this.beatSpan * 60 / previousTempo)));
            const interval = this.beatSpan * 60 / tempo;
            this.beatAnchor = now - progress * interval;
            this.nextBeatTime = now + (1 - progress) * interval;
        }
        this.schedule();
    }

    setBeats(value) {
        if (![1, 2, 3, 4].includes(value) || value === this.beatsPerBar) return;
        this.beatsPerBar = value;
        this.reschedulePending(true);
    }

    setSound(value) {
        if (!Object.prototype.hasOwnProperty.call(SOUND_PROFILES, value) || value === this.sound) return;
        this.sound = value;
        this.reschedulePending();
    }

    reschedulePending(restartBar = false) {
        if (!this.ready) return;
        const now = this.context.currentTime;
        this.updateBeat(now);
        if (this.beats.length) this.nextBeatTime = this.beats[0].time;
        for (const note of this.notes) {
            if (note.time > now) this.cancelNote(note);
        }
        this.beats = [];
        this.nextBeatIndex = restartBar || this.lastBeatIndex === null
            ? 0 : (this.lastBeatIndex + 1) % this.beatsPerBar;
        if (restartBar) this.lastBeatIndex = null;
        this.schedule();
    }

    getBeatPosition() {
        const now = this.ready ? this.context.currentTime : 0;
        let beat = this.lastBeatIndex;
        let anchor = this.beatAnchor;
        let span = this.beatSpan;
        // A click can occur between scheduler ticks. Render from its actual audio
        // time immediately instead of holding the dot at the end of the stroke.
        for (const queued of this.beats) {
            if (queued.time > now) break;
            beat = queued.index;
            anchor = queued.time;
            span = 1;
        }
        return {
            beat: beat ?? this.beatsPerBar - 1,
            preparing: beat === null,
            progress: this.ready && anchor !== null
                ? Math.min(1, Math.max(0, (now - anchor) / (span * 60 / this.tempo)))
                : 0,
        };
    }

    updateBeat(now) {
        let played = false;
        while (this.beats.length && this.beats[0].time <= now) {
            const beat = this.beats.shift();
            this.beatAnchor = beat.time;
            this.beatSpan = 1;
            this.lastBeatIndex = beat.index;
            played = true;
        }
        if (played) this.onBeat(this.lastBeatIndex);
    }

    schedule() {
        if (!this.ready) return;
        const now = this.context.currentTime;
        this.updateBeat(now);

        // Schedule against the audio clock, so rendering cannot move the clicks.
        // If a tab was stalled, resume once instead of replaying missed beats.
        if (this.nextBeatTime < now) this.nextBeatTime = now + 0.01;
        while (this.nextBeatTime < now + 0.1) {
            this.playClick(this.nextBeatTime, this.nextBeatIndex);
            this.beats.push({ time: this.nextBeatTime, index: this.nextBeatIndex });
            this.nextBeatIndex = (this.nextBeatIndex + 1) % this.beatsPerBar;
            this.nextBeatTime += 60 / this.tempo;
        }
    }

    playClick(time, beatIndex) {
        const profile = SOUND_PROFILES[this.sound];
        const pitch = beatIndex === 0 ? 1 : 0.82;
        const gain = this.context.createGain();
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(profile.volume / profile.ratios.length, time + 0.001);
        gain.gain.exponentialRampToValueAtTime(0.001, time + profile.duration - 0.005);
        gain.connect(this.context.destination);

        const oscillators = profile.ratios.map(ratio => {
            const oscillator = this.context.createOscillator();
            oscillator.type = profile.type;
            const frequency = profile.frequency * pitch * ratio;
            oscillator.frequency.setValueAtTime(frequency, time);
            oscillator.frequency.exponentialRampToValueAtTime(frequency * profile.end, time + profile.duration - 0.01);
            oscillator.connect(gain);
            return oscillator;
        });
        const note = { oscillators, gain, time };
        this.notes.add(note);
        let remaining = oscillators.length;
        oscillators.forEach(oscillator => {
            oscillator.onended = () => {
                oscillator.disconnect();
                if (--remaining === 0) {
                    gain.disconnect();
                    this.notes.delete(note);
                }
            };
            oscillator.start(time);
            oscillator.stop(time + profile.duration);
        });
    }

    cancelNote(note) {
        note.oscillators.forEach(oscillator => {
            oscillator.stop();
            oscillator.disconnect();
        });
        note.gain.disconnect();
        this.notes.delete(note);
    }
}
