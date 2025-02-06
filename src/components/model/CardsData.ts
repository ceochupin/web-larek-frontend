import { ICard, ICardsData } from '../../types/index';
import { IEvents } from '../base/Events';
import { Model } from '../base/Model';

export interface ICardsDataState {
  items: ICard[];
}

export class CardsData extends Model<ICardsDataState> implements ICardsData {
  constructor(protected data: Partial<ICardsDataState> = { items: [] }, protected events: IEvents) {
    super(data, events);
  }

  setCards(data: ICard[]) {
    this.data.items = data;
    this.emitChanges('cardsData:changed');
  }

  getCards(): ICard[] {
    return [...this.data.items];
  }

  getCard(id: string): ICard | undefined {
    return this.data.items.find((item) => item.id === id);
  }

  isPriceNotNull(id: string): boolean {
    return this.data.items.some((item) => item.id === id && item.price !== null);
  }
}

