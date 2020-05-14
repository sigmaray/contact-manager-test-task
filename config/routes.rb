Rails.application.routes.draw do
  namespace :api do
    devise_for :users,
               controllers: {
                 sessions: 'api/sessions',
                 registrations: 'api/registrations'
               }

    resources :contacts do
      member do
        put 'like'
        put 'unlike'
      end
    end
  end

  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
