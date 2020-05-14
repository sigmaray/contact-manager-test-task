class AddAvatarUrlToContacts < ActiveRecord::Migration[5.2]
  def change
    add_column :contacts, :avatar_url, :string
  end
end
