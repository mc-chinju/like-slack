ENV['RAILS_ENV'] ||= 'test'

require 'spec_helper'
require 'rspec/rails'
require 'devise'
require 'devise/test_helpers'
require 'database_cleaner'
require File.expand_path('../../config/environment', __FILE__)

abort("The Rails environment is running in production mode!") if Rails.env.production?
Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }
ActiveRecord::Migration.maintain_test_schema!
DatabaseCleaner.strategy = :truncation
Faker::Config.locale = :en

RSpec.configure do |config|
  config.include FactoryGirl::Syntax::Methods
  config.include Devise::TestHelpers, type: :controller

  # include support files
  config.include HttpMethods
  config.include Oauth

  config.fixture_path = "#{::Rails.root}/spec/fixtures"
  config.use_transactional_fixtures = true
  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!

  config.before(:each) do
    prepare_oauth
  end
end
