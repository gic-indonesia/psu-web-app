import baseInstance from "@src/shared/axios/base-instance";
import { FilterProductionFormulaListRequest } from "../requests/filter-production-formula-list.request";
import { CreateProductionFormulaRequest } from "../requests/create-production-formula.request";
import { UpdateProductionFormulaRequest } from "../requests/update-production-formula.request";
import { appendParams } from "@src/lib/utils";

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
    const options = {
      fields: 'charField1,charField2,additionalCost,cogsGlAccountId,controlQuantity,cost,defStandardCost,deliveryLeadTime,id,itemCategoryId,itemType,itemTypeName,minimumQuantityReorder,name,no,notes,serialNumberType,unit1Id,unit2Id,unit3Id,unit4Id,unit5Id,itemUnit,ratio2,ratio3,ratio4,ratio5,availableToSell,balanceUnitCost,balanceTotalCost',
      sp: {
        page: '1',
        pageSize: '1000',
        sort: 'name',
      },
      filter: {
        itemCategoryId: {
          op: 'EQUAL',
          val: ['144']
        }
      }
    }
    const filter = appendParams(options);
    const { data } = await baseInstance.get(`/api/item/list?${filter.toString()}`)
    return data;
  }

  async getMaterialItems() {
    const options = {
      fields: 'charField1,charField2,additionalCost,cogsGlAccountId,controlQuantity,cost,defStandardCost,deliveryLeadTime,id,itemCategoryId,itemType,itemTypeName,minimumQuantityReorder,name,no,notes,serialNumberType,unit1Id,unit2Id,unit3Id,unit4Id,unit5Id,itemUnit,ratio2,ratio3,ratio4,ratio5,availableToSell,balanceUnitCost,balanceTotalCost',
      sp: {
        page: '1',
        pageSize: '1000',
        sort: 'name',
      },
      filter: {
        itemCategoryId: {
          op: 'EQUAL',
          val: ['152', '201', '103', '102']
        }
      }
    }
    const filter = appendParams(options);
    const { data } = await baseInstance.get(`/api/item/list?${filter.toString()}`)
    return data;
  }

  async getProcesses() {
    const { data } = await baseInstance.get(`/api/material/bill/process`)
    return data;
  }
}