import baseInstance from "@src/shared/axios/base-instance";
import { FilterSalesOrderListRequest } from "../requests/filter-sales-order.request";
import { CreateSalesOrderRequest } from "../requests/create-sales-order.request";

export class SalesOrderService {
  constructor() {}

  async show(params: FilterSalesOrderListRequest) {
    let filter = '';
    if (params.filter) {
      filter = `filter.keywords.op=${params.filter?.keywords?.op}&filter.keywords.val=${params.filter?.keywords?.val}&`;
    }
    const { data } = await baseInstance.get(`/api/sales-order/list?${filter}fields=${params.fields}&sp.page=${params.sp?.page}&sp.pageSize=${params.sp?.pageSize}`);
    return data;
  }

  async detail(id: number) {
    const { data } = await baseInstance.get(`/api/sales-order/detail?id=${id}`);
    return data;
  }

  async save(data: CreateSalesOrderRequest) {
    const { data: response } = await baseInstance.post('/api/sales-order/save', data);
    return response;
  }

  async getItem() {
    const { data } = await baseInstance.get(`/api/item/list?fields=id,name,no&sp.start=0&sp.page=1&sp.pageSize=10000&filter.itemCategoryId.op=EQUAL&filter.itemCategoryId.val[0]=144`);
    return data;
  }

  async getCustomer() {
    const { data } = await baseInstance.get(`/api/customer/list?fields=id,name,customerNo,category&sp.page=1&sp.pageSize=1000&sp.sort=name`)
    return data;
  }
}