# frozen_string_literal: true

class ChannelsController < ApplicationController
  before_action :set_channel, only: %i[switch destroy]

  def index
    @channels = current_account.channels
  end

  # def show
  # end

  def switch
    session[:channel_id] = @channel.id
    render :show
  end

  def create
    ActiveRecord::Base.transaction do
      @channel = current_enterprise.channels.create!(channel_params.merge(owner_id: current_account.id))
      current_account.channel_members.create!(channel: @channel)
    end
    render :show
  end

  def update
    @channel.update(channel_params)
  end

  def destroy
    @channel.destroy
    head :no_content
  end

  private

    def set_channel
      @channel = current_account.channels.find(params[:id])
    end

    def channel_params
      params.require(:channel).permit(:name)
    end
end
