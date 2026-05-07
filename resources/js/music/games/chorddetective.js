import { ChordDetective } from "./chorddetective/ChordDetective.js";

const options = readGlobal("__challengeOptions") || {};
const clefUrls = readGlobal("__clefUrls") || null;

const game = new ChordDetective({
  ...options,
  clefUrls,
});

game.start();