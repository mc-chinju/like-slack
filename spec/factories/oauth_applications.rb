# frozen_string_literal: true

FactoryGirl.define do
  factory :oauth_application, class: Doorkeeper::Application do
    name         "Test"
    uid          { SecureRandom.hex 32 }
    secret       { SecureRandom.hex 32 }
    redirect_uri "https://like-slack-test.co.jp"
  end

  factory :oauth_access_token, class: Doorkeeper::AccessToken do
    token         { SecureRandom.hex 32 }
    refresh_token { SecureRandom.hex 32 }
    expires_in    1.hour
    created_at    Time.now
    scopes        ""
  end
end
