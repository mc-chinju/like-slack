Rails.application.routes.draw do
'<<<<<<< HEAD'
  resources :enterprises
  devise_for :users
  resources :accounts
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
'======='
  root to: "main#main"
  devise_for :users
  # devise_for :users, only: [:sign_in, :sign_out, :session], controllers: {
  #   registrations: :'users/registrations',
  #   sessions:      :'users/sessions'
  # }
'>>>>>>> 0e3fa73353bca40df1a4fd50bf466a0ddc9e1542'
end
