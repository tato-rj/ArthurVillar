import { NoteNest } from "./notenest/NoteNest.js";

const options = readGlobal("__challengeOptions") || {};
const clefUrls = readGlobal("__clefUrls") || null;

const game = new NoteNest({
  ...options,
  clefUrls,
});

game.start?.();
