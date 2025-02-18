export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
  baseUrl: string;
  get<T>(uri: string): Promise<T>;
  post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
};

export interface ICard {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
};

export interface ICardWithSelection extends ICard {
  isBasket: boolean;
  isSelected: boolean;
};

export interface ICatalogDataState {
  cards: ICardWithSelection[];
};

export interface ICatalogData {
  setCards(data: ICard[]): void;
  setCardSelected (id: string): void;
  getCards(): ICardWithSelection[];
  getCard(id: string): ICardWithSelection;
  toggleCardInBasket(id: string): void;
  getCardsBasket(): ICardWithSelection[];
  getCardIdsBasket(): string[];
  getCountBasket(): number;
  getTotalPriceInBasket(): number;
  clearPropsCatalogData(): void;
  isPriceNotNull(id: string): boolean;
  isCardInBasket(id: string): boolean;
  isBasketNotEmpty(): boolean;
};

export interface IUser {
  payment?: string;
  email?: string;
  phone?: string;
  address?: string;
};

export interface IUserDataState {
  user: IUser;
};

export interface IUserData {
  setUserData(field: keyof IUser, value: string): void;
  getUserData(): IUser;
  clearUserData(): void;
};

export interface IOrder extends IUser {
  total: number;
  items: string[];
};

export type TCardCatalog = Omit<ICard, 'id' | 'description'>;
export type TCardPreview = Omit<ICard, 'id'>;
export type TCardBasket = Pick<ICard, 'title' | 'price'>;

export type TUserOrder = Pick<IUser, 'payment' | 'address'>;
export type TUserContacts = Pick<IUser, 'phone' | 'email'>;

export interface IOrderSuccess {
  id: string;
  total: number;
};
