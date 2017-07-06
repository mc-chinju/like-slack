class Account < ApplicationRecord
<<<<<<< HEAD
  def belongs_to(devise [, :class_name])
  end
=======
  belongs_to :user
  belongs_to :enterprise
>>>>>>> 691493f4a5d67782362e3892b71ce864b32cfa1b
end
