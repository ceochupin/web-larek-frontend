import { TCardBasket } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';
import { Card } from '../common/Card';

export class CardBasket extends Card<TCardBasket> {
  protected _button: HTMLButtonElement;
  protected _index: HTMLElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);

    this._button = ensureElement('.card__button', this.container) as HTMLButtonElement;
    this._index = ensureElement('.basket__item-index', this.container) as HTMLElement;

    this._button.addEventListener('click', () => this.events.emit('cardBasket:selectedChanged', { id: this._id }));
  }

  set index(value: number) {
    this.setText(this._index, value.toString());
  }
}