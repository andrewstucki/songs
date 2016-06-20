FactoryGirl.define do
  factory :song do
    title { Faker::Book.title }
    lyrics { Faker::Lorem.paragraphs }
  end
end
