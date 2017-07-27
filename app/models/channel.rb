# == Schema Information
#
# Table name: channels
#
#  id            :integer          not null, primary key
#  name          :string(255)
#  enterprise_id :integer          not null
#  owner_id      :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Channel < ApplicationRecord
  belongs_to :account, foreign_key: :owner_id
  belongs_to :enterprise
  has_many :channel_members
  has_many :accounts, through: :channel_members
  has_many :messages
end
