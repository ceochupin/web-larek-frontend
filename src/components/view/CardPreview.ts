import { TCardPreview } from "../../types";
import { settings } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Card } from "../common/Card";

// делаю именно отдельным классом расширяя Card, а не CardCatalog
// потому что тогда нам бы пришлось здесь отписаться от слушателя
// клика по контейнеру. А так получился полностью независимый класс
export class CardPreview extends Card<TCardPreview> {
  protected _category: HTMLElement;
  protected _description: HTMLElement;
  protected _image: HTMLImageElement;
  protected _button: HTMLButtonElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);

    this._category = ensureElement('.card__category', this.container) as HTMLElement;
    this._description = ensureElement('.card__text', this.container) as HTMLElement;
    this._image = ensureElement('.card__image', this.container) as HTMLImageElement;
    this._button = ensureElement('.card__button', this.container) as HTMLButtonElement;

    this._button.addEventListener('click', () => this.events.emit('cardPreviewButton:click', { id: this._id }));
  }

  set category(value: string) {
    this.setText(this._category, value);
    this.toggleClass(this._category, settings.category[value], true);
  }

  set description(value: string) {
    this.setText(this._description, value);
  }

  set image(value: string) {
    this.setImage(this._image, value);
  }

  set buttonText(isBasket: boolean) {
    this.setText(this._button, isBasket ? `Убрать` : `В корзину`);
  }

  set buttonState(value: boolean) {
    this.setDisabled(this._button, !value);
  }
}