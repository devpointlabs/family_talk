class Api::LikesController < ApplicationController

  def index
    post = Post.find(params[:post_id])

    render json: post.likes.all
  end

  def create
    like = Like.new(liked_params)
    
    if like.save
      render json: like
    else
      render json: like.errors, status: 422
    end
  end

  def show
    
    render json: current_user.likes.find_by_post_id(params[:post_id])

  end

  def destroy
    likes = current_user.likes.all
    like = likes.find_by_post_id(params[:post_id])
    render json: like.destroy
  end

  private

  def liked_params
    params.require(:like).permit(:user_id, :post_id)
  end
end
