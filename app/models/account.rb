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

class Account < ApplicationRecord
  belongs_to :user
  belongs_to :enterprise
  has_one    :channel, foreign_key: :owner_id
  has_many   :channel_members
  has_many   :channels, through: :channel_members
  has_many   :messages
  enum role: { owner: 0, manager: 1, viewer: 2 }
end
