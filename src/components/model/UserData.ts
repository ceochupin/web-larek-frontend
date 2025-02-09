import { IUser, IUserData, IUserDataState } from "../../types";
import { IEvents } from "../base/Events";
import { Model } from "../base/Model";

export class UserData extends Model<IUserDataState> implements IUserData {
  constructor(protected data: Partial<IUserDataState> = { user: {} }, protected events: IEvents) {
    super(data, events);
  }

  setUserData(field: keyof IUser, value: string): void {
    this.data.user[field] = value;
    console.log(this.data.user);
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
    this.data.user.payment = '';
    this.data.user.email = '';
    this.data.user.phone = '';
    this.data.user.address = '';
  }
}