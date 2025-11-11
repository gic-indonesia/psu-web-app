export interface IProducedItem {
  no: string
  itemType: string
  balanceUnitCost: number
  balanceTotalCost: number
  availableToSell: number
  name: string
  itemTypeName: string
  id: number
  unit1Name: string | null;
  unit2Name: string | null;
  unit3Name: string | null;
  unit4Name: string | null;
  unit5Name: string | null;
  ratio2: number | null;
  ratio3: number | null;
  ratio4: number | null;
  ratio5: number | null;
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
  unit1Name: string | null;
  unit2Name: string | null;
  unit3Name: string | null;
  unit4Name: string | null;
  unit5Name: string | null;
  ratio2: number | null;
  ratio3: number | null;
  ratio4: number | null;
  ratio5: number | null;

  constructor(data: IProducedItem) {
    this.no = data.no;
    this.itemType = data.itemType;
    this.balanceUnitCost = data.balanceUnitCost;
    this.balanceTotalCost = data.balanceTotalCost;
    this.availableToSell = data.availableToSell;
    this.name = data.name;
    this.itemTypeName = data.itemTypeName;
    this.id = data.id;
    this.unit1Name = data.unit1Name;
    this.unit2Name = data.unit2Name;
    this.unit3Name = data.unit3Name;
    this.unit4Name = data.unit4Name;
    this.unit5Name = data.unit5Name;
    this.ratio2 = data.ratio2;
    this.ratio3 = data.ratio3;
    this.ratio4 = data.ratio4;
    this.ratio5 = data.ratio5;
  }
}