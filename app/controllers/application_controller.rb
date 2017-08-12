# frozen_string_literal: true

class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception, unless: :need_oauth_authenticate

  before_action :configure_permitted_parameters, if: :devise_controller?
  helper_method :current_enterprise

  # ログイン前においてもヘッダーにて使用されているため定義
  def current_enterprise
    nil
  end

  def unset_parameters
    sign_out current_user if user_signed_in?
  end

  def set_parameter_from_accesstoken
    return unless (user_id = doorkeeper_token.try :resource_owner_id).present?
    user = User.find_by(id: user_id)
    raise NotFound unless user.present?
    sign_in :user, user
  end

  protected

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:enterprise_account, :login, :email, :password, :password_confirmation) }
      devise_parameter_sanitizer.permit(:sign_in) { |u| u.permit(:login, :email, :password, :remember_me) }
      devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(:login, :email, :password, :password_confirmation, :current_password) }
    end
end
