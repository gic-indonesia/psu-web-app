import baseInstance from "@src/shared/axios/base-instance";
import { FilterProductionFormulaListRequest } from "../requests/filter-production-formula-list.request";

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
}