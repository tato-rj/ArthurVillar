import { BlocksChallenge } from "./blocks/BlocksChallenge.js";

const options = readGlobal("__challengeOptions") || {};

const game = new BlocksChallenge({
  ...options,
});

game.start();
