# frozen_string_literal: true

class QuickPostSerializer < ApplicationSerializer
  attributes :id,
             :post_number,
             :created_at,
             :cooked,
             :raw,
             :topic_id

  has_one :user, serializer: BasicUserSerializer, embed: :objects

  def cooked
    object.cooked.presence || PrettyText.cook(object.raw)
  end

  def include_raw?
    @options[:include_raw] || false
  end
end 