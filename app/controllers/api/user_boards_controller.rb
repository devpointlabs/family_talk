class Api::UserBoardsController < ApplicationController
    def index
        render json: User.find(params[:user_id]).user_boards.all
    end

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
        board = UserBoard.set_user_board(params[:board_id], current_user.id)
        # binding.pry
        # render json: board.destroy
    end
  

    private

    def user_board_params
    params.require(:user_board).permit(:user_id, :board_id)
    end

end
