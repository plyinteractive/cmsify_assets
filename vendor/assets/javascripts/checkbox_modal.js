// allow a cancel button to work properly on checkbox modal
Cmsify.CheckboxModal = function(el) {
  this.$el = $(el);
  this.$el.addClass('uk-modal');
  this.checked = {};
  this.modal = UIkit.modal(el, {bgclose: false});
  this.modal.on('show.uk.modal', function() {
    this.storeCheckboxes();
  }.bind(this));
  this.$el.find('.js-cancel-' + this.$el.attr('id')).each(function(index, cancel) {
    $(cancel).on('click', this.loadCheckboxes.bind(this)); 
  }.bind(this));
}

Cmsify.CheckboxModal.prototype.storeCheckboxes = function() {
  this.checked = {};
  this.$el.find('input:checked').map(function(index, input) {
    this.checked[input.id] = "checked";
  }.bind(this));
}

Cmsify.CheckboxModal.prototype.loadCheckboxes = function() {
  this.$el.find(':input').map(function(index, input) {
    input.checked = (this.checked[input.id] || null);
  }.bind(this));
};
