# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
require 'faker'

categories = ['shopping', 'transportation', 'groceries', 'utilities', 'health', 'others']
Card.destroy_all
15.times do |index|
  Card.create(category: categories.sample, amount: rand(1..200), date: Faker::Date.between(from: 1.month.ago, to: Date.today), description: Faker::Name.name )
  puts "finish #{index + 1}"
end
