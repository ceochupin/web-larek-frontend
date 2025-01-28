import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component"
import { EventEmitter } from "../base/events";

export class Product extends Component<IProduct> {
  protected productCategory: HTMLElement;
  protected productTitle: HTMLElement;
  protected productImage: HTMLImageElement;
  protected productPrice: HTMLElement;
  protected productButton: HTMLButtonElement;
  protected productId: string;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);
    this.productCategory = ensureElement('.card__category', this.container);
    this.productTitle = ensureElement('.card__title', this.container);
    this.productImage = ensureElement('.card__image', this.container) as HTMLImageElement;
    this.productPrice = ensureElement('.card__price', this.container);

    this.container.addEventListener('click', () => this.events.emit('product:click', {id: this.productId}));
  }

  set category(value: string) {
    this.setText(this.productCategory, value);
  }

  set title(value: string) {
    this.setText(this.productTitle, value);
  }

  set image(value: string) {
    this.setImage(this.productImage, value);
  }

  set price(value: number | null) {
    if (value !== null) {
      this.setText(this.productPrice, `${value} синапсов`);
    } else {
      this.setText(this.productPrice, 'Бесценно');
    }
  }

  set id(value: string) {
    this.productId = value;
  }
}