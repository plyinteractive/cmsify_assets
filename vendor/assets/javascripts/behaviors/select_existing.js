Cmsify.SelectExisting = function(el) {
  this.$el = $(el);
  this.modalSelector = this.$el.data('target');
  this.$modalEl = $(this.modalSelector);
  this.modal = UIkit.modal(this.modalSelector);
  this.$list = $(this.$el.data('list'));

  this.$cancelButton = this.$modalEl.find('.js-modal-cancel');
  this.$doneButton = this.$modalEl.find('.js-modal-done');

  this.showModal = this.showModal.bind(this);
  this.handleCancelClick = this.handleCancelClick.bind(this);
  this.handleDoneClick = this.handleDoneClick.bind(this);
  this.removeItem = this.removeItem.bind(this);
  this.addItem = this.addItem.bind(this);

  this.$el.on('click', this.showModal);
  this.$cancelButton.on('click', this.handleCancelClick);
  this.$doneButton.on('click', this.handleDoneClick);
};

Cmsify.SelectExisting.prototype.showModal = function(event) {
  event.preventDefault();
  this.modal.show();
};

Cmsify.SelectExisting.prototype.hideModal = function(event) {
  event.preventDefault();
  this.modal.hide();
};

Cmsify.SelectExisting.prototype.handleDoneClick = function(event) {
  var itemIdsToRemove = this.compareIds(this.currentListItems(), this.selectedListItems());
  var itemIdsToAdd = this.compareIds(this.selectedListItems(), this.currentListItems());
  _.each(itemIdsToRemove, this.removeItem);
  _.each(itemIdsToAdd, this.addItem);
  this.hideModal(event);
};

Cmsify.SelectExisting.prototype.handleCancelClick = function(event) {
  this.hideModal(event);
};

Cmsify.SelectExisting.prototype.currentListItems = function() {
  return this.$list.find("[name*=_id]");
};

Cmsify.SelectExisting.prototype.selectedListItems = function() {
  return this.$modalEl.find("[name*=_ids]").filter(function() { return this.checked; });
};

Cmsify.SelectExisting.prototype.compareIds = function(array, control) {
  return _.difference(this.getIds(array), this.getIds(control));
};

Cmsify.SelectExisting.prototype.getIds = function(list) {
  return _.map(list, function(el) { return el.value; });
};

Cmsify.SelectExisting.prototype.getItemById = function(id, collection) {
  return collection.filter("[value=" + id + "]");
};

Cmsify.SelectExisting.prototype.removeItem = function(id) {
  return this.getItemById(id, this.currentListItems()).closest('tr').hide();
};

Cmsify.SelectExisting.prototype.addItem = function(id) {
  var templateHtml = this.$el.data('item-template');
  var $template = $(templateHtml);
  var $item = this.getItemById(id, this.selectedListItems()).closest('tr');
  $template.find('td').eq(1).html($item.find('td').eq(0).html());
  $template.find('td').eq(3).html($item.find('td').eq(1).html());
  $template.find("[name*=_id]").val(id);
  this.$list[this.currentListItems().length ? 'append' : 'html']($template);
  return $template;
};
