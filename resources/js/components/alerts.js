$(document).on('click', '[data-dismiss="alert"]', function() {
    let $alert = $(this).closest('.alert');

    if ($(this).hasAttr('data-animation')) {
        let animation = $(this).data('animation');
        $alert.addClass(animation).delay(500).queue(function() {
            $(this).parent().remove();
        });
    } else {
        $alert.parent().remove();
    }
});