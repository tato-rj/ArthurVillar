import { OpenStaff } from "./openstaff/OpenStaff.js";

const options = readGlobal("__challengeOptions") || {};
const clefUrls = readGlobal("__clefUrls") || null;

const game = new OpenStaff({
  ...options,
  clefUrls,
});

game.start?.();
