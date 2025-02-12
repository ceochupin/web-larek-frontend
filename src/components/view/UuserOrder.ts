import { TUserOrder } from '../../types';
import { ensureAllElements } from '../../utils/utils';
import { IEvents } from '../base/Eevents';
import { Form } from '../common/Fform';

export class UserOrder extends Form<TUserOrder> {
  private _buttons: HTMLButtonElement[];

  constructor(protected container: HTMLFormElement, protected events: IEvents) {
    super(container, events);

    this._buttons = ensureAllElements(`.button_alt`, this.container) as HTMLButtonElement[];
    this._buttons.forEach(button => 
      button.addEventListener('click', () => this.setPayment(button.name))
    );
  }

  protected setPayment = (name: string) => {
    this._buttons.forEach(button => 
      this.toggleClass(button, 'button_alt-active', button.name === name)
    );
    this.onInputChange('payment', name);
  }

  protected clearPayment = () => {
    this._buttons.forEach(button => 
      this.toggleClass(button, 'button_alt-active', false)
    );
  }

  reset() {
    super.reset();
    this.clearPayment();
  }
}