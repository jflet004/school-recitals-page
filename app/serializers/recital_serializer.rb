class RecitalSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :tickets_left, :capacity, :tickets_sold, :students_performing
  has_many :users
  has_many :tickets
end
