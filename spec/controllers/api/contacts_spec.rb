require 'rails_helper'
require 'devise/jwt/test_helpers'

RSpec.describe API::ContactsController do
  let!(:user) { FactoryBot.create(:user, email: 'user@user.com', password: 'password') }

  before :each do
    headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }
    # This will add a valid token for `user` in the `Authorization` header
    auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user).transform_keys(&:to_sym)
    request.headers.merge! auth_headers
  end

  describe 'GET #index' do
    it 'should return contacts' do
      FactoryBot.create_list(:contact, 10)
      get :index
      expect(response).to have_http_status(:success)
      parsed = JSON.parse(response.body)
      expect(parsed).to include('contacts')
      contacts = parsed['contacts']
      expect(contacts.length).to be(10)
      expect(contacts.first.keys).to include(
        'id', 'first_name', 'last_name', 'avatar_url', 'created_at', 'updated_at'
      )
    end
  end

  describe 'POST #create' do
    it 'should create contact' do
      post :create, params: {
        contact: {
          first_name: 'Foo',
          last_name: 'Bar',
          avatar_url: 'https://loremflickr.com/cache/resized/65535_49686891642_57403648a2_300_300_nofilter.jpg'
        }
      }
      expect(response).to have_http_status(:success)
    end

    it 'should not allow empty values' do
      post :create, params: { contact: { first_name: '', last_name: 'Bar' } }
      expect(response).to have_http_status(:error)
      expect(response.body).to include("can't be blank")
    end
  end

  describe 'PUT update/:id' do
    let(:new_values) do
      { first_name: 'x', last_name: 'y' }
    end

    before do
      @contact = FactoryBot.create(:contact, first_name: 'Foo', last_name: 'Bar')
      put :update, params: { id: @contact.id, contact: new_values }
      @contact.reload
    end

    it { expect(@contact.first_name).to eql new_values[:first_name] }
    it { expect(@contact.last_name).to eql new_values[:last_name] }
  end

  describe 'DELETE /todos/:id' do
    before do
      @contact = FactoryBot.create(:contact)
      delete :destroy, params: { id: @contact.id }
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
      expect { @contact.reload.inspect }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end

  describe 'PUT /todos/:id/like' do
    before do
      @contact = FactoryBot.create(:contact, first_name: 'Qux')
    end

    it 'returns status code 200' do
      expect(@contact.get_likes.count).to eql 0
      put :like, params: { id: @contact.id }
      expect(response).to have_http_status(200)
      expect(@contact.get_likes.count).to eql 1
      expect(@contact.get_likes.voters.pluck(:email)).to include user.email
      expect(user.find_liked_items.pluck(:first_name)).to include @contact.first_name
      put :unlike, params: { id: @contact.id }
      expect(response).to have_http_status(200)
      expect(@contact.get_likes.count).to eql 0
    end
  end
end
