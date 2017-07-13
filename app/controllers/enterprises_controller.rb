class EnterprisesController < ApplicationController
  before_action :set_enterprise, only: [:show, :edit, :update, :destroy]

  def index
    @enterprises = current_user.enterprises
  end

  def show
  end

  def create
    # TODO: model にロジックを移したい
    ActiveRecord::Base.transaction do
      @enterprise = Enterprise.create!(enterprise_params)
      account = current_user.accounts.create!(enterprise: @enterprise, role: Account.roles["owner"])
      # TODO: general チャンネルの作成
      session[:account_id] = account.id
    end
    render :show
  end

  # def update
  #   respond_to do |format|
  #     if @enterprise.update(enterprise_params)
  #       format.json { render :show, status: :ok, location: @enterprise }
  #     else
  #       format.json { render json: @enterprise.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  def destroy
    @enterprise.destroy
    reset_session
    head :no_content
  end

  private
    def set_enterprise
      @enterprise = current_user.enterprises.find_by(id: params[:id])
    end

    def enterprise_params
      params.require(:enterprise).permit(:name, :account_name)
    end
end
