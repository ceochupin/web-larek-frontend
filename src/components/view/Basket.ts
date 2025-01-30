import { settings } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IBasket {
  items: HTMLElement[];
  total: number;
}

export class Basket extends Component<IBasket> {
  protected listElement: HTMLElement;
  protected totalPriceElement: HTMLElement;
  protected buttonOrderElement: HTMLButtonElement;

  constructor(container: HTMLElement) {
    super(container);

    this.listElement = ensureElement(settings.basketClassName.list, this.container) as HTMLElement;
    this.totalPriceElement = ensureElement(settings.basketClassName.totalPrice, this.container) as HTMLElement;
    this.buttonOrderElement = ensureElement(settings.basketClassName.buttonOrder, this.container) as HTMLButtonElement;

    this.items = [];
  }

  set items(value: HTMLElement[]) {
    this.listElement.replaceChildren(...value);
  }

  set total(value: number) {
    this.setText(this.totalPriceElement, `${value} синапсов`);
  }
}