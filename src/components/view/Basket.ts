import { settings } from "../../utils/constants";
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

    this.listElement = ensureElement(settings.basketClassName.list, this.container) as HTMLElement;
    this.totalPriceElement = ensureElement(settings.basketClassName.totalPrice, this.container) as HTMLElement;
    this.buttonOrderElement = ensureElement(settings.basketClassName.buttonOrder, this.container) as HTMLButtonElement;

    this.buttonOrderElement.addEventListener('click', () => this.events.emit('basket:stepOrder'));

    this.items = [];
  }

  set items(value: HTMLElement[]) {
    this.listElement.replaceChildren(...value);
  }

  set total(value: number) {
    this.setText(this.totalPriceElement, `${value} синапсов`);
  }

  set buttonState(value: boolean) {
    this.setDisabled(this.buttonOrderElement, !value);
  }
}