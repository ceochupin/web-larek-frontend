import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Ccomponent';
import { IEvents } from '../base/Eevents';

interface IPage {
  cardsList: HTMLElement[];
  basketCounter: number;
}

export class Page extends Component<IPage> {
  protected cardsContainer: HTMLElement;
  protected basketCounterElement: HTMLElement;
  protected basketButtonElement: HTMLButtonElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);

    this.cardsContainer = ensureElement('.gallery', this.container) as HTMLElement;
    this.basketCounterElement = ensureElement('.header__basket-counter', this.container) as HTMLElement;
    this.basketButtonElement = ensureElement('.header__basket', this.container) as HTMLButtonElement;

    this.basketButtonElement.addEventListener('click', () => this.events.emit('basket:open'));
  }

  set cardsList(items: HTMLElement[]) {
    this.cardsContainer.replaceChildren(...items);
  }

  set basketCounter(value: number) {
    this.setText(this.basketCounterElement, value.toString());
  }
}