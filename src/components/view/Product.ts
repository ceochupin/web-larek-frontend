import { IProduct } from "../../types";
import { settings } from "../../utils/constants";
import { Component } from "../base/Component"
import { IEvents } from "../base/Events";

export class Product extends Component<IProduct> {
  protected _events: IEvents;
  protected _category: HTMLElement;
  protected _title: HTMLElement;
  protected _description: HTMLElement;
  protected _image: HTMLImageElement;
  protected _price: HTMLElement;
  protected _addButton: HTMLButtonElement;
  protected _id: string;

  constructor(protected container: HTMLElement, events: IEvents) {
    super(container);
    this._events = events;

    this._category = container.querySelector(settings.productElementClassName.category) as HTMLElement;
    this._title = container.querySelector(settings.productElementClassName.title) as HTMLElement;
    this._description = container.querySelector(settings.productElementClassName.description) as HTMLElement;
    this._image = container.querySelector(settings.productElementClassName.image) as HTMLImageElement;
    this._price = container.querySelector(settings.productElementClassName.price) as HTMLElement;
    this._addButton = container.querySelector(settings.productElementClassName.button) as HTMLButtonElement;

    this.container.addEventListener('click', () => this._events.emit('product:click', {id: this._id}));
  }

  set category(value: string) {
    this.setText(this._category, value);
    this.toggleClass(this._category, settings.productCategoryClassName[value], true);
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  set description(value: string) {
    this.setText(this._description, value);
  }

  set image(value: string) {
    this.setImage(this._image, value);
  }

  set price(value: number | null) {
    this.setText(this._price, value ? `${value} синапсов` : `Бесценно`);
  }

  set button(isBasket: boolean) {
    this.setText(this._addButton, isBasket ? `Убрать из корзины` : `Добавить в корзину`);
  }

  set id(value: string) {
    this._id = value;
  }

  get id() {
    return this._id;
  }
}