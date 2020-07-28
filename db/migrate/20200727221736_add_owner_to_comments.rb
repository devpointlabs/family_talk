class AddOwnerToComments < ActiveRecord::Migration[6.0]
  def change
    add_column :comments, :owner, :string
  end
end
