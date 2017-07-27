# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  reset_password_token   :string(255)
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string(255)
#  last_sign_in_ip        :string(255)
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  login                  :string(255)      not null
#  name                   :string(255)
#  language               :string(255)
#

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
