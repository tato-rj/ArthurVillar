import { BeatHero } from "./beathero/BeatHero.js";

const options = readGlobal("__challengeOptions") || {};
const clefUrls = readGlobal("__clefUrls") || null;

const game = new BeatHero({
  ...options,
  clefUrls,
});

game.start?.();
