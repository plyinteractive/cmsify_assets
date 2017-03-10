$(document).on('cmsify:load', function() {
  $(".webui-popover").remove();
  $(".js-webui-popover").each(function(e) {
    $(this).webuiPopover({
      container: "main",
      placement: "left",
      multi: false,
      cache: false
    });
  });
  $('.uk-modal').on('show.uk.modal', function() {
    $('.js-webui-popover').webuiPopover('hide');
  });
});
