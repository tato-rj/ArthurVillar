import { bootGame } from "../duel/DuelClient.js";
import { IntervalsLab } from "./intervalslab/IntervalsLab.js";

const options = readGlobal("__challengeOptions") || {};
const clefUrls = readGlobal("__clefUrls") || null;

bootGame((duelOptions) => new IntervalsLab({
  ...(duelOptions || options),
  clefUrls,
}));