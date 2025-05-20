export interface IProductionFormulaListModel {
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

export class ProductionFormulaListModel {
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

  constructor(data: IProductionFormulaListModel) {
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