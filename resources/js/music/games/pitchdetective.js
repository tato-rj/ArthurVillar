import { PitchDetective } from "./pitchdetective/PitchDetective.js";

const options = readGlobal("__challengeOptions") || {};
const clefUrls = readGlobal("__clefUrls") || null;

const game = new PitchDetective({
  ...options,
  clefUrls,
});

game.start();