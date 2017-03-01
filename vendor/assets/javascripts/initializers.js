Dropzone.autoDiscover = false;
// TODO: Initializers depend on libraries loaded through rails-assets gems.
// Gems can't be loaded through alternate sources (rails-assets.org) in .gemspec, so the best alternative
// will be adding bower to the gemspec somehow
$(document).on('turbolinks:load', function() {
  UIkit.init();
  Cmsify.initTinymce();
  $('.js-nested-resources').each(function() {
    new Cmsify.NestedResources(this);
  });
  $('.js-checkbox-modal').each(function() {
    new Cmsify.CheckboxModal(this);
  });
  $('.js-sortable').each(function() {
    new Cmsify.Sortable(this, {
      forcePlaceholderSize: true,
      items: ':not(.disabled)'
    });
  });
  $(".js-tablesort").each(function() {
    $(this).tablesorter();
  });
  $(".js-filter-search").each(function(e) {
    $(this).on('keyup', function(e) {
      if (e.keyCode === 13) {
        $(this).closest('form').submit();
      }
    });
  })
  $(".js-filter-input").each(function(e) {
    $(this).on('change', function(e) {
      $(this).closest('form').submit();
    });
  });
  $(".webui-popover").remove();
  $(".js-webui-popover").each(function(e) {
    $(this).webuiPopover({
      container: "main",
      placement: "left",
      multi: false,
      cache: false
    });
  });
  $('.js-dropzone').each(function() {
    var $doneButton = $(this).find('.js-dropzone-done');
    $(this).find('form').dropzone({
      dictDefaultMessage: 'Drop files or click here to upload.',
      init: function() {
        this.on("addedfile", function(files) {
          $doneButton.addClass('disabled');
        }).on("queuecomplete", function(files) {
          $doneButton.removeClass('disabled');
        });
      }
    });
  });
  $('.js-dropzone-image-upload').each(function() {
    var resourceName = this.dataset.resourceName;
    Cmsify.remoteUpload($(this).find('form'), 
      '.js-' + resourceName + '-table-element', 
      '.js-' + resourceName + '-table-element',
      function(clone, cloneInput, req, res) {
        $('.js-' + resourceName).attr('src', res.attachment.url).removeClass('uk-hidden');
        $(clone).find('img').first().attr('src', res.attachment.icon.url);
        $(clone).first().removeClass('uk-hidden');
        UIkit.modal('#add-new-' + resourceName).hide();
        $('.js-remove-image').removeClass('uk-hidden');
      });
  });
  $('.js-dropzone-asset-upload').each(function() {
    Cmsify.remoteUpload($(this).find('form'),
      '.js-asset-table-element',
      '.js-asset-table-element',
      function(clone, cloneInput, req, res) {
        UIkit.modal('#add-new-asset').hide();
        var urlArray = res.attachment.url.split('/');
        var $jsAsset = $('.js-asset').first();
        var $anchor = $jsAsset.find('a').first();
        $anchor.text(urlArray[urlArray.length - 1]);
        $anchor.attr('href', "/admin/assets/" + res.id);
        $jsAsset.removeClass('uk-hidden');
        $('.js-asset-hide-on-select').addClass('uk-hidden');
      }
    );
  });
  $('.js-asset-table-element').each(function() {
    var $this = $(this);
    var $tableImg = $this.find('img');
    var $jsAsset = $('.js-asset').first();
    var $toBeHidden = $('.js-asset-hide-on-select');
    $this.find('input').on('click', function() {
      var $anchor = $jsAsset.find('a').first();
      var $assetImg = $jsAsset.find('img').first();
      $anchor.text($this.find('a').text());
      $anchor.attr('href', $this.find('a').first().attr('href'));
      if ($tableImg.length) {
        $assetImg.attr('src', $tableImg.first().attr('src'));
        $assetImg.removeClass('uk-hidden');
      } else {
        $assetImg.addClass('uk-hidden');
      }
      $jsAsset.removeClass('uk-hidden');
      $toBeHidden.addClass('uk-hidden');
    });
  });
  $('.js-image-element').each(function() {
    var $this = $(this);
    var imageUrl = $this.data('imageUrl');
    $this.find('input').on('click', function(event) {
      $($this.data('imageTarget')).attr('src', imageUrl).removeClass('uk-hidden');
      $('.js-remove-image').removeClass('uk-hidden');
    });
  });
  $('.js-remove-image').each(function() {
    var $this = $(this);
    $this.on('click', function() {
      $this.find("input[name*='_destroy']").first().val(1);
      $($this.data('target')).addClass('uk-hidden');
      $this.addClass('uk-hidden');
    }.bind(this));
  });
  $('.uk-modal').on('show.uk.modal', function() {
    $('.js-webui-popover').webuiPopover('hide');
  });
  $('.js-changed-form-modal').each(function() {
    new Cmsify.ChangedFormModal(this);
  });
});
