import { TUserContacts } from '../../types';
import { IEvents } from '../base/Events';
import { Form } from '../common/Form';

export class UserContacts extends Form<TUserContacts> {
  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
  }

  set phone(value: string) {
    (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
  }

  set email(value: string) {
    (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
  }
}