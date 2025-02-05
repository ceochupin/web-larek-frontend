import { TCardCatalog } from "../../types";
import { settings } from "../../utils/constants";
import { IEvents } from "../base/Events";
import { Card } from "../common/Card";

export class CardCatalog extends Card<TCardCatalog> {
  protected _category: HTMLElement;
  protected _image: HTMLImageElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);

    this._category = container.querySelector(settings.productElementClassName.category) as HTMLElement;
    this._image = container.querySelector(settings.productElementClassName.image) as HTMLImageElement;

    this.container.addEventListener('click', () => this.events.emit('productCatalog:click', {id: this._id}));
  }

  set category(value: string) {
    this.setText(this._category, value);
    this.toggleClass(this._category, settings.productCategoryClassName[value], true);
  }

  set image(value: string) {
    this.setImage(this._image, value);
  }
}