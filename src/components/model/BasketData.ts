import { IBasketData, ICard } from "../../types";
import { IEvents } from "../base/Events";

export class BasketData implements IBasketData {
  protected items: ICard[];

  constructor(protected events: IEvents) {
    this.items = [];
  }

  addCardToBasket(item: ICard) {
    this.items.push(item);
    this.events.emit('basket:changed');
  }

  getCardsBasket(): ICard[] {
    return [...this.items];
  }

  getIdsCardsInBasket(): string[] {
    return this.items.map((item) => item.id);
  }

  getCountCardsInBasket(): number {
    return this.items.length;
  }

  checkCardInBasket(id: string): boolean {
    return this.items.some((item) => item.id === id);
  }

  removeCardFromBasket(id: string) {
    this.items = this.items.filter((item) => item.id !== id);
    this.events.emit('basket:changed');
  }

  getTotalPriceFromBasket(): number {
    return this.items.reduce((acc, item) => acc + item.price, 0);
  }

  clearBasket() {
    this.items = [];
    this.events.emit('basket:changed');
  }
}