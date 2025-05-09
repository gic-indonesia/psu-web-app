import { CreateProductionFormulaRequest, ICreateProductionFormulaRequest } from "./create-production-formula.request";
import * as z from "zod";

export interface IUpdateProductionFormulaRequest extends ICreateProductionFormulaRequest {
  id: number;
}

export class UpdateProductionFormulaRequest extends CreateProductionFormulaRequest {
  id: number;

  constructor(data: IUpdateProductionFormulaRequest) {
    super(data);
    this.id = data.id;
  }

  static schema() {
    const createSchema = CreateProductionFormulaRequest.schema();
    return createSchema.extend({
      id: z.number().int().positive().min(1, 'ID harus diisi'),
    });
  }

  static createFromJson(data: IUpdateProductionFormulaRequest): UpdateProductionFormulaRequest {
    return new UpdateProductionFormulaRequest(data);
  }
}