// TODO: Initializers depend on libraries loaded through rails-assets gems.
// Gems can't be loaded through alternate sources (rails-assets.org) in .gemspec, so the best alternative
// will be adding bower to the gemspec somehow
$(document).ready(function() {
  // TODO: bring back turbolinks by fixing listeners on uikit commponents
  $(document).trigger("cmsify:load");
});
