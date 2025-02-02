# frozen_string_literal: true

class QuickPostsController < ApplicationController
  requires_login
  
  def index
    topic = Topic.find_by(id: params[:topic_id])
    guardian.ensure_can_see!(topic)
    
    posts = Post.quick_posts(topic.id)
    
    render_json_dump(
      posts: posts.map { |post| QuickPostSerializer.new(post, scope: guardian, root: false) }
    )
  end
  
  def create
    topic = Topic.find_by(id: params[:topic_id])
    guardian.ensure_can_create!(Post, topic)
    
    post_creator = PostCreator.new(
      current_user,
      topic_id: topic.id,
      raw: params[:raw],
      skip_validations: false
    )
    
    post = post_creator.create
    
    if post_creator.errors.present?
      render_json_error(post_creator)
    else
      render_json_dump(QuickPostSerializer.new(post, scope: guardian, root: false))
    end
  end
end 