Cmsify.Sortable = function(el, options) {
  this.$el = $(el);
  this.options = options;
  var sortableElement = sortable(this.$el, this.options);
  sortableElement[0].addEventListener('sortupdate', function(e) {
    this.$el.find('.js-rank').each(function(i) {
      $(this).attr('value', i + 1);
    });
    if (this.$el.data('sort-action')) {
      $.ajax({
        type: 'PUT',
        url: this.$el.data('sort-action'),
        data: { order: this.$el.find('.js-rank').serializeArray() },
      });
    }
  }.bind(this));
};

