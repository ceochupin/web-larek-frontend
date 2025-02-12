import { TUserContacts } from '../../types';
import { IEvents } from '../base/Events';
import { Form } from '../common/Form';

export class UserContacts extends Form<TUserContacts> {
  constructor(protected container: HTMLFormElement, protected events: IEvents) {
    super(container, events);
  }

  reset() {
    super.reset();
  }
}