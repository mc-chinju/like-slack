class MessagesController < ApplicationController
  before_action :set_message, only: [:show, :update, :destroy]

  def index
    @messages = current_account.messages
  end

  def show
  end

  def create
    @message = current_channel.messages.create!(message_params.merge(account: current_account))
    render :show
  end

  def update
    @message.update!(message_params)
    render :show
  end

  def destroy
    @message.destroy
    head :no_content
  end

  private
    def set_message
      @message = current_account.messages.find(params[:id])
    end

    def message_params
      params.require(:message).permit(:body)
    end
end
