import { TCardCatalog } from "../../types";
import { settings } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Card } from "../common/Card";

export class CardCatalog extends Card<TCardCatalog> {
  protected _category: HTMLElement;
  protected _image: HTMLImageElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);

    this._category = ensureElement('.card__category', this.container) as HTMLElement;
    this._image = ensureElement('.card__image', this.container) as HTMLImageElement;

    this.container.addEventListener('click', () => this.events.emit('cardCatalog:click', {id: this._id}));
  }

  set category(value: string) {
    this.setText(this._category, value);
    this.toggleClass(this._category, settings.category[value], true);
  }

  set image(value: string) {
    this.setImage(this._image, value);
  }
}