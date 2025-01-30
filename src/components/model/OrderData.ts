export class OrderData {
  payment: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';

  constructor() {}

  setPaymentInOrder(payment: string): void {
    this.payment = payment;
  }

  setEmailInOrder(email: string): void {
    this.email = email;
  }

  setPhoneInOrder(phone: string): void {
    this.phone = phone;
  }

  setAddressInOrder(address: string): void {
    this.address = address;
  }

  getPaymentInOrder(): string {
    return this.payment;
  }

  getEmailInOrder(): string {
    return this.email;
  }

  getPhoneInOrder(): string {
    return this.phone;
  }

  getAddressInOrder(): string {
    return this.address;
  }

  clearOrderData(): void {
    this.payment = '';
    this.email = '';
    this.phone = '';
    this.address = '';
  }
}