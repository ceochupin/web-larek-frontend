import { IOrderSuccess } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Ccomponent';
import { IEvents } from '../base/Eevents';

export class Success extends Component<IOrderSuccess> {
  protected _total: HTMLElement;
  protected button: HTMLButtonElement;
  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);

    this._total = ensureElement('.order-success__description', this.container) as HTMLElement;
    this.button = ensureElement('.order-success__close', this.container) as HTMLButtonElement;

    this.button.addEventListener('click', () => this.events.emit('success:close'));
  }

  set total(value: number) {
    this.setText(this._total, `Списано ${value} синапсов`);
  }
}