json.extract! channel, :id, :enterprise_id, :owner_id, :name, :created_at, :updated_at
json.url channel_url(channel, format: :json)
