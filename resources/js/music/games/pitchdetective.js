import { bootGame } from "../duel/DuelClient.js";
import { PitchDetective } from "./pitchdetective/PitchDetective.js";

const options = readGlobal("__challengeOptions") || {};
const clefUrls = readGlobal("__clefUrls") || null;

bootGame((duelOptions) => new PitchDetective({
  ...(duelOptions || options),
  clefUrls,
}));