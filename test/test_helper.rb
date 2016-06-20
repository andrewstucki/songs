ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

class ActiveSupport::TestCase
  ActiveRecord::Migration.check_pending!
  DatabaseCleaner.strategy = :truncation
  setup { DatabaseCleaner.start }
  teardown { DatabaseCleaner.clean }
end
