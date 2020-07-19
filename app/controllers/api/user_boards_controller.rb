class Api::UserBoardsController < ApplicationController
 
    def create
    userBoard = current_user.user_boards.new(user_board_params)
    if userBoard.save
        render json: userBoard
    else 
        render json: { errors: post.errors }, status: :unprocessble_entity
    end
    end

    # works sometimes? not sure what is going on
    def destroy
        user_board = current_user.user_boards.find(params[:board_id])
        binding.pry
        render json: user_board.destroy
    end
  

    private

    def user_board_params
    params.require(:user_board).permit(:user_id, :board_id)
    end

end
