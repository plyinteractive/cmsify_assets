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
    Cmsify.RemoteUpload(
      $(this).find('form'),
      this.dataset,
      function(dataset, req, res) {
        document.getElementById(`${dataset.controllerNamespace}_${dataset.model}_attached_${dataset.targetResourceName}_remove_asset`).classList.remove('uk-hidden')
        UIkit.modal('#add-new-asset').hide();
      }
    );
  });
  $('.js-selectable').each(function() {
    new Cmsify.SelectableAsset(this);
  });
  $('.js-attached').each(function() {
    new Cmsify.AttachedAsset(this);
  });
});
