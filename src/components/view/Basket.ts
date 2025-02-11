import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IBasket {
  items: HTMLElement[];
  total: number;
}

export class Basket extends Component<IBasket> {
  protected listElement: HTMLElement;
  protected totalPriceElement: HTMLElement;
  protected buttonOrderElement: HTMLButtonElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);

    this.listElement = ensureElement('.basket__list', this.container) as HTMLElement;
    this.totalPriceElement = ensureElement('.basket__price', this.container) as HTMLElement;
    this.buttonOrderElement = ensureElement('.basket__button', this.container) as HTMLButtonElement;

    this.buttonOrderElement.addEventListener('click', () => this.events.emit('basket:submit'));

    this.items = [];
    this.total = 0;
  }

  set items(cardsSelected: HTMLElement[]) {
    this.listElement.replaceChildren(...cardsSelected);
  }

  set total(value: number) {
    this.setText(this.totalPriceElement, `${value} синапсов`);
  }

  set buttonState(value: boolean) {
    this.setDisabled(this.buttonOrderElement, !value);
  }
}