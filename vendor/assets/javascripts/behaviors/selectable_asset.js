Cmsify.SelectableAsset = function(el) {
  this.$el = $(el);
  this.select = this.select.bind(this);
  this.$el.on('click', this.select);
  return this;
};

Cmsify.SelectableAsset.prototype.select = function() {
  $('.js-' + this.$el.data('asset-name')).html(this.renderImageOrFileName());
  $('.js-remove-asset').removeClass('uk-hidden');
};

Cmsify.SelectableAsset.prototype.renderImageOrFileName = function() {
  return this.$el.data('asset-type').includes('image') ?
    $('<img class="cmsify-width-medium " src="' + this.$el.data('asset-url') + '" />') :
    this.$el.data('asset-url').split('/').pop();
};
