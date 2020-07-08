class Api::PostsController < ApplicationController
  before_action :set_board, only: [:index, :create]

  #! all the posts
  def index
    render json: @board.posts
  end

  def create
    post = Post.new(post_params)

    if post.save 
      render json: @board.posts
    else
      render json: post.errors, status: 422
    end
  end

  # def create
  #   post = @board.reviews.new(post_params)

  #   if post.save
  #     render json: post
  #   else
  #     render json: { errors: post.errors }, status: :unprocessble_entity
  #   end
  # end



  private
  def set_board
    @board = Board.find(params[:board_id])
  end

  def post_params
    params.require(:post).permit(:title, :description, :board_id, :post_id)
  end

end