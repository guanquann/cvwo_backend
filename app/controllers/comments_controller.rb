class CommentsController < ApplicationController
  before_action :authorize_request, except: [:index, :show]

  # GET /posts/{post_id}/comments
  def index
    @post = Post.find(params[:post_id])
    @comments = @post.comment.joins(:user).select('comments.*, users.username').order(created_at: :desc).all()
    @comments = @comments.map {|comment| comment.as_json.merge({ avatar: User.find(comment.user_id).avatar.url })}
    render json: @comments
  end

  # GET /posts/{post_id}/comments/{id}
  def show
    @post = Post.find(params[:post_id])
    @comment = @post.comment.joins(:user).select('comments.*, users.username').order(created_at: :desc).find(params[:id])
    @comment = @comment.as_json.merge({ avatar: User.find(@comment.user_id).avatar.url })
    render json: @comment
  end

  # POST /posts/{post_id}/comments
  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comment.create(comment_params)
    @comment.user_id = @current_user.id

    @post.update_attribute(:comment_count, @post.comment_count + 1)

    if @comment.save
      @user = User.find(@comment.user_id)
      @comment = @comment.as_json.merge({ username: @user.username, avatar: @user.avatar.url })
      render json: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # PATCH /posts/{post_id}/comments/{id}
  def update
    @post = Post.find(params[:post_id])
    @comment = @post.comment.find(params[:id])

    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/{post_id}/comments/{id}
  def destroy
    @post = Post.find(params[:post_id])
    @comment = @post.comment.find(params[:id])
    @comment.destroy
    @post.update_attribute(:comment_count, @post.comment_count - 1)
    render json: @comment
  end

  private
    def comment_params
      params.permit(:description, :parent_id)
    end
end