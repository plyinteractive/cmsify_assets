$(document).on('cmsify:load', function() {
  var cmsifyRoot = window.location.pathname.split("/")[1];
  tinymce.remove();
  tinymce.init(
    {
      selector:'.tinymce',
      height: 250,
      plugins: "searchreplace code fullscreen media paste code lists advlist image link",
      toolbar: "code image bullist numlist link",
      relative_urls: false,
      image_list: "/" + cmsifyRoot + "/assets.json",
      setup: function(editor) {
        editor.on('change', function(e) {
          $('input[id='+ e.target.id + ']').trigger('tinymce:change');
        });
      },
      init_instance_callback: function (editor) {
        $('#'+editor.id).closest('.row').removeClass('uk-invisible');
      }
    }
  );
});
