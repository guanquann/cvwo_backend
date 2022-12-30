
class UsersController < ApplicationController
  before_action :authorize_request, except: :create
  before_action :find_user, except: %i[create index]

  # GET /users
  def index
    @users = User.all()
    @users = @users.map {|user| user.as_json.merge({ avatar: get_avatar(user) })}
    render json: @users, status: :ok
  end

  # GET /users/{id}
  def show
    @user = User.find(params[:id])
    avatar = get_avatar(@user)

    @posts = Post.joins(:user).select('users.*, posts.*').order(created_at: :desc).where(:user_id => params[:id])
    @posts = @posts.map do |post|
      if @current_user == nil
        post = post.as_json.merge({ avatar: avatar })
      else
        post = post.as_json.merge({ avatar: avatar, is_upvoted: get_is_upvoted(post) })
      end
    end

    @comments = Comment.joins(:user).select('users.*, comments.*').order(created_at: :desc).where(:user_id => params[:id])
    @comments = @comments.map do |comment|
      comment = comment.as_json.merge({ avatar: avatar })
    end
    render json: @user.as_json.merge({ avatar: avatar, posts: @posts, comments: @comments }), status: :ok 
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
    params.permit(:username, :email, :password, :avatar)
  end
end