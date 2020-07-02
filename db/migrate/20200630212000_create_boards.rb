class CreateBoards < ActiveRecord::Migration[6.0]
  def change
    create_table :boards do |t|
      t.string :name
      t.string :description
      t.boolean :public

      t.timestamps
    end
  end
end
