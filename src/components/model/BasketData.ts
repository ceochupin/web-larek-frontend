import { IBasketData, IProduct } from "../../types";

// Класс модели данных корзины
export class BasketData implements IBasketData {
  protected items: IProduct[];

  constructor() {
    this.items = [];
  }

  addProductInBasket(item: IProduct): void {
    this.items.push(item);
  }

  getProductsAllInBasket(): IProduct[] {
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
  }

  getTotalPriceProductsInBasket(): number {
    return this.items.reduce((acc, item) => acc + (item.price || 0), 0);
  }

  clearBasket(): void {
    this.items = [];
  }
}