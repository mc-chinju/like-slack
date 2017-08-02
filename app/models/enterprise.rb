# frozen_string_literal: true

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

class Enterprise < ApplicationRecord
  has_many :accounts, dependent: :destroy
  has_many :users, through: :accounts
  has_many :channels
end
