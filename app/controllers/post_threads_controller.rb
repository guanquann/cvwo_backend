class PostThreadsController < ApplicationController
  before_action :authorize_request, except: [:index, :show]
  
  # GET /post_threads
  def index
    @threads = PostThread.all()
    render json: @threads
  end

  # GET /post_threads/{id}
  def show
    @posts = Post.joins(:user).joins(:category).joins(:post_thread).select('posts.*, users.username, categories.cat, post_threads.title as thread').order(created_at: :desc).where(:post_thread_id => params[:id])
    @posts = @posts.map {|post| post.as_json.merge({ avatar: get_avatar(post) })}
    render json: @posts
  end

  # POST /post_threads
  def create
    @thread = PostThread.new(thread_params)
    @thread.user_id = @current_user.id
    
    if @thread.save
      render json: @thread
    else
      render json: @thread.errors, status: :unprocessable_entity
    end
  end
  
  # PATCH /post_threads/{id}
  def update
    @thread = PostThread.find(params[:id])
    if @thread.update(thread_params)
      render json: @thread
    else
      render json: @thread.errors, status: :unprocessable_entity
    end
  end

  # DELETE /post_threads/{id}
  def destroy
    @thread = PostThread.find(params[:id])
    @thread.destroy
    render json: @thread
  end

  private
    def thread_params
      params.permit(:title, :description)
    end
end
