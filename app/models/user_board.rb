class UserBoard < ApplicationRecord
  belongs_to :board
  belongs_to :user

  
  def self.set_user_board (board_id, user)
    select("user_boards.id AS id, user_boards.user_id AS user_id, user_boards.board_id AS board_id FROM user_boards")
    .where("user_boards.board_id = #{board_id} AND user_id = #{user}")
  end

end
