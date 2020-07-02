class Api::BoardsController < ApplicationController
  # before_action :set_boards

  def index
    render json: Board.all
  end

  def show
    board = Board.find(params[:id]) 

    render json: board
  end


  def create
    board = Board.new(board_params)

    if board.save
      render json: board
    else
      render json: board.errors, status: 422
    end
  end

  def update
    
  end

  private

  def board_params 
    params.require(:board).permit(:name, :description, :public)
  end
end
