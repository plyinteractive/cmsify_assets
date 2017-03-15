Cmsify.SelectableRows = function(el) {
  this.$el = $(el);
  this.$el.find('tr').each(function() {
    var $this = $(this);
    $this.on('click', function(event) {
      $this.find(':radio').prop('checked', true);
      if (event.target.type !== 'checkbox') {
        $this.find(':checkbox').prop('checked', function(i, val) { return !val; });
      }
    });
  });
};
