export interface ISalesOrderItemDetailModel {
  lastItemDiscPercent: string
  processQuantityDesc: string
  optLock: number
  itemUnit: ItemUnit
  availableUnitRatio: number
  department: string;
  departmentId: number;
  defaultWarehouseDeliveryOrder: DefaultWarehouseDeliveryOrder
  id: number
  discountRule: DiscountRule[]
  unitPrice: number
  useTax1: boolean
  salesmanName: string
  branchId: number
  useTax3: boolean
  item: Item
  useTax2: boolean
  availableItemUnitName: string
  tax1Amount: number
  detailNotes: string
  salesOrder: SalesOrder
  itemId: number
  useTax4: boolean
  canChangeDetailGroup: boolean
  detailName: string
  lastItemCashDiscount: number
  totalPrice: number
  transferQuantity: number
  salesAmount: number
  seq: number
  availableQuantity: number
  closed: boolean
  salesOrderId: number
  quantityDefault: number
  itemDiscPercent: string
  availableItemCashDiscount: number
  availableUnitPrice: number
  grossAmount: number
  poQuantity: number
  dppAmount: number
  tax2Amount: number
  unitPriceRule: UnitPriceRule[]
  availableTotalPrice: number
  manualClosedVisible: boolean
  itemCashDiscount: number
  manualClosed: boolean
  detailTaxName: string
  quantity: number
  defaultWarehouseSalesInvoice: DefaultWarehouseSalesInvoice
  shipQuantity: number
  itemUnitId: number
  availableItemUnit: ItemUnit
  unitRatio: number
}

export class SalesOrderItemDetailModel {
  lastItemDiscPercent: string
  processQuantityDesc: string
  optLock: number
  itemUnit: ItemUnit
  availableUnitRatio: number
  department: string;
  departmentId: number;
  defaultWarehouseDeliveryOrder: DefaultWarehouseDeliveryOrder
  id: number
  discountRule: DiscountRule[]
  unitPrice: number
  useTax1: boolean
  salesmanName: string
  branchId: number
  useTax3: boolean
  item: Item
  useTax2: boolean
  availableItemUnitName: string
  tax1Amount: number
  detailNotes: string
  salesOrder: SalesOrder
  itemId: number
  useTax4: boolean
  canChangeDetailGroup: boolean
  detailName: string
  lastItemCashDiscount: number
  totalPrice: number
  transferQuantity: number
  salesAmount: number
  seq: number
  availableQuantity: number
  closed: boolean
  salesOrderId: number
  quantityDefault: number
  itemDiscPercent: string
  availableItemCashDiscount: number
  availableUnitPrice: number
  grossAmount: number
  poQuantity: number
  dppAmount: number
  tax2Amount: number
  unitPriceRule: UnitPriceRule[]
  availableTotalPrice: number
  manualClosedVisible: boolean
  itemCashDiscount: number
  manualClosed: boolean
  detailTaxName: string
  quantity: number
  defaultWarehouseSalesInvoice: DefaultWarehouseSalesInvoice
  shipQuantity: number
  itemUnitId: number
  availableItemUnit: ItemUnit
  unitRatio: number

  constructor(data: ISalesOrderItemDetailModel) {
    this.lastItemDiscPercent = data.lastItemDiscPercent
    this.processQuantityDesc = data.processQuantityDesc
    this.optLock = data.optLock
    this.itemUnit = data.itemUnit
    this.availableUnitRatio = data.availableUnitRatio
    this.department = data.department;
    this.departmentId = data.departmentId;
    this.defaultWarehouseDeliveryOrder = data.defaultWarehouseDeliveryOrder
    this.id = data.id
    this.discountRule = data.discountRule
    this.unitPrice = data.unitPrice
    this.useTax1 = data.useTax1
    this.salesmanName = data.salesmanName
    this.branchId = data.branchId
    this.useTax3 = data.useTax3
    this.item = data.item
    this.useTax2 = data.useTax2
    this.availableItemUnitName = data.availableItemUnitName
    this.tax1Amount = data.tax1Amount
    this.detailNotes = data.detailNotes
    this.salesOrder = data.salesOrder
    this.itemId = data.itemId
    this.useTax4 = data.useTax4
    this.canChangeDetailGroup = data.canChangeDetailGroup
    this.detailName = data.detailName
    this.lastItemCashDiscount = data.lastItemCashDiscount
    this.totalPrice = data.totalPrice
    this.transferQuantity = data.transferQuantity
    this.salesAmount = data.salesAmount
    this.seq = data.seq
    this.availableQuantity = data.availableQuantity
    this.closed = data.closed
    this.salesOrderId = data.salesOrderId
    this.quantityDefault = Number(data.quantityDefault)
    this.itemDiscPercent = String(data.itemDiscPercent)
    this.availableItemCashDiscount = data.availableItemCashDiscount;
    this.availableUnitPrice = data.availableUnitPrice;
    this.grossAmount = data.grossAmount;
    this.poQuantity = data.poQuantity;
    this.dppAmount = data.dppAmount;
    this.tax2Amount = data.tax2Amount;
    this.unitPriceRule = data.unitPriceRule;
    this.availableTotalPrice = data.availableTotalPrice;
    this.manualClosedVisible = data.manualClosedVisible;
    this.itemCashDiscount = data.itemCashDiscount;
    this.manualClosed = data.manualClosed;
    this.detailTaxName = data.detailTaxName;
    this.quantity = Number(data.quantity);
    this.defaultWarehouseSalesInvoice = data.defaultWarehouseSalesInvoice;
    this.shipQuantity = data.shipQuantity;
    this.itemUnitId = data.itemUnitId;
    this.availableItemUnit = data.availableItemUnit;
    this.unitRatio = data.unitRatio;
  }
}

export interface ItemUnit {
  name: string
  id: number
}

export interface DefaultWarehouseDeliveryOrder {
  defaultWarehouse: boolean
  scrapWarehouse: boolean
  locationId: number
  optLock: number
  name: string
  description: string
  id: number
  suspended: boolean
}

export interface DiscountRule {
  minQuantity: number
  transDate: string
  discountFromSpa: boolean
  unitId: number
  discount: string
}

export interface Item {
  unit2Id: number
  unit4Price: number
  optLock: number
  percentTaxable: number
  ratioVendorUnit: number
  unit3Price: number
  salesDiscountGlAccountId: number
  itemProduced: boolean
  id: number
  unitPrice: number
  onSales: number
  useWholesalePrice: boolean
  unit5Price: number
  unit2Price: number
  suspended: boolean
  goodTransitGlAccountId: number
  cogsGlAccountId: number
  shortName: string
  unBilledGlAccountId: number
  canChangeDetailGroup: boolean
  dimWidth: number
  unit3Id: number
  salesRetGlAccountId: number
  dimDepth: number
  minimumQuantityReorder: number
  vendorPrice: number
  minimumQuantity: number
  dimHeight: number
  additionalCost: boolean
  purchaseRetGlAccountId: number
  unit1: ItemUnit
  unit2: ItemUnit
  unit3: ItemUnit
  vendorUnit: ItemUnit
  ratio2: number
  ratio4: number
  ratio3: number
  ratio5: number
  inventoryGlAccountId: number
  controlQuantity: boolean
  substituted: boolean
  name: string
  salesGlAccountId: number
  deliveryLeadTime: number
  manageExpired: boolean
  no: string
  itemType: string
  unit1Id: number
  itemCategoryId: number
  hasImage: boolean
  manageSN: boolean
  materialProduced: boolean
  serialNumberType: string
  cost: number
  printDetailGroup: boolean
  calculateGroupPrice: boolean
  defStandardCost: number
  vendorUnitId: number
  unit1Price: number
}

export interface SalesOrder {
  number: string
  taxable: boolean
  inclusiveTax: boolean
  id: number
}

export interface UnitPriceRule {
  minQuantity: number
  price: number
  unitId: number
  priceFromSpa: boolean
  minimumPrice: number
}

export interface DefaultWarehouseSalesInvoice {
  defaultWarehouse: boolean
  scrapWarehouse: boolean
  locationId: number
  optLock: number
  name: string
  description: string
  id: number
  suspended: boolean
}

export interface ISalesOrderListDetailModel {
  id: number;
  branchId: number;
  cashDiscPercent: string;
  cashDiscount: number;
  fob: string;
  fobId: number;
  inclusiveTax: boolean;
  rate: number;
  number: string;
  transDate: string;
  customer: {
    name: string;
    id: number;
    customerNo: string;
  };
  currency: {
    code: string;
    id: number;
    symbol: string;
  };
  poNumber: string;
  paymentTerm: {
    id: number;
    name: string;
  };
  shipDate: string;
  shipment: string;
  shipmentId: number;
  taxable: boolean;
  toAddress: string;
  description: string;
  statusName: string;
  totalAmount: number;
  detailItem: ISalesOrderItemDetailModel[];
}

export class SalesOrderListDetailModel {
  id: number;
  branchId: number;
  cashDiscPercent: string;
  cashDiscount: number;
  fob: string;
  fobId: number;
  inclusiveTax: boolean;
  rate: number;
  number: string;
  transDate: string;
  customer: {
    name: string;
    id: number;
    customerNo: string;
  };
  currency: {
    code: string;
    id: number;
    symbol: string;
  };
  poNumber: string;
  paymentTerm: {
    id: number;
    name: string;
  };
  shipDate: string;
  shipment: string;
  shipmentId: number;
  taxable: boolean;
  toAddress: string;
  description: string;
  statusName: string;
  totalAmount: number;
  detailItem: SalesOrderItemDetailModel[];

  constructor(data: ISalesOrderListDetailModel) {
    this.id = data.id;
    this.branchId = data.branchId;
    this.cashDiscPercent = data.cashDiscPercent;
    this.cashDiscount = data.cashDiscount;
    this.fob = data.fob;
    this.fobId = data.fobId;
    this.inclusiveTax = data.inclusiveTax;
    this.rate = data.rate;
    this.number = data.number;
    this.transDate = data.transDate;
    this.customer = {
      name: data.customer.name,
      id: data.customer.id,
      customerNo: data.customer.customerNo,
    };
    this.currency = {
      code: data.currency.code,
      id: data.currency.id,
      symbol: data.currency.symbol,
    };
    this.poNumber = data.poNumber;
    this.paymentTerm = {
      id: data.paymentTerm.id,
      name: data.paymentTerm.name,
    };
    this.shipDate = data.shipDate;
    this.shipment = data.shipment;
    this.shipmentId = data.shipmentId;
    this.taxable = data.taxable;
    this.toAddress = data.toAddress;
    this.description = data.description;
    this.statusName = data.statusName;
    this.totalAmount = data.totalAmount;
    this.detailItem = data.detailItem.map((item) => new SalesOrderItemDetailModel(item));
  }
}