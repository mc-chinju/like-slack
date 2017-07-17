# == Schema Information
#
# Table name: channel_members
#
#  id         :integer          not null, primary key
#  account_id :integer
#  channel_id :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ChannelMember < ApplicationRecord
  belongs_to :account
  belongs_to :channel
  has_many :messages
end
