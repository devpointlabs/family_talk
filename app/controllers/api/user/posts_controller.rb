class Api::User::PostsController < ApplicationController
  before_action :set_user 
  
  def index 
    render json: @user.posts
  end

  def create
    post = @user.posts.new(post_params)
    if post.save
      render json: post
      
    else
      render json: { errors: post.errors }, status: :unprocessble_entity
    end
  end

  def update
    post = @user.posts.find(params[:id])
    if post.update(post_params)
      render json: post
    else
      render json: {errors: post.errors}, status: :unprocessble_entity
    end
  end

  def destroy
    render json: @user.posts.find(params[:id]).destroy
  end

  private
  def set_board
    @board = Board.find(params[:board_id])
  end

  def set_user
    @user = User.find(params[:user_id])
  end

  def post_params
    params.require(:post).permit(:title, :description, :board_id, :user_id)
  end
end
