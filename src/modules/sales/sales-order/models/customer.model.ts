export interface IParent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parent: any
  sub: boolean
  lvl: number
  defaultCategory: boolean
  nameWithIndentStrip: string
  optLock: number
  name: string
  parentNode: boolean
  nameWithIndent: string
  id: number
}

export class Parent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parent: any
  sub: boolean
  lvl: number
  defaultCategory: boolean
  nameWithIndentStrip: string
  optLock: number
  name: string
  parentNode: boolean
  nameWithIndent: string
  id: number

  constructor(data: IParent) {
    this.parent = data.parent;
    this.sub = data.sub;
    this.lvl = data.lvl;
    this.defaultCategory = data.defaultCategory;
    this.nameWithIndentStrip = data.nameWithIndentStrip;
    this.optLock = data.optLock;
    this.name = data.name;
    this.parentNode = data.parentNode;
    this.nameWithIndent = data.nameWithIndent;
    this.id = data.id;
  }
}

export interface ICustomerCategory {
  parent: IParent
  name: string
  id: number
}

export class CustomerCategory {
  parent: Parent
  name: string
  id: number

  constructor(data: ICustomerCategory) {
    this.parent = new Parent(data.parent);
    this.name = data.name;
    this.id = data.id;
  }
}

export interface ICustomerModel {
  name: string
  id: number
  category: ICustomerCategory
  customerNo: string
}

export class CustomerModel {
  name: string
  id: number
  category: CustomerCategory
  customerNo: string

  constructor(data: ICustomerModel) {
    this.name = data.name;
    this.id = data.id;
    this.category = new CustomerCategory(data.category);
    this.customerNo = data.customerNo;
  }

}