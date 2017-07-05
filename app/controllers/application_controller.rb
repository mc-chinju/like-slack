class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :authenticate_user!
  helper_method :current_enterprise, :current_account

  def current_account
    Account.eager_load(:enterprise).find_by(id: session[:account_id])
  end

  def current_enterprise
    current_account.enterprise
  end
end
