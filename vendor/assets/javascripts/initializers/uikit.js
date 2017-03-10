$(document).on('cmsify:load', function() {
  UIkit.init();

  $('.js-modal-open').each(function() {
    $(this).on('click', function() {
      UIkit.modal(this.dataset['target']).show();
    });
  });
});
