import { IApi, IOrder, IOrderResult, IProduct } from '../../types/index';

type ApiListResponse<Type> = {
  total: number,
  items: Type[]
};

export class WebLarekApi {
  private _baseUrl: IApi;
  private _cdnUrl: string;

  constructor(baseUrl: IApi, cdnUrl: string) {
    this._baseUrl = baseUrl;
    this._cdnUrl = cdnUrl;
  }

  getProductsApi(): Promise<IProduct[]> {
    return this._baseUrl.get<ApiListResponse<IProduct>>('/product/')
      .then((data: ApiListResponse<IProduct>) => {
        return data.items.map((item) => ({
          ...item,
          image: `${this._cdnUrl}${item.image}`,
        }))
      });

  }

  createOrderApi(data: IOrder): Promise<IOrderResult> {
    return this._baseUrl.post<IOrderResult> ('/order/', data);
  }
}