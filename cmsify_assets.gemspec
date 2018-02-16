# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'cmsify_assets/version'

Gem::Specification.new do |spec|
  spec.name          = "cmsify_assets"
  spec.version       = CmsifyAssets::VERSION
  spec.authors       = ["Ply Interactive"]
  spec.email         = ["development@plyinteractive.com"]
  spec.summary       = ["CmsifyAssets is Ply Interactive's rails core assets for shopify/uptown style projects"]
  spec.homepage      = ""
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0")
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.6"
  spec.add_development_dependency "rake"

  spec.add_dependency 'jquery-rails'
  spec.add_dependency 'turbolinks', '~> 5'
  spec.add_dependency 'cocoon'
  spec.add_dependency 'underscore-rails'
  spec.add_dependency 'autoprefixer-rails'
  # using edge version of uikit with cdn
  # spec.add_dependency 'rails-assets-uikit'
  spec.add_dependency 'rails-assets-bourbon'
  spec.add_dependency 'rails-assets-html.sortable'
  spec.add_dependency 'rails-assets-parsleyjs'
  spec.add_dependency 'rails-assets-jquery.tablesorter'
  spec.add_dependency 'rails-assets-webui-popover'
  spec.add_dependency 'rails-assets-dropzone'
end
