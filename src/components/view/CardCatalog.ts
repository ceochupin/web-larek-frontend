import { TCardCatalog } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';
import { Card } from '../common/Card';

export class CardCatalog extends Card<TCardCatalog> {
  protected _category: HTMLElement;
  protected _image: HTMLImageElement;
  protected _button: HTMLButtonElement;

  protected categoryValue = {
    'софт-скил': 'card__category_soft',
    'другое': 'card__category_other',
    'дополнительное': 'card__category_additional',
    'кнопка': 'card__category_button',
    'хард-скил': 'card__category_hard',
	} as Record<string, string>

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);

    this._category = ensureElement('.card__category', this.container) as HTMLElement;
    this._image = ensureElement('.card__image', this.container) as HTMLImageElement;
    this._button = this.container.querySelector('.card__button') as HTMLButtonElement;

    if (this._button) {
      this._button.addEventListener('click', () => this.events.emit('cardPreviewView:clickButton', { id: this._id }));
    } else {
      this.container.addEventListener('click', () => this.events.emit('cardCatalogView:clickCard', { id: this._id }));
    }
  }

  set category(value: string) {
    this.setText(this._category, value);
    this.toggleClass(this._category, this.categoryValue[value], true);
  }

  set image(value: string) {
    this.setImage(this._image, value);
  }
}