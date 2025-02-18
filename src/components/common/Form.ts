import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

export interface IFormState {
  valid: boolean;
  errors: string;
}

export class Form<T> extends Component<IFormState> {
  protected submit: HTMLButtonElement;
  protected _errors: HTMLSpanElement;

  constructor(protected container: HTMLFormElement, protected events: IEvents) {
    super(container);

    this.submit = ensureElement('button[type=submit]', this.container) as HTMLButtonElement;
    this._errors = ensureElement('.form__errors', this.container) as HTMLSpanElement;

    this.container.addEventListener('input', this.handleInput);
    this.container.addEventListener('submit', this.handleSubmit);
  }

  protected handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const field = target.name as keyof T;
    const value = target.value;

    this.onInputChange(field, value);
  }

  protected onInputChange(field: keyof T, value: string) {
    this.events.emit('formFieldValue:changed', {
      field,
      value
    });
  }

  protected handleSubmit = (event: Event) => {
    event.preventDefault();
    this.events.emit(`${this.container.name}View:submit`);
  }

  set valid(isValid: boolean) {
    this.setDisabled(this.submit, !isValid);
  }

  set errors(value: string) {
    this.setText(this._errors, value);
  }

  render(state: Partial<T> & IFormState) {
    const {valid, errors, ...inputs} = state;
    super.render({valid, errors});
    Object.assign(this, inputs);
    return this.container;
  }
}