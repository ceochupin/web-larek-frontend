import { TUserOrder } from '../../types';
import { ensureAllElements } from '../../utils/utils';
import { IEvents } from '../base/Events';
import { Form, IFormState } from '../common/Form';

export class UserOrder extends Form<TUserOrder> {
  protected paymentButtons: HTMLButtonElement[];

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this.paymentButtons = ensureAllElements(`.button_alt`, this.container) as HTMLButtonElement[];

    this.paymentButtons.forEach(button => {
      button.addEventListener('click', () => this.handlePaymentClick(button.name));
    });
  }

  protected handlePaymentClick(payment: string): void {
    this.onInputChange('payment', payment);
  }

  set payment(value: string) {
    console.log(value);
    this.paymentButtons.forEach((button) => {
      this.toggleClass(button, 'button_alt-active', button.name === value);
    });
  }

  set address(value: string) {
    (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
  }
}