import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Ccomponent';

export class Card<T> extends Component<T> {
  protected _title: HTMLElement;
  protected _price: HTMLElement;
  protected _id: string;

  constructor(protected container: HTMLElement) {
    super(container);

    this._title = ensureElement('.card__title', this.container) as HTMLElement;
    this._price = ensureElement('.card__price', this.container) as HTMLElement;
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  set price(value: number | null) {
    this.setText(this._price, value ? `${value} синапсов` : `Бесценно`);
  }

  set id(value: string) {
    this._id = value;
  }

  get id(): string {
    return this._id;
  }
}