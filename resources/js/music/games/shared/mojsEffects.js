export function playBurstConfettiAtElement(targetEl, {
  parentEl = document.body,
  index = 0,
} = {}) {
  const mojs = window.mojs;
  if (!mojs || !targetEl) return;

  const parentRect = parentEl.getBoundingClientRect();
  const rect = targetEl.getBoundingClientRect();
  const x = (rect.left - parentRect.left) + (rect.width / 2);
  const y = (rect.top - parentRect.top) + (rect.height / 2);
  const countBoost = Math.min(18, Math.max(0, Number(index) || 0));

  const burst = new mojs.Burst({
    parent: parentEl,
    left: 0,
    top: 0,
    radius: { 6: 56 },
    angle: 45,
    count: 22 + countBoost,
    zIndex: 5,
    children: {
      radius: "rand(3,6)",
      fill: "#ffe54c",
      scale: { 2: 0, easing: "quad.in" },
      pathScale: [1.8, null],
      degreeShift: [13, null],
      duration: [500, 760],
      easing: "quint.out",
      isForce3d: true,
    },
  });

  burst
    .tune({ x, y })
    .replay();
}

const smokeBurstCache = new WeakMap();

function _getSmokeBurst(parentEl) {
  const mojs = window.mojs;
  if (!mojs || !mojs.Burst || !parentEl) return null;

  const cached = smokeBurstCache.get(parentEl);
  if (cached) return cached;

  const DURATION = 400;
  const smoke = new mojs.Burst({
    parent: parentEl,
    left: 0,
    top: 0,
    degree: 0,
    count: 3,
    radius: { 0: 100 },
    children: {
      fill: "black",
      pathScale: "rand(0.5, 1)",
      radius: "rand(12, 15)",
      swirlSize: "rand(10, 15)",
      swirlFrequency: "rand(2, 4)",
      direction: [1, -1],
      duration: `rand(${1 * DURATION}, ${2 * DURATION})`,
      delay: "rand(0, 75)",
      easing: "quad.out",
      isSwirl: true,
      isForce3d: true,
    },
  });

  smokeBurstCache.set(parentEl, smoke);
  return smoke;
}

export function playSmokePuffAtElement(targetEl, { parentEl = document.body } = {}) {
  const mojs = window.mojs;
  if (!mojs || !targetEl || !parentEl) return;

  const parentRect = parentEl.getBoundingClientRect();
  const rect = targetEl.getBoundingClientRect();
  const x = (rect.left - parentRect.left) + (rect.width / 2);
  const y = (rect.top - parentRect.top) + (rect.height / 2);

  const smoke = _getSmokeBurst(parentEl);
  if (!smoke) return;

  smoke
    .tune({ x, y })
    .generate()
    .replay();
}
