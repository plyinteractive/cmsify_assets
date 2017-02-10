Cmsify.remoteUpload = function(form, elementToClone, elementToInsertBefore, callback) {
  form.dropzone({
    dictDefaultMessage: 'Drop files or click here to upload',
    init: function() {
      this.on('success', function(req, res) {
        var clone = $($.clone(elementToClone[0] || elementToClone)); //jquery apparently wraps tr elements in an array
        var input = clone.is('input') ? clone : clone.find('input');
        //if the element is of type input, change the input to match the new id from the server
        if (input || input.length) {
          var baseId = input.attr('id').split('_');
          baseId.pop();
          baseId.push(res.id);
          input.attr('id', baseId.join('_'));
          input.val(res.id);
          input.attr('checked', true); //should not mess with regular inputs and will make this work with checkboxes/radio buttons
        }
        clone.insertBefore(elementToInsertBefore);
        if (typeof callback === 'function') callback(elementToClone, input, req, res);
      });
    }
  })
};
