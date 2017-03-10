$(document).on('cmsify:load', function() {
  $('.js-nested-resources').each(function() {
    new Cmsify.NestedResources(this);
  });
});
