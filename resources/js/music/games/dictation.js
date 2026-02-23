import { DictationChallenge } from "./dictation/DictationChallenge.js";

const options = readGlobal("__challengeOptions") || {};
const clefUrls = readGlobal("__clefUrls") || null;

const game = new DictationChallenge({
  ...options,
  clefUrls,
});

game.start();