require 'rails_helper'

RSpec.describe 'POST /api/signup', type: :request do
  let(:url) { '/api/users' }

  let(:params) do
    {
      api_user: {
        email: 'user@example.com',
        password: 'password',
        password_confirmation: 'password'
      }
    }
  end

  context 'when user is unauthenticated' do
    it 'signs up' do
      post url, params: params
      expect(response.status).to eq 200
    end
  end

  context 'when user already exists' do
    before do
      FactoryBot.create :user, email: params[:api_user][:email]
      post url, params: params
    end

    it 'returns bad request status' do
      expect(response.status).to eq 400
    end

    it 'returns validation errors' do
      json = JSON.parse(response.body)
      expect(json['errors'].first['title']).to eq('Bad Request')
      expect(json['errors'].first['detail']['email']).to include('has already been taken')
    end
  end
end
