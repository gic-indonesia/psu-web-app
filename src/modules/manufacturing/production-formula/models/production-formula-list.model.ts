export interface IDataModel {
  branch: {
    id: number;
    name: string;
  };
  id: number;
  item: {
    name: string;
    no: string;
  };
  itemUnit: {
    name: string;
    id: number;
  };
  number: string;
  quantity: number;
}

export class DataModel {
  branch: {
    id: number;
    name: string;
  };
  id: number;
  item: {
    name: string;
    no: string;
  };
  itemUnit: {
    name: string;
    id: number;
  };
  number: string;
  quantity: number;

  constructor(data: IDataModel) {
    this.branch = {
      id: data.branch.id,
      name: data.branch.name,
    };
    this.id = data.id;
    this.item = {
      name: data.item.name,
      no: data.item.no,
    };
    this.itemUnit = {
      name: data.itemUnit.name,
      id: data.itemUnit.id,
    };
    this.number = data.number;
    this.quantity = data.quantity;
  }
}

export interface IPaginationModel {
  limit: null | number;
  page: number;
  pageCount: number;
  pageSize: number;
  rowCount: number;
  sort: string;
  start: number;
}

export class PaginationModel {
  limit: null | number;
  page: number;
  pageCount: number;
  pageSize: number;
  rowCount: number;
  sort: string;
  start: number;

  constructor(data: IPaginationModel) {
    this.limit = data.limit;
    this.page = data.page;
    this.pageCount = data.pageCount;
    this.pageSize = data.pageSize;
    this.rowCount = data.rowCount;
    this.sort = data.sort;
    this.start = data.start;
  }
}

export interface IProductionFormulaListModel {
  d: IDataModel[];
  s: boolean;
  sp: IPaginationModel;
}

export class ProductionFormulaListModel {
  d: DataModel[];
  s: boolean;
  sp: PaginationModel;

  constructor(data: IProductionFormulaListModel) {
    this.d = data.d.map((item) => new DataModel(item));
    this.s = data.s;
    this.sp = new PaginationModel(data.sp);
  }

}