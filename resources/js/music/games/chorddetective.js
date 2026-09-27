import { bootGame } from "../duel/DuelClient.js";
import { ChordDetective } from "./chorddetective/ChordDetective.js";

const options = readGlobal("__challengeOptions") || {};
const clefUrls = readGlobal("__clefUrls") || null;

bootGame((duelOptions) => new ChordDetective({
  ...(duelOptions || options),
  clefUrls,
}));