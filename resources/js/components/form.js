const submitControlSelector = [
   'button:not([type])',
   'button[type="submit"]',
   'input[type="submit"]',
   'input[type="image"]'
].join(', ');

function disableOnSubmit(control, showLoader) {
   if (! control || control.disabled)
      return;

   control.dataset.disabledOnSubmit = 'true';
   control.setAttribute('aria-disabled', 'true');

   if (showLoader && control.matches('button'))
      $(control).addLoader();
   else
      control.disabled = true;
}

function restoreSubmitControls(form, controls) {
   controls = controls || Array.from(document.querySelectorAll('[data-disabled-on-submit="true"]'))
      .filter(function(control) {
         return control.form === form;
      });

   controls.forEach(function(control) {
      if (control.dataset.disabledOnSubmit !== 'true')
         return;

      if ($(control).find('.loader-spinner').length)
         $(control).removeLoader();
      else
         control.disabled = false;

      control.removeAttribute('aria-disabled');
      delete control.dataset.disabledOnSubmit;
   });

   delete form.dataset.submitting;
}

document.addEventListener('submit', function(event) {
   const form = event.target;

   if (! (form instanceof HTMLFormElement))
      return;

   const submitter = event.submitter;
   const controls = submitter && submitter.form === form
      ? [submitter]
      : Array.from(form.querySelectorAll(submitControlSelector));
   const target = (submitter && submitter.getAttribute('formtarget')) || form.getAttribute('target');

   // Wait until every submit handler has had a chance to cancel the submission.
   // This also preserves a named submit button's value in the submitted form data.
   window.setTimeout(function() {
      if (event.defaultPrevented || ! form.isConnected)
         return;

      form.dataset.submitting = 'true';
      controls.forEach(function(control) {
         disableOnSubmit(control, form.dataset.trigger === 'loader');
      });

      // A form submitted to another window or frame leaves this page active.
      if (target && target.toLowerCase() !== '_self')
         window.setTimeout(function() {
            restoreSubmitControls(form, controls);
         }, 1000);
   }, 0);
});

// Browsers may restore a page from their back/forward cache with its DOM state intact.
window.addEventListener('pageshow', function() {
   document.querySelectorAll('form[data-submitting="true"]').forEach(restoreSubmitControls);
});

$(document).on('click', '.btn[data-trigger="loader"]', function() {
   $(this).prop('disabled', true).addLoader();
});
