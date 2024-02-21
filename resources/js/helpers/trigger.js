window.onClickOutside = function(element, callback) {
  $(document).click(function(e) {                    
    if ($(e.target).parents(element).length == 0) {
      callback();
    }
  });
}