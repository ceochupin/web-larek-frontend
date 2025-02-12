import { TUserContacts } from '../../types';
import { IEvents } from '../base/Eevents';
import { Form } from '../common/Fform';

export class UserContacts extends Form<TUserContacts> {
  constructor(protected container: HTMLFormElement, protected events: IEvents) {
    super(container, events);
  }

  reset() {
    super.reset();
  }
}