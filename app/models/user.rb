class User < ApplicationRecord
  has_many :accounts
  has_many :enterprises, through: :accounts
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  LOGIN_MAX_SIZE = 100
  LOGIN_FORMAT   = /\A[a-z][0-9a-z\-]*[0-9a-z]\z/
  EMAIL_MAX_SIZE    = 100
  PASSWORD_MIN_SIZE = 8
  PASSWORD_MAX_SIZE = 100
  PASSWORD_FORMAT   = /\A[A-Za-z0-9#$%&()*+,\-.\/:;<=>?@\[\]^_{|}~!]+\z/
end
