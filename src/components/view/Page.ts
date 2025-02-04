import { settings } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";


interface IPage {
  productList: HTMLElement[];
  basketCounter: number;
}

export class Page extends Component<IPage> {
  protected productsContainer: HTMLElement;
  protected elementBasketCounter: HTMLElement;
  protected basketButtonElement: HTMLButtonElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);

    this.productsContainer = ensureElement(settings.pageClassName.productsContainer, this.container) as HTMLElement;
    this.elementBasketCounter = ensureElement(settings.pageClassName.basketCounter, this.container) as HTMLElement;
    this.basketButtonElement = ensureElement(settings.pageClassName.basketButton, this.container) as HTMLButtonElement;

    this.basketButtonElement.addEventListener('click', () => this.events.emit('basket:click'));
  }

  set productList(items: HTMLElement[]) {
    this.productsContainer.replaceChildren(...items);
  }

  set basketCounter(value: number) {
    this.setText(this.elementBasketCounter, value);
  }
}