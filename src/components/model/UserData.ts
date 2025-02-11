import { IUser, IUserData, IUserDataState } from "../../types";
import { IEvents } from "../base/Events";
import { Model } from "../base/Model";

export class UserData extends Model<IUserDataState> implements IUserData {
  constructor(protected data: Partial<IUserDataState> = { user: {} }, protected events: IEvents) {
    super(data, events);
  }

  setUserData(field: keyof IUser, value: string): void {
    this.data.user[field] = value;
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

  clearUserData(): void {
    Object.keys(this.data.user).forEach(field => {
      this.setUserData(field as keyof IUser, '');
    });

    this.emitChanges('userData:clear');
  }
}