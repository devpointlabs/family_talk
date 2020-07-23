class Board < ApplicationRecord
  has_many :users, through: :user_boards
  has_many :user_boards, dependent: :destroy
  has_many :posts, dependent: :destroy
  belongs_to :user


  def self.find_board (code)
    select("boards.id, code")
    .where("code = #{code}")
  end


end
