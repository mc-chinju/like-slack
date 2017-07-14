class Message < ApplicationRecord
  belongs_to :channel
  belongs_to :account
end
