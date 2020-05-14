FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { 'password' }
    password_confirmation { 'password' }
    # confirmed_at { Date.today }

    trait(:with_likes) do
      after :create do |user|
        3.times do
          contact = create(:contact)
          contact.liked_by(user)
        end
      end
    end
  end
end
