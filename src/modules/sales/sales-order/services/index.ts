import { SalesOrderService as SOService } from "./sales-order.service";

export function SalesOrderService() {
  return new SOService();
}