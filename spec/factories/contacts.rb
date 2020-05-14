FactoryBot.define do
  factory :contact do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    avatar_url { "https://i.picsum.photos/id/#{rand(1..1000)}/200/200.jpg" }
  end
end
