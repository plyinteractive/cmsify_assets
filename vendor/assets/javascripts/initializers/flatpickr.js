$(document).on('cmsify:load', function() {
  flatpickr(".js-flatpickr", {
    onReady: function(selectedDates, dateStr, instance) {
      $(instance.element).closest('.row').removeClass('uk-invisible');
    }
  });
});
