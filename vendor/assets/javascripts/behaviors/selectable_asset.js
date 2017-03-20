Cmsify.SelectableAsset = function(el) {
  this.$el = $(el);
  this.select = this.select.bind(this);
  this.$el.on('click', this.select);
  return this;
};

Cmsify.SelectableAsset.prototype.select = function() {
  $preview = $('.js-' + this.$el.data('asset-name'));
  $preview.html(this.renderAssetOriginalPreview());
  $preview.append($('<p />').html(this.getFileName()));
  $('.js-remove-asset').removeClass('uk-hidden');
  if (this.$el.data('asset-name') === 'download') {
    $('#resource_item_name').val(this.getFileName());
  }
};

Cmsify.SelectableAsset.prototype.renderAssetOriginalPreview = function() {
  return this.renderAssetPreview(this.getUrl());
};

Cmsify.SelectableAsset.prototype.renderAssetIconPreview = function() {
  return this.renderAssetPreview(this.getIconUrl());
};

Cmsify.SelectableAsset.prototype.renderAssetPreview = function(imageUrl) {
  return this.$el.data('asset-type').includes('image') ?
    $('<img class="cmsify-width-medium " src="' + imageUrl + '" />') :
    $('<i class="uk-icon-file-o uk-icon-large uk-text-muted"></i>');
};

Cmsify.SelectableAsset.prototype.getFilePath = function() {
  fileName = this.$el.data('asset-url').split('/');
  fileName.pop();
  return fileName.join('/');
};

Cmsify.SelectableAsset.prototype.getFileName = function() {
  return this.$el.data('asset-url').split('/').pop();
};

Cmsify.SelectableAsset.prototype.getUrl = function() {
  return this.$el.data('asset-url');
};

Cmsify.SelectableAsset.prototype.getIconUrl = function() {
  return this.getFilePath() + "/icon_" + this.getFileName();
};
