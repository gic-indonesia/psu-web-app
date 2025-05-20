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

export interface IResponseModel<T> {
  s: boolean;
  d: T;
  sp: IPaginationModel;
}

export class ResponseModel<T> {
  s: boolean;
  d: T;
  sp: PaginationModel;

  constructor(data: IResponseModel<T>) {
    this.s = data.s;
    this.d = data.d;
    this.sp = new PaginationModel(data.sp);
  }
}