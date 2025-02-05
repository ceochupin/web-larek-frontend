import { ICard, ICardsData } from '../../types/index';
import { IEvents } from '../base/Events';


// Класс модели данных списка всех карточек продуктов
export class CardsData implements ICardsData {
  protected items: ICard[];

  constructor(protected events: IEvents) {
    this.items = [];
  }

  setCards(data: ICard[]) {
    this.items = data;
    this.events.emit('cardsData:changed');
  }

  getCards(): ICard[] {
    return [...this.items];
  }

  getCard(id: string): ICard | undefined {
    return this.items.find((item) => item.id === id);
  }

  isPriceNotNull(id: string): boolean {
    return this.items.some((item) => item.id === id && item.price !== null);
  }
}

