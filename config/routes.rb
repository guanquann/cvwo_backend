Rails.application.routes.draw do
  # http://localhost:3000/rails/info/routes
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "posts#index"

  resources :post_threads

  resources :posts do
    resources :votes
    resources :comments
  end

  resources :categories

  resources :users
  
  post '/auth/login', to: 'authentication#login'
  get '/*a', to: 'application#not_found'
end
