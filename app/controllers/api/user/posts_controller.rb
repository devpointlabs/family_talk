class Api::User::PostsController < ApplicationController
  before_action :set_user 
  
  def index 
    render json: @user.posts
  end

  def create
    post = current_user.posts.new
    post.title = params[:title] ? params[:title] : post.title
    post.description = params[:description] ? params[:description] : post.description
    post.board_id = params[:board_id ] ? params[:board_id ] : post.board_id 
    file = params[:file]
    if file != "undefined" && file != "" 
       begin
        ext = File.extname(file.tempfile)
         cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true, resource_type: :auto)
         post.image = cloud_image["secure_url"]
         rescue => e
           render json: {errors: e, status: 422}
           return
         end
     end

    if post.save
      render json: post
      
    else
      render json: { errors: post.errors }, status: :unprocessable_entity
    end
  end

  def update
    post = @user.posts.find(params[:id])
    post.title = params[:name] ? params[:name] : post.title
    post.description = params[:description] ? params[:description] : post.description
    post.board_id = params[:board_id ] ? params[:board_id ] : post.board_id 
    file = params[:file]
    if file != "undefined" && file != "" 
       begin
        ext = File.extname(file.tempfile)
         cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true, resource_type: :auto)
         post.image = cloud_image["secure_url"]
         rescue => e
           render json: {errors: e, status: 422}
           return
         end
     end
    
    if post.save
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
    params.require(:post).permit(:title, :description, :board_id, :user_id, :image, :id)
  end
end
