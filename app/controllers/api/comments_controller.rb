class Api::CommentsController < ApplicationController

def index
post = Post.find(params[:post_id])

render json: post.comments.all
end

end
