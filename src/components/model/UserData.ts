import { IUserData, IUserDataState, TPayment } from "../../types";
import { IEvents } from "../base/Events";
import { Model } from "../base/Model";

export class UserData extends Model<IUserDataState> implements IUserData {
  constructor(protected data: Partial<IUserDataState> = { user: {} }, protected events: IEvents) {
    super(data, events);
  }

  setPayment(payment: TPayment) {
    this.data.user.payment = payment;
  }

  setEmail(email: string) {
    this.data.user.email = email;
  }

  setPhone(phone: string) {
    this.data.user.phone = phone;
  }

  setAddress(address: string) {
    this.data.user.address = address;
  }

  getPayment(): TPayment {
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
    this.data.user.payment = null;
    this.data.user.email = '';
    this.data.user.phone = '';
    this.data.user.address = '';
  }
}