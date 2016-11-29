var initTinymce = function() {
  tinymce.remove();
  tinymce.init(
    {
      selector:'.tinymce',
      plugins: [ '', 'searchreplace code fullscreen', 'media paste code' ],
      setup: function(editor) {
        editor.on('change', function(e) {
          $('input[id='+ e.target.id + ']').trigger('tinymce:change');
        });
      }
    }
  );
}
