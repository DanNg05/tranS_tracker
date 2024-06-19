class CreateCards < ActiveRecord::Migration[7.1]
  def change
    create_table :cards do |t|
      t.integer :amount
      t.string :category
      t.string :description
      t.date :date

      t.timestamps
    end
  end
end
