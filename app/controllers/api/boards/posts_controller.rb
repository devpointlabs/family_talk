class Api::Boards::PostsController < ApplicationController
  before_action :set_board

  #! all the posts
  def index
    render json: @board.posts
  end

  def show 
   render json: @board.posts.find(params[:id])
    
  end

  def create
    post = @board.posts.new(post_params)
    if post.save
      render json: post
      
    else
      render json: { errors: post.errors }, status: :unprocessble_entity
    end
  end

  def update
    post = @board.posts.find(params[:id])
    if post.save
      render json: post
    else
      render json: {errors: post.errors}, status: :unprocessble_entity
    end
  end

  def destroy
    render json: @board.posts.find(params[:id]).destroy
  end


  private
  def set_board
    @board = Board.find(params[:board_id])
  end

  def set_user
    @user = User.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:title, :description, :board_id, :user_id)
  end
end
