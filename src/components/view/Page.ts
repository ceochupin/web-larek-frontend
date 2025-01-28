import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";


interface IPage {
  productList: HTMLElement[];
  basketCounter: number;
}

export class Page extends Component<IPage> {
  protected productsContainer: HTMLElement;
  protected elementBasketCounter: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    this.productsContainer = ensureElement('.gallery', this.container);
    this.elementBasketCounter = ensureElement('.header__basket-counter', this.container);
  }

  set productList(items: HTMLElement[]) {
    this.productsContainer.replaceChildren(...items);
  }

  set basketCounter(value: number) {
    this.setText(this.elementBasketCounter, value);
  }
}