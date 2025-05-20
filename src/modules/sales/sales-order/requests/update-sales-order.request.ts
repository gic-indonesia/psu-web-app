import * as z from "zod";
import { CreateSalesOrderRequest, ICreateSalesOrderRequest } from "./create-sales-order.request";

export interface IUpdateSalesOrderRequest extends ICreateSalesOrderRequest {
  id: number;
}

export class UpdateSalesOrderRequest extends CreateSalesOrderRequest {
  id: number;

  constructor(item: IUpdateSalesOrderRequest) {
    super(item);
    this.id = item.id;
  }

  static schema() {
    const createSchema = CreateSalesOrderRequest.schema();
    return createSchema.extend({
      id: z.number().int().positive().min(1, 'ID harus diisi'),
    });
  }

  static createFromJson(data: IUpdateSalesOrderRequest): UpdateSalesOrderRequest {
    return new UpdateSalesOrderRequest(data);
  }
}