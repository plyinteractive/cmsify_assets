Dropzone.autoDiscover = false;
$(document).on('cmsify:load', function() {
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
  $('.js-dropzone-asset-upload').each(function() {
    var resourceName = this.dataset.resourceName;
    Cmsify.RemoteUpload($(this).find('form'),
      '.js-' + resourceName + '-table-element',
      '.js-' + resourceName + '-table-element',
      function(clone, cloneInput, req, res) {
        $(clone).first().removeClass('uk-hidden');
        UIkit.modal('#add-new-' + resourceName).hide();
        $('.js-remove-asset').removeClass('uk-hidden');
      });
  });
  $('.js-selectable').each(function() {
    new Cmsify.SelectableAsset(this);
  });
  $('.js-attached').each(function() {
    new Cmsify.AttachedAsset(this);
  });
});
