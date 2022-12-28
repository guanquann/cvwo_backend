class Comment < ApplicationRecord
  # has_many :vote, dependent: :destroy

  belongs_to :user
  belongs_to :post

  validates :post_id, presence: true
  validates :description, presence: true
end
