import { IntervalChallenge } from "./interval/IntervalChallenge.js";

function readGlobal(name) {
  return typeof window !== "undefined" ? window[name] : undefined;
}

const options = readGlobal("__challengeOptions") || {};
const clefUrls = readGlobal("__clefUrls") || null;

const game = new IntervalChallenge({
  ...options,
  clefUrls,
});

game.start();