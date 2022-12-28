
class UsersController < ApplicationController
  before_action :authorize_request, except: :create, unless: -> { params[:public] == "true" }
  # before_action :find_user, except: %i[create index]

  # GET /users
  def index
    @users = User.all()
    @users = @users.map {|user| user.as_json.merge({ avatar: user.avatar.url })}
    render json: @users, status: :ok
  end

  # GET /users/{id}
  def show
    @user = User.find(params[:id])
    @posts = Post.joins(:user).select('users.*, posts.*').order(created_at: :desc).where(:user_id => params[:id])
    @posts = @posts.map do |post|
      if params[:public] == "true"
        post = post.as_json.merge({ avatar: User.find(post.user_id).avatar.url })
      else
        post = post.as_json.merge({ avatar: User.find(post.user_id).avatar.url, is_upvoted: get_is_upvoted(post) })
      end
    end
    render json: @user.as_json.merge({ avatar: @user.avatar.url, posts: @posts }), status: :ok 
  end

  # POST /users
  def create
    @user = User.new(user_params)
    @user.avatar.attach(params[:avatar])
    if @user.save
      render json: @user, status: :created
    else
      render json: { errors: @user.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  # PATCH /users/{id}
  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      @user.avatar.attach(params[:avatar])
      render json: @user
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /users/{id}
  def destroy
    @user.destroy
  end

  private

  def find_user
    @user = User.find_by_id!(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { errors: 'User not found' }, status: :not_found
  end

  def user_params
    params.permit(:username, :email, :password, :avatar, :public)
  end
end