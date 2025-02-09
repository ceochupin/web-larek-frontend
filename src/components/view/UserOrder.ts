import { TUserOrder } from "../../types";
import { ensureAllElements } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "../common/Form";

// export class UserOrder extends Form<TUserOrder> {
//   protected _buttonsРayment: HTMLButtonElement[];

//   constructor(container: HTMLFormElement, events: IEvents) {
//     super(container, events);

//     this._buttonsРayment = ensureAllElements(`.button_alt`, this.container);

//     this._buttonsРayment.forEach((buttonРayment) => {
//       buttonРayment.addEventListener('click', () => {
//         this.buttonsРayment = buttonРayment.name;
//         this.onInputChange(`payment`, buttonРayment.name);
//       })
//     })
//   }

//   set buttonsРayment(name: string) {
//     this._buttonsРayment.forEach((buttonsРayment) => {
//       this.toggleClass(buttonsРayment, 'button_alt-active', buttonsРayment.name === name);
//     });
//   }


//   set address(value: string) {
//     (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
//   }


//   clearbuttonsРayment() {
//     this._buttonsРayment.forEach((buttonРayment) => {
//       this.toggleClass(buttonРayment, 'button_alt-active', false);
//     });
//   }
// }

export class UserOrder extends Form<TUserOrder> {
  private _paymentButtons: HTMLButtonElement[];

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this._paymentButtons = ensureAllElements<HTMLButtonElement>(`.button_alt`, this.container);
    this._paymentButtons.forEach(button => 
      button.addEventListener('click', () => this.setPayment(button.name))
    );
  }

  setPayment(name: string) {
    this._paymentButtons.forEach(button => 
      this.toggleClass(button, 'button_alt-active', button.name === name)
    );
    this.onInputChange('payment', name);
  }

  clearPayment() {
    this._paymentButtons.forEach(button => 
      this.toggleClass(button, 'button_alt-active', false)
    );
  }
}