class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :description
      t.string :image
      t.belongs_to :board, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true
      t.integer :likes

      t.timestamps
    end
  end
end
