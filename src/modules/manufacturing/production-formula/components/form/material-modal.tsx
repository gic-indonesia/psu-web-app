import { Input, NoLabelInput } from "@src/shared/components/forms";
import { Modal } from "@src/shared/components/modals";
import { Button } from "@src/shared/components/buttons";
import { TextArea } from "@src/shared/components/forms";
import { useFormContext } from "react-hook-form";
import { IDetailMaterial } from "../../requests/create-production-formula.request";
import { useEffect } from "react";
import { IItemDetail } from "../../models/item-detail.model";

const MaterialModal = (props: { isOpen: boolean, onSubmit: (data: IDetailMaterial, index?: number) => void, onClose: () => void, option: IItemDetail, onDelete: (id: number) => void, i?: number }) => {
  const { isOpen, onClose, option, onSubmit, onDelete, i } = props;

  const { getValues, setValue } = useFormContext();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID").format(price);
  }

  useEffect(() => {
    if (option) {
      setValue('materialCode', option.no);
      setValue('materialName', option.name);
      setValue('materialQuantity', option.quantity);
      setValue('materialDenom', option.unit1.name);
      setValue('materialStdPrice', formatPrice(Math.floor(Number(option.balanceUnitCost))));
      setValue('totalMaterialStdPrice', (option.balanceUnitCost && option.quantity) ? formatPrice(Math.floor(Number(option.balanceUnitCost)) * Number(option.quantity)) : 0);
      setValue('materialAnnotation', option.detailNotes);
      setValue('materialUnitId', option.unit1Id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option])

  const handleSubmit = () => {
    const [ itemNo, detailName, quantity, itemUnitName, itemUnitId, standardCost, totalStandardCost, detailNotes ] = getValues(['materialCode', 'materialName', 'materialQuantity', 'materialDenom', 'materialUnitId', 'materialStdPrice', 'totalMaterialStdPrice', 'materialAnnotation']);
    onSubmit({ itemNo, detailName, quantity, itemUnitId, itemUnitName, detailNotes, id: option.id ?? undefined, standardCost, totalStandardCost }, i);
  }

  const handleSumTotalPrice = (value: string) => {
    const total = Number(value) * Number(Math.floor(Number(option.balanceUnitCost)));
    setValue('totalMaterialStdPrice', formatPrice(total));
  }

  const handleDelete = () => {
    if (typeof i === 'number') {
      onDelete(i);
    }
  }

  return (
    <Modal
      title="Rincian Bahan Baku"
      open={isOpen}
      onClose={onClose}
    >
      <div className="flex flex-col space-y-3 p-2 mt-1 w-full">
        <NoLabelInput
          id="materialUnitId"
          type="hidden"
        />
        <Input
          readOnly
          id="materialCode"
          label="Kode #"
          value={getValues('materialCode')}
          labelClassName="font-medium"
        />
        <Input
          readOnly
          id="materialName"
          label="Nama Barang"
          value={getValues('materialName')}
          labelClassName="font-medium"
        />
        <Input
          id="materialQuantity"
          label="Kuantitas"
          type="number"
          defaultValue={getValues('materialQuantity')}
          labelClassName="font-medium"
          onChange={(e) => handleSumTotalPrice(e.target.value)}
        />
        <Input
          readOnly
          id="materialDenom"
          label="Satuan"
          value={getValues('materialDenom')}
          labelClassName="font-medium"
        />
        <Input
          readOnly
          id="materialStdPrice"
          label="Harga Standar"
          value={getValues('materialStdPrice')}
          labelClassName="font-medium"
        />
        <Input
          readOnly
          id="totalMaterialStdPrice"
          label="Total Harga Standar"
          value={getValues('totalMaterialStdPrice')}
          labelClassName="font-medium"
        />
        <TextArea
          readOnly={false}
          id='materialAnnotation'
          label='Keterangan'
        />
        <div className="flex justify-between">
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
      </div>
    </Modal>
  )
}

export default MaterialModal;