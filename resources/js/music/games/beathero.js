import { bootGame } from "../duel/DuelClient.js";
import { BeatHero } from "./beathero/BeatHero.js";

const options = readGlobal("__challengeOptions") || {};
const clefUrls = readGlobal("__clefUrls") || null;

bootGame((duelOptions) => new BeatHero({
  ...(duelOptions || options),
  clefUrls,
}));
