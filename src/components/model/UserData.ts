import { IUser, IUserData, IUserDataState } from '../../types';
import { IEvents } from '../base/Events';
import { Model } from '../base/Model';

// export class UserData extends Model<IUserDataState> implements IUserData {
//   protected errors: Record<string, string> = {
//     payment: '',
//     address: '',
//     email: '',
//     phone: '',
//   };

//   protected user: IUser = {
//     payment: '',
//     address: '',
//     email: '',
//     phone: '',
//   };

//   constructor(events: IEvents, data: Partial<IUserDataState> = { user: {} }) {
//     super(data, events);
//   };

//   setUserData(field: keyof IUser, value: string): void {
//     this.user[field] = value;

//     this.validateUserData();
//   };

//   getUserData(): IUser {
//     return this.user;
//   };

//   getErrors(): Record<string, string> {
//     return this.errors;
//   };

//   protected validateUserData(): void {
//     const error: typeof this.errors = {
//       payment: '',
//       address: '',
//       email: '',
//       phone: '',
//     };

//     if (!this.user.payment) {
//       error.payment = 'выберите способ оплаты';
//     };

//     if (!this.user.address) {
//       error.address = 'укажите адрес';
//     };

//     if (!this.user.email) {
//       error.email = 'укажите email';
//     };
    
//     if (!this.user.phone) {
//       error.phone = 'укажите телефон';
//     };

//     this.errors = error;

//     this.emitChanges('userDataModel:errorsChange', this.errors);
//   };

//   clearUserData(): void {
//     Object.keys(this.user).forEach(field => {
//       this.setUserData(field as keyof IUser, '');
//     });

//     this.emitChanges('userDataModel:clear');
//   };
// };


export class UserData extends Model<IUserDataState> {
  protected user: IUser = {
    payment: '',
    address: '',
    email: '',
    phone: '',
  };

  protected errors: Partial<Record<keyof IUser, string>> = {
    payment: '',
    address: '',
    email: '',
    phone: '',
  };

  constructor(events: IEvents, data: Partial<IUserDataState> = { user: {}, errors: {} } ) {
    super(data, events);

    this.user = { ...this.user, ...data.user };
    this.errors = { ...this.errors, ...data.errors };
  }

  setUserData(field: keyof IUser, value: string): void {
    this.user[field] = value;

    this.validateField(field);
    this.emitChanges('userDataModel:change', { field, value });
  }

  getUserData(): IUser {
    return this.user;
  }

  getErrors(): Partial<Record<keyof IUser, string>> {
    return this.errors;
  }

  protected validateField(field: keyof IUser): void {
    const error = !this.user[field] ? `Поле ${field} обязательно для заполнения` : '';
    this.errors[field] = error;
    this.emitChanges('userDataModel:validateField', { field, error });
  }

  validateFields(fields: (keyof IUser)[]): boolean {
    fields.forEach(this.validateField.bind(this));

    return !fields.some(field => this.errors[field]);
  }

  getErrorFields(fields: (keyof IUser)[]): string[] {
    return fields.map(field => this.errors[field]);
  }

  clearUserData(): void {
    Object.keys(this.user).forEach((field) => {
      this.setUserData(field as keyof IUser, '');
    });
    Object.keys(this.errors).forEach((field) => {
      this.errors[field as keyof IUser] = '';
    });
    this.emitChanges('userDataModel:clear');
  }
}