require 'rails_helper'

RSpec.describe Contact, type: :model do
  it 'should create contact' do
    record = FactoryBot.build(
      :contact,
      first_name: 'Foo',
      last_name: 'Bar',
      avatar_url: 'https://loremflickr.com/cache/resized/65535_49686891642_57403648a2_300_300_nofilter.jpg'
    )
    expect(record.save).to be true
  end

  it 'should not allow empty values' do
    record = Contact.new
    expect(record.save).to be false
    expect(record.errors.messages).to include({ first_name: ["can't be blank"], last_name: ["can't be blank"] })
  end
end
