class Api::UsersController < ApplicationController
  before_action :authenticate_user!

  def index
  end

  def create 
  end

  def update
    user = User.find(params[:id])
    user.name = params[:name] ? params[:name] : user.name
    user.email = params[:email] ? params[:email] : user.email
    user.first_name = params[:first_name] ? params[:first_name] : user.first_name
    user.last_name = params[:last_name] ? params[:last_name] : user.last_name
    file = params[:file]
    if file != "undefined" && file != ""
    
      begin
      #cloudinary stuff here
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true, resource_type: :auto)
        user.image = cloud_image["secure_url"]
        rescue => e
          render json: {errors: e, status: 422}
          return                               
        end
    end
    if user.update(user_params)
    
      render json: user
    else
      render json: { errors: user.errors.full_messages }, status: 422
    end
  end

  private
    def user_params
      params.require(:user).permit(:email, :password, :first_name, :last_name, :name)
    end
end
