class Api::UserBoardsController < ApplicationController
 
    def create
    userBoard = current_user.user_boards.new(user_board_params)
    if userBoard.save
        render json: userBoard
    else 
        render json: { errors: post.errors }, status: :unprocessble_entity
    end
    end

    def destroy
       render json: current_user.user_boards.find(params[:id]).destroy 
    end
  

    private

    def user_board_params
    params.require(:user_board).permit(:user_id, :board_id)
    end

end
