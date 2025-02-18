import { ICard, ICardWithSelection, ICatalogData, ICatalogDataState } from '../../types';
import { IEvents } from '../base/Events';
import { Model } from '../base/Model';

export class CatalogData extends Model<ICatalogDataState> implements ICatalogData {
  protected cards: ICardWithSelection[];

  constructor(events: IEvents, data: Partial<ICatalogDataState> = { cards: [] } ) {
    super(data, events);

    this.cards = data.cards;
  };

  setCards(cardsData: ICard[]): void {
    this.cards = cardsData.map(card => ({
      ...card,
      isBasket: false,
      isSelected: false
    }));

    this.emitChanges('catalogDataModel:changed');
  };

  setCardSelected (id: string): void {
    this.cards.forEach(card => card.isSelected = false);
    this.getCard(id).isSelected = true;

    this.emitChanges('catalogDataModel:selectedChanged', { id });
  };

  getCards(): ICardWithSelection[] {
    return this.cards;
  };

  getCard(id: string): ICardWithSelection {
    return this.cards.find((card) => card.id === id);
  };

  toggleCardInBasket(id: string): void {
    this.getCard(id).isBasket = !this.getCard(id).isBasket;

    this.emitChanges('catalogDataModel:basketChanged');

    if (this.getCard(id).isSelected) {
      this.emitChanges('catalogDataModel:selectedChanged', { id });
    };
  };

  getCardsBasket(): ICardWithSelection[] {
    return this.cards.filter(card => card.isBasket);
  };

  getCardIdsBasket(): string[] {
    return this.getCardsBasket().map(card => card.id);
  };

  getCountBasket(): number {
    return this.getCardsBasket().length;
  };

  getTotalPriceInBasket(): number {
    return this.getCardsBasket().reduce((acc, card) => acc + card.price, 0);
  };

  clearPropsCatalogData(): void {
    this.cards.forEach(card => {
      card.isBasket = false,
      card.isSelected = false
    });

    this.emitChanges('catalogDataModel:basketChanged');
  };

  isPriceNotNull(id: string): boolean {
    return this.getCard(id).price !== null;
  };

  isCardInBasket(id: string): boolean {
    return this.getCard(id).isBasket;
  };

  isBasketNotEmpty(): boolean {
    return !!this.getCountBasket();
  };
}