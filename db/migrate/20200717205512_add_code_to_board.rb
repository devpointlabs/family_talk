class AddCodeToBoard < ActiveRecord::Migration[6.0]
  def change
    add_column :boards, :code, :integer, null: false
  end
end
