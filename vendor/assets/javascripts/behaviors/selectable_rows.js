Cmsify.SelectableRows = function(el) {
  this.$el = $(el);
  this.$el.on('click', 'tr', function(event) {
    console.log(event);
    var $target = $(event.currentTarget);
    $target.find(':radio').prop('checked', true);
    if (event.target.type !== 'checkbox') {
      $target.find(':checkbox').prop('checked', function(i, val) { return !val; });
    }
  });
};
