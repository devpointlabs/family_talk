class Api::CommentsController < ApplicationController
before_action :set_post, only: [:create, :update, :destroy]

def index
post = Post.find(params[:post_id])

render json: post.comments.all
end


def create
    
    comment = @post.comments.new(comment_params)
  
    if comment.save
      render json: comment
      
    else
      render json: { errors: comment.errors }, status: :unprocessble_entity
    end
end

def update
    comment = @posts.commments.find(params[:id])
    if comment.update(comment_params)
      render json: comment
    else
      render json: {errors: comment.errors}, status: :unprocessble_entity
    end
end

def destroy 
    render json: @post.comments.find(params[:id]).destroy
end

private

def comment_params
    params.require(:comment).permit(:description, :user_id)
end

def set_post
@post = Post.find(params[:post_id])
end



end
