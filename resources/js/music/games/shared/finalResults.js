export function renderFinalResultsOverlay({
  $finalOverlay,
  rounds = 0,
  score = 0,
  accuracy = 0,
  durationSec = 0,
  clearCountupTimers = null,
  countupTimers = null,
  animateMetrics = null,
  playFinalSfx = null,
}) {
  if (!$finalOverlay || !$finalOverlay.length) return;

  const CountUpCtor = window?.CountUp?.CountUp;
  const DURATION = 3.5;

  if (typeof clearCountupTimers === "function") clearCountupTimers();

  const setMetricAnimationDelays = () => {
    const $boxes = $finalOverlay.find("#metrics-boxes > div");
    if (!$boxes.length) return;
    const BASE_DELAY_MS = 260;
    const STEP_DELAY_MS = 260;
    $boxes.each((i, el) => {
      const delayMs = BASE_DELAY_MS + (i * STEP_DELAY_MS);
      el.style.animationDelay = `${delayMs}ms`;
    });
  };

  const mmss = (secs) => {
    const v = Math.max(0, Math.floor(Number(secs) || 0));
    const mm = String(Math.floor(v / 60)).padStart(2, "0");
    const ss = String(v % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const setSaveResultField = (name, value) => {
    const $input = $(`#save-results-modal input[name="${name}"]`).first();
    if (!$input.length) return;
    $input.val(String(value ?? "").trim());
  };

  const pushCountupTimer = (id) => {
    if (Array.isArray(countupTimers)) countupTimers.push(id);
  };

  const countTo = (selector, endVal, opts = {}) => {
    const el = $finalOverlay.find(selector)[0];
    if (!el) return;

    const startCount = () => {
      if (!CountUpCtor) {
        el.textContent =
          String(opts.formattingFn ? opts.formattingFn(endVal) : endVal) + (opts.suffix || "");
        return;
      }

      const c = new CountUpCtor(el, endVal, { duration: DURATION, ...opts });
      if (!c.error) c.start();
    };

    const $box = $(el).closest("#metrics-boxes > div");
    const rawDelay = $box.length ? parseFloat($box[0].style.animationDelay || "0") : 0;
    const delayMs = Number.isFinite(rawDelay) ? Math.max(0, rawDelay) : 0;
    if (delayMs <= 0) {
      startCount();
      return;
    }

    const tid = setTimeout(startCount, delayMs + 40);
    pushCountupTimer(tid);
  };

  const $greeting = $finalOverlay.find("#result-greeting");
  const $greetingTitle = $greeting.find("h1");
  const $resultImg = $finalOverlay.find("img").first();
  const resultGreetings = {
    encouraging: [
      "Keep going!",
      "Nice try!",
      "You are learning!",
      "Getting there!",
      "Good effort!",
      "Keep practicing!",
      "Almost there!",
      "Let's try that again!",
      "Try another round!",
      "You are getting closer!",
    ],
    strong: [
      "Great job!",
      "Well done!",
      "Nice work!",
      "Good one!",
      "Solid round!",
      "Looking good!",
      "You did it!",
      "That was good!",
      "Way to go!",
      "Good progress!",
    ],
    excellent: [
      "You got it!",
      "Impressive!",
      "Fantastic!",
      "Excellent!",
      "Nailed it!",
      "Brilliant!",
      "Outstanding!",
      "Amazing round!",
      "That was sharp!",
      "Top notch!",
    ],
  };
  const randomFrom = (items) => items[Math.floor(Math.random() * items.length)];
  const resultGreeting =
    accuracy < 50
      ? randomFrom(resultGreetings.encouraging)
      : accuracy <= 80
        ? randomFrom(resultGreetings.strong)
        : randomFrom(resultGreetings.excellent);

  if (accuracy < 50) {
    $greetingTitle.text(resultGreeting);
    if ($resultImg.length) {
      const cur = String($resultImg.attr("src") || "");
      if (cur.includes("trophy.svg")) $resultImg.attr("src", cur.replace("trophy.svg", "plant.svg"));
    }
  } else {
    $greetingTitle.text(resultGreeting);
    if ($resultImg.length) {
      const cur = String($resultImg.attr("src") || "");
      if (cur.includes("plant.svg")) $resultImg.attr("src", cur.replace("plant.svg", "trophy.svg"));
    }
  }

  $finalOverlay.show();

  const Confetti = window?.Confetti || window?.confetti;
  if (typeof Confetti === "function") {
    Confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      zIndex: 1001,
    });
  }

  if (typeof animateMetrics === "function") animateMetrics();
  else setMetricAnimationDelays();

  countTo('span[name="rounds"]', rounds);
  countTo('span[name="score"]', score);
  countTo('span[name="accuracy"]', accuracy, { suffix: "%" });
  countTo('span[name="duration"]', durationSec, { formattingFn: mmss });

  setSaveResultField("rounds", rounds);
  setSaveResultField("score", score);
  setSaveResultField("accuracy", `${accuracy}%`);
  setSaveResultField("duration", mmss(durationSec));

  if (typeof playFinalSfx === "function") playFinalSfx();
}
