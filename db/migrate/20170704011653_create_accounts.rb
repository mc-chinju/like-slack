class CreateAccounts < ActiveRecord::Migration[5.1]
  def change
    create_table :accounts do |t|
      t.integer :user_id, null: false
      t.integer :enterprise_id, null: false
      t.integer :role

      t.timestamps
      t.index [:user_id, :enterprise_id], unique: true, name: "index_accounts_on_user_and_enterprise"
    end
  end
end
