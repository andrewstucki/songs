class CreateSongSheets < ActiveRecord::Migration
  def change
    create_table :song_sheets do |t|
      t.string :name, null: false
      t.string :file, null: false
      t.references :song

      t.timestamps null: false
    end
  end
end
