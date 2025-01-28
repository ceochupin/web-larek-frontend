// Интерфейс одной карточки продукта
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

// Интерфейс самого заказа
export interface IOrder {
  payment: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

// Интерфейс результата заказа
export interface IOrderResult {
  id: string;
  total: number;
}

// Интерфейс класса модели данных списка всех карточек продуктов
export interface IProductsData {
  setProductsAll: (data: IProduct[]) => void;
  getProductsAll: () => IProduct[];
  getProduct: (id: string) => IProduct;
  validatePriceProduct: (id: string) => boolean;
}

// Интерфейс класса модели данных корзины
export interface IBasketData {
  addProductInBasket: (item: IProduct) => void;
  getProductsAllInBasket: () => IProduct[];
  getCountProductsInBasket: () => number;
  checkProductInBasket: (id: string) => boolean;
  removeProductInBasket: (id: string) => void;
  getTotalPriceProductsInBasket: () => number;
  clearBasket: () => void;
}

// Интерфейс класса модели данных заказа
export interface IOrderData {
  setPaymentInOrder: (payment: string) => void;
  setEmailInOrder: (email: string) => void;
  setPhoneInOrder: (phone: string) => void;
  setAddressInOrder: (address: string) => void;
  getPaymentInOrder: () => string;
  getEmailInOrder: () => string;
  getPhoneInOrder: () => string;
  getAddressInOrder: () => string;
  clearOrderData: () => void;
}

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
  baseUrl: string;
  get<T>(uri: string): Promise<T>;
  post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}