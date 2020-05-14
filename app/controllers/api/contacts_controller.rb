class API::ContactsController < API::APIController
  include Rails.application.routes.url_helpers

  before_action :authenticate_api_user!

  def index
    # Can be refactored. It would be better not to use each loop
    contacts = []
    Contact.order('updated_at desc').each do |item|
      aj = item.as_json
      aj[:is_liked] = current_api_user.voted_for?(item)
      contacts << aj
    end
    render json: { contacts: contacts }
  end

  def create
    contact = Contact.new(contact_params)
    if contact.save
      render json: { status: :success, contact: contact }.to_json
    else
      render json: { status: :error, errors: contact.errors }, status: 500
    end
  end

  def update
    contact = Contact.find(params[:id])
    if contact.update(contact_params)
      render json: { status: :success, contact: contact }.to_json
    else
      render json: { status: :error, errors: contact.errors }, status: 500
    end
  end

  def destroy
    contact = Contact.find(params[:id])
    contact.destroy
    render json: { status: :success }.to_json
  end

  def like
    contact = Contact.find(params[:id])
    if contact.liked_by(current_api_user)
      render json: { status: :success }.to_json
    else
      render json: { status: :error, errors: contact.errors }, status: 500
    end
  end

  def unlike
    contact = Contact.find(params[:id])
    if contact.unliked_by(current_api_user)
      render json: { status: :success }.to_json
    else
      render json: { status: :error, errors: contact.errors }, status: 500
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:first_name, :last_name)
  end
end
