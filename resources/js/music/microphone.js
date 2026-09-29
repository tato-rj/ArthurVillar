import {
  createStablePitchState,
  detectPlayedNotePitch,
  frequencyToMidi,
  inputLevel,
  updateStablePitchState,
} from "./games/shared/playedNotePitch.js";

const form = document.getElementById("microphone-settings");

if (form) {
  const sensitivity = document.getElementById("mic-sensitivity");
  const settle = document.getElementById("mic-settle-ms");
  const sensitivityValue = document.getElementById("mic-sensitivity-value");
  const settleValue = document.getElementById("mic-settle-value");
  const toggle = document.getElementById("mic-test-toggle");
  const status = document.getElementById("mic-test-status");
  const currentNote = document.getElementById("mic-current-note");
  const capturedNote = document.getElementById("mic-captured-note");
  const levelMeter = document.getElementById("mic-level-meter");
  const levelBar = document.getElementById("mic-level-bar");
  const save = document.getElementById("mic-save");
  const saveStatus = document.getElementById("mic-save-status");
  const names = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
  let stream = null;
  let context = null;
  let analyser = null;
  let data = null;
  let frame = null;
  let requestId = 0;
  let stable = createStablePitchState();

  const noteName = frequency => {
    const midi = frequencyToMidi(frequency);
    return `${names[((midi % 12) + 12) % 12]}${Math.floor(midi / 12) - 1}`;
  };

  const showValues = () => {
    sensitivityValue.textContent = `${sensitivity.value}%`;
    settleValue.textContent = `${(Number(settle.value) / 1000).toFixed(1)} seconds`;
    stable = createStablePitchState();
    saveStatus.textContent = "Unsaved changes";
  };
  sensitivity.addEventListener("input", showValues);
  settle.addEventListener("input", showValues);

  const stop = () => {
    requestId += 1;
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    stream?.getTracks().forEach(track => track.stop());
    context?.close();
    stream = null;
    context = null;
    analyser = null;
    data = null;
    stable = createStablePitchState();
    toggle.textContent = "Start listening";
    toggle.disabled = false;
    levelBar.style.width = "0%";
    levelMeter.setAttribute("aria-valuenow", "0");
  };

  const listen = () => {
    if (!analyser || !context) return;
    analyser.getFloatTimeDomainData(data);
    const { rms } = inputLevel(data);
    const level = Math.min(100, Math.round(rms * 10000));
    levelBar.style.width = `${level}%`;
    levelMeter.setAttribute("aria-valuenow", String(level));

    const pitch = detectPlayedNotePitch(data, context.sampleRate, { sensitivity: Number(sensitivity.value) });
    if (pitch) {
      stable = updateStablePitchState(stable, pitch.frequency, context.currentTime * 1000, Number(settle.value));
      currentNote.textContent = noteName(pitch.frequency);
      if (stable.settled) {
        capturedNote.textContent = noteName(stable.frequency);
        status.textContent = `Captured ${capturedNote.textContent}. Keep playing to test another note.`;
      } else {
        status.textContent = "Hearing a note. Waiting for a steady pitch…";
      }
    } else {
      stable = createStablePitchState();
      currentNote.textContent = "—";
      status.textContent = "Listening… Play or sing a note at your normal volume.";
    }
    frame = requestAnimationFrame(listen);
  };

  toggle.addEventListener("click", async () => {
    if (stream || context) {
      stop();
      status.textContent = "Microphone stopped.";
      return;
    }
    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia || !(window.AudioContext || window.webkitAudioContext)) {
      status.textContent = "Microphone unavailable. Use HTTPS or localhost in a browser with microphone access.";
      return;
    }

    const id = ++requestId;
    toggle.disabled = true;
    status.textContent = "Connecting to the microphone…";
    try {
      const opened = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: true },
      });
      if (id !== requestId) {
        opened.getTracks().forEach(track => track.stop());
        return;
      }
      stream = opened;
      const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
      context = new AudioContextCtor();
      await context.resume?.();
      if (id !== requestId) return;
      const source = context.createMediaStreamSource(stream);
      analyser = context.createAnalyser();
      analyser.fftSize = 8192;
      data = new Float32Array(analyser.fftSize);
      source.connect(analyser);
      toggle.textContent = "Stop listening";
      toggle.disabled = false;
      status.textContent = "Listening… Play or sing a note at your normal volume.";
      listen();
    } catch (error) {
      if (id !== requestId) return;
      stop();
      status.textContent = "Microphone access failed. Allow microphone access and try again.";
    }
  });

  window.addEventListener("pagehide", stop);

  form.addEventListener("submit", async event => {
    event.preventDefault();
    save.disabled = true;
    sensitivity.disabled = true;
    settle.disabled = true;
    saveStatus.textContent = "Saving…";
    try {
      const response = await fetch(form.dataset.saveUrl, {
        method: "PATCH",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content,
        },
        body: JSON.stringify({ sensitivity: Number(sensitivity.value), settleMs: Number(settle.value) }),
      });
      if (!response.ok) throw new Error(`Save failed (${response.status})`);
      const { settings } = await response.json();
      sensitivity.value = settings.sensitivity;
      settle.value = settings.settleMs;
      sensitivityValue.textContent = `${settings.sensitivity}%`;
      settleValue.textContent = `${(settings.settleMs / 1000).toFixed(1)} seconds`;
      saveStatus.textContent = "Saved. Your games will use these settings.";
    } catch (error) {
      saveStatus.textContent = "Could not save. Please try again.";
    } finally {
      save.disabled = false;
      sensitivity.disabled = false;
      settle.disabled = false;
    }
  });
}
