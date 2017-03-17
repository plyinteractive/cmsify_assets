var NR = Cmsify.NestedResource.prototype;
var CFM = Cmsify.ChangedFormModal = function(el) {
  this.$el = $('form');
  if(!this.$el.length) return;
  this.lastData = this.serializeFields();
  var detectChange = this.detectChange.bind(this);
  this.$el.on('keyup', detectChange);
  this.$el.on('click', detectChange);
  $('.js-sortable').each(function() {
    this.addEventListener('sortupdate', detectChange);
  });
  $('a').on('click', function(event) {
    $target = $(event.target);
    if (typeof $target.attr('href') === 'undefined' || $target.attr('target') === '_blank') return;
    if (this.setIsModified()) this.openWarningModal(event);
  }.bind(this));

  $('input[type="submit"]').on('click', function() {
    this.isSaveButton = true;
  }.bind(this));

  window.onbeforeunload = function(event) {
    if (this.setIsModified() && !this.isWarningModalOpened && !this.isSaveButton) return "You have unsaved changes, are you sure?";
    this.isWarningModalOpened = false;
  }.bind(this);
}

CFM.prototype.serializeFields = NR.serializeFields;

CFM.prototype.setIsModified = NR.setIsModified

CFM.prototype.openWarningModal = function(event) {
  this.isWarningModalOpened = true;
  event.preventDefault();
  var $unsavedModal = UIkit.modal('.js-unsaved-modal');
  $unsavedModal.show();
  $unsavedModal.find('.js-modal-confirm').on('click', function() {
    window.location.href = $(event.target).attr('href');
  });
  $unsavedModal.on('hide.uk.modal', function() {
    this.isWarningModalOpened = false;
  }.bind(this));
}

CFM.prototype.detectChange = function() {
  if (this.setIsModified()) {
    $('input[type=submit]').prop('disabled', false);
  }
};
