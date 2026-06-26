/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from "react";
import { Form } from "@src/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateSalesOrderRequest, ICreateSalesOrderRequest } from "../../requests/create-sales-order.request";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker, Input, SearchableSelectInput, SelectInput, TextArea } from "@src/shared/components/forms";
import { Switch } from "@src/components/ui/switch";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import { fetchSalesOrderList, fetchCustomers, fetchItems, fetchPaymentTerm } from "../../stores/sales-order.store";
import * as z from "zod";
import { Button } from "@src/shared/components/buttons";
import { Separator } from "@src/components/ui/separator";
import { SalesOrderService } from "../../services";
import { SalesOrderListDetailModel } from "../../models/sales-order-detail.model";
import { useRouter } from "next/navigation";
import { IUpdateSalesOrderRequest, UpdateSalesOrderRequest } from "../../requests/update-sales-order.request";
import { toast } from "react-toastify";
import { ScrollArea } from "@src/components/ui/scroll-area";
import { Card, CardContent } from "@src/components/ui/card";
import { ProductionFormulaService } from "@src/modules/manufacturing/production-formula/services";
import { IItemModel, ItemModel } from "../../models/item.model";
import { IDetailItemSalesOrderRequest } from "../../requests/create-sales-order.request";
import { cn } from "@src/lib/utils";
import ItemModal from "./modal";
import { parse } from 'date-fns';

const schema = CreateSalesOrderRequest.schema();
const updateSchema = UpdateSalesOrderRequest.schema()

const SalesOrderForm = (props: { item?: SalesOrderListDetailModel }) => {
  const { item } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { filter, customers, items, paymentTerms } = useAppSelector((state) => state.salesOrderStore);
  const [isAutoNumbering, setIsAutoNumbering] = useState(!item);
  const [loading, setLoading] = useState<boolean>(false);
  const [processing, setProcessing] = useState(false);

  type CreateFormData = z.infer<typeof schema>;
  type UpdateFormData = z.infer<typeof updateSchema>;

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchItems());
    dispatch(fetchPaymentTerm());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getDetailItem = () => {
    if (item) {
      const x = item.detailItem.map((c) => ({
        itemNo: c.item.no,
        unitPrice: String(c.unitPrice),
        departmentName: c.department ?? undefined,
        detailName: c.detailName,
        detailNotes: c.detailNotes,
        id: c.id,
        itemCashDiscount: String(c.itemCashDiscount),
        itemDiscPercent: c.itemDiscPercent,
        itemUnitName: c.itemUnit.name,
        itemUnitId: String(c.itemUnit.id),
        quantity: String(c.quantity),
        _status: undefined,
      }))

      return x
    } else {
      return [];
    }
  }

  const methods = useForm<CreateFormData | UpdateFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(item ? updateSchema : schema),
    defaultValues: {
      id: item ? item.id : 0,
      customerNo: item ? item.customer.customerNo : '',
      branchId: item && item.branchId != null ? String(item.branchId) : undefined,
      cashDiscPercent: item && item.cashDiscPercent != null ? item.cashDiscPercent : undefined,
      cashDiscount: item && item.cashDiscount != null ? String(item.cashDiscount) : undefined,
      currencyCode: item ? item.currency.code : undefined,
      description: item && item.description != null ? item.description : undefined,
      fobName: item && item.fob != null ? item.fob : undefined,
      inclusiveTax: item && item.inclusiveTax != null ? item.inclusiveTax : undefined,
      number: item ? item.number : undefined,
      paymentTermName: item ? item.paymentTerm.name : undefined,
      poNumber: item && item.poNumber != null ? item.poNumber : undefined,
      rate: item ? String(item.rate) : undefined,
      shipDate: item ? item.shipDate : undefined,
      shipmentName: item && item.shipment != null ? item.shipment : undefined,
      taxable: item ? item.taxable : undefined,
      toAddress: item && item.toAddress != null ? item.toAddress : undefined,
      transDate: item ? parse(item.transDate, 'dd/MM/yyyy', new Date()) : new Date(),
      detailItem: getDetailItem(),
    }
  })

  const { handleSubmit, getValues, setValue, formState } = methods;

  const { errors } = formState;

  useEffect(() => {
    
  }, [errors])

  const [goods, setGoods] = useState<IDetailItemSalesOrderRequest[]>(getValues('detailItem'));
  const [goodsData, setGoodsData] = useState<IItemModel & { index?: number } | undefined>(undefined);

  useEffect(() => {
    setValue('detailItem', goods);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goods])

  const handleShowInForm = (item: IDetailItemSalesOrderRequest, i: number) => {
    setGoodsData({
      id: item.id ?? undefined,
      no: item.itemNo,
      name: item.detailName ?? '',
      quantity: String(item.quantity),
      unit1: {
        id: Number(item.itemUnitId),
        name: item.itemUnitName ?? '',
      },
      discount: item.itemDiscPercent ?? '0',
      unit1Id: item.itemUnitId ? Number(item.itemUnitId) : 0,
      detailNotes: item.detailNotes && item.detailNotes !== null ? item.detailNotes : '',
      balanceUnitCost: String(item.unitPrice),
      index: i,
    })
  }

  const showOnSuccessToast = (message: string, success: boolean) => {
    if (!success) {
      toast.error(message);
      setProcessing(false);
    } else {
      toast.success(message);
      dispatch(fetchSalesOrderList(filter));
      setProcessing(false);
      router.push('/sales/sales-order');
    }
  }

  const onSubmit: SubmitHandler<ICreateSalesOrderRequest | IUpdateSalesOrderRequest> = (value) => {
    setProcessing(true);
    let params = CreateSalesOrderRequest.createFromJson({...value, number: value.number && value.number !== '' ? value.number : undefined, typeAutoNumber: value.number && value.number !== '' ? undefined : 54 });
    if (item) {
      params = UpdateSalesOrderRequest.createFromJson({
        ...value,
        number: value.number && value.number !== '' ? value.number : undefined,
        typeAutoNumber: value.number && value.number !== '' ? undefined : 54,
        id: item.id,
      })
    }
    SalesOrderService()
      .save(params)
        .then((res) => {
          const { d, s } = res;
          showOnSuccessToast(Array.isArray(d) && d[0] ? d[0] : '', s);
        })
        .catch((e) => {
          setProcessing(false);
          console.log('error', e)
        });
  }

  const handleSelectGoods = (value: { value: string, label: string }) => {
    const customerNo = getValues('customerNo');
    const transDate = getValues('transDate');
    if (!customerNo || !transDate) {
      toast.error('Silahkan isi customer dan tanggal terlebih dahulu');
      return;
    }
    setLoading(true);
    ProductionFormulaService()
      .itemDetail(Number(value.value))
        .then((r) => {
          setLoading(false);
          const { d } = r;
          const item = ItemModel.createFromJson(d);
          setGoodsData({...item, id: undefined});
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
        });
  }

  const handleSubmitItem = (data: IDetailItemSalesOrderRequest, i?: number) => {
    const x = goods.map((c) => c);
    if (typeof i === 'number') {
      x.splice(i, 1, data);
    } else {
      x.push(data);
    }
    setGoods(x);
    setGoodsData(undefined);
  }

  const handleDeleteItem = (i: number) => {
    const x = goods.map((c) => c);
    const toBeDel = x[i];
    if (toBeDel) {
      const dataDel = { ...toBeDel, _status: 'delete' }
      x.splice(i, 1, dataDel);
    }
    setGoods(x);
    setGoodsData(undefined);
  }

  const ItemContainer = (props: { item: IDetailItemSalesOrderRequest, index: number }) => {
    const { item, index } = props;
    return (
      <Card key={index} className={cn('w-full items-center border border-amber-500', item._status && item._status === 'delete' ? 'bg-red-500 pointer-events-none border-red-400' : '')} onClick={() => handleShowInForm(item, index)}>
        <CardContent className="flex items-center space-x-2 px-3 py-2">
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{item.itemNo ?? ''}</p>
            <p className="truncate text-gray-600">{item.detailName ?? ''}</p>
          </div>
          <Separator orientation="vertical" className="h-8 bg-amber-500"/>
          <div className="flex shrink-0 items-center text-center">
            <p>{item.quantity} <span>{item.itemUnitName}</span></p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-3">
        <div className="p-1 mt-3 space-y-3">
          {
            customers && (
              <SearchableSelectInput
                label="Dipesan oleh"
                id="customerNo"
                options={customers.map((c) => ({ label: c.name, value: c.customerNo, unit: c.category }))}
                placeholder="Pilih Customer"
                ifEmptyLabel="Tidak ada customer yang ditemukan"
                className="w-full"
              />
            )
          }
          <DatePicker
            id="transDate"
            label="Tanggal"
            rule={(date: Date) => date < new Date("1900-01-01")}
            className="w-full"
          />
          <div className="flex items-end gap-3">
            <div className="min-w-0 flex-1">
              {
                !isAutoNumbering ? (
                  <Input
                    id="number"
                    className="text-base w-full"
                    label="No Pesanan #"
                    labelClassName="font-medium"
                  />
                ) : (
                  <SelectInput
                    defaultValue={'54'}
                    label={"No Pesanan #"}
                    id="salesOrderNo"
                    options={[{ value: '54', label: 'Pesanan Penjualan' }]}
                    placeholder="Pilih Formula Produksi"
                  />
                )
              }
            </div>
            {
              item ? (
                null
              ) : (
                <Switch
                  defaultChecked={isAutoNumbering}
                  className="mb-2 shrink-0"
                  onCheckedChange={(checked) => {
                    setIsAutoNumbering(checked)
                  }}
                />
              )
            }
          </div>
          {
            paymentTerms && (
              <SearchableSelectInput
                label="Syarat Pembayaran"
                id="paymentTermName"
                options={paymentTerms.map((c) => ({ label: c.name, value: c.name }))}
                placeholder="Pilih Syarat Pembayaran"
                ifEmptyLabel="Tidak ada syarat pembayaran yang ditemukan"
                className="w-full"
              />
            )
          }
          <TextArea
            id="description"
            label="Keterangan"
            className="w-full text-base"
            placeholder=""
          />
          {/* <DatePicker
            id="shipDate"
            label="Tgl Pengiriman"
            rule={(date: Date) => date < new Date("1900-01-01")}
            className="w-[350px]"
          />
          <SelectInput
            defaultValue={'54'}
            label={"No Pesanan #"}
            id="salesOrderNo"
            options={[{ value: '54', label: 'Pesanan Penjualan' }]}
            placeholder="Pilih Formula Produksi"
          /> */}
        </div>
        <Separator className="mb-2 bg-amber-500" />
        {
          loading ? (
            <div className="flex justify-center items-center h-fit">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-500" />
            </div>
          ) : (
            <div className="my-1">
              <h3 className="font-semibold mb-3">Rincian Barang</h3>
              <div>
                {
                  items ? (
                    <SearchableSelectInput
                      label="Barang & Jasa"
                      id="materialSelect"
                      options={items.map((c) => ({ label: c.name, value: String(c.id), no: c.no }))}
                      placeholder="Pilih Barang & Jasa"
                      onChange={(value) => handleSelectGoods(value)}
                      className="w-full"
                    />
                  ) : (
                    null
                  )
                }
                <div className="relative w-full overflow-auto">
                  <ScrollArea className="mt-3 w-full max-h-[45vh]">
                    <div className="mt-2 flex w-full flex-col space-y-2 text-sm">
                      {
                        goods.filter(item => item._status !== 'delete').map((item, index) => (
                          <ItemContainer
                            key={index}
                            item={item}
                            index={index}
                          />
                        ))
                      }
                    </div>
                  </ScrollArea>
                </div>
                {/* <div className="flex gap-1 p-2 border border-amber-500 rounded-md ring-1 ring-amber-500">
                    <div>
                      <Input
                        readOnly
                        id="subTotal"
                        label="Sub Total"
                        type="number"
                        value={subTotal}
                        labelClassName="font-medium"
                      />
                    </div>
                    <div>
                      <Input
                        id="cashDiscount"
                        label="Diskon %"
                        type="number"
                        labelClassName="font-medium"
                        onChange={(e) => {
                          const value = e.target.value;
                          const x = goods.reduce((sum, item) => {
                            return sum + (Number(item.unitPrice) * Number(item.quantity));
                          }, 0);

                          const cashDisc = (Number(value) / 100) * x;
                          setTotal(x - cashDisc);
                        }}
                      />
                    </div>
                    <div>
                      <Input
                        readOnly
                        id="total"
                        label="Total"
                        type="number"
                        labelClassName="font-medium"
                      />
                    </div>
                </div> */}
              </div>
            </div>
          )
        }
        <div className="mt-2">
          <Button
            isLoading={processing}
            variant="primary"
            type="submit"
            className="flex w-full justify-center rounded-md"
            size="base"
          >
            Submit
          </Button>
        </div>
        {
          goodsData && (
            <ItemModal
              onClose={() => setGoodsData(undefined)}
              isOpen={!!goodsData}
              option={goodsData}
              onSubmit={(data, i) => handleSubmitItem(data, i)}
              onDelete={(id) => handleDeleteItem(id)}
              i={typeof goodsData.index === 'number' ? goodsData.index : undefined}
            />
          )
        }
      </form>
    </Form>

  )
}

export default SalesOrderForm;