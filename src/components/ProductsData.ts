export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IProductsData {
  items: IProduct[];
  getProduct: (id: string) => IProduct;
}

export class ProductsData implements IProductsData {
  protected _items: IProduct[];

  set items(data: IProduct[]) {
    this._items = data;
  }

  get items() {
    return this._items;
  }

  getProduct(id: string) {
    return this._items.find((item) => item.id === id);
  }
}

