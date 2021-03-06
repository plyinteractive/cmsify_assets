$(document).on('cmsify:load', function() {
  // TODO: rename this, it isn't searching, it is searching a form
  $(".js-filter-search").each(function(e) {
    $(this).on('keyup', function(e) {
      if (e.keyCode === 13) {
        $(this).closest('form').submit();
      }
    });
  });

  $(".js-filter-input").each(function(e) {
    $(this).on('change', function(e) {
      $(this).closest('form').submit();
    });
  });
  // Overwrite the contains method to not be case sensitive
  // NEW selector
  jQuery.expr[':'].Contains = function(a, i, m) {
    return jQuery(a).text().toUpperCase()
        .indexOf(m[3].toUpperCase()) >= 0;
  };

  // OVERWRITES old selecor
  jQuery.expr[':'].contains = function(a, i, m) {
    return jQuery(a).text().toUpperCase()
        .indexOf(m[3].toUpperCase()) >= 0;
  };

  $('[data-filter-search]').each(function() {
    var $this = $(this);
    var filterTarget = $this.data('filter-search');
    $(this).on('input', function(e) {
      if (this.value.length) {
        $(filterTarget).children().addClass('uk-hidden');
        $(filterTarget).children(':contains('+ $this.val() +')').removeClass('uk-hidden');
      } else {
        $(filterTarget).children().removeClass('uk-hidden');
      }
    });
  });
});
