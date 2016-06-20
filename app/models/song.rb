class Song < ActiveRecord::Base
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks

  has_many :song_tags
  has_many :tags, through: :song_tags
  has_many :song_sheets

  after_touch { __elasticsearch__.index_document }

  settings index: { number_of_shards: 1 } do
    mappings dynamic: 'false' do
      indexes :title, analyzer: 'english'
      indexes :lyrics, analyzer: 'english'
      indexes :tags, type: 'object' do
        indexes :title, analyzer: 'english'
      end
    end
  end

  def as_indexed_json(options={})
    as_json include: {
      tags: { only: [:id, :title] }
    }
  end

  class << self
    def search(query=nil, tags=[])
      clause = [
        {
          bool: {
            must: tags.map {|tag|
              {
                match: {
                  'tags.title' => tag
                }
              }
            }
          }
        }
      ]
      clause << {
        multi_match: {
          query: query,
          fields: ['title^10', 'lyrics']
        }
      } if query
      __elasticsearch__.search query: {
        bool: {
          must: clause
        }
      },
      highlight: {
        pre_tags: ['<em class="highlight">'],
        post_tags: ['</em>'],
        fields: {
          title: {},
          lyrics: {}
        }
      }
    end
  end
end
