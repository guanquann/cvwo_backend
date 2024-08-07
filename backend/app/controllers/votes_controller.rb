class VotesController < ApplicationController
  before_action :authorize_request

  # GET /posts/{post_id}/votes
  def index
    @post = Post.find(params[:post_id])
    @votes = @post.vote.all
    render json: @votes
  end

  # GET /posts/{post_id}/votes/{id}
  def show
    @post = Post.find(params[:post_id])
    @vote = @post.vote.where(:id => params[:id])
    render json: @vote
  end

  # POST /posts/{post_id}/votes
  def create
    @post = Post.find(params[:post_id])
    @vote = @post.vote.find_by( user_id: @current_user.id )
    
    if @vote != nil
      if @vote.is_upvoted == params[:is_upvoted]
        @post.update_attribute(:vote_count, @post.vote_count + (@vote.is_upvoted ? -1 : 1))
        @vote.destroy
      else 
        @post.update_attribute(:vote_count, @post.vote_count + (@vote.is_upvoted ? -2 : 2))
        @vote.update_attribute(:is_upvoted, params[:is_upvoted])
      end
      render json: @post.as_json.merge({ is_upvoted: get_is_upvoted(@post) })

    else
      @vote = @post.vote.create(vote_params)
      @vote.user_id = @current_user.id
      @post.update_attribute(:vote_count, @post.vote_count + (@vote.is_upvoted ? 1 : -1))

      if @vote.save
        render json: @post.as_json.merge({ is_upvoted: get_is_upvoted(@post) })
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    end
  end
  
  # DELETE /posts/{post_id}/votes
  def destroy
    @post = Post.find(params[:post_id])
    @vote = @post.vote.find_by( user_id: @current_user.id )
    @vote.destroy
    render json: @vote
  end

  private
    def vote_params
      params.permit(:is_upvoted)
    end
end
