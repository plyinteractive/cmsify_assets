Dropzone.autoDiscover = false;
// TODO: Initializers depend on libraries loaded through rails-assets gems.
// Gems can't be loaded through alternate sources (rails-assets.org) in .gemspec, so the best alternative
// will be adding bower to the gemspec somehow
$(document).on('turbolinks:load', function() {
  UIkit.init();
  Cmsify.initTinymce();
  $('.js-nested-resources').each(function() {
    new Cmsify.NestedResources(this);
  });
  $('.js-sortable').each(function() {
    new Cmsify.Sortable(this, {
      forcePlaceholderSize: true,
      items: ':not(.disabled)'
    });
  });
  $(".js-tablesort").each(function() {
    $(this).tablesorter();
  });
  $(".js-filter-search").each(function(e) {
    $(this).on('keyup', function(e) {
      if (e.keyCode === 13) {
        window.location.search  = "?utf8=%E2%9C%93&searched_term=" + $(this)[0].value;
      }
    });
  })
  $(".js-filter-input").each(function(e) {
    $(this).on('change', function(e) {
      $(this).closest('form').submit();
    });
  });
  $(".webui-popover").remove();
  $(".js-webui-popover").each(function(e) {
    $(this).webuiPopover({
      container: "main",
      placement: "left",
      multi: false,
      cache: false
    });
  });
  $('.js-dropzone').each(function() {
    var $doneButton = $(this).find('.js-dropzone-done');
    $(this).find('form').dropzone({
      dictDefaultMessage: 'Drop files or click here to upload.',
      init: function() {
        this.on("addedfile", function(files) {
          $doneButton.addClass('disabled');
        }).on("queuecomplete", function(files) {
          $doneButton.removeClass('disabled');
        });
      }
    });
  });
});
