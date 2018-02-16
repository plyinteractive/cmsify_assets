// adding nested resources with Cocoon through a UIkit.modal
Cmsify.NestedResources = function (el) {
  this.$el = $(el);
  this.$alertBox = this.$el.find('.js-alert-box');
  this.parsley = this.$el.closest('.js-parsley').parsley();
  this.$el.find('.js-nested-resource').each(function(index, el) {
    new Cmsify.NestedResource(el, {
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
      new Cmsify.NestedResource(insertedItem, {
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

Cmsify.NestedResource = function(el, options) {
  this.$el = $(el);
  this.options = options;
  this.$doneButton = this.$el.find('.js-nested-resource__done');
  this.$cancelButton = this.$el.find('.js-nested-resource__cancel');
  this.$fields = this.$el.find(':input');
  this.parsleyGroup = this.options.modelName + this.options.index;
  this.modal_target = this.$el.find('.uk-modal')
  this.modal = UIkit.modal(this.modal_target, {
    bgclose: false,
    center: true
  });
  this.boundHandleCloseClick = this.handleCloseClick.bind(this);
  this.isModified = false;
  this.init();

  UIkit.util.on(this.modal_target, 'show', function() {
    this.lastData = this.serializeFields();
    sortable('.js-sortable', 'disable');
  }.bind(this));

  UIkit.util.on(this.modal_target, 'hide', function() {
    sortable('.js-sortable', 'enable');
  }.bind(this));

  this.$doneButton
    .on('click', function(e) {
      e.preventDefault();
      if (this.validateFields()) {
        if (this.isModified) {
          this.updateResource();
          this.$el.addClass('uk-block-notification-light');
          this.options.parent.$alertBox.removeClass('uk-hidden');
        }
        this.modal.hide();
      }
    }.bind(this));

  this.$cancelButton
    .on('click', function(e) {
      e.preventDefault();
      UIkit.util.on(this.modal_target, 'hide', this.boundHandleCloseClick);
      this.modal.hide();
    }.bind(this));

  this.$fields
    .on('keyup change blur', function(e) {
      this.validateFields();
    }.bind(this))
    .on('tinymce:change', function(e) {
      this.isModified = true;
    }.bind(this));
};

Cmsify.NestedResource.prototype.handleCloseClick = function() {
  if (this.options.isNew) {
    this.$el.find('.js-remove-association').trigger('click');
  } else {
    this.deserializeFields(this.lastData);
  }
  UIkit.util.off(this.modal_target, 'hide', this.boundHandleCloseClick);
};

Cmsify.NestedResource.prototype.init = function() {
  if (this.options.isNew) { this.initNewResource(); }
  this.addValidationGroup();
};

Cmsify.NestedResource.prototype.validateFields = function() {
  var isValid = this.options.parent.parsley.validate({group: this.parsleyGroup});
  this.$doneButton.attr('disabled', !isValid);
  this.setIsModified();
  return isValid;
};

Cmsify.NestedResource.prototype.addValidationGroup = function() {
  this.$fields.each(function (index, el) {
     $(el).attr('data-parsley-group', this.parsleyGroup);
  }.bind(this));
};

Cmsify.NestedResource.prototype.initNewResource = function() {
  Cmsify.initTinymce();
  this.$el.addClass('uk-block-notification-light');
  this.$el.find('.js-move').html('');
  this.$el.find('.js-link').html('Adding New ' + this.options.modelName);
  this.modal.show();
};

Cmsify.NestedResource.prototype.getModalSelector = function() {
  return '.js-nested-resource[data-model-name="' + this.options.modelName + '"][data-index="' + this.options.index + '"] .uk-modal';
};

Cmsify.NestedResource.prototype.serializeFields = function () {
  //HACK needed because of how turbolinks is loading. Between the time that the page load
  //event is fired and the page actually becomes useful the authenicity token being changed
  //by turbolinks
  return Cmsify.util.filterAuthenticityToken(this.$el.find(':input').serializeArray());
};

Cmsify.NestedResource.prototype.deserializeFields = function(fields) {
  $.each(fields, function(key, value) {
    $('[name="'+ value['name'] +'"]').val(value['value']);
  });
};

Cmsify.NestedResource.prototype.setIsModified = function () {
  this.isModified = (tinyMCE.editors.some(function(editor) {return editor.isDirty()}) || (JSON.stringify(this.serializeFields()) !== JSON.stringify(this.lastData)));
  return this.isModified;
};

Cmsify.NestedResource.prototype.updateResource = function() {
  this.options.isNew = false;
  var title = this.$el.find('.js-title').val();
  this.$el.find('.js-link').attr('href', this.getModalSelector()).html(title);
};
