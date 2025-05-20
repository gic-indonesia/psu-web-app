export interface IFilterSalesOrderListRequest {
  fields?: string;
  filter?: {
    keywords?: {
      op: string;
      val: string;
    };
    lastUpdate?: {
      op: string;
      val: string;
    };
  };
  sp?: {
    page?: number;
    pageSize?: number;
    sort?: string;
  };
}

export class FilterSalesOrderListRequest {
  fields?: string;
  filter?: {
    keywords?: {
      op: string;
      val: string;
    };
    lastUpdate?: {
      op: string;
      val: string;
    };
  };
  sp?: {
    page?: number;
    pageSize?: number;
    sort?: string;
  };

  constructor(data: IFilterSalesOrderListRequest) {
    this.fields = 'id,number,transDate,customer,description,statusName,totalAmount';
    this.filter = data.filter;
    this.sp = data.sp ?? { page: 1, pageSize: 10 };
  }

  static createFromJson(json: IFilterSalesOrderListRequest) {
    return new FilterSalesOrderListRequest(json);
  }
}
