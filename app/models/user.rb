# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models

  has_many :boards, through: :user_boards
  has_many :user_boards, dependent: :destroy
  has_many :boards, dependent: :destroy
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy

  has_many :likes, dependent: :destroy
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User
end
