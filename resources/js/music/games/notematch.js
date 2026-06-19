import { NoteMatch } from "./notematch/NoteMatch.js";

const options = readGlobal("__challengeOptions") || {};
const clefUrls = readGlobal("__clefUrls") || null;

const game = new NoteMatch({
  ...options,
  clefUrls,
});

game.start?.();
