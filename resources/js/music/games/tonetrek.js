import { bootGame } from "../duel/DuelClient.js";
import { ToneTrek } from "./tonetrek/ToneTrek.js";

const options = readGlobal("__challengeOptions") || {};

bootGame((duelOptions) => new ToneTrek({
  ...(duelOptions || options),
}));
