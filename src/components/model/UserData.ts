import { IUser, IUserData, IUserDataState } from "../../types";
import { IEvents } from "../base/Events";
import { Model } from "../base/Model";

export class UserData extends Model<IUserDataState> implements IUserData {
  constructor(protected errors: Record<string, string> = {}, protected data: Partial<IUserDataState> = { user: {} }, protected events: IEvents) {
    super(data, events);
  }

  setUserData(field: keyof IUser, value: string): void {
    this.data.user[field] = value;

    this.validateUserData()
  }

  getPayment(): string {
    return this.data.user.payment;
  }

  getEmail(): string {
    return this.data.user.email;
  }

  getPhone(): string {
    return this.data.user.phone;
  }

  getAddress(): string {
    return this.data.user.address;
  }

  protected validateUserData(): void {
    const error: typeof this.errors = {};

    if (!this.data.user.payment) {
      error.payment = 'выберите способ оплаты';
    }

    if (!this.data.user.address) {
      error.address = 'укажите адрес';
    }

    if (!this.data.user.email) {
      error.email = 'укажите email';
    }
    
    if (!this.data.user.phone) {
      error.phone = 'укажите телефон';
    }

    this.errors = error;

    this.events.emit('userData:errorsChange', this.errors);
  }

  clearUserData(): void {
    Object.keys(this.data.user).forEach(field => {
      this.setUserData(field as keyof IUser, '');
    });

    this.emitChanges('userData:clear');
  }
}