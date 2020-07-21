class Api::PostsController < ApplicationController

  #! all the posts
  def index
    render json: Post.all
  end

  def index_created
    render json: current_user.posts.all
  end
  
end