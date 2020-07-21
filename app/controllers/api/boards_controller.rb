class Api::BoardsController < ApplicationController
  # before_action :set_boards

  def index
    render json: Board.all
  end

  def index_created
    render json: current_user.boards.all
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
     board = Board.find(params[:id]) 
     board.name = params[:name] ? params[:name] : board.name
     board.description = params[:description] ? params[:description] : board.description
     board.public = params[:public] ? params[:public] : board.public

     file = params[:file]
     
     if file != "undefined" && file != ""
     
       begin
       #cloudinary stuff here
         cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true, resource_type: :auto)
         board.image = cloud_image["secure_url"]
         rescue => e
           render json: {errors: e, status: 422}
           return
         end
     end
    
     if board.save
      render json: board
     else
      render json: board.errors, status: 422
     end
  end
  
  def destroy
   render json: Board.find(params[:id]).destroy
  end

  def set_board
    render json: Board.find_board(params[:code])
  end

  def togglePublic
    board = Board.find(params[:id]) 
    board.public = !board.public
  end

  private

  def board_params 
    params.require(:board).permit(:name, :description, :user_id, :code, :public)
  end
end
