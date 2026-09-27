import { bootGame } from "../duel/DuelClient.js";
import { MemoryWizard } from "./memorywizard/MemoryWizard.js";

const options = readGlobal("__challengeOptions") || {};
const clefUrls = readGlobal("__clefUrls") || null;

bootGame((duelOptions) => new MemoryWizard({
  ...(duelOptions || options),
  clefUrls,
}));
