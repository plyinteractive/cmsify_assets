var NR = Cmsify.NestedResource.prototype;
var filterAuthenticityToken = Cmsify.util.filterAuthenticityToken;
var CFM = Cmsify.ChangedFormModal = function(el) {
  this.$el = $('form');
  if(!this.$el.length);
  this.lastData = this.serializeFields();  
  $('a').on('click', function(event) {
    if ((typeof(event.target.dataset['ukModal']) !== 'undefined') || $(event.target).hasClass('uk-modal-close')) return;
    if (this.setIsModified()) {
      this.modalOpened = true;
      event.preventDefault();
      var $unsavedModal = UIkit.modal('.js-unsaved-modal');
      $unsavedModal.show();
      $unsavedModal.find('.js-modal-confirm').on('click', function() {
        window.location.href = $(event.target).attr('href');
      });
      $unsavedModal.on('hide.uk.modal', function() {
        this.modalOpened = false;
      }.bind(this));
    }
  }.bind(this));
  window.onbeforeunload = function(event) {
    if (this.setIsModified() && !this.modalOpened) return "You have unsaved changes, are you sure?";
    modalOpened = false;
  }.bind(this);
}

CFM.prototype.serializeFields = function() {
  return filterAuthenticityToken(NR.serializeFields.call(this));
} 
CFM.prototype.setIsModified = NR.setIsModified
