export interface IProducedItem {
  no: string
  itemType: string
  balanceUnitCost: number
  balanceTotalCost: number
  availableToSell: number
  name: string
  itemTypeName: string
  id: number
  itemProduced: number
  materialProduced: number
  unit: string[];
}

export class ProducedItem {
  no: string
  itemType: string
  balanceUnitCost: number
  balanceTotalCost: number
  availableToSell: number
  name: string
  itemTypeName: string
  id: number
  itemProduced: number
  materialProduced: number
  unit: string[];

  constructor(data: IProducedItem) {
    this.no = data.no;
    this.itemType = data.itemType;
    this.balanceUnitCost = data.balanceUnitCost;
    this.balanceTotalCost = data.balanceTotalCost;
    this.availableToSell = data.availableToSell;
    this.name = data.name;
    this.itemTypeName = data.itemTypeName;
    this.id = data.id;
    this.itemProduced = data.itemProduced;
    this.materialProduced = data.materialProduced;
    this.unit = data.unit;
  }
}