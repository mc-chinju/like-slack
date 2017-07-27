# == Schema Information
#
# Table name: accounts
#
#  id            :integer          not null, primary key
#  user_id       :integer          not null
#  enterprise_id :integer          not null
#  role          :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

FactoryGirl.define do
  factory :account do
    trait :owner do
      role { Account.roles["owner"] }
    end

    trait :manager do
      role { Account.roles["manager"] }
    end

    trait :viewer do
      role { Account.roles["viewer"] }
    end

    trait :with_user do
      user
    end

    trait :with_enterprise do
      enterprise
    end

    factory :owner_account_with_relations, traits: [:owner, :with_user, :with_enterprise]
    factory :manager_account_with_relations, traits: [:manager, :with_user, :with_enterprise]
    factory :visitor_account_with_relations, traits: [:visitor, :with_user, :with_enterprise]
  end
end
