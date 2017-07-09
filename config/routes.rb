Rails.application.routes.draw do
  root to: "main#main"
  resources :enterprises
  devise_for :users
  # devise_for :users, only: [:sign_in, :sign_out, :session], controllers: {
  #   registrations: :'users/registrations',
  #   sessions:      :'users/sessions'
  # }
end
