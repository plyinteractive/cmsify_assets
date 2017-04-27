Cmsify.AttachedAsset = function(el) {
  this.$el = $(el);
  this.$preview = this.$el.find('.js-attached-preview');
  this.$altTitleText = this.$el.find('.js-attached-alt-title-text');
  this.$removeAssetButton = this.$el.find('.js-attached-remove-asset');
  this.$destroyField = this.$el.find("input[name*='_destroy']");

  this.loadSelectedAsset = this.loadSelectedAsset.bind(this);
  this.removeAssetPreview = this.removeAssetPreview.bind(this);
  this.render = this.render.bind(this);

  this.$el.on('selected', this.loadSelectedAsset);
  this.$removeAssetButton.on('click', this.removeAssetPreview);

  this.render();

  return this;
};

Cmsify.AttachedAsset.prototype.removeAssetPreview = function() {
  this.$destroyField.val(true);
  this.render();
};

Cmsify.AttachedAsset.prototype.loadSelectedAsset = function(event) {
  var options = event.options;
  this.$preview.html(options.preview);
  this.$preview.append($('<p />').html(options.fileName));
  if (this.$altTitleText.val() === "") {
    this.$altTitleText.val(options.fileName);
  }
  this.$destroyField.val(false);
  this.render();
};

Cmsify.AttachedAsset.prototype.render = function() {
  if (this.$destroyField.val() === "true") {
    this.$preview.addClass('uk-hidden');
    this.$altTitleText.val("");
    this.$removeAssetButton.addClass('uk-hidden');
  } else {
    this.$preview.removeClass('uk-hidden');
    if (this.$altTitleText.val() !== "") {
      this.$removeAssetButton.removeClass('uk-hidden');
    }
  }
};
