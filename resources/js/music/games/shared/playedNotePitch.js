export function createStablePitchState() {
  return { midi: null, frequency: null, count: 0, samples: [], settled: false };
}

export const PLAYED_NOTE_STABLE_DURATION_MS = 700;
const MIN_STABLE_SAMPLES = 5;
const MAX_SAMPLE_GAP_MS = 250;
const MAX_PITCH_SPREAD_CENTS = 70;
const MAX_PITCH_DRIFT_CENTS = 25;

export function isLikelyMobileDevice() {
  return window.matchMedia?.("(pointer: coarse)")?.matches ||
    /Android|iPhone|iPad|iPod/i.test(window.navigator?.userAgent || "");
}

export function frequencyToMidi(frequency) {
  return Math.round(69 + (12 * Math.log2(frequency / 440)));
}

export function updateStablePitchState(stablePitch, frequency, timestamp = performance.now()) {
  if (!Number.isFinite(frequency) || frequency <= 0 || !Number.isFinite(timestamp)) {
    return createStablePitchState();
  }

  const current = stablePitch || createStablePitchState();
  const previousSamples = current.samples || [];
  const lastSample = previousSamples[previousSamples.length - 1];
  if (lastSample?.timestamp === timestamp) return current;
  const gap = lastSample ? timestamp - lastSample.timestamp : Infinity;
  const samples = gap > 0 && gap <= MAX_SAMPLE_GAP_MS ? [...previousSamples] : [];
  samples.push({ cents: 1200 * Math.log2(frequency / 440), timestamp });

  // Keep one sample at the start of the time window, independent of frame rate.
  while (samples.length > MIN_STABLE_SAMPLES && timestamp - samples[1].timestamp >= PLAYED_NOTE_STABLE_DURATION_MS) {
    samples.shift();
  }
  // A changed note or a wide glide starts a fresh settling window.
  while (samples.length > 1) {
    const pitches = samples.map(sample => sample.cents);
    if (Math.max(...pitches) - Math.min(...pitches) <= MAX_PITCH_SPREAD_CENTS) break;
    samples.shift();
  }

  const sortedPitches = samples.map(sample => sample.cents).sort((a, b) => a - b);
  const middle = Math.floor(sortedPitches.length / 2);
  const medianCents = sortedPitches.length % 2
    ? sortedPitches[middle]
    : (sortedPitches[middle - 1] + sortedPitches[middle]) / 2;
  const settledFrequency = 440 * (2 ** (medianCents / 1200));
  const duration = timestamp - samples[0].timestamp;
  let settled = duration >= PLAYED_NOTE_STABLE_DURATION_MS && samples.length >= MIN_STABLE_SAMPLES;

  if (settled) {
    // A narrow range alone can still be a slow slide. Measure its overall drift
    // while allowing small oscillations (such as vibrato) around a steady note.
    const meanTime = samples.reduce((sum, sample) => sum + sample.timestamp - samples[0].timestamp, 0) / samples.length;
    const meanPitch = samples.reduce((sum, sample) => sum + sample.cents, 0) / samples.length;
    let covariance = 0;
    let timeVariance = 0;
    for (const sample of samples) {
      const timeOffset = sample.timestamp - samples[0].timestamp - meanTime;
      covariance += timeOffset * (sample.cents - meanPitch);
      timeVariance += timeOffset ** 2;
    }
    const drift = timeVariance > 0 ? (covariance / timeVariance) * duration : Infinity;
    settled = Math.abs(drift) <= MAX_PITCH_DRIFT_CENTS;
  }

  return {
    midi: frequencyToMidi(settledFrequency),
    frequency: settledFrequency,
    count: samples.length,
    samples,
    settled,
  };
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
