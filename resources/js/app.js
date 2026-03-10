require('./bootstrap/setup');
require('./helpers');
require('./extensions');
require('./components');
require('./utilities');

document.addEventListener("touchstart", () => {}, { passive: true });

document.addEventListener("DOMContentLoaded", () => {
  const ranges = document.querySelectorAll('input[type="range"][data-range-labels]');

  for (const range of ranges) {
    const wrap = range.closest(".mb-4") ?? range.parentElement;

    const labelsSel = range.dataset.rangeLabels; // e.g. "#initialNoteRangeLabels" or "#speedLabels"
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

$(document).off("change.settingsToggles").on("change.settingsToggles", 'input[name="intervals[]"], input[name="clefs[]"], input[name="keyQualities[]"], input[name="triadQualities[]"]', function () {
  const $label = $(this).siblings("label");
  $label.removeClass("btn-white btn-secondary");
  $label.addClass(this.checked ? "btn-secondary" : "btn-white");
});

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