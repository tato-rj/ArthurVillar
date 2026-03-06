import { NotePython } from "./notepython/NotePython.js";

const options = readGlobal("__challengeOptions") || {};

const game = new NotePython({
  ...options,
});

game.start?.();

