import { TCustomer } from "./customer";
import { IProduct } from "./product";

export type IStatus = "Pending" | "On the way" | "Delivered";

export interface IOrder {
  _id: string;
  sellData: ISellData[];
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: number;
  customer: TCustomer;
  date: Date;
  status: IStatus;
  __v: number;
}

export interface ISellData {
  productId: IProduct;
  quantity: number;
  _id: string;
}
