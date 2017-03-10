$(document).on('cmsify:load', function() {
  tinymce.remove();
  tinymce.init(
    {
      selector:'.tinymce',
      height: 250,
      plugins: "searchreplace code fullscreen media paste code lists advlist",
      setup: function(editor) {
        editor.on('change', function(e) {
          $('input[id='+ e.target.id + ']').trigger('tinymce:change');
        });
      }
    }
  );
});
