import { Input, NoLabelInput, SelectInput } from "@src/shared/components/forms";
import { Modal } from "@src/shared/components/modals";
import { Button } from "@src/shared/components/buttons";
import { TextArea } from "@src/shared/components/forms";
import { useFormContext } from "react-hook-form";
import { IDetailItemSalesOrderRequest } from "../../requests/create-sales-order.request";
import { useEffect, useState } from "react";
import { IItemModel, ItemModel } from "../../models/item.model";
import { ItemUnit } from "../../models/sales-order-detail.model";
import { ScrollArea } from "@src/components/ui/scroll-area";

const ItemModal = (props: { isOpen: boolean, onSubmit: (data: IDetailItemSalesOrderRequest, index?: number) => void, onClose: () => void, option: IItemModel, onDelete: (id: number) => void, i?: number }) => {
  const { isOpen, onClose, option, onSubmit, onDelete, i } = props;
  const [units, setUnits] = useState<ItemUnit[] | undefined>(undefined);

  const { getValues, setValue } = useFormContext();

  const priceToStringNumber = (price: string) => {
    return price.replace(/\./g, "").replace(/,/g, ".")
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID").format(price);
  }

  useEffect(() => {
    if (option) {
      const itemModel = new ItemModel(option);
      const discountPrice = (option.balanceUnitCost && option.discount && option.quantity) ? Math.floor(Number(option.balanceUnitCost) * Number(option.quantity) * Number(option.discount) / 100) : 0;
      setUnits(itemModel.createUnit());
      setValue('itemCode', option.no);
      setValue('itemName', option.name);
      setValue('itemQuantity', option.quantity);
      setValue('itemDenom', String(option.unit1.id));
      setValue('itemStdPrice', formatPrice(Math.floor(Number(option.balanceUnitCost))));
      setValue('itemDiscount', option.discount);
      setValue('itemDiscountPrice', formatPrice(discountPrice));
      setValue('totalItemStdPrice', (option.balanceUnitCost && option.quantity) ? formatPrice(Math.floor(Number(option.balanceUnitCost)) * Number(option.quantity)) : 0);
      setValue('itemWarehouseId', option.warehouseId);
      setValue('itemAnnotation', option.detailNotes);
      setValue('itemUnitId', option.unit1Id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option])

  const handleSubmit = () => {
    const [
      itemNo,
      detailName,
      quantity,
      itemUnitId,
      unitPrice,
      itemDiscPercent,
      itemCashDiscount,
      ,
      ,
      detailNotes,
    ] = getValues([
      'itemCode',
      'itemName',
      'itemQuantity',
      'itemDenom',
      'itemStdPrice',
      'itemDiscount',
      'itemDiscountPrice',
      'totalItemStdPrice',
      'itemWarehouseId',
      'itemAnnotation'
    ]);
    if (!quantity || (quantity && quantity === '')) {
      alert('Kuantitas harus diisi');
      document?.getElementById('itemQuantity')?.focus();
      return;
    }
    const itemUnitName = units && units.find(c => c.id === Number(itemUnitId))?.name;
    onSubmit({
      itemNo,
      detailName,
      quantity,
      itemUnitId,
      itemUnitName,
      detailNotes,
      id: option.id ?? undefined,
      unitPrice: priceToStringNumber(unitPrice),
      itemDiscPercent,
      itemCashDiscount: priceToStringNumber(itemCashDiscount),
    }, i);
  }

  const handleSumTotalPrice = (value: string) => {
    const [unitPrice, itemDiscount] = getValues(['itemStdPrice', 'itemDiscount']);
    const discountPrice = (unitPrice && itemDiscount && value) ? Math.floor(Number(priceToStringNumber(unitPrice)) * Number(value) * Number(itemDiscount) / 100) : 0;
    const total = (Number(value) * Number(priceToStringNumber(unitPrice))) - discountPrice;
    setValue('itemDiscountPrice', formatPrice(discountPrice));
    setValue('totalItemStdPrice', formatPrice(total));
  }

  const handleDelete = () => {
    if (typeof i === 'number') {
      onDelete(i);
    }
  }

  const handleChangeDiscount = (value: string) => {
    const [unitPrice, quantity] = getValues(['itemStdPrice', 'itemQuantity']);
    const discountPrice = (unitPrice && value && quantity) ? Math.floor(Number(priceToStringNumber(unitPrice)) * Number(quantity) * Number(value) / 100) : 0;
    setValue('itemDiscountPrice', formatPrice(discountPrice));
    setValue('totalItemStdPrice', formatPrice((Number(priceToStringNumber(unitPrice)) * Number(quantity)) - Number(discountPrice)));
    setValue('itemDiscount', value);
  }

  const handleChangeUnitPrice = (value: string) => {
    const [quantity, itemDiscount] = getValues(['itemQuantity', 'itemDiscount']);
    const discountPrice = (value && itemDiscount && quantity) ? Math.floor(Number(priceToStringNumber(value)) * Number(quantity) * Number(itemDiscount) / 100) : 0;
    const total = (Number(quantity) * Number(priceToStringNumber(value))) - discountPrice;
    setValue('itemDiscountPrice', formatPrice(discountPrice));
    setValue('totalItemStdPrice', formatPrice(total));
  }

  return (
    <Modal
      title="Rincian Barang"
      open={isOpen}
      onClose={onClose}
    >
      <ScrollArea className="flex flex-col p-2 h-[450px] w-[350px] mt-1">
        <NoLabelInput
          id="itemUnitId"
          type="hidden"
        />
        <Input
          readOnly
          id="itemCode"
          label="Kode #"
          value={getValues('itemCode')}
          labelClassName="font-medium"
          className="text-base"
        />
        <Input
          readOnly
          id="itemName"
          label="Nama Barang"
          value={getValues('itemName')}
          labelClassName="font-medium mt-3"
          className="text-base"
        />
        <Input
          id="itemQuantity"
          label="Kuantitas"
          type="number"
          defaultValue={getValues('itemQuantity')}
          labelClassName="font-medium mt-3"
          onChange={(e) => handleSumTotalPrice(e.target.value)}
          className="text-base"
        />
        {
          units ? (
            <SelectInput
              id="itemDenom"
              label="Satuan"
              className="mt-3"
              defaultValue={getValues('itemDenom')}
              options={units.map(c => ({ value: String(c.id), label: c.name}))}
              placeholder="Pilih satuan"
            />
          ) : (
            null
          )
        }
        <Input
          id="itemStdPrice"
          label="@Harga"
          type="number"
          defaultValue={getValues('itemStdPrice')}
          labelClassName="font-medium mt-3"
          onChange={(e) => handleChangeUnitPrice(e.target.value)}
          className="text-base"
        />
        <div className="flex items-end space-x-1 mt-3">
          <Input
            id="itemDiscount"
            type="number"
            label="Diskon (%)"
            defaultValue={getValues('itemDiscount')}
            onChange={(e) => handleChangeDiscount(e.target.value)}
            labelClassName="font-medium"
            className="text-base"
          />
          <NoLabelInput
            id="itemDiscountPrice"
            defaultValue={getValues('itemDiscountPrice')}
            readOnly
            className="text-base"
          />
        </div>
        <Input
          readOnly
          id="totalItemStdPrice"
          label="Total Harga"
          value={getValues('totalItemStdPrice')}
          labelClassName="font-medium mt-3"
          className="text-base mb-3"
        />
        {/* {
          warehouses ? (
            <SearchableSelectInput
              id="itemWarehouseId"
              label="Gudang"
              options={warehouses.map(c => ({ value: String(c.id), label: c.name}))}
              placeholder="Pilih Gudang"
            />
          ) : (
            null
          )
        } */}
        <TextArea
          readOnly={false}
          id='itemAnnotation'
          label='Keterangan'
          className="text-base"
        />
        <div className="flex justify-between mt-4">
          {
            typeof option.id === 'number' || typeof i === 'number' ? (
              <Button
                variant="primary"
                type="button"
                className="justify-center rounded-md bg-red-500 text-white"
                size="base"
                onClick={() => handleDelete()}
              >
                Hapus
              </Button>
            ) : (
              null
            )
          }
          <Button
            variant="primary"
            type="button"
            className="justify-center rounded-md"
            size="base"
            onClick={() => handleSubmit()}
          >
            Lanjut
          </Button>
        </div>
      </ScrollArea>
    </Modal>
  )
}

export default ItemModal;