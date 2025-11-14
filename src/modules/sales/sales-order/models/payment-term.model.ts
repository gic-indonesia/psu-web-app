/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IPaymentTermModel {
  cashOnDelivery: boolean
  optLock: number
  name: string
  discDays: number
  installmentTerm: boolean
  memo: any
  defaultTerm: boolean
  discPC: number
  id: number
  netDays: number
  suspended: boolean
  manualTerm: boolean
}

export class PaymentTermModel {
  cashOnDelivery: boolean
  optLock: number
  name: string
  discDays: number
  installmentTerm: boolean
  memo: any
  defaultTerm: boolean
  discPC: number
  id: number
  netDays: number
  suspended: boolean
  manualTerm: boolean

  constructor(model: IPaymentTermModel) {
    this.cashOnDelivery = model.cashOnDelivery;
    this.optLock = model.optLock;
    this.name = model.name;
    this.discDays = model.discDays;
    this.installmentTerm = model.installmentTerm;
    this.memo = model.memo;
    this.defaultTerm = model.defaultTerm;
    this.discPC = model.discPC;
    this.id = model.id;
    this.netDays = model.netDays;
    this.suspended = model.suspended;
    this.manualTerm = model.manualTerm;
  }
}