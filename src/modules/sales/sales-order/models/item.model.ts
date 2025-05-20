import { IItemDetail, ItemDetail } from "@src/modules/manufacturing/production-formula/models/item-detail.model";

export interface IItemDetailWarehouseData {
  defaultWarehouse: boolean;
  description: string;
  name: string;
  id: number;
}

export class ItemDetailWarehouseData {
  defaultWarehouse: boolean;
  description: string;
  name: string;
  id: number;

  constructor(data: IItemDetailWarehouseData) {
    this.defaultWarehouse = data.defaultWarehouse;
    this.description = data.description;
    this.name = data.name;
    this.id = data.id;
  }
}

export interface IItemModel extends IItemDetail {
  no: string;
  id?: number;
  name: string;
  discount: string;
  warehouseId?: string;
  detailWarehouseData?: IItemDetailWarehouseData[];
}

export class ItemModel extends ItemDetail {
  no: string;
  id?: number;
  name: string;
  discount: string;
  warehouseId?: string;
  detailWarehouseData?: ItemDetailWarehouseData[];

  constructor(data: IItemModel) {
    super(data);
    this.no = data.no;
    this.id = data.id;
    this.name = data.name;
    this.discount = data.discount;
    this.warehouseId = data.warehouseId;
    this.detailWarehouseData = data. detailWarehouseData ? data.detailWarehouseData.map((item) => new ItemDetailWarehouseData(item)) : undefined;
  }

  static createFromJson(json: IItemModel): ItemModel {
    return new ItemModel(json);
  }

  createUnit() {
    return [
      this.unit1,
      this.unit2,
      this.unit3,
      this.unit4,
      this.unit5,
    ].filter(unit => unit != null);
  }
}
