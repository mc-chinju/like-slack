class Account < ApplicationRecord
<<<<<<< HEAD
<<<<<<< HEAD
  def belongs_to(devise [, :class_name])
  end
=======
  belongs_to :user
  belongs_to :enterprise
>>>>>>> 691493f4a5d67782362e3892b71ce864b32cfa1b
=======
  belongs_to :user
  belongs_to :enterprise
>>>>>>> 0e3fa73353bca40df1a4fd50bf466a0ddc9e1542
end
