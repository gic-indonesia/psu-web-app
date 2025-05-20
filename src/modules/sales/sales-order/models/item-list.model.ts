export interface IItemListModel {
  no: string;
  name: string;
  id: number;
}

export class ItemListModel {
  no: string;
  name: string;
  id: number;

  constructor(data: IItemListModel) {
    this.no = data.no;
    this.name = data.name;
    this.id = data.id;
  }

  static createFromJson(json: IItemListModel): ItemListModel {
    return new ItemListModel(json);
  }
}