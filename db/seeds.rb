# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Card.create(category: "shopping", amount: 220, date: Date.new(2024,6,1), description: "New ASOS")
Card.create(category: "transportation", amount: 100, date: Date.new(2024,6,3), description: "Lexus")
Card.create(category: "groceries", amount: 55, date: Date.new(2024,6,3), description: "Coles Norwood")
Card.create(category: "utilities", amount: 100, date: Date.new(2024,6,2), description: "Electricity")
Card.create(category: "health", amount: 30, date: Date.new(2024,6,4), description: "chemist")
Card.create(category: "others", amount: 10, date: Date.new(2024,6,4), description: "candles")
