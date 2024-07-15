import { IStatus } from "@/types/sell";

export const getOrderProgresCode = (orderStage: IStatus) => {
  const orderSages = ["Pending", "On the way", "Delivered"];
  return orderSages.indexOf(orderStage);
};
