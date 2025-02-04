import { TOrder } from "../../types";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Order extends Component<TOrder> {
  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);
  }
}