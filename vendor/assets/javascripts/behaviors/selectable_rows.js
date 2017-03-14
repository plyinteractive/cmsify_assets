Cmsify.SelectableRows = function(el) {
  this.$el = $(el);
  this.$el.find('tr').each(function() {
    var $this = $(this);
    $this.on('click', function(e) {
      $this.find(':radio, :checkbox').prop('checked', true);
    });
  });
};
