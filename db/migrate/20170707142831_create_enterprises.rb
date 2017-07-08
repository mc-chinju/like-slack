class CreateEnterprises < ActiveRecord::Migration[5.1]
  def change
    create_table :enterprises do |t|
      t.string :name
      t.integer :accounts_id

      t.timestamps
    end
  end
end
