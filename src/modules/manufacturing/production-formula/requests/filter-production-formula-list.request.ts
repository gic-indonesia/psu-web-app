export interface IFilterProductionFormulaListRequest {
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

export class FilterProductionFormulaListRequest {
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

  constructor(data: IFilterProductionFormulaListRequest) {
    this.fields = 'id,number,branch,item,quantity,itemUnit';
    this.filter = data.filter;
    this.sp = data.sp ?? { page: 1, pageSize: 10, sort: 'id|desc' };
  }

  static createFromJson(json: IFilterProductionFormulaListRequest) {
    return new FilterProductionFormulaListRequest(json);
  }
}
