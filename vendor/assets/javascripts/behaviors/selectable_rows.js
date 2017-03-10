Cmsify.SelectableRows = function(el) {
  this.$el = $(el);
  this.$el.find('tr').each(function() {
    var $this = $(this);
    var $inputs = $this.find(':radio, :checkbox');
    $this.on('click', function(e) {
      e.preventDefault();
      $inputs.trigger('click');
    });
    $inputs.on('click', function(e) {
      e.stopPropagation();
    });
  });
};
