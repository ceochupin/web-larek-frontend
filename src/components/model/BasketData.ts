import { ICard } from "../../types";
import { IEvents } from "../base/Events";

// Класс модели данных корзины
export class BasketData {
  protected items: ICard[];

  constructor(protected events: IEvents) {
    this.items = [];
  }

  addProductInBasket(item: ICard): void {
    this.items.push(item);
    this.events.emit('basket:changed');
  }

  getProductsAllInBasket(): ICard[] {
    return this.items;
  }

  getIdsProductsInBasket(): string[] {
    return this.items.map((item) => item.id);
  }

  getCountProductsInBasket(): number {
    return this.items.length;
  }

  checkProductInBasket(id: string): boolean {
    return this.items.some((item) => item.id === id);
  }

  removeProductInBasket(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
    this.events.emit('basket:changed');
  }

  getTotalPriceProductsInBasket(): number {
    return this.items.reduce((acc, item) => acc + (item.price || 0), 0);
  }

  clearBasket(): void {
    this.items = [];
    this.events.emit('basket:changed');
  }
}