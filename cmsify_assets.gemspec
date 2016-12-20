# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'cmsify_assets/version'

Gem::Specification.new do |spec|
  spec.name          = "cmsify_assets"
  spec.version       = CmsifyAssets::VERSION
  spec.authors       = ["Andrew Shenstone"]
  spec.email         = ["andrew@plyinteractive.com"]
  spec.summary       = ["CmsifyAssets is Ply Interactive's rails core assets for shopify/uptown style projects"]
  spec.homepage      = ""
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0")
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.6"
  spec.add_development_dependency "rake"
end

# TODO: Find some way to require these libraries as a dependency. Can't use gems because they are an alternate step. I'm guessing bower with some sort of build step ```cmsify install``` or something

# source 'https://rails-assets.org' do
#   gem 'rails-assets-uikit'
#   gem 'rails-assets-html.sortable'
#   gem 'rails-assets-parsleyjs'
#   gem 'rails-assets-jquery.tablesorter'
#   gem 'rails-assets-webui-popover'
# end
