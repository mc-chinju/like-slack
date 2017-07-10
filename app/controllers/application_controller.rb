class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception, unless: :need_oauth_authenticate

  before_action :authenticate_user!
  before_action :doorkeeper_authorize!, if: :need_oauth_authenticate
  helper_method :current_enterprise, :current_account

  def current_account
    Account.eager_load(:enterprise).find_by(id: session[:account_id])
  end

  def current_enterprise
    current_account.enterprise
  end

  def authenticate_user!
    if need_oauth_authenticate
      set_parameter_from_accesstoken
    else
      super
    end
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

  def need_oauth_authenticate
    /\A\/api\// === request.path_info || Rails.env.test?
  end
end
