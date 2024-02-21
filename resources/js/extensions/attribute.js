jQuery.fn.readonly = function() {
 return this.attr('readonly', true);
}

jQuery.fn.readandwrite = function() {
 return this.removeAttr('readonly');
}

jQuery.fn.hasAttr = function(attr) {
	let value = this.attr(attr);
	return typeof value !== 'undefined' && value !== false;
};

jQuery.fn.attrToArray = function(attr) {
return this.map(function(){
     return $.trim($(this).attr(attr));
  }).get();
};

jQuery.fn.random = function() {
	return this.eq(Math.floor(Math.random() * $(this).length));
}