import { StaffZone } from "./staffzone/StaffZone.js";

const options = readGlobal("__challengeOptions") || {};
const clefUrls = readGlobal("__clefUrls") || null;

const game = new StaffZone({
  ...options,
  clefUrls,
});

game.start?.();
