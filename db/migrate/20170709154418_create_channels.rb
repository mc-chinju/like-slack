class CreateChannels < ActiveRecord::Migration[5.1]
  def change
    create_table :channels do |t|
      t.integer :enterprise_id, null: false
      t.integer :owner_id, null: false
      t.string  :name
      t.integer :user_id, null: false
      t.timestamps
    end
  end
end
