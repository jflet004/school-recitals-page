class Recital < ApplicationRecord
  validates :title, presence: true, uniqueness: true
  validates :description, presence: true, uniqueness: true

  has_many :students
  has_many :tickets
  has_many :users, through: :tickets

  def purchase_ticket(price,qty)
      ticket = Ticket.create(price:price, quantity:qty, recital_id: self.id, user_id: 3)
      self.tickets << ticket
  end

  def tickets_sold
    self.tickets.sum{|ticket| ticket.quantity}
  end

  def tickets_left
    self.capacity - self.tickets_sold
  end

  def add_student(student_name, age)
    student = Student.create(name: student_name, age: age)
    self.students << student
  end

  def update_capacity(number)
    self.update(capacity:number)
  end

  def self.update_capacity_all(number)
    self.update_all(capacity: number)
  end

  def number
    user = User.find(session[:user_id])
    user.tickets.quantity
  end



end
