class Card < ApplicationRecord
  CATEGORIES = ['shopping', 'transportation', 'groceries', 'utilities', 'health', 'entertainment', 'others'].freeze

  validates :category, inclusion: { in: CATEGORIES }
  validates :amount, numericality: { greater_than: 0 }
  validates :date, presence: true
  validates :description, presence: true
end
