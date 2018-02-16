require "cmsify_assets/version"

module CmsifyAssets
  class Engine < ::Rails::Engine
    require 'jquery-rails'
    require 'turbolinks'
    require 'cocoon'
    require 'underscore-rails'
    require 'autoprefixer-rails'
    require 'rails-assets-bourbon'
    require 'rails-assets-html.sortable'
    require 'rails-assets-parsleyjs'
    require 'rails-assets-jquery.tablesorter'
    require 'rails-assets-webui-popover'
    require 'rails-assets-dropzone'
  end
end
