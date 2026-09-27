import { bootGame } from "../duel/DuelClient.js";
import { NoteMatch } from "./notematch/NoteMatch.js";

const options = readGlobal("__challengeOptions") || {};
const clefUrls = readGlobal("__clefUrls") || null;

bootGame((duelOptions) => new NoteMatch({
  ...(duelOptions || options),
  clefUrls,
}));
