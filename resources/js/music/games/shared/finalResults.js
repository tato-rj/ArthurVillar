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
  const $greetingSubtitle = $greeting.find("h6");
  const $resultImg = $finalOverlay.find("img").first();
  const defaultTitle = "Great job!";
  const defaultSubtitle = "It's not about getting the most points, but if it was...";

  if (accuracy < 50) {
    $greetingTitle.text("Keep going!");
    $greetingSubtitle.text("That round was tough, but your next one can be much better.");
    if ($resultImg.length) {
      const cur = String($resultImg.attr("src") || "");
      if (cur.includes("trophy.svg")) $resultImg.attr("src", cur.replace("trophy.svg", "plant.svg"));
    }
  } else {
    $greetingTitle.text(defaultTitle);
    $greetingSubtitle.text(defaultSubtitle);
    if ($resultImg.length) {
      const cur = String($resultImg.attr("src") || "");
      if (cur.includes("plant.svg")) $resultImg.attr("src", cur.replace("plant.svg", "trophy.svg"));
    }
  }

  $finalOverlay.show();

  if (typeof animateMetrics === "function") animateMetrics();
  else setMetricAnimationDelays();

  countTo('span[name="rounds"]', rounds);
  countTo('span[name="score"]', score);
  countTo('span[name="accuracy"]', accuracy, { suffix: "%" });
  countTo('span[name="duration"]', durationSec, { formattingFn: mmss });

  if (typeof playFinalSfx === "function") playFinalSfx();
}

