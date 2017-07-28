# frozen_string_literal: true

# rubocop:disable ClassAndModuleChildren
class Users::RegistrationsController < Devise::RegistrationsController
  # before_filter :configure_sign_up_params, only: [:create]
  # before_filter :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  def create
    render(:new) && return unless check_user_params
    ActiveRecord::Base.transaction do
      super do |user|
        # default params
        user.name = user.login
        user.language = :ja
      end
    end
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.for(:sign_up) << :attribute
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.for(:account_update) << :attribute
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end

  private

    def admin_account_params; end

    def enterprise_params; end

    def check_user_params
      @before_params  = params
      @error_messages = []
      check_login_name
      check_email
      check_password
      @error_messages.none?
    end

    # rubocop:disable all
    def check_login_name
      @error_messages << "user.blank_login_error" && return unless params[:user].present? && params[:user][:login].present? && params[:user][:login].is_a?(String)
      @error_messages << "user.too_long_login_error" && return if params[:user][:login].size > User::LOGIN_MAX_SIZE
      @error_messages << "user.duplicate_login_error" && return if User.find_by(login: params[:user][:login]).present?
      @error_messages << "user.invalid_login_format_error" && return unless params[:user][:login].start_with?(User::LOGIN_FORMAT)
    end

    def check_email
      @error_messages << "user.blank_email_error" && return unless params[:user].present? && params[:user][:email].present?
      @error_messages << "user.invalid_email_error" && return unless params[:user][:email].is_a?(String) && params[:user][:email].valid_email?
      @error_messages << "user.too_long_email_error" && return if params[:user][:email].size > User::EMAIL_MAX_SIZE
      @error_messages << "user.duplicate_email_error" && return if User.find_by(email: params[:user][:email]).present?
    end

    def check_password
      @error_messages << "user.blank_password_error" && return unless params[:user].present? && params[:user][:password].present? && params[:user][:password].is_a?(String)
      @error_messages << "user.too_short_password_error" && return if params[:user][:password].size < User::PASSWORD_MIN_SIZE
      @error_messages << "user.too_long_password_error" && return if params[:user][:password].size > User::PASSWORD_MAX_SIZE
      @error_messages << "user.invalid_password_format_error" && return unless params[:user][:password].start_with?(User::PASSWORD_FORMAT)
      @error_messages << "user.invalid_password_confirmation_error" && return unless params[:user][:password] == params[:user][:password_confirmation]
    end
    # rubocop:enable all
end
# rubocop:enable ClassAndModuleChildren
