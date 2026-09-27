import { bootGame } from "../duel/DuelClient.js";
import { KeysLab } from "./keyslab/KeysLab.js";

const options = readGlobal("__challengeOptions") || {};
const clefUrls = readGlobal("__clefUrls") || null;

bootGame((duelOptions) => new KeysLab({
  ...(duelOptions || options),
  clefUrls,
}));

