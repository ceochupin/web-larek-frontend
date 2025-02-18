import { TCardPreview } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';
import { CardCatalog } from './CardCatalog';

export class CardPreview extends CardCatalog implements TCardPreview {
  protected _description: HTMLElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container, events);

    this._description = ensureElement('.card__text', this.container) as HTMLElement;
  };

  set description(value: string) {
    this.setText(this._description, value);
  };

  setButtonText(value: boolean) {
    this.setText(this._button, value ? `Убрать` : `В корзину`);
  };

  setButtonState(value: boolean) {
    this.setDisabled(this._button, !value);
  };
};