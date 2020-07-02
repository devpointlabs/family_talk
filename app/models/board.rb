class Board < ApplicationRecord
  has_many :users, through: :user_boards
  has_many :posts
end
