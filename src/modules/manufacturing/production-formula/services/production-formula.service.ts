import baseInstance from "@src/shared/axios/base-instance";
import { FilterProductionFormulaListRequest } from "../requests/filter-production-formula-list.request";
import { CreateProductionFormulaRequest } from "../requests/create-production-formula.request";
import { UpdateProductionFormulaRequest } from "../requests/update-production-formula.request";

export class ProductionFormulaService {
  constructor() {}

  async show(
    params: FilterProductionFormulaListRequest,
  ) {
    let filter = '';
    if (params.filter) {
      filter = `filter.keywords.op=${params.filter?.keywords?.op}&filter.keywords.val=${params.filter?.keywords?.val}&`;
    }
    const { data } = await baseInstance.get(`/api/material/bill/list?${filter}fields=${params.fields}&sp.page=${params.sp?.page}&sp.pageSize=${params.sp?.pageSize}&sp.sort=${params.sp?.sort}`);
    return data;
  }

  async detail(id: number) {
    const { data } = await baseInstance.get(`/api/material/bill/detail?id=${id}`);
    return data;
  }

  async itemDetail(id: number) {
    const { data } = await baseInstance.get(`/api/item/detail?id=${id}`);
    return data;
  }

  async save(
    params: CreateProductionFormulaRequest | UpdateProductionFormulaRequest,
  ) {
    const { data } = await baseInstance.post(`/api/material/bill/save`, params);
    return data;
  }

  async getProducedItems() {
    const { data } = await baseInstance.get(`/api/item/list/produced?item_produced=1&sp.page=1&sp.pageSize=1000`)
    return data;
  }

  async getMaterialItems() {
    const { data } = await baseInstance.get(`/api/item/list/produced?item_produced=0&material_produced=1&sp.page=1&sp.pageSize=1000`);
    return data; 
  }

  async getProcesses() {
    const { data } = await baseInstance.get(`/api/material/bill/process`)
    return data;
  }
}