class CreateChannelMembers < ActiveRecord::Migration[5.1]
  def change
    create_table :channel_members do |t|
      t.integer :account_id
      t.integer :channel_id

      t.timestamps
    end
  end
end
