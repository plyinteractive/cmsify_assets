var remoteUpload = Cmsify.RemoteUpload = function(form, dataset, callback) {
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
        document.getElementById(`${dataset.controllerNamespace}_${dataset.model}_attached_${dataset.targetResourceName}_attributes_asset_id`)
          .setAttribute("value", res.asset.id)
        let elem;
        if (res.asset.isImage) {
          elem = `<img src=${res.asset.url} alt="" class="cmsify-width-medium" />`
        } else {
          elem = `<i class="icomoon-${res.asset.extension} bloom-icon-large uk-text-muted"></i>`
        }
        let imageContainer = document.getElementById(`${dataset.controllerNamespace}_${dataset.model}_attached_${dataset.targetResourceName}_image_id`)
        imageContainer.innerHTML = elem
        imageContainer.nextElementSibling.innerText = res.asset.filename
        if (typeof callback === 'function') callback(dataset, req, res);
        this.destroy();
        remoteUpload(form, dataset, callback);
      }.bind(this));
    }
  })
};
