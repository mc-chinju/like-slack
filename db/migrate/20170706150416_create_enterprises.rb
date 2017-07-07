class CreateEnterprises < ActiveRecord::Migration[5.1]
  def change
    create_table :enterprises do |t|
      t.integer :account_name

      t.timestamps
    end
  end
end
