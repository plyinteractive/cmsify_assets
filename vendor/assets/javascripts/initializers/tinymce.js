$(document).on('cmsify:load', function() {
  var cmsifyRoot = window.location.pathname.split("/")[1];
  tinymce.remove();
  tinymce.init(
    {
      selector:'.tinymce',
      height: 250,
      plugins: "searchreplace code fullscreen media paste code lists advlist image",
      toolbar: "code image bullist numlist",
      relative_urls: false,
      image_list: "/" + cmsifyRoot + "/assets.json",
      setup: function(editor) {
        editor.on('change', function(e) {
          $('input[id='+ e.target.id + ']').trigger('tinymce:change');
        });
      }
    }
  );
});
