class CategoriesController < ApplicationController
  before_action :authorize_request, except: [:index, :show]

  # GET /categories
  def index
    @categories = Category.all()
    render json: @categories
  end

  # GET /categories/{id}
  def show
    @posts = Post.joins(:user).joins(:category).select('posts.*, users.username, categories.cat').order(created_at: :desc).where(:category_id => params[:id])
    @posts = @posts.map {|post| post.as_json.merge({ avatar: User.find(post.user_id).avatar.url })}
    render json: @posts
  end

  # POST /categories
  def create
    @category = Category.new(category_params)

    if @category.save
      render json: @category
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  # PATCH /categories/{id}
  def update
    @category = Category.find(params[:id])
    if @category.update(category_params)
      render json: @category
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  # DELETE /categories/{id}
  def destroy
    @category = Category.find(params[:id])
    @category.destroy
    render json: @project
  end

  private
    def category_params
      params.permit(:cat)
    end
end
