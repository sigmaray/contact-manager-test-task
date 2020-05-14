class Contact < ApplicationRecord
  validates :first_name, :last_name, presence: true

  acts_as_votable

  def to_s
    [first_name, last_name].join(' ')
  end
end
