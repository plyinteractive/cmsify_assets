var NR = Cmsify.NestedResource.prototype;
var CFM = Cmsify.ChangedFormModal = function(el) {
  this.$el = $(el);
  this.form = this.$el.find('form');
  this.modal = UIkit.modal(this.$el.find('#js-unsaved-modal'));
  this.$el.find('.js-check-changed').each(function(index, ele) {
    $(ele).on('click', function(e) {
      if (this.setIsModified()) {
        e.preventDefault();
        this.modal.show();
      }
    }.bind(this));
  }.bind(this));
  this.lastData = this.serializeFields();
}

CFM.prototype.serializeFields = NR.serializeFields;
CFM.prototype.setIsModified = NR.setIsModified
