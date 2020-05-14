ActiveAdmin.register User do
  controller do
    actions :all, except: [:edit]
  end

  show do
    attributes_table do
      row :email
      row :likes do |user|
        ul do
          user.find_liked_items.map do |l|
            li do
              link_to l, [:admin, l]
            end
          end
        end
      end
      row :created_at
      row :updated_at
    end
    active_admin_comments
  end

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :email, :encrypted_password, :reset_password_token, :reset_password_sent_at, :remember_created_at
  #
  # or
  #
  # permit_params do
  #   permitted = [:email, :encrypted_password, :reset_password_token, :reset_password_sent_at, :remember_created_at]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
end
