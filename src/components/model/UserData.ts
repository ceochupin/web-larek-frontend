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


export class UserData extends Model<IUserDataState> implements IUserData {
  protected user: IUser;

  protected fieldValue = {
    payment: 'способ оплаты',
    address: 'адрес',
    email: 'email',
    phone: 'телефон',
  }

  constructor(events: IEvents, data: Partial<IUserDataState> = { user: {} } ) {
    super(data, events);

    this.user = {
      payment: '',
      address: '',
      email: '',
      phone: '',
      ...data.user
    };
  }

  setUserData(field: keyof IUser, value: string): void {
    this.user[field] = value;

    this.validateField(field);
    this.emitChanges('userDataModel:changed', this.user);

    console.log(this.user);
  }

  getUserData(): IUser {
    return this.user;
  }

  protected validateField(field: keyof IUser): string {
    return !this.user[field] ? `укажите ${this.fieldValue[field]}` : '';
  }

  validateFields(fields: (keyof IUser)[]): string[] {
    return fields.map(field => this.validateField(field)).filter(Boolean);
  }

  clearUserData(): void {
    Object.keys(this.user).forEach((field) => {
      this.setUserData(field as keyof IUser, '');
    });
  }
}