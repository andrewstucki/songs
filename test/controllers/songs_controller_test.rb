require 'test_helper'

class SongsControllerTest < ActionController::TestCase
  include FactoryGirl::Syntax::Methods

  test "should get show" do
    song = create(:song)

    get :show, id: song.id
    assert_response :success
  end

  test "should get index" do
    get :index
    assert_response :success
  end

  test "should post create" do
    assert Song.count == 0

    post :create, song: {title: 'The Real Deal', lyrics: 'Foo bar'}
    assert_response :created

    assert Song.count == 1
  end

  test "should delete destroy" do
    song = create(:song)
    assert Song.count == 1

    delete :destroy, id: song.id
    assert_response :no_content

    assert Song.count == 0
  end

  test "should patch update" do
    song = create(:song, title: 'Foo')

    patch :update, id: song.id, song: { title: 'Bar' }
    assert_response :success

    song.reload
    assert song.title == 'Bar'
  end

  test "should post tag" do
    song = create(:song)

    post :tag, id: song.id
    assert_response :success
  end

  test "should delete untag" do
    song = create(:song)

    post :untag, id: song.id
    assert_response :success
  end
end
