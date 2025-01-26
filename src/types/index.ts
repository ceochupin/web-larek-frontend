// export interface ICard {
//   id: string;
//   description: string;
//   image: string;
//   title: string;
//   category: string;
//   price: number | null;
// }

// export interface IBasket {
//   items: TCardBasket[];
// }

// export interface IOrder {
//   payment: TPaymentMethod;
//   email: string;
//   phone: string;
//   address: string;
//   total: number;
//   items: string[];
// }

// export interface IOrderSuccess {
//   id: string;
//   total: number;
// }

// export interface ICardsData {
//   items: ICard[];
//   preveiw: string | null;
//   getCard(): ICard;
//   getCardList(): ICard[];
// }

// export type TCardItem = Omit<ICard, 'description'>;
// export type TCardDetail = Omit<ICard, 'id'>;
// export type TCardBasket = Pick<ICard, 'title' | 'price'>;

// export type TPaymentMethod = 'online' | 'cash';
// export type TOrderDataPayment = Pick<IOrder, 'payment' | 'address'>;
// export type TOrderDataContact = Pick<IOrder, 'email' | 'phone'>;
// export type TOrderDataSuccess = Pick<IOrder, 'total' | 'items'>;





