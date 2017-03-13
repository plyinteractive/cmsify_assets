$(document).on('cmsify:load', function() {
  $('.js-selectable-rows').each(function() {
    new Cmsify.SelectableRows(this);
  });
});
