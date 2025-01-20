# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- `src/` — исходные файлы проекта
- `src/components/` — папка с JS компонентами
- `src/components/base/` — папка с базовым кодом

Важные файлы:
- `src/pages/index.html` — HTML-файл главной страницы
- `src/types/index.ts` — файл с типами
- `src/index.ts` — точка входа приложения
- `src/scss/styles.scss` — корневой файл стилей
- `src/utils/constants.ts` — файл с константами
- `src/utils/utils.ts` — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```bash
  npm install
  npm run start
```

или

```bash
  yarn
  yarn start
```
## Сборка

```bash
  npm run build
```

или

```bash
  yarn build
```

## Данные и типы данных, используемые в приложении

Карточка продукта:
```ts
export interface ICard {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}
```

Корзина:
```ts
export interface IBasket {
  items: TCardBasket[];
  total: number | null;
}
```

Заказ:
```ts
export interface IOrder {
  payment: TPaymentMethod;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}
```

Данные карточки продукта, используемые для отображения на главной странице:
```ts
export type TCardItem = Omit<ICard, 'id' | 'description'>;
```

Данные карточки продукта, используемые для отображения детальной информации в модальном окне:
```ts
export type TCardDetail = Omit<ICard, 'id'>;
```

Данные карточки продукта, используемые для отображения в корзине:
```ts
export type TCardBasket = Pick<ICard, 'title' | 'price'>;
```

Возможные методы оплат при оформлении заказа:
```ts
export type TPaymentMethod = 'online' | 'cash';
```

Данные, используемые для отображения на первом шаге при оформлении заказа:
```ts
export type TOrderDataPayment = Pick<IOrder, 'payment' | 'address'>;
```

Данные, используемые для отображения на втором шаге при оформлении заказа:
```ts
export type TOrderDataContact = Pick<IOrder, 'email' | 'phone'>;
```

Данные, используемые для отображения при успешном оформлении зказа:
```ts
export type TOrderDataSuccess = Pick<IOrder, 'total' | 'items'>;
```

## Архитектура приложения

Проект реализован с использованием паттерна MVP (Model-View-Presenter) и объектно-событийного подхода.

### Model (Модель)

Модель представлена классом `AppModel`, который отвечает за хранение и управление данными приложения.

```ts
class AppModel {
  private cards: ICard[] = [];
  private basket: IBasket = { items: [], total: 0 };
  private order: IOrder | null = null;

  // Методы для работы с данными
  getCards(): ICard[];
  addToBasket(card: ICard): void;
  removeFromBasket(cardId: string): void;
  setOrder(order: IOrder): void;
}
```

### View (Представление)

Представление разделено на несколько компонентов, каждый из которых отвечает за отображение определенной части интерфейса:

```ts
class CardListView {
  render(cards: TCardItem[]): void;
}

class CardDetailView {
  render(card: TCardDetail): void;
}

class BasketView {
  render(basket: IBasket): void;
}

class OrderView {
  renderPaymentStep(data: TOrderDataPayment): void;
  renderContactStep(data: TOrderDataContact): void;
  renderSuccess(data: TOrderDataSuccess): void;
}
```

### Presenter (Презентер)

Презентер связывает модель и представление, обрабатывает пользовательские события и обновляет данные:

```ts
class AppPresenter {
  constructor(private model: AppModel, private api: AppApi) {
    // Инициализация представлений
    this.cardListView = new CardListView();
    this.cardDetailView = new CardDetailView();
    this.basketView = new BasketView();
    this.orderView = new OrderView();

    // Подписка на события
    this.cardListView.on('cardClick', this.handleCardClick.bind(this));
    this.basketView.on('removeItem', this.handleRemoveFromBasket.bind(this));
    this.orderView.on('submitOrder', this.handleSubmitOrder.bind(this));
  }

  // Методы-обработчики событий
  private handleCardClick(cardId: string): void;
  private handleAddToBasket(cardId: string): void;
  private handleRemoveFromBasket(cardId: string): void;
  private handleSubmitOrder(orderData: IOrder): void;

  // Методы для обновления представлений
  private updateCardList(): void;
  private updateBasket(): void;
}
```

### API

Класс `AppApi` обеспечивает взаимодействие с сервером:

```ts
class AppApi {
  constructor(private api: Api);

  getCards(): Promise<ICard[]>
  getCard(id: string): Promise<ICard>
  createOrder(order: IOrder): Promise<IOrder>
}
```

## Взаимодействие компонентов

1. При загрузке страницы `AppPresenter` инициализирует модель и представления.
2. `AppPresenter` запрашивает данные о карточках через `AppApi` и обновляет модель.
3. `AppPresenter` вызывает метод `updateCardList()` для отображения карточек на главной странице.
4. При клике на карточку, `CardListView` генерирует событие, которое обрабатывается в `AppPresenter`.
5. `AppPresenter` запрашивает детальную информацию о карточке и отображает ее в модальном окне через `CardDetailView`.
6. При добавлении товара в корзину, `AppPresenter` обновляет модель и вызывает `updateBasket()` для обновления отображения корзины.
7. При оформлении заказа `AppPresenter` последовательно отображает шаги через `OrderView`, собирает данные и отправляет заказ на сервер через `AppApi`.

## Обработка событий

Все компоненты представления наследуются от базового класса `EventEmitter`, который обеспечивает механизм подписки на события и их генерацию:

```ts
class EventEmitter {
  on(event: string, callback: Function): void;
  emit(event: string, ...args: any[]): void;
}
```

Это позволяет реализовать слабосвязанную архитектуру, где представления генерируют события, а презентер их обрабатывает.

## Заключение

Данная архитектура обеспечивает четкое разделение ответственности между компонентами, облегчает тестирование и позволяет легко расширять функциональность приложения.