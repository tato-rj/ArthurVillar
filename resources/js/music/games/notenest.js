import { bootGame } from "../duel/DuelClient.js";
import { NoteNest } from "./notenest/NoteNest.js";

const options = readGlobal("__challengeOptions") || {};
const clefUrls = readGlobal("__clefUrls") || null;

bootGame((duelOptions) => new NoteNest({
  ...(duelOptions || options),
  clefUrls,
  microphoneSettings: readGlobal("__microphoneSettings"),
}));
