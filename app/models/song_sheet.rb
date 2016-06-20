class SongSheet < ActiveRecord::Base
  belongs_to :song
  mount_uploader :file, SongSheetUploader
end
