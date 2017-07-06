class CreateAccounts < ActiveRecord::Migration[5.1]
  def change
    create_table :accounts do |t|
<<<<<<< HEAD
      t.integer, :user_id
      t.integer, :enterprise_id
      t.integer :role

      t.timestamps
=======
      t.integer :user_id
      t.integer :enterprise_id
      t.integer :role

      t.timestamps
      t.index [:user_id, :enterprise_id], unique: true, name: "index_accounts_on_user_and_enterprise"
>>>>>>> 691493f4a5d67782362e3892b71ce864b32cfa1b
    end
  end
end
