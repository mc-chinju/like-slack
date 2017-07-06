class CreateAccounts < ActiveRecord::Migration[5.1]
  def change
    create_table :accounts do |t|
      t.integer, :user_id
      t.integer, :enterprise_id
      t.integer :role

      t.timestamps
    end
  end
end
