import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Ccomponent';
import { IEvents } from '../base/Eevents';

interface IFormState {
  valid: boolean;
  errors: string[];
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
    this.onInputChange(target.name as keyof T, target.value);
  }

  protected handleSubmit = (event: Event) => {
    event.preventDefault();
    this.events.emit(`${this.container.name}:submit`);
  }

  protected onInputChange(field: keyof T, value: string) {
    this.events.emit('inputValue:changed', { field, value });
  }

  set valid(value: boolean) {
    this.setDisabled(this.submit, !value);
  }

  set errors(value: string) {
    this.setText(this._errors, value);
  }

  reset() {
    this.container.reset();
    this.valid = false;
    this.errors = '';
  }

  render(state?: Partial<T> & IFormState) {
    const { valid, errors, ...inputs } = state;
    super.render({ valid, errors });
    Object.assign(this, inputs);
    return this.container;
  }
}