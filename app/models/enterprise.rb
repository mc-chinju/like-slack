class Enterprise < ApplicationRecord
  has_many :accounts, dependent: :destroy
  has_many :users, through: :accounts
  has_many :channels
end
