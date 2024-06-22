class Api::V1::CardsController < ApplicationController
  #all cards
  def index
    @cards = Card.all
    render json: @cards
  end

  #show 1 card
  def show
    @card = Card.find(params[:id])
    render json: @card
  end

  #create new card
  def create
    @card = Card.new(card_params)

    if @card.save
      render json: @card, status: :created
    else
      render json: @card.errors, status: :unprocessable_entity
    end
  end

  #update card
  def update
    if @card.update(card_params)
      render json: @card
    else
      render json: @card.errors, status: :unprocessable_entity
    end
  end

  #delete card
  def destroy
    @card = Card.find(params[:id])
    @card.destroy
  end

  private

  def card_params
    params.require(:card).permit(:category, :date, :amount, :description)
  end
end
