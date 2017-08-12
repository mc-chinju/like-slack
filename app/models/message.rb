# frozen_string_literal: true

# == Schema Information
#
# Table name: messages
#
#  id         :integer          not null, primary key
#  body       :string(255)      not null
#  channel_id :integer          not null
#  account_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Message < ApplicationRecord
  belongs_to :channel
  belongs_to :account

  after_create_commit { MessageBroadcastJob.perform_later self }
end
