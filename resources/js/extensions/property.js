jQuery.fn.toggleProp = function($prop) {
 return this.prop($prop, ! this.prop($prop));
}

jQuery.fn.disable = function() {
 return this.prop('disabled', true);
}

jQuery.fn.enable = function() {
 return this.prop('disabled', false);
}

jQuery.fn.check = function() {
 return this.prop('checked', true);
}

jQuery.fn.uncheck = function() {
 return this.prop('checked', false);
}