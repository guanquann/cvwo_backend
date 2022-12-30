
class ApplicationController < ActionController::API
    def not_found
      render json: { errors: 'not_found' }
    end
  
    def authorize_request
      header = request.headers['Authorization']
      header = header.split(' ').last if header
      begin
        if header == nil
          @current_user = nil
        else
          @decoded = JsonWebToken.decode(header)
          @current_user = User.find(@decoded[:user_id])
        end
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

    def get_avatar(variable)
      if variable.is_a?(Post) || variable.is_a?(Comment)
        variable = User.find(variable.user_id)
      end
      variable.avatar.url
    end

    def validate_user
      if @current_user == nil
        render json: { errors: 'Authorisation Headers not filled' }, status: :unauthorized
      end
    end

    def sort_by(query)
      if query == 'upvote'
        query = 'vote_count DESC'
      elsif query == 'downvote'
        query = 'vote_count ASC'
      elsif query == 'comment'
        query = 'comment_count DESC'
      else
        query = 'created_at DESC'
      end
    end
  end