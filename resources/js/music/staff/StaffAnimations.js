import { playSmokePuffAtElement } from "../games/shared/mojsEffects.js";

export class StaffAnimations {
  constructor($container) {
    this.$container = $container;
  }

  playNoteRemoveSmoke(noteEl) {
    if (!noteEl) return;
    playSmokePuffAtElement(noteEl, { parentEl: document.body });
  }
}
