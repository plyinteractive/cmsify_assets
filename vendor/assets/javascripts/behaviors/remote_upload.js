var remoteUpload = Cmsify.RemoteUpload = function(form, elementToClone, elementToInsertBefore, callback) {
  form.dropzone({
    timeout: 480000,
    dictDefaultMessage: 'Drop files or click here to upload',
    maxFiles: 1,
    maxfilesexceeded: function(file) {
      this.removeAllFiles();
      this.addFile(file);
    },
    init: function() {
      this.on('success', function(req, res) {
        var $clone = $(elementToClone).clone().first();
        var $input = $clone.is('input') ? $clone : $clone.find('input').first();
        var $img = $clone.find('img');
        if ($input) {
          var baseId = $input.attr('id').split('_');
          baseId.pop();
          baseId.push(res.asset.id);
          $input.attr({
            'id': baseId.join('_'),
            'checked': true
          });
          $input.val(res.asset.id);
        }
        if ($img) {
          $img.attr('src', res.asset.url);
        }
        $clone.data('asset-url', res.asset.url);
        $clone.data('asset-type', res.asset.type);
        $clone.removeClass('uk-hidden');
        var selectableAsset = new Cmsify.SelectableAsset($clone);
        $clone.insertBefore($(elementToInsertBefore).first());
        $clone.children().first().html(selectableAsset.renderAssetIconPreview());
        $clone.children().eq(1).html(selectableAsset.getFileName());
        $clone.trigger('click');
        if (typeof callback === 'function') callback(elementToClone, $input, req, res);
        this.destroy();
        remoteUpload(form, elementToClone, elementToInsertBefore, callback);
      }.bind(this));
    }
  })
};
