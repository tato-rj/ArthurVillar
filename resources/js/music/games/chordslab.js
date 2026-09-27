import { bootGame } from "../duel/DuelClient.js";
import { ChordsLab } from "./chordslab/ChordsLab.js";

const options = readGlobal("__challengeOptions") || {};
const clefUrls = readGlobal("__clefUrls") || null;

bootGame((duelOptions) => new ChordsLab({
  ...(duelOptions || options),
  clefUrls,
}));
