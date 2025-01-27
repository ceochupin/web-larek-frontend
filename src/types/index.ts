// Интерфейс одной карточки продукта
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

// Интерфейс модели данных списка всех карточек продуктов
export interface IProductsData {
  setProductsAll: (data: IProduct[]) => void;
  getProductsAll: () => IProduct[];
  getProduct: (id: string) => IProduct;
  validatePriceProduct: (id: string) => boolean;
}

// Интерфейс модели данных корзины
export interface IBasketData {
  addProductInBasket: (product: IProduct) => void;
  getProductsAllInBasket: () => IProduct[];
  getCountProductsInBasket: () => number;
  checkProductInBasket: (id: string) => boolean;
  removeProductInBasket: (id: string) => void;
  getTotalPriceProductsInBasket: () => number;
  clearBasket: () => void;
}

// Интерфейс модели данных заказа
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