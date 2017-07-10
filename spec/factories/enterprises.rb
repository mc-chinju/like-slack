FactoryGirl.define do
  factory :enterprise do
    name { Faker::Name.last_name }
    account_name { "user#{SecureRandom.hex 4}" }
  end
end