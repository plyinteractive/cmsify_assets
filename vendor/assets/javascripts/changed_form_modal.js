var NR = Cmsify.NestedResource.prototype;
var filterAuthenticityToken = Cmsify.util.filterAuthenticityToken;
var CFM = Cmsify.ChangedFormModal = function(el) {
  this.$el = $('form');
  if(!this.$el.length) return;
  this.lastData = this.serializeFields();  
  $('a').on('click', function(event) {
    if (this.isInternalLink(event.target)) return;
    if (this.setIsModified()) this.openWarningModal();
  }.bind(this));

  $('input[type="submit"]').on('click', function() {
    this.isSaveButton = true;
  }.bind(this));

  window.onbeforeunload = function(event) {
    if (this.setIsModified() && !this.isWarningModalOpened && !this.isSaveButton) return "You have unsaved changes, are you sure?";
    this.isWarningModalOpened = false;
  }.bind(this);
}

CFM.prototype.serializeFields = function() {
  return filterAuthenticityToken(NR.serializeFields.call(this));
} 

CFM.prototype.setIsModified = NR.setIsModified

CFM.prototype.openWarningModal = function() {
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

CFM.prototype.isInternalLink = function(target) {
  var $target = $(target);
  return (
    (typeof($target.data('ukModal')) !== 'undefined') || 
    $target.hasClass('uk-modal-close') || 
    $target.hasClass('js-remove-image') ||
    $target.text() === 'Save' ||
    $target.hasClass('js-internal')
  )
};
