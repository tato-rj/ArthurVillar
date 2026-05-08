require('./bootstrap/setup');
require('./helpers');
require('./extensions');
require('./components');
require('./utilities');

document.addEventListener("touchstart", () => {}, { passive: true });

$(window).on('load', function() {
    $('.modal.modal-autoshow').modal('show');
});

$(function () {
    $('.leaderboard-modal').on('show.bs.modal', function () {
        var $players = $(this).find('.leaderboard-player');

        $players.stop(true, true).css({
            opacity: 0,
            top: '6px',
            position: 'relative'
        });

        $players.each(function (index) {
            $(this).delay(index * 100).animate({
                opacity: 1,
                top: 0
            }, 180);
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
  const ranges = document.querySelectorAll('input[type="range"][data-range-labels]');

  for (const range of ranges) {
    const wrap = range.closest(".mb-4") ?? range.parentElement;

    const labelsSel = range.dataset.rangeLabels; // e.g. "#speedLabels"
    const labelsWrap =
      (labelsSel ? wrap?.querySelector(labelsSel) : null)
      ?? (labelsSel ? document.querySelector(labelsSel) : null)
      ?? (labelsSel?.startsWith("#") && range.nextElementSibling?.id === labelsSel.slice(1)
        ? range.nextElementSibling
        : null);

    if (!labelsWrap) continue;

    const labels = Array.from(labelsWrap.querySelectorAll("label"));

    const updateLabels = () => {
      const idx = Number(range.value);
      labels.forEach((label, i) => {
        label.classList.toggle("text-black", i === idx);
        label.classList.toggle("text-light", i !== idx);
      });
    };

    updateLabels();
    range.addEventListener("input", updateLabels);
    range.addEventListener("change", updateLabels);
  }
});
  
$('.form-number button').on('click', function () {
  const $input = $(this).siblings('input');
  const current = parseInt($input.val(), 10) || 0;

  if ($(this).data('direction') === 'down' && current > $input.attr('min')) {
    $input.val(current - 1);
  } else if ($(this).data('direction') === 'up' && current < $input.attr('max')) {
    $input.val(current + 1);
  }
});

$(document).on('click', '.avatar-picker .player-avatar', function () {
    const $clickedAvatar = $(this);
    const $option = $clickedAvatar.closest('.avatar-option');
    const $container = $clickedAvatar.closest('.avatar-picker');
    const $radio = $option.find('input[type="radio"][name="avatar_url"]');

    if (!$radio.length) return;

    $radio.prop('checked', true).trigger('change');

    $container.find('.player-avatar').addClass('opacity-2');
    $clickedAvatar.removeClass('opacity-2');
});

// /public/js/settings-toggles.js (example path)
// settings/toggles.js
$(document)
  .off("change.settingsToggles")
  .on(
    "change.settingsToggles",
    'input[multichoice], input[singlechoice]',
    function () {
      const $this = $(this);
      const isSingle = $this.is("[singlechoice]");
      const name = $this.attr("name");

      if (isSingle && $this.prop("checked")) {
        $(`input[singlechoice][name="${CSS.escape(name)}"]`)
          .not(this)
          .prop("checked", false);
      }

      const $scope = isSingle
        ? $(`input[singlechoice][name="${CSS.escape(name)}"]`)
        : $this;

      $scope.each(function () {
        const $label = $(this).siblings("label");
        $label.removeClass("btn-white btn-secondary");
        $label.addClass(this.checked ? "btn-secondary" : "btn-white");
      });
    }
  );

$(document).on('click', 'button[data-form]', function() {
    let formID = $(this).data('form');
    $('form'+formID).submit();
});

$(document).on('click', 'form[confirm] button[type="submit"]', function(e) {
    if (! confirm('⚠️ Are you sure?\nThis action cannot be undone'))
        return e.preventDefault();
});

$(document).ready(function() {
    new Inputmask({"mask": "99:99:99"}).mask(
        document.querySelectorAll('[name="start_time"], [name="end_time"]')
    );

    new Inputmask({"mask": "99/99/9999"}).mask(
        document.querySelectorAll('[name="born_in"], [name="died_in"]')
    );
});
