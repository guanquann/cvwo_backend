
class ApplicationController < ActionController::API
    def not_found
      render json: { errors: 'not_found' }
    end
  
    def authorize_request
      header = request.headers['Authorization']
      header = header.split(' ').last if header
      begin
        @decoded = JsonWebToken.decode(header)
        @current_user = User.find(@decoded[:user_id])
      rescue ActiveRecord::RecordNotFound => e
        render json: { errors: e.message }, status: :unauthorized
      rescue JWT::DecodeError => e
        render json: { errors: e.message }, status: :unauthorized
      end
    end
    
    def get_is_upvoted(post) 
      vote = post.vote.find_by( user_id: @current_user.id )
      vote = vote.present? ? vote.is_upvoted : nil
    end
  end