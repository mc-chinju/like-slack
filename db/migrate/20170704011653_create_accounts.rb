class CreateAccounts < ActiveRecord::Migration[5.1]
  def change
    create_table :accounts do |t|
<<<<<<< HEAD
<<<<<<< HEAD
      t.integer, :user_id
      t.integer, :enterprise_id
      t.integer :role

      t.timestamps
=======
=======
>>>>>>> 0e3fa73353bca40df1a4fd50bf466a0ddc9e1542
      t.integer :user_id
      t.integer :enterprise_id
      t.integer :role

      t.timestamps
      t.index [:user_id, :enterprise_id], unique: true, name: "index_accounts_on_user_and_enterprise"
<<<<<<< HEAD
>>>>>>> 691493f4a5d67782362e3892b71ce864b32cfa1b
=======
>>>>>>> 0e3fa73353bca40df1a4fd50bf466a0ddc9e1542
    end
  end
end
