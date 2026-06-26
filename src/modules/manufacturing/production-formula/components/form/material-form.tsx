'use client'

import { SearchableSelectInput } from "@src/shared/components/forms";
import { Separator } from "@src/components/ui/separator";
import { Badge } from "@src/components/ui/badge";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Card, CardContent } from "@src/components/ui/card";
import { IDetailMaterial } from "../../requests/create-production-formula.request";
import { useEffect, useState } from "react";
import { ProductionFormulaService } from "../../services";
import { IItemDetail, ItemDetail } from "../../models/item-detail.model";
import MaterialModal from "./material-modal";
import { useFormContext } from "react-hook-form";
import { cn } from "@src/lib/utils";
import { useAppSelector } from "@src/hooks/redux";

const MaterialForm = () => {
  const { getValues, setValue } = useFormContext();
  const { materialItems } = useAppSelector(state => state.productionFormulaStore)
  const [materialList, setMaterialList] = useState<IDetailMaterial[]>(getValues('detailMaterial'));
  const [materialData, setMaterialData] = useState<IItemDetail & { processCategoryName: string, index?: number } | undefined>(undefined);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    console.log('material', materialList)
    setValue('detailMaterial', materialList);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialList])

  const handleShowInForm = (item: IDetailMaterial, i: number) => {
    setMaterialData({
      id: item.id ?? undefined,
      no: item.itemNo,
      name: item.detailName ?? '',
      quantity: String(item.quantity),
      unit1: {
        id: item.itemUnitId,
        name: item.itemUnitName ?? '',
      },
      unit1Id: item.itemUnitId ?? 0,
      detailNotes: item.detailNotes && item.detailNotes !== null ? item.detailNotes : '',
      balanceUnitCost: String(item.standardCost),
      processCategoryName: item.processCategoryName,
      index: i,
    })
  }

  const handleSelectMaterial = (value: { label: string; value: string }) => {
    const itemNo = getValues('itemNo');
    const quantity = getValues('quantity');
    if (!itemNo || isNaN(quantity)) {
      alert('Silahkan isi produk utama dan kuantitas terlebih dahulu');
      return;
    }
    setLoading(true);
    ProductionFormulaService()
      .itemDetail(Number(value.value))
        .then((r) => {
          setLoading(false);
          const { d } = r;
          const item = ItemDetail.createFromJson(d);
          setMaterialData({...item, processCategoryName: 'PENCAMPURAN', id: undefined});
          // setMaterialData({...item, id: undefined})
        })
        .catch((e) => console.log('error', e));
  }

  const handleSubmitMaterial = (data: IDetailMaterial, i?: number) => {
    console.log('data', data);
    const x = materialList.map((c) => c);
    if (typeof i === 'number') {
      x.splice(i, 1, data);
    } else {
      x.push(data);
    }
    setValue('materialQuantity', undefined);
    setMaterialList(x);
    setMaterialData(undefined);
  }

  const handleDeleteMaterial = (i: number) => {
    const x = materialList.map((c) => c);
    const toBeDel = x[i];
    if (toBeDel) {
      const dataDel = { ...toBeDel, _status: 'delete' }
      x.splice(i, 1, dataDel);
    }
    setMaterialList(x);
    setMaterialData(undefined);
  }

  const ItemContainer = (props: { item: IDetailMaterial, index: number }) => {
    const { item, index } = props;
    return (
      <Card className={cn('flex w-full items-center justify-center border border-amber-500', item._status && item._status === 'delete' ? 'bg-red-500 pointer-events-none border-red-400' : '')} onClick={() => handleShowInForm(item, index)}>
        <CardContent className="flex w-full items-center space-x-2 px-3 py-2">
          <div className="flex min-w-0 flex-1 flex-col">
            <p className="truncate font-medium">{item.itemNo}</p>
            <p className="truncate text-gray-600">{item.detailName ?? ''}</p>
            <Badge variant='secondary' className="mt-1 w-fit">{item.processCategoryName}</Badge>
          </div>
          <Separator orientation="vertical" className="h-12 bg-amber-500"/>
          <div className="flex shrink-0 items-center text-center">
            <p>{item.quantity} <span>{item.itemUnitName}</span></p>
          </div>
        </CardContent>
      </Card>
    )
  }
  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      )}
      <div className={loading ? "blur-sm pointer-events-none" : ""}>
        <div className="p-1 mt-1 w-full space-y-3">
          {
            materialItems && (
              <SearchableSelectInput
                label="Bahan Baku"
                id="materialSelect"
                options={materialItems.map((c) => ({ value: String(c.id), label: c.name }))}
                placeholder="Pilih Bahan Baku"
                onChange={(value) => handleSelectMaterial(value)}
                className="w-full"
              />
            )
          }
          <div className="relative w-full">
            <ScrollArea className="mt-3 w-full max-h-[45vh] overflow-y-auto">
              <div className="mt-2 flex w-full flex-col space-y-2 text-sm">
                {
                  materialList.filter(item => item._status !== 'delete').map((item, index) => (
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
        </div>
        {
          materialData && (
            <MaterialModal
              onClose={() => setMaterialData(undefined)}
              isOpen={!!materialData}
              option={materialData}
              onSubmit={(data, i) => handleSubmitMaterial(data, i)}
              onDelete={(id) => handleDeleteMaterial(id)}
              i={typeof materialData.index === 'number' ? materialData.index : undefined}
            />
          )
        }
      </div>
    </div>
  )
}

export default MaterialForm;