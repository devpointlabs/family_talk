Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do

    resources :users, only: [:index, :update]
    
    resources :posts, only: [:index]
   
    resources :posts do
      resources :comments
    end


    resources :boards do 
      resources :posts, module: "boards"
    end

    resources :users do 
      resources :posts, module: "user"
    end

    
  end
end