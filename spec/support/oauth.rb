# frozen_string_literal: true

module Oauth
  def prepare_oauth
    enterprise = create :enterprise
    owner_account = create :owner_account_with_relations, enterprise: enterprise
    login owner_account.user
  end

  def login(user)
    @application ||= Doorkeeper::Application.first || create(:oauth_application)
    @account = user.accounts.first
    @access_token = @application.access_tokens.find_by(resource_owner_id: user.id) || create(:oauth_access_token, resource_owner_id: user.id, application_id: @application.id)
  end

  def logout
    @application ||= Doorkeeper::Application.first || create(:oauth_application)
    @account = nil
    @access_token = @application.access_tokens.find_by(resource_owner_id: nil) || create(:oauth_access_token, resource_owner_id: nil, application_id: @application.id)
  end

  def current_user
    @account.try :user
  end

  def current_account
    @account
  end

  def current_enterprise
    @account.try :enterprise
  end

  # switch は性質上分岐を多くしたい
  # rubocop:disable Style/CyclomaticComplexity Metrics/AbcSize
  def switch(system_role)
    account =
      case system_role
      when :system_owner
        create :owner_account_with_relations
      when :owner
        current_enterprise.accounts.find_by(role: Account::OWNER)
      when :manager
        current_enterprise.accounts.find_by(role: Account::MANAGER)
      when :viewer
        current_enterprise.accounts.find_by(role: Account::VISITOR) || create(:viewer_account_with_relations, enterprise: current_enterprise)
      when :other
        Account.where.not(enterprise: current_enterprise).first || create(:owner_account_with_relations)
      else
        raise "invalid system role"
      end
    login account.user
  end

  def default_header
    if @access_token.present?
      {
        "Authorization" => "Bearer #{@access_token.token}",
        "Accept" => "application/json",
        "Content-Type" => "application/json"
      }
    else
      {
        "Accept" => "application/json",
        "Content-Type" => "application/json"
      }
    end
  end

  def upload_header
    if @access_token.present?
      {
        "Authorization" => "Bearer #{@access_token.token}",
        "Accept" => "application/json",
        "Content-Type" => "multipart/form-data"
      }
    else
      {
        "Accept" => "application/json",
        "Content-Type" => "multipart/form-data"
      }
    end
  end
end
