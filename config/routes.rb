# frozen_string_literal: true

Rails.application.routes.draw do
  use_doorkeeper
  root to: "main#main"
  resources :messages
  resources :channels do
    member do
      put "/switch", to: "channels#switch"
      patch "/switch", to: "channels#switch"
    end
  end
  resources :enterprises, only: %i[index show create destroy]
  devise_for :users, only: %i[sign_in sign_out session], controllers: {
    registrations: :'users/registrations',
    # sessions:      :'users/sessions'
  }
  devise_scope :user do
    post :'/users', to: "users/registrations#create", as: :user_registration
    get :'/users/sign_up', to: "users/registrations#new", as: :new_user_registration
  end
  mount ActionCable.server => "/cable"
end
