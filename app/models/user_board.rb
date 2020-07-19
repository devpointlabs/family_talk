class UserBoard < ApplicationRecord
  belongs_to :board
  belongs_to :user

  def self.find_user_board (board_id)
    select("user_boards.user_id, user_boards.board_id")
    .join("boards b ON b.id = user_boards.board_id")
    .where("b.id = #{board_id}")
  end

end
