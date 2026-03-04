import { ToneTrailChallenge } from "./tonetrail/ToneTrailChallenge.js";

const options = readGlobal("__challengeOptions") || {};

const game = new ToneTrailChallenge({
  ...options,
});

game.start?.();

