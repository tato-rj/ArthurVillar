import { ToneTrek } from "./tonetrek/ToneTrek.js";

const options = readGlobal("__challengeOptions") || {};

const game = new ToneTrek({
  ...options,
});

game.start();
