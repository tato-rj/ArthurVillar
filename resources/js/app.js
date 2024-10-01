require('./bootstrap/setup');
require('./helpers');
require('./extensions');
require('./components');
require('./utilities');

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