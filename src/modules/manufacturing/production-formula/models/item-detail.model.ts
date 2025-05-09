export interface IItemDetail {
  id?: number;
  no: string;
  name: string;
  unit1: {
    id: number;
    name: string;
  };
  unit1Id: number;
  balanceUnitCost: string;
  detailNotes: string;
  quantity: string;
}

export class ItemDetail {
  id?: number;
  no: string;
  name: string;
  unit1: {
    id: number;
    name: string;
  };
  unit1Id: number;
  balanceUnitCost: string;
  detailNotes: string;
  quantity: string;

  constructor(itemDetail: IItemDetail) {
    this.id = itemDetail.id;
    this.no = itemDetail.no;
    this.name = itemDetail.name;
    this.unit1 = itemDetail.unit1;
    this.unit1Id = itemDetail.unit1Id;
    this.balanceUnitCost = itemDetail.balanceUnitCost;
    this.detailNotes = itemDetail.detailNotes;
    this.quantity = itemDetail.quantity;
  }

  static createFromJson(json: IItemDetail): ItemDetail {
    return new ItemDetail(json);
  }
}