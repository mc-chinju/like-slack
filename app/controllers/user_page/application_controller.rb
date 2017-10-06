# frozen_string_literal: true

# rubocop:disable ClassAndModuleChildren
class UserPage::ApplicationController < ApplicationController
  before_action :doorkeeper_authorize!, if: :need_oauth_authenticate
  before_action :authenticate_user!

  helper_method :current_enterprise, :current_account, :current_channel

  def current_account
    session[:account_id] ||= current_user&.accounts&.first&.id
    current_user&.accounts&.find_by(id: session[:account_id])
  end

  def current_enterprise
    current_account&.enterprise
  end

  def current_channel
    current_enterprise.channels.find_by(id: session[:channel_id])
  end

  def authenticate_user!
    if need_oauth_authenticate
      set_parameter_from_accesstoken
    else
      super
    end
  end

  def need_oauth_authenticate
    request.path_info.start_with?("api") || Rails.env.test?
  end
end
# rubocop:enable ClassAndModuleChildren
