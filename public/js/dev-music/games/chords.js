import { ChordChallenge } from "./chords/ChordChallenge.dev.js";

const options = window.__challengeOptions || {};
const clefUrls = window.__clefUrls || null;

const game = new ChordChallenge({ ...options, clefUrls });

game.start();

// optional: expose for debugging
window.__game = game;