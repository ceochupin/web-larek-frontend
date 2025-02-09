import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IFormState {
  valid: boolean;
  errors: string[];
}

// export class Form<T> extends Component<IFormState> {
//   protected _submit: HTMLButtonElement;
//   protected _errors: HTMLSpanElement;

//   constructor(protected container: HTMLFormElement, protected events: IEvents) {
//     super(container);

//     this._submit = ensureElement('button[type=submit]', this.container) as HTMLButtonElement;
//     this._errors = ensureElement('.form__errors', this.container) as HTMLSpanElement;

//     this.container.addEventListener('input', (event: Event) => {
//       const target = event.target as HTMLInputElement;
//       const field = target.name as keyof T;
//       const value = target.value;
//       this.onInputChange(field, value);
//     })

//     this.container.addEventListener('submit', (event: Event) => {
//       event.preventDefault();
//       this.events.emit(`${this.container.name}:submit`);
//     })
//   }

//   protected onInputChange(field: keyof T, value: string) {
//     this.events.emit(`${this.container.name}.${String(field)}:change`, {
//       field,
//       value,
//     })
//   }

//   set valid(value: boolean) {
//     this._submit.disabled = !value;
//   }

//   set errors(value: string) {
//     this.setText(this._errors, value);
//   }

//   render(state: Partial<T> & IFormState) {
//     const { valid, errors, ...inputs } = state;
//     super.render({ valid, errors });
//     Object.assign(this, inputs);
//     return this.container;
//   }
// }

export abstract class Form<T extends Record<string, unknown>> extends Component<IFormState> {
  protected _submit: HTMLButtonElement;
  protected _errors: HTMLSpanElement;

  constructor(protected container: HTMLFormElement, protected events: IEvents) {
    super(container);

    this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
    this._errors = ensureElement<HTMLSpanElement>('.form__errors', this.container);

    this.container.addEventListener('input', this.handleInput);
    this.container.addEventListener('submit', this.handleSubmit);
  }

  private handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.onInputChange(target.name as keyof T, target.value);
  }

  private handleSubmit = (event: Event) => {
    event.preventDefault();
    this.events.emit(`${this.container.name}:submit`);
  }

  protected onInputChange(field: keyof T, value: string) {
    this.events.emit(`${this.container.name}.${String(field)}:change`, { field, value });
  }

  setValid(value: boolean) {
    this.setDisabled(this._submit, !value);
  }

  setErrors(value: string) {
    this.setText(this._errors, value);
  }

  render(state: Partial<T> & IFormState) {
    const { valid, errors, ...inputs } = state;
    super.render({ valid, errors });
    Object.entries(inputs).forEach(([key, value]) => {
      const input = this.container.elements.namedItem(key) as HTMLInputElement;
      if (input) {
        input.value = String(value);
      }
    });
    return this.container;
  }
}