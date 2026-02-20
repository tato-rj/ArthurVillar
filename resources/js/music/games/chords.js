import { ChordsChallenge } from "./chords/ChordsChallenge.js";

const options = readGlobal("__challengeOptions") || {};
const clefUrls = readGlobal("__clefUrls") || null;

const game = new ChordsChallenge({
  ...options,
  clefUrls,
});

game.start();
