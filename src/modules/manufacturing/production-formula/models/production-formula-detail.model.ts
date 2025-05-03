export interface IItemDetail {
  itemUnit: {
    id: number;
    name: string;
  };
  number: string;
  id: number;
  item: {
    id: number;
    name: string;
  };
  branchName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  approvalStatus: any;
  quantity: number;
  totalMaterial: number;
  totalExpense: number;
  totalAmount: number;
  totalFinishGood: number;
  totalExtraFinishGood: number;
  description: string;
  createdBy: number;
}

export class ItemDetail {
  itemUnit: {
    id: number;
    name: string;
  };
  number: string;
  id: number;
  item: {
    id: number;
    name: string;
  };
  branchName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  approvalStatus: any;
  quantity: number;
  totalMaterial: number;
  totalExpense: number;
  totalAmount: number;
  totalFinishGood: number;
  totalExtraFinishGood: number;
  description: string;
  createdBy: number;

  constructor(data: IItemDetail) {
    this.itemUnit = {
      id: data.itemUnit.id,
      name: data.itemUnit.name,
    };
    this.number = data.number;
    this.id = data.id;
    this.item = {
      id: data.item.id,
      name: data.item.name,
    };
    this.branchName = (data.branchName.includes('Berlaku di Cabang ')) ? data.branchName.replace('Berlaku di Cabang ', '') : data.branchName;
    this.approvalStatus = data.approvalStatus;
    this.quantity = data.quantity;
    this.totalMaterial = data.totalMaterial;
    this.totalExpense = data.totalExpense;
    this.totalAmount = data.totalAmount;
    this.totalFinishGood = data.totalFinishGood;
    this.totalExtraFinishGood = data.totalExtraFinishGood;
    this.description = data.description;
    this.createdBy = data.createdBy;
  }
}