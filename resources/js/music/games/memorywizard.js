import { MemoryWizard } from "./memorywizard/MemoryWizard.js";

const options = readGlobal("__challengeOptions") || {};
const clefUrls = readGlobal("__clefUrls") || null;

const game = new MemoryWizard({
  ...options,
  clefUrls,
});

game.start?.();
