jQuery.fn.animateCSS = function(animation, speed = 'slow') {
	let element = this;

	element.addClass('animate__animated animate__' + speed + ' animate__' + animation);
	
	setTimeout(function() {
		element.removeClass('animate__animated animate__' + speed + ' animate__' + animation);
	}, 800);
}