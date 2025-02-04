import { IApi, IOrder, IOrderSuccess, ICard } from '../../types/index';

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

  getProductsApi(): Promise<ICard[]> {
    return this._baseUrl.get<ApiListResponse<ICard>>('/product/')
      .then((data: ApiListResponse<ICard>) => {
        return data.items.map((item) => ({
          ...item,
          image: `${this._cdnUrl}${item.image}`,
        }))
      });

  }

  createOrderApi(data: IOrder): Promise<IOrderSuccess> {
    return this._baseUrl.post<IOrderSuccess> ('/order/', data);
  }
}