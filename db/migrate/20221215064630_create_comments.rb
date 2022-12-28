class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.integer :parent_id
      t.string :description
      t.integer :vote_count, default: 1
      
      t.references :user, null: false, foreign_key: true
      t.references :post, null: false, foreign_key: true
      
      t.timestamps
    end
  end
end
