class AddImageToBoards < ActiveRecord::Migration[6.0]
  def change
    add_column :boards, :image, :string
  end
end
