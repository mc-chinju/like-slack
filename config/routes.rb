Rails.application.routes.draw do
  resources :messages
  resources :channels
  root to: "main#main"
  devise_for :users
  # devise_for :users, only: [:sign_in, :sign_out, :session], controllers: {
  #   registrations: :'users/registrations',
  #   sessions:      :'users/sessions'
  # }
end
