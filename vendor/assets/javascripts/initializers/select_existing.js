$(document).on('cmsify:load', function() {
  $('.js-select-existing').each(function() {
    new Cmsify.SelectExisting(this);
  });
});
