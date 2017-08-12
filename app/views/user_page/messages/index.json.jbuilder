# frozen_string_literal: true

json.array! @messages, partial: "message", as: :message
