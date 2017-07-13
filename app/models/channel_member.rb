class ChannelMember < ApplicationRecord
  belongs_to :account
  belongs_to :channel
  has_many :messages
end
