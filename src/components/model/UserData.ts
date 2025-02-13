import { IUser, IUserData, IUserDataState } from '../../types';
import { IEvents } from '../base/Events';
import { Model } from '../base/Model';

export class UserData extends Model<IUserDataState> implements IUserData {
  protected errors: Record<string, string> = {};
  protected user: IUser;
  constructor(events: IEvents, data: Partial<IUserDataState> = { user: {} }) {
    super(data, events);
  }

  setUserData(field: keyof IUser, value: string): void {
    this.user[field] = value;

    this.validateUserData()
  }

  getUserData(): IUser {
    return this.user;
  }

  protected validateUserData(): void {
    const error: typeof this.errors = {};

    if (!this.user.payment) {
      error.payment = 'выберите способ оплаты';
    }

    if (!this.user.address) {
      error.address = 'укажите адрес';
    }

    if (!this.user.email) {
      error.email = 'укажите email';
    }
    
    if (!this.user.phone) {
      error.phone = 'укажите телефон';
    }

    this.errors = error;

    this.events.emit('userData:errorsChange', this.errors);
  }

  clearUserData(): void {
    Object.keys(this.user).forEach(field => {
      this.setUserData(field as keyof IUser, '');
    });

    this.emitChanges('userData:clear');
  }
}