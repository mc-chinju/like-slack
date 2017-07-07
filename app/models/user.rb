class User < ApplicationRecord
'<<<<<<< HEAD'
'======='
  has_many :accounts
  has_many :enterprises, through: :accounts
'>>>>>>> 0e3fa73353bca40df1a4fd50bf466a0ddc9e1542'
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
