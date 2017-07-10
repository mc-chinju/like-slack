class Account < ApplicationRecord
  belongs_to :user
  belongs_to :enterprise
  enum role: { owner: 0, manager: 1, viewer: 2 }
end
