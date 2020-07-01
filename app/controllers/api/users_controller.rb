class Api::UsersController < ApplicationController
  before_action :authenticate_user!

  def index
  end

  def update
    if user.update(user_params)
      render json: user
    else
      render json: user.errors, status: 422
  end

  private
    def user_params
      params.require(:user).permit(:email, :password)
    end
end
