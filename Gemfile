source 'https://rubygems.org'

ruby '2.4.1'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

# defaults
gem 'coffee-rails', '4.2.2'
# gem 'mysql2', '~> 0.4.4'
gem 'pg'
gem 'puma', '~> 3.7'
gem 'rails', '~> 5.1.2'
gem 'sass-rails', '~> 5.0'
gem 'jquery-rails'
gem 'uglifier', '>= 1.3.0'
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.5'

# options
gem 'config' # environment settings
gem 'devise', '~> 4.3'
gem 'ledermann-rails-settings' # model settings
gem 'redis', '~> 3.0'
gem 'webpacker', '~> 2.0'
gem 'doorkeeper'
gem 'slim-rails'
gem 'bootstrap-sass', '~> 3.3.6'

group :development do
  gem 'capistrano', '~> 3.8.2'
  gem 'capistrano-bundler'
  gem 'capistrano-rails'
  gem 'capistrano-rbenv', '~> 2.0.2'
  gem 'capistrano-safe-deploy-to', '~> 1.1.1'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'rubocop', '~> 0.49.1', require: false
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'foreman'
  gem 'web-console', '>= 3.3.0'
  gem 'annotate'
  # gem 'rails-erd'
end

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'capybara', '~> 2.13'
  gem 'pry-byebug'
  gem 'pry-rails'
  gem 'selenium-webdriver'
end

group :test do
  gem 'database_cleaner', '~> 1.6.1'
  gem 'factory_girl_rails', '~> 4.8.0'
  gem 'faker', '~> 1.7.3'
  gem 'rspec-rails', '~> 3.6'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
