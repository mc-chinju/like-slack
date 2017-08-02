# frozen_string_literal: true

json.array! @enterprises, partial: "enterprises/enterprise", as: :enterprise
