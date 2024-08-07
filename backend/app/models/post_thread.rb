class PostThread < ApplicationRecord
  belongs_to :user

  has_many :post
end
