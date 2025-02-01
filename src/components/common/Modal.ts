import { settings } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected modalCloseButton: HTMLButtonElement;
  protected _content: HTMLElement;


  constructor(container: HTMLElement) {
    super(container);

    this.modalCloseButton = ensureElement(settings.modalClassName.closeButton, container) as HTMLButtonElement;
    this._content = ensureElement(settings.modalClassName.contentContainer, container) as HTMLElement;

    this.modalCloseButton.addEventListener('click', this.close.bind(this));
    this.container.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
    this.handleEscUp = this.handleEscUp.bind(this);

    this._content.addEventListener('mousedown', (event) => event.stopPropagation());
  }

  set content(value: HTMLElement) {
    this._content.replaceChildren(value);
  }

  open(): void {
    this.toggleClass(this.container, settings.modalClassName.active, true);
    document.addEventListener('keyup', this.handleEscUp);
  }

  close(): void {
    this.toggleClass(this.container, settings.modalClassName.active, false);
    document.removeEventListener('keyup', this.handleEscUp);
  }

  handleEscUp(evt: KeyboardEvent): void {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  render(modalData: IModal): HTMLElement {
    super.render(modalData);
    this.open();
    return this.container;
  }
}