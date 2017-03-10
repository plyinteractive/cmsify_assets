$(document).on('cmsify:load', function() {
  $('.js-changed-form-modal').each(function() {
    window.unsavedModal = new Cmsify.ChangedFormModal(this);
  });
});
