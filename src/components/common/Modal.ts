import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected _closeButton: HTMLButtonElement;
  protected _content: HTMLElement;


  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);

    this._closeButton = ensureElement('.modal__close', container) as HTMLButtonElement;
    this._content = ensureElement('.modal__content', container) as HTMLElement;

    this._closeButton.addEventListener('click', this.close.bind(this));
    this.container.addEventListener('click', this.close.bind(this));
    this.handleEscUp = this.handleEscUp.bind(this);

    this._content.addEventListener('click', (event) => event.stopPropagation());
  }

  set content(value: HTMLElement) {
    this._content.replaceChildren(value);
  }

  open() {
    this.toggleClass(this.container, 'modal_active', true);
    document.addEventListener('keyup', this.handleEscUp);
    this.events.emit('modal:open');
  }

  close() {
    this.toggleClass(this.container, 'modal_active', false);
    document.removeEventListener('keyup', this.handleEscUp);
    this.content = null;
    this.events.emit('modal:close');
  }

  handleEscUp(evt: KeyboardEvent) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  locked(value: boolean) {
    this.toggleClass(this.container, 'page__wrapper_locked', value);
  }

  render(data: IModal): HTMLElement {
    super.render(data);
    this.open();
    return this.container;
  }
}