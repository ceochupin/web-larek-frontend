import { TCardBasket } from "../../types";
import { settings } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Card } from "../common/Card";

export class CardBasket extends Card<TCardBasket> {
  protected _button: HTMLButtonElement;
  protected _index: HTMLElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);

    this._button = ensureElement(settings.productElementClassName.button, this.container) as HTMLButtonElement;
    this._index = ensureElement(settings.basketClassName.index, this.container) as HTMLElement;

    this._button.addEventListener('click', () => this.events.emit('productBasket:remove', {id: this._id}));
  }
}