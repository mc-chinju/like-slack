FactoryGirl.define do
  factory :user do
    email { Faker::Internet.email }
    login { "user#{SecureRandom.hex 4}" }
    name  { Faker::Name.last_name }

    password { "testpass012" }
    password_confirmation { "testpass012" }
  end
end