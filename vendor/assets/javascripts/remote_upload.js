var remoteUpload = Cmsify.remoteUpload = function(form, elementToClone, elementToInsertBefore, callback) {
  form.dropzone({
    dictDefaultMessage: 'Drop files or click here to upload',
    init: function() {
      this.on('success', function(req, res) {
        var $clone = $(elementToClone).clone().first();
        var $input = $clone.is('input') ? $clone : $clone.find('input').first();
        //if the element is of type input, change the input to match the new id from the server
        if ($input) {
          var baseId = $input.attr('id').split('_');
          baseId.pop();
          baseId.push(res.id);
          $input.attr({
            'id': baseId.join('_'),
            'checked': true
          });
          $input.val(res.id);
        }
        $clone.removeClass('uk-hidden');
        $clone.insertBefore($(elementToInsertBefore).first());
        if (typeof callback === 'function') callback(elementToClone, $input, req, res);
        this.destroy();
        remoteUpload(form, elementToClone, elementToInsertBefore, callback);
      }.bind(this));
    }
  })
};
