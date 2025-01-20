export interface ICard {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IBasket {
  items: TCardBasket[];
  total: number | null;
}

export interface IOrder {
  payment: TPaymentMethod;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export type TCardItem = Omit<ICard, 'id' | 'description'>;
export type TCardDetail = Omit<ICard, 'id'>;
export type TCardBasket = Pick<ICard, 'title' | 'price'>;

export type TPaymentMethod = 'online' | 'cash';
export type TOrderDataPayment = Pick<IOrder, 'payment' | 'address'>;
export type TOrderDataContact = Pick<IOrder, 'email' | 'phone'>;
export type TOrderDataSuccess = Pick<IOrder, 'total' | 'items'>;





