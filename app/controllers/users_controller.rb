class UsersController < ApplicationController

  skip_before_action :user_authentication, only:[:create, :show, :index]

  def show
    if current_user
      render json: current_user, include: ["tickets", "tickets.recital"], status: :ok
    else
      render json: {error: "User not found"}, status: :not_found
    end
  end

  def create
    user = User.create(user_params)
    if user.valid?
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:username, :password, :admin)
  end
  
end
