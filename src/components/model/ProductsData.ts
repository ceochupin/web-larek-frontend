import { ICard } from '../../types/index';
import { IEvents } from '../base/Events';


// Класс модели данных списка всех карточек продуктов
export class ProductsData {
  protected items: ICard[] = [];

  constructor(protected events: IEvents) {}

  setProductsAll(data: ICard[]) {
    this.items = data;
  }

  getProductsAll(): ICard[] {
    return this.items;
  }

  getProduct(id: string): ICard {
    return this.items.find((item) => item.id === id);
  }

  validatePriceProduct(id: string): boolean {
    return this.items.some((item) => item.id === id && item.price !== null);
  }
}

