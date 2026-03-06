import { IntervalsLab } from "./intervalslab/IntervalsLab.js";

const options = readGlobal("__challengeOptions") || {};
const clefUrls = readGlobal("__clefUrls") || null;

const game = new IntervalsLab({
  ...options,
  clefUrls,
});

game.start();