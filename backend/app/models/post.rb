class Post < ApplicationRecord
  has_many_attached :images
  
  has_many :vote, dependent: :destroy
  has_many :comment, dependent: :destroy

  belongs_to :post_thread
  belongs_to :user
  belongs_to :category

  validates :title, presence: true
  validates :description, presence: true
end
