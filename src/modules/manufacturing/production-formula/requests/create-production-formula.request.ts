import * as z from 'zod';
import { format } from 'date-fns'

export interface IDetailProcess {
  processCategoryName: string;
  sortNumber: string;
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
    this.sortNumber = Number(data.sortNumber);
    this._status = data._status;
    this.id = data.id;
    this.instruction = data.instruction;
    this.subCon = data.subCon;
  }
}

export interface IDetailMaterial {
  itemNo: string; //KODE BARANG
  quantity: string; //KUANTITAS
  _status?: string;
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
  detailNotes?: string; //KETERANGAN
  id?: number;
  itemUnitName: string; //NAMA SATUAN
  itemUnitId: number;
  processCategoryName: string;
  projectNo?: string;
  standardCost: string;
  totalStandardCost: string;
}

export class DetailMaterial {
  itemNo: string;
  quantity: number;
  _status?: string;
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
  itemUnitName: string;
  itemUnitId: number;
  processCategoryName: string;
  projectNo?: string;
  standardCost: number;
  totalStandardCost: number;

  constructor(data: IDetailMaterial) {
    this.itemNo = data.itemNo;
    this.quantity = Number(data.quantity);
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
    this.itemUnitId = data.itemUnitId;
    this.processCategoryName = data.processCategoryName;
    this.projectNo = data.projectNo;
    this.standardCost = Number(data.standardCost);
    this.totalStandardCost = Number(data.totalStandardCost);
  }
}

export interface ICreateProductionFormulaRequest {
  itemNo: string;
  quantity: string;
  transDate: string;
  branchId: string;
  branchName: string;
  typeAutoNumber?: number;
  description?: string;
  itemUnitName?: string;
  number?: string;
  secondQualityProductNo?: string[];
  detailProcess?: IDetailProcess[];
  detailMaterial?: IDetailMaterial[];
}

export class CreateProductionFormulaRequest {
  itemNo: string;
  quantity: number;
  transDate: string;
  branchId: number;
  branchName: string;
  typeAutoNumber?: number;
  description?: string;
  itemUnitName?: string;
  number?: string;
  secondQualityProductNo?: string[];
  detailProcess?: DetailProcess[];
  detailMaterial?: DetailMaterial[];

  constructor(data: ICreateProductionFormulaRequest) {
    this.itemNo = data.itemNo;
    this.quantity = Number(data.quantity);
    this.transDate = format(new Date(data.transDate), 'dd/MM/yyyy');
    this.branchId = Number(data.branchId);
    this.branchName = data.branchName;
    this.typeAutoNumber = data.typeAutoNumber ?? 301;
    this.description = data.description;
    this.itemUnitName = data.itemUnitName;
    this.number = data.number;
    this.secondQualityProductNo = data.secondQualityProductNo;
    this.detailProcess = data.detailProcess?.map((item) => new DetailProcess(item)) ?? [];
    this.detailMaterial = data.detailMaterial?.map((item) => new DetailMaterial(item)) ?? [];
  }
  
  static schema() {
    return z.object({
      itemNo: z.string().min(1, 'Produk utama harus diisi'),
      quantity: z.string().min(1, 'Kuantitas harus diisi'),
      transDate: z.string().min(1, 'Tanggal harus diisi'),
      itemUnitName: z.string({ message: 'Satuan harus diisi' }).min(1, 'Satuan harus diisi'),
      branchId: z.string().optional(),
      branchName: z.string().optional(),
      number: z.string().optional(),
      detailProcess: z.array(z.object({
        instruction: z.string().optional(),
        processCategoryName: z.string(),
        sortNumber: z.string(),
        subCon: z.boolean().optional(),
        _status: z.string().optional(),
        id: z.number().optional(),
      })).optional(),
      detailMaterial: z.array(z.object({
        detailName: z.string(),
        detailNotes: z.string().optional(),
        itemNo: z.string(),
        itemUnitName: z.string(),
        quantity: z.string(),
        _status: z.string().optional(),
        id: z.number().optional(),
        standardCost: z.string(),
        processCategoryName: z.string(),
        totalStandardCost: z.string(),
      })).optional(),
    });
  }

  static createFromJson(json: ICreateProductionFormulaRequest) {
    return new CreateProductionFormulaRequest(json);
  }
}