require('./bootstrap/setup');
require('./helpers');
require('./extensions');
require('./components');
require('./utilities');

document.addEventListener("touchstart", () => {}, { passive: true });

$('.form-number button').on('click', function () {
  const $input = $(this).siblings('input');
  const current = parseInt($input.val(), 10) || 0;

  if ($(this).data('direction') === 'down' && current > $input.attr('min')) {
    $input.val(current - 1);
  } else if ($(this).data('direction') === 'up' && current < $input.attr('max')) {
    $input.val(current + 1);
  }
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