class Channel < ApplicationRecord
  belongs_to :account, foreign_key: :owner_id
  belongs_to :enterprise
  has_many :channel_members
  has_many :accounts, through: :channel_members
  has_many :messages
end
