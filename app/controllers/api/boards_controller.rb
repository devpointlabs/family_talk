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
     board = Board.find(params[:id]) 

     file = params[:file]
     # binding.pry
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
    
     if board.update(board_params)
      render json: board
     else
      render json: board.errors, status: 422
     end
  end
  
  def destroy
   render json: Board.find(params[:id]).destroy

  end

  private

  def board_params 
    params.require(:board).permit(:name, :description, :public, :image)
  end
end
