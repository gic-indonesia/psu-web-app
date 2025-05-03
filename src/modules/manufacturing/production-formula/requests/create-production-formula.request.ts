import * as z from 'zod';

export interface IDetailProcess {
  processCategoryName: string;
  sortNumber: number;
  _status?: 'delete';
  id?: number;
  instruction?: string;
  subCon?: boolean;
}

export class DetailProcess {
  processCategoryName: string;
  sortNumber: number;
  _status?: 'delete';
  id?: number;
  instruction?: string;
  subCon?: boolean;

  constructor(data: IDetailProcess) {
    this.processCategoryName = data.processCategoryName;
    this.sortNumber = data.sortNumber;
    this._status = data._status;
    this.id = data.id;
    this.instruction = data.instruction;
    this.subCon = data.subCon;
  }
}

export interface IDetailMaterial {
  itemNo: string;
  quantity: number;
  _status?: 'delete';
  dataClassification1Name?: string;
  dataClassification2Name?: string;
  dataClassification3Name?: string;
  dataClassification4Name?: string;
  dataClassification5Name?: string;
  dataClassification6Name?: string;
  dataClassification7Name?: string;
  dataClassification8Name?: string;
  dataClassification9Name?: string;
  dataClassification10Name?: string;
  departmentName?: string;
  detailName?: string;
  detailNotes?: string;
  id?: number;
  itemUnitName?: string;
  projectNo?: string;
}

export class DetailMaterial {
  itemNo: string;
  quantity: number;
  _status?: 'delete';
  dataClassification1Name?: string;
  dataClassification2Name?: string;
  dataClassification3Name?: string;
  dataClassification4Name?: string;
  dataClassification5Name?: string;
  dataClassification6Name?: string;
  dataClassification7Name?: string;
  dataClassification8Name?: string;
  dataClassification9Name?: string;
  dataClassification10Name?: string;
  departmentName?: string;
  detailName?: string;
  detailNotes?: string;
  id?: number;
  itemUnitName?: string;
  projectNo?: string;

  constructor(data: IDetailMaterial) {
    this.itemNo = data.itemNo;
    this.quantity = data.quantity;
    this._status = data._status;
    this.dataClassification1Name = data.dataClassification1Name;
    this.dataClassification2Name = data.dataClassification2Name;
    this.dataClassification3Name = data.dataClassification3Name;
    this.dataClassification4Name = data.dataClassification4Name;
    this.dataClassification5Name = data.dataClassification5Name;
    this.dataClassification6Name = data.dataClassification6Name;
    this.dataClassification7Name = data.dataClassification7Name;
    this.dataClassification8Name = data.dataClassification8Name;
    this.dataClassification9Name = data.dataClassification9Name;
    this.dataClassification10Name = data.dataClassification10Name;
    this.departmentName = data.departmentName;
    this.detailNotes = data.detailNotes;
    this.detailName = data.detailName;
    this.id = data.id;
    this.itemUnitName = data.itemUnitName;
    this.projectNo = data.projectNo;
  }
}

export interface ICreateProductionFormulaRequest {
  itemNo: string;
  quantity: number;
  branchId?: number;
  branchName?: string;
  description?: string;
  itemUnitName?: string;
  number?: string;
  secondQualityProductNo: string[];
  typeAutoNumber?: number;
  detailProcess?: IDetailProcess[];
  detailMaterial?: IDetailMaterial[];
}

export class CreateProductionFormulaRequest {
  itemNo: string;
  quantity: number;
  branchId?: number;
  branchName?: string;
  description?: string;
  itemUnitName?: string;
  number?: string;
  secondQualityProductNo: string[];
  typeAutoNumber?: number;
  detailProcess?: DetailProcess[];
  detailMaterial?: DetailMaterial[];

  constructor(data: ICreateProductionFormulaRequest) {
    this.itemNo = data.itemNo;
    this.quantity = data.quantity;
    this.branchId = data.branchId;
    this.branchName = data.branchName;
    this.description = data.description;
    this.itemUnitName = data.itemUnitName;
    this.number = data.number;
    this.secondQualityProductNo = data.secondQualityProductNo;
    this.typeAutoNumber = data.typeAutoNumber ?? 0;
    this.detailProcess = data.detailProcess?.map((item) => new DetailProcess(item)) ?? [];
    this.detailMaterial = data.detailMaterial?.map((item) => new DetailMaterial(item)) ?? [];
  }
  
  static schema() {
    return z.object({
      itemNo: z.string().min(1, 'Produk utama harus diisi'),
      quantity: z.number().min(1, 'Kuantitas harus diisi'),
    });
  }

  static createFromJson(json: ICreateProductionFormulaRequest) {
    return new CreateProductionFormulaRequest(json);
  }
}