class AddSomeColumnsToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :login, :string, null: false
    add_column :users, :name, :string
    add_column :users, :language, :string

    add_index :users, :login, unique: true
  end
end
