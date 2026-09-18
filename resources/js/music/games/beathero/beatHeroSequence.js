export function buildBeatHeroSequence({
  pool,
  count,
  shuffle,
  previousIds = [],
} = {}) {
  const figures = Array.isArray(pool) ? pool : [];
  const targetCount = Math.max(0, Math.floor(Number(count) || 0));
  if (!figures.length || !targetCount) return [];

  const sequence = [];
  while (sequence.length < targetCount) sequence.push(...shuffle(figures));
  const answer = sequence.slice(0, targetCount);
  const repeatsPrevious = answer.length === previousIds.length
    && answer.every((figure, index) => figure.id === previousIds[index]);

  // Figure settings always contain at least two unique choices, and each
  // shuffled block starts with unique figures. Swapping these two preserves
  // the generated material while guaranteeing a different sequence order.
  if (repeatsPrevious && answer.length > 1) {
    [answer[0], answer[1]] = [answer[1], answer[0]];
  }

  return answer;
}
