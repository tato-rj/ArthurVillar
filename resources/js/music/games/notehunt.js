import { NoteHunt } from "./notehunt/NoteHunt.js";

const options = readGlobal("__challengeOptions") || {};
const clefUrls = readGlobal("__clefUrls") || null;

const game = new NoteHunt({
  ...options,
  clefUrls,
});

game.start?.();
