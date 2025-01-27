import { IProduct, IProductsData } from '../../types/index';


// Класс модели данных списка всех карточек продуктов
export class ProductsData implements IProductsData {
  protected items: IProduct[] = [];

  setProductsAll(data: IProduct[]) {
    this.items = data;
  }

  getProductsAll(): IProduct[] {
    return this.items;
  }

  getProduct(id: string): IProduct {
    return this.items.find((item) => item.id === id);
  }

  validatePriceProduct(id: string): boolean {
    return this.items.some((item) => item.id === id && item.price !== null);
  }
}

