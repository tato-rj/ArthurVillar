export function createStablePitchState() {
  return { midi: null, frequency: null, count: 0 };
}

export const PLAYED_NOTE_STABLE_FRAME_COUNT = 5;

export function isLikelyMobileDevice() {
  return window.matchMedia?.("(pointer: coarse)")?.matches ||
    /Android|iPhone|iPad|iPod/i.test(window.navigator?.userAgent || "");
}

export function frequencyToMidi(frequency) {
  return Math.round(69 + (12 * Math.log2(frequency / 440)));
}

export function updateStablePitchState(stablePitch, frequency) {
  const midi = frequencyToMidi(frequency);
  const current = stablePitch || createStablePitchState();
  const semitoneDistance = Number.isFinite(current.frequency)
    ? Math.abs(12 * Math.log2(frequency / current.frequency))
    : Infinity;

  if (midi === current.midi || semitoneDistance <= 0.45) {
    const smoothedFrequency = ((current.frequency * 0.75) + (frequency * 0.25));
    return {
      midi: frequencyToMidi(smoothedFrequency),
      frequency: smoothedFrequency,
      count: current.count + 1,
    };
  }

  return { midi, frequency, count: 1 };
}

export function detectPlayedNotePitch(buffer, sampleRate, { isMobile = isLikelyMobileDevice() } = {}) {
  const minRms = isMobile ? 0.0035 : 0.014;
  const minPeak = isMobile ? 0.012 : 0.045;
  const trimThreshold = isMobile ? 0.02 : 0.06;
  const minConfidence = isMobile ? 0.18 : 0.24;
  let rms = 0;
  let peak = 0;

  for (let i = 0; i < buffer.length; i += 1) {
    const sample = Math.abs(buffer[i]);
    rms += buffer[i] * buffer[i];
    if (sample > peak) peak = sample;
  }

  rms = Math.sqrt(rms / buffer.length);
  if (rms < minRms || peak < minPeak) return null;

  let start = 0;
  let end = buffer.length - 1;

  for (let i = 0; i < buffer.length / 2; i += 1) {
    if (Math.abs(buffer[i]) < trimThreshold) {
      start = i;
      break;
    }
  }

  for (let i = 1; i < buffer.length / 2; i += 1) {
    if (Math.abs(buffer[buffer.length - i]) < trimThreshold) {
      end = buffer.length - i;
      break;
    }
  }

  const trimmed = buffer.slice(start, end);
  const trimmedSize = trimmed.length;
  if (trimmedSize < 32) return null;

  const minLag = Math.max(1, Math.floor(sampleRate / 2000));
  const maxLag = Math.min(trimmedSize - 1, Math.ceil(sampleRate / 40));
  const correlations = new Array(maxLag + 1).fill(0);
  let zeroLag = 0;

  for (let i = 0; i < trimmedSize; i += 1) {
    zeroLag += trimmed[i] * trimmed[i];
  }

  if (zeroLag <= 0) return null;

  for (let lag = minLag; lag <= maxLag; lag += 1) {
    for (let i = 0; i < trimmedSize - lag; i += 1) {
      correlations[lag] += trimmed[i] * trimmed[i + lag];
    }
  }

  let maxValue = -Infinity;
  let maxPosition = -1;
  for (let i = minLag; i <= maxLag; i += 1) {
    if (correlations[i] > maxValue) {
      maxValue = correlations[i];
      maxPosition = i;
    }
  }

  if (maxPosition <= 0) return null;
  const confidence = maxValue / zeroLag;
  if (confidence < minConfidence) return null;

  const x1 = correlations[maxPosition - 1] || 0;
  const x2 = correlations[maxPosition] || 0;
  const x3 = correlations[maxPosition + 1] || 0;
  const divisor = (2 * x2) - x1 - x3;
  const shift = divisor ? (x3 - x1) / (2 * divisor) : 0;
  const frequency = sampleRate / (maxPosition + shift);

  if (!Number.isFinite(frequency) || frequency < 40 || frequency > 2000) return null;

  return { frequency };
}
