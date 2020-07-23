class Api::UserBoardsController < ApplicationController
    def index
        render json: User.find(params[:user_id]).user_boards.all
    end

    def get_user_boards
        render json: current_user.user_boards.all
    end

    def create
    userBoard = current_user.user_boards.new(user_board_params)
    if userBoard.save
        render json: userBoard
    else 
        render json: { errors: post.errors }, status: :unprocessble_entity
    end
    end

    def destroy
        boards = current_user.user_boards.all
        board = boards.find_by_board_id(params[:board_id])
        render json: board.destroy
    end
  

    private

    def user_board_params
    params.require(:user_board).permit(:user_id, :board_id)
    end

end
