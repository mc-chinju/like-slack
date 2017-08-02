# frozen_string_literal: true

class CreateChannels < ActiveRecord::Migration[5.1]
  def change
    create_table :channels do |t|
      t.string  :name
      t.integer :enterprise_id, null: false
      t.integer :owner_id, null: false
      t.timestamps
      t.index %i[name enterprise_id], unique: true, name: "index_channels_on_name_and_enterprise_id"
    end
  end
end
