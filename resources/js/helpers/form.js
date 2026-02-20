window.formRequest = function($form) {
    let request = new Object();

    $form.serializeArray().forEach(function(input) {
        request[input.name] = input.value;
    });

    return request;
}

window.popup = function(type, message) {
    let $popup = $('#popup-'+type+' > .alert-container').clone();
    
    $popup.find('.popup-message').text(message);

    $popup.appendTo('body').show();
}

window.readGlobal = function(name) {
  return typeof window !== "undefined" ? window[name] : undefined;
}