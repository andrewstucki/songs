class CreateSongTags < ActiveRecord::Migration
  def change
    create_table :song_tags do |t|
      t.references :song
      t.references :tag
      t.timestamps null: false
    end
  end
end
