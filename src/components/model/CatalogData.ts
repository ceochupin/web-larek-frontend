import { ICard, ICardWithSelection, ICatalogData, ICatalogDataState } from "../../types";
import { IEvents } from "../base/Events";
import { Model } from "../base/Model";

export class CatalogData extends Model<ICatalogDataState> implements ICatalogData {
  constructor(protected data: Partial<ICatalogDataState> = { cards: [] }, protected events: IEvents) {
    super(data, events);
  }

  setCards(data: ICard[]) {
    this.data.cards = data.map(card => ({ ...card, selected: false }));

    this.emitChanges('catalogData:init');
    this.emitChanges('catalogData:changed');
  }

  getCards(): ICardWithSelection[] {
    return [...this.data.cards];
  }

  getCard(id: string): ICardWithSelection {
    return this.data.cards.find((card) => card.id === id);
  }

  toggleCardSelected(id: string) {
    this.getCard(id).selected = !this.getCard(id).selected;

    this.emitChanges('catalogData:changed');
  }

  getSelectedCards(): ICardWithSelection[] {
    return this.data.cards.filter(card => card.selected);
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
    this.data.cards.forEach(card => card.selected = false);

    this.emitChanges('catalogData:changed');
  }

  isPriceNotNull(id: string): boolean {
    return this.getCard(id).price !== null;
  }
}