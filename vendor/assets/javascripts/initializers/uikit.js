$(document).on('cmsify:load', function() {
  $('.js-modal-open').each(function() {
    $(this).on('click', function() {
      UIkit.modal(this.dataset['target']).show();
    });
  });
});
