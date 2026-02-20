import { IntervalsChallenge } from "./intervals/IntervalsChallenge.js";

const options = readGlobal("__challengeOptions") || {};
const clefUrls = readGlobal("__clefUrls") || null;

const game = new IntervalsChallenge({
  ...options,
  clefUrls,
});

game.start();