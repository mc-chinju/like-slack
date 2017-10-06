# frozen_string_literal: true

class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.string :body, null: false
      t.integer :channel_id, null: false
      t.integer :account_id, null: false
      t.timestamps
    end
  end
end
