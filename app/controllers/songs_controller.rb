class SongsController < ApplicationController
  def show
    render json: Song.find(params[:id])
  end

  def index
    songs = Song.order(params[:order] || :title).page(params[:page])
    headers = pagination_headers(:index, params.slice(:order, :page), songs)
    response.headers['Link'] = headers unless headers.empty?
    render json: songs
  end

  def search
    songs = Song.search(params[:q], params[:tags].try(:split, ',') || []).page(params[:page])
    headers = pagination_headers(:search, params.slice(:q, :tags, :page), songs)
    response.headers['Link'] = headers unless headers.empty?
    render json: songs
  end

  def create
    render json: Song.create(song_params), status: 201
  end

  def destroy
    Song.destroy(params[:id])
    render json: {}, status: 204
  end

  def update
    song = Song.find(params[:id])
    song.update_attributes!(song_params)
    render json: song, status: 200
  end

  def tag
    head :ok
  end

  def untag
    head :ok
  end

  private

  def song_params
    params.require(:song).permit(:title, :lyrics)
  end

  def pagination_headers(action, params, paged)
    total_pages = paged.total_pages

    return "" if total_pages == 0

    base_url = url_for controller: 'songs', action: action
    current_page = params[:page].to_i
    urls = {
      first: "#{base_url}?#{params.except(:page).to_query}&page=1",
      prev: "#{base_url}?#{params.except(:page).to_query}&page=#{current_page - 1}",
      next: "#{base_url}?#{params.except(:page).to_query}&page=#{current_page + 1}",
      last: "#{base_url}?#{params.except(:page).to_query}&page=#{total_pages}"
    }
    urls.delete(:first) if current_page == 1
    urls.delete(:prev) if current_page == 1
    urls.delete(:last) if current_page == total_pages
    urls.delete(:next) if current_page == total_pages
    urls.map {|key, value| "<#{value}>; rel=\"#{key}\""}.join(",")
  end
end
