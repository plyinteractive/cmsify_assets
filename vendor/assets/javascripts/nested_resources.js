// adding nested resources with Cocoon through a UIkit.modal
var NestedResources = function (el) {
  this.$el = $(el);
  this.$alertBox = this.$el.find('.js-alert-box');
  this.parsley = this.$el.closest('.js-parsley').parsley();
  this.$el.find('.js-nested-resource').each(function(index, el) {
    new NestedResource(el, {
      isNew: false,
      modelName: $(el).data('model-name'),
      parent: this,
      index: $(el).data('index')
    });
  }.bind(this));
  this.$el
    .on('cocoon:after-insert', function(e, insertedItem) {
       insertedItem.attr({
        "data-index" : insertedItem.parent().children().length - 1
      });
      new NestedResource(insertedItem, {
        isNew: true,
        modelName: insertedItem.data('model-name'),
        parent: this,
        index: insertedItem.data('index')
      });
    }.bind(this))
    .on('click', '.js-remove-association', function(e) {
      this.$alertBox.removeClass('uk-hidden');
      // TODO: If a user adds a new nested resource and presses cancel, the box still shows even though nothing new is there
    }.bind(this))
}
