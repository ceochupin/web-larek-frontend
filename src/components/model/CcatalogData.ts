import { ICard, ICardWithSelection, ICatalogData, ICatalogDataState } from '../../types';
import { IEvents } from '../base/Eevents';
import { Model } from '../base/Mmodel';

export class CatalogData extends Model<ICatalogDataState> implements ICatalogData {
  protected cards: ICardWithSelection[] = [];
  constructor(events: IEvents, data: Partial<ICatalogDataState> = { cards: [] } ) {
    super(data, events);

    if(data.cards) {
      this.setCards(data.cards);
    }
  }

  setCards(cardsData: ICard[]) {
    this.cards = cardsData.map(card => ({ ...card, selected: false }));

    this.emitChanges('catalogData:init');
    this.emitChanges('catalogData:changed');
  }

  getCards(): ICardWithSelection[] {
    return this.cards;
  }

  getCard(id: string): ICardWithSelection {
    return this.cards.find((card) => card.id === id);
  }

  toggleCardSelected(id: string) {
    this.getCard(id).selected = !this.getCard(id).selected;

    this.emitChanges('catalogData:changed');
  }

  getSelectedCards(): ICardWithSelection[] {
    return this.cards.filter(card => card.selected);
  }

  getSelectedCardIds(): string[] {
    return this.getSelectedCards().map(card => card.id);
  }

  getSelectedCardsCount(): number {
    return this.getSelectedCards().length;
  }

  getTotalPriceOfSelectedCards(): number {
    return this.getSelectedCards().reduce((acc, card) => acc + card.price, 0);
  }

  clearSelection() {
    this.cards.forEach(card => card.selected = false);

    this.emitChanges('catalogData:changed');
  }

  isPriceNotNull(id: string): boolean {
    return this.getCard(id).price !== null;
  }
}