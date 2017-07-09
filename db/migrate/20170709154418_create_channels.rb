class CreateChannels < ActiveRecord::Migration[5.1]
  def change
    create_table :channels do |t|
      t.integer :enterprise_id
      t.integer :owner_id
      t.string :name

      t.timestamps
    end
  end
end
