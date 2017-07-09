json.extract! message, :id, :body, :channel_id, :account_id, :created_at, :updated_at
json.url message_url(message, format: :json)
