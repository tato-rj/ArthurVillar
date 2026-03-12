import { GameAudio } from "../games/shared/GameAudio.js";

export class GameAudioAdminPage {
  constructor({
    listSelector = "#sound-effects-list",
    cardSelector = "[data-sound-card]",
  } = {}) {
    this.listSelector = listSelector;
    this.cardSelector = cardSelector;
    this.$list = $();
    this.$template = $();
  }

  init() {
    this.$list = $(this.listSelector).first();
    if (!this.$list.length) return this;

    this.$template = this.$list.find(this.cardSelector).first().clone();
    if (!this.$template.length) return this;

    this.$list.empty();
    this._renderCards();
    this._bindEvents();
    return this;
  }

  _renderCards() {
    const frag = document.createDocumentFragment();

    GameAudio.getSoundLibrary().forEach((sound) => {
      const $card = this.$template.clone();
      const $playBtn = $card.find("[data-play]").first();
      const $name = $card.find(".sound-name").first();
      const $value = $card.find(".sound-volume").first();
      const $input = $card.find('input[type="range"]').first();
      const $desc = $card.find(".sound-description").first();

      $card.attr("data-sound-card", sound.id);
      $playBtn.attr("data-play", sound.id);
      $name.text(sound.label);
      $desc.text(sound.description);

      $input
        .attr("name", sound.volumeKey)
        .attr("data-volume-key", sound.volumeKey)
        .attr("data-sound-id", sound.id)
        .val(sound.valuePercent);

      $value.text(this._formatVolumeLabel(sound.valuePercent));

      frag.appendChild($card[0]);
    });

    this.$list.append(frag);
  }

  _bindEvents() {
    this.$list
      .off(".gameAudioAdmin")
      .on("input.gameAudioAdmin change.gameAudioAdmin", 'input[type="range"][data-volume-key]', (e) => {
        const $input = $(e.currentTarget);
        const volumeKey = String($input.attr("data-volume-key") || "");
        const nextValue = GameAudio.setVelocityPercent(volumeKey, $input.val());
        $input.closest(this.cardSelector).find(".sound-volume").first().text(this._formatVolumeLabel(nextValue));
      })
      .on("click.gameAudioAdmin", "[data-play]", async (e) => {
        e.preventDefault();
        const soundId = String($(e.currentTarget).attr("data-play") || "");
        await GameAudio.previewSound(soundId);
      });
  }

  _formatVolumeLabel(percent) {
    const normalized = (Math.max(0, Math.min(100, Number(percent) || 0))) / 100;
    return String(Number(normalized.toFixed(2)));
  }
}
