class Account < ApplicationRecord
  belongs_to :user
  belongs_to :enterprise
  has_many   :channel_members
  has_many   :channels, through: :channel_members
  has_many   :messages
  enum role: { owner: 0, manager: 1, viewer: 2 }
end
