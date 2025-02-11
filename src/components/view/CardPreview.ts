import { TCardPreview } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { CardCatalog } from "./CardCatalog";

export class CardPreview extends CardCatalog implements TCardPreview {
  protected _description: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container, events);

    this._description = ensureElement('.card__text', this.container) as HTMLElement;
    this._button = ensureElement('.card__button', this.container) as HTMLButtonElement;

    this._button.addEventListener('click', () => this.events.emit('cardPreview:buttonClick', { id: this._id }));
  }

  set description(value: string) {
    this.setText(this._description, value);
  }

  set buttonText(value: boolean) {
    this.setText(this._button, value ? `Убрать` : `В корзину`);
  }

  set buttonState(value: boolean) {
    this.setDisabled(this._button, !value);
  }
}