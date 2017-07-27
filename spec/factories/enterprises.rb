# == Schema Information
#
# Table name: enterprises
#
#  id           :integer          not null, primary key
#  name         :string(255)
#  account_name :string(255)      not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

FactoryGirl.define do
  factory :enterprise do
    name { Faker::Name.last_name }
    account_name { "user#{SecureRandom.hex 4}" }
  end
end
