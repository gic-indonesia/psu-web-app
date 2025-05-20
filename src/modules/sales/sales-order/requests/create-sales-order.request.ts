import * as z from 'zod';
import { format } from 'date-fns';

export interface IDetailItemSalesOrderRequest {
  itemNo: string;
  unitPrice: string;
  _status?: string;
  departmentName?: string;
  detailName?: string;
  detailNotes?: string;
  id?: number;
  itemCashDiscount?: string;
  itemDiscPercent?: string;
  itemUnitId?: string;
  itemUnitName?: string;
  projectNo?: string;
  quantity?: string;
  salesQuotationNumber?: string;
  salesmanListNumber?: string;
  useTax1?: boolean;
  useTax2?: boolean;
  useTax3?: boolean;
}

export class DetailItemSalesOrderRequest {
  itemNo: string;
  unitPrice: number;
  _status?: string;
  departmentName?: string;
  detailName?: string;
  detailNotes?: string;
  id?: number;
  itemCashDiscount?: number;
  itemDiscPercent?: string;
  itemUnitId?: number;
  itemUnitName?: string;
  projectNo?: string;
  quantity?: number;
  salesQuotationNumber?: string;
  salesmanListNumber?: string;
  useTax1?: boolean;
  useTax2?: boolean;
  useTax3?: boolean;
  
  constructor(item: IDetailItemSalesOrderRequest) {
    this.itemNo = item.itemNo;
    this.unitPrice = Number(item.unitPrice);
    this._status = item._status;
    this.departmentName = item.departmentName;
    this.detailName = item.detailName;
    this.detailNotes = item.detailNotes;
    this.id = item.id;
    this.itemCashDiscount = Number(item.itemCashDiscount);
    this.itemDiscPercent = item.itemDiscPercent;
    this.itemUnitId = Number(item.itemUnitId);
    this.itemUnitName = item.itemUnitName;
    this.projectNo = item.projectNo;
    this.quantity = Number(item.quantity);
    this.salesQuotationNumber = item.salesQuotationNumber;
    this.salesmanListNumber = item.salesmanListNumber;
    this.useTax1 = item.useTax1;
    this.useTax2 = item.useTax2;
    this.useTax3 = item.useTax3;
  }
}

export interface ICreateSalesOrderRequest {
  customerNo: string;
  branchId?: string;
  branchName?: string;
  cashDiscPercent?: string;
  cashDiscount?: number;
  currencyCode?: string;
  description?: string;
  fobName?: string;
  id?: number;
  inclusiveTax?: boolean;
  number?: string;
  paymentTermName?: string;
  poNumber?: string;
  rate?: number;
  shipDate?: string;
  shipmentName?: string;
  taxable?: boolean;
  toAddress?: string;
  transDate: string;
  typeAutoNumber?: number;
  detailItem: IDetailItemSalesOrderRequest[];
}

export class CreateSalesOrderRequest {
  customerNo: string;
  branchId?: number;
  branchName?: string;
  cashDiscPercent?: string;
  cashDiscount?: number;
  currencyCode?: string;
  description?: string;
  fobName?: string;
  id?: number;
  inclusiveTax?: boolean;
  number?: string;
  paymentTermName?: string;
  poNumber?: string;
  rate?: number;
  shipDate?: string;
  shipmentName?: string;
  taxable?: boolean;
  toAddress?: string;
  transDate: string;
  typeAutoNumber?: number;
  detailItem: DetailItemSalesOrderRequest[];

  constructor(item: ICreateSalesOrderRequest) {
    this.customerNo = item.customerNo;
    this.branchId = item.branchId ? Number(item.branchId) : 155;
    this.branchName = item.branchName ?? 'PREMIX';
    this.cashDiscPercent = item.cashDiscPercent;
    this.cashDiscount = item.cashDiscount ? Number(item.cashDiscount) : 0;
    this.currencyCode = item.currencyCode;
    this.description = item.description;
    this.fobName = item.fobName;
    this.id = item.id;
    this.inclusiveTax = item.inclusiveTax;
    this.number = item.number;
    this.paymentTermName = item.paymentTermName;
    this.poNumber = item.poNumber;
    this.rate = item.rate;
    this.shipDate = item.shipDate ?? '';
    this.shipmentName = item.shipmentName ?? '';
    this.taxable = item.taxable ?? false;
    this.toAddress = item.toAddress ?? '';
    this.transDate = format(new Date(item.transDate), 'dd/MM/yyyy');
    this.typeAutoNumber = item.typeAutoNumber ?? 54
    this.detailItem = item.detailItem.map((detail) => new DetailItemSalesOrderRequest(detail));
  }

  static schema() {
    return z.object({
      customerNo: z.string().min(1, 'Customer harus diisi'),
      branchId: z.string().optional(),
      cashDiscPercent: z.string().optional(),
      cashDiscount: z.string().optional(),
      currencyCode: z.string().optional(),
      description: z.string().optional(),
      fobName: z.string().optional(),
      inclusiveTax: z.boolean().optional(),
      number: z.string().optional(),
      paymentTermName: z.string().optional(),
      poNumber: z.string().optional(),
      rate: z.string().optional(),
      shipDate: z.string().optional(),
      shipmentName: z.string().optional(),
      taxable: z.boolean().optional(),
      toAddress: z.string().optional(),
      transDate: z.date(),
      detailItem: z.array(z.object({
        itemNo: z.string().min(1, 'Item No harus diisi'),
        unitPrice: z.string(),
        _status: z.string().optional(),
        departmentName: z.string().optional(),
        detailName: z.string().optional(),
        detailNotes: z.string().optional(),
        id: z.number().optional(),
        itemCashDiscount: z.string().optional(),
        itemDiscPercent: z.string().optional(),
        itemUnitName: z.string().optional(),
        itemUnitId: z.string().optional(),
        quantity: z.string().optional(),
      }))
    })
  }

  static createFromJson(data: ICreateSalesOrderRequest): CreateSalesOrderRequest {
    return new CreateSalesOrderRequest(data);
  }
}