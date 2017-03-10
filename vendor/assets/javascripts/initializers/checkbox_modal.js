$(document).on('cmsify:load', function() {
  $('.js-checkbox-modal').each(function() {
    new Cmsify.CheckboxModal(this);
  });
});
