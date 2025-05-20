interface IItemUnit {
  id: number;
  name: string;
}

class ItemUnit {
  id: number;
  name: string;

  constructor(data: IItemUnit) {
    this.id = data.id;
    this.name = data.name;
  }
}

export interface IItemDetail {
  id?: number;
  no: string;
  name: string;
  unit1: IItemUnit;
  unit2?: IItemUnit | null;
  unit3?: IItemUnit | null;
  unit4?: IItemUnit | null;
  unit5?: IItemUnit | null;
  unit1Id: number;
  balanceUnitCost: string;
  detailNotes: string;
  quantity: string;
}

export class ItemDetail {
  id?: number;
  no: string;
  name: string;
  unit1: ItemUnit;
  unit2?: ItemUnit | null;
  unit3?: ItemUnit | null;
  unit4?: ItemUnit | null;
  unit5?: ItemUnit | null;
  unit1Id: number;
  balanceUnitCost: string;
  detailNotes: string;
  quantity: string;

  constructor(itemDetail: IItemDetail) {
    this.id = itemDetail.id;
    this.no = itemDetail.no;
    this.name = itemDetail.name;
    this.unit1 = itemDetail.unit1;
    this.unit2 = itemDetail.unit2;
    this.unit3 = itemDetail.unit3;
    this.unit4 = itemDetail.unit4;
    this.unit5 = itemDetail.unit5;
    this.unit1Id = itemDetail.unit1Id;
    this.balanceUnitCost = itemDetail.balanceUnitCost;
    this.detailNotes = itemDetail.detailNotes;
    this.quantity = itemDetail.quantity;
  }

  static createFromJson(json: IItemDetail): ItemDetail {
    return new ItemDetail(json);
  }
}