class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.string :body
      t.integer :channel_id, null: false
      t.integer :account_id, null: false
      t.integer :user_id, null: false 
      t.timestamps
    end
  end
end
