import { Api, ApiListResponse, ApiPostMethods } from './base/api';
import { IProduct } from './ProductsData';

export type TPaymentMethod = 'online' | 'cash';

export interface IOrderForms {
  payment: TPaymentMethod;
  email: string;
  phone: string;
  address: string;
}

export interface IOrder extends IOrderForms {
  total: number;
  items: string[];
}

export interface IOrderSuccess {
  id: string;
  total: number;
}

export interface IApi {
  baseUrl: string;
  get<T>(uri: string): Promise<T>;
  post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export class AppApi {
  private _baseUrl: IApi;

  constructor(baseUrl: IApi) {
    this._baseUrl = baseUrl;
  }


  getApiProducts(): Promise<IProduct[]> {
    return this._baseUrl.get(`/product`).then((products: IProduct[]) => products);
  }

  // getApiProduct(id: string): Promise<IProduct> {
  //   return this.get(`/product/${id}`).then(
  //     (item: IProduct) => ({
  //       ...item,
  //       image: this.cdn + item.image,
  //     })
  //   );
  // }

  // postApiOrder(order: IOrder): Promise<IOrderSuccess> {
  //   return this.post('/order', order).then(
  //     (data: IOrderSuccess) => data
  //   );
  // }
}