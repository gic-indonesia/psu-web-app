export interface IDetailMaterialModel {
  itemUnit: {
    name: string;
    id: number;
  }
  id: number;
  item: {
    id: number;
    unit1: {
      id: number;
      name: string;
    }
    unit2: {
      id: number;
      name: string;
    } | null;
    unit3: {
      id: number;
      name: string;
    } | null;
    unit4: {
      id: number;
      name: string;
    } | null;
    unit5: {
      id: number;
      name: string;
    } | null;
    name: string;
    no: string;
  }
  detailNotes: string;
  quantity: number;
  itemId: number;
  itemUnitId: number;
  standardCost: number;
  totalStandardCost: number;
}

export class DetailMaterialModel {
  itemUnit: {
    name: string;
    id: number;
  }
  id: number;
  item: {
    id: number;
    unit1: {
      id: number;
      name: string;
    }
    unit2: {
      id: number;
      name: string;
    } | null;
    unit3: {
      id: number;
      name: string;
    } | null;
    unit4: {
      id: number;
      name: string;
    } | null;
    unit5: {
      id: number;
      name: string;
    } | null;
    name: string;
    no: string;
  }
  detailNotes: string;
  quantity: number;
  itemId: number;
  itemUnitId: number;
  standardCost: number;
  totalStandardCost: number;

  constructor(data: IDetailMaterialModel) {
    this.itemUnit = data.itemUnit
    this.id = data.id
    this.item = data.item
    this.detailNotes = data.detailNotes;
    this.quantity = data.quantity
    this.itemId = data.itemId
    this.itemUnitId = data.itemUnitId
    this.standardCost = data.standardCost;
    this.totalStandardCost = data.totalStandardCost;
  }
}

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
    no: string;
  };
  branchName: string;
  branchId: number;
  detailMaterial: IDetailMaterialModel[];
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
    no: string;
  };
  branchName: string;
  branchId: number;
  detailMaterial: DetailMaterialModel[];
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
      no: data.item.no,
    };
    this.branchName = (data.branchName.includes('Berlaku di Cabang ')) ? data.branchName.replace('Berlaku di Cabang ', '') : data.branchName;
    this.branchId = data.branchId;
    this.detailMaterial = data.detailMaterial.map((item) => new DetailMaterialModel(item));
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