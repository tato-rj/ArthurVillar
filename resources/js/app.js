require('./bootstrap/setup');
require('./helpers');
require('./extensions');
require('./components');
require('./utilities');

$(document).on('click', 'form[confirm] button[type="submit"]', function(e) {
	if (! confirm('Are you sure?'))
		return e.preventDefault();
});