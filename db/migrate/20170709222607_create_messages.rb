class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.string :body
      t.integer :channel_id
      t.integer :account_id
      
      t.timestamps
    end
  end
end
