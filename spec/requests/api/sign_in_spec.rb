require 'rails_helper'

def decoded_jwt_token_from_response(response)
  token_from_request = response.headers['Authorization'].split(' ').last
  # Hardcoding token for simplicity. It should not be hardcoded in the real app
  # JWT.decode(token_from_request, ENV['DEVISE_JWT_SECRET_KEY'], true)
  JWT.decode(
    token_from_request,
    'de400b147ba7b6e9a0786bc4db7b857cb0e9457154f2982213f7fc9aa2d771ee0d31c193959660642d923729c14083e1a2606a6d3992da269a329a3209ec8346', # rubocop:disable Layout/LineLength
    true
  )
end

RSpec.describe 'Sign in', type: :request do
  it 'signs in' do
    FactoryBot.create(:user, email: 'foo@bar.com', password: 'password')
    post '/api/users/sign_in', params: { api_user: { email: 'foo@bar.com', password: 'password' } }
    parsed = JSON.parse(response.body)
    expect(parsed['email']).to eq('foo@bar.com')
    expect(response.headers['Authorization']).to be_present
    decoded_token = decoded_jwt_token_from_response(response)
    expect(decoded_token.first['sub']).to be_present
  end

  context 'when login params are incorrect' do
    before { post '/api/users/sign_in' }

    it 'returns unathorized status' do
      expect(response.status).to eq 401
    end
  end

  describe 'signs out' do
    let(:url) { '/api/users/sign_out' }

    it 'returns 204, no content' do
      delete url
      expect(response).to have_http_status(200)
    end
  end
end
