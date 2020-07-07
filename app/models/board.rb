class Board < ApplicationRecord
  has_many :users, through: :user_boards, dependent: :destroy
  has_many :posts, dependent: :destroy
end
