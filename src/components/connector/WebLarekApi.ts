import { IApi, IOrder, IOrderSuccess, ICard } from '../../types/index';

type ApiListResponse<Type> = {
  total: number,
  items: Type[]
};

export class WebLarekApi {
  constructor(protected baseUrl: IApi, protected cdnUrl: string) {}

  getProductsApi(): Promise<ICard[]> {
    return this.baseUrl.get<ApiListResponse<ICard>>('/product/')
      .then((cardsData: ApiListResponse<ICard>) => {
        return cardsData.items.map((item) => ({
          ...item,
          image: `${this.cdnUrl}${item.image}`,
        }))
      });
  }

  postOrderApi(orderData: IOrder): Promise<IOrderSuccess> {
    return this.baseUrl.post<IOrderSuccess>('/order/', orderData);
  }
}