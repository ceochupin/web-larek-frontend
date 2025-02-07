// Интерфейс одной карточки получаемой с сервера
export interface ICard {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface ICards {
  items: ICard[];
}

// Данные карточки в каталоге для представления
export type TCardCatalog = Omit<ICard, 'id' | 'description'>;

// Данные карточки в детальном виде для представления
export type TCardPreview = Omit<ICard, 'id'>;

// Данные карточки в корзине для представления
export type TCardBasket = Pick<ICard, 'title' | 'price'>;


// Возможные типы оплаты
export type TPayment = 'card' | 'cash';

// Интерфейс самого заказа
export interface IOrder {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export type TOrder = Pick<IOrder, 'payment' | 'email'>;
export type TContacts = Pick<IOrder, 'phone' | 'address'>;

// Интерфейс результата заказа
export interface IOrderSuccess {
  id: string;
  total: number;
}

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
  baseUrl: string;
  get<T>(uri: string): Promise<T>;
  post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface ICardsData {
  setCards(data: ICard[]): void;
  getCards(): ICard[];
  getCard(id: string): ICard;
  isPriceNotNull(id: string): boolean;
}

export interface IBasketData {
  addCardToBasket(item: ICard): void;
  getCardsBasket(): ICard[];
  getIdsCardsInBasket(): string[];
  getCountCardsInBasket(): number;
  checkCardInBasket(id: string): boolean;
  removeCardFromBasket(id: string): void;
  getTotalPriceFromBasket(): number;
  clearBasket(): void;
}

export interface ICardWithSelection extends ICard {
  selected: boolean;
}

export interface ICatalogData {
  setCards(data: ICard[]): void;
  getCards(): ICard[];
  getCard(id: string): ICard | undefined;
  toggleCardSelection(id: string): void;
  getSelectedCards(): ICard[];
  getSelectedCardIds(): string[];
  getSelectedCardsCount(): number;
  getTotalPriceOfSelectedCards(): number;
  clearSelection(): void;
  isPriceNotNull(id: string): boolean;
}

export interface ICatalogDataState {
  cards: ICardWithSelection[];
}

export interface IUser {
  payment?: TPayment;
  email?: string;
  phone?: string;
  address?: string;
}

export interface IUserData {
  setPayment(payment: TPayment): void;
  setEmail(email: string): void;
  setPhone(phone: string): void;
  setAddress(address: string): void;
  getPayment(): string;
  getEmail(): string;
  getPhone(): string;
  getAddress(): string;
  clearUserData(): void;
}

export interface IUserDataState {
  user: IUser;
}