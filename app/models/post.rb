class Post < ApplicationRecord
  belongs_to :board
  belongs_to :user
  has_many :comments
end
