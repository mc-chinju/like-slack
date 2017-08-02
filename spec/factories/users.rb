# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  reset_password_token   :string(255)
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string(255)
#  last_sign_in_ip        :string(255)
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  login                  :string(255)      not null
#  name                   :string(255)
#  language               :string(255)
#

FactoryGirl.define do
  factory :user do
    email { Faker::Internet.email }
    login { "user#{SecureRandom.hex 4}" }
    name  { Faker::Name.last_name }

    password { "testpass012" }
    password_confirmation { "testpass012" }
  end
end
