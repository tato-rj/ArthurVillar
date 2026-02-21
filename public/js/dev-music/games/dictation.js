import { DictationChallenge } from "./dictation/DictationChallenge.dev.js";

const options = window.__challengeOptions || {};
const clefUrls = window.__clefUrls || null;

const game = new DictationChallenge({ ...options, clefUrls });

game.start();

// optional: expose for debugging
window.__game = game;