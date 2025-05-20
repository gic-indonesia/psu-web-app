interface ICustomerModel {
  name: string;
  id: number;
  customerNo: string;
}

class CustomerModel {
  name: string;
  id: number;
  customerNo: string;

  constructor(data: ICustomerModel) {
    this.name = data.name;
    this.id = data.id;
    this.customerNo = data.customerNo;
  }
}

export interface ISalesOrderListModel {
  number: string;
  id: number;
  totalAmount: number;
  transDate: string;
  statusName: string;
  description: string;
  transDateView: string;
  customer: ICustomerModel;
}

export class SalesOrderListModel {
  number: string;
  id: number;
  totalAmount: number;
  transDate: string;
  statusName: string;
  description: string;
  transDateView: string;
  customer: CustomerModel;

  constructor(data: ISalesOrderListModel) {
    this.number = data.number;
    this.id = data.id;
    this.totalAmount = data.totalAmount;
    this.transDate = data.transDate;
    this.statusName = data.statusName;
    this.description = data.description;
    this.transDateView = data.transDateView;
    this.customer = new CustomerModel(data.customer);
  }
}