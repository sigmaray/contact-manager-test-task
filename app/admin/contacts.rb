ActiveAdmin.register Contact do
  permit_params :first_name, :last_name, :avatar_url

  index do
    selectable_column
    id_column
    column :poi
    column :first_name
    column :last_name
    column :avatar do |contact|
      if contact.avatar_url.present?
        link_to contact.avatar_url, target: '_blank' do
          image_tag(contact.avatar_url)
        end
      end
    end
    column :created_at
    column :updated_at
    actions
  end

  form do |f|
    f.semantic_errors
    f.inputs do
      f.input :id, as: :hidden
      f.input :first_name
      f.input :last_name
      f.input :avatar_url
    end
    f.actions do
      f.action(:submit)
    end
  end

  show do
    attributes_table do
      row :first_name
      row :last_name
      row :avatar do
        if contact.avatar_url.present?
          link_to contact.avatar_url, target: '_blank' do
            image_tag(contact.avatar_url)
          end
        end
      end
      row :liked_by do |contact|
        ul do
          contact.get_likes.map do |l|
            li do
              link_to l.voter.email, [:admin, l.votable]
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
  # permit_params :first_name, :last_name
  #
  # or
  #
  # permit_params do
  #   permitted = [:first_name, :last_name]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
end
