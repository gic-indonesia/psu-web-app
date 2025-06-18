'use client'

import { SearchableSelectInput } from "@src/shared/components/forms";
import { Separator } from "@src/components/ui/separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Card, CardContent } from "@src/components/ui/card";
import { IDetailMaterial } from "../../requests/create-production-formula.request";
import { useEffect, useState } from "react";
import { ProductionFormulaService } from "../../services";
import { IItemDetail, ItemDetail } from "../../models/item-detail.model";
import MaterialModal from "./material-modal";
import { useFormContext } from "react-hook-form";
import { cn } from "@src/lib/utils";
import { useRef } from "react";
import { MarqueeText } from "@src/shared/components/topography";
import { useAppSelector } from "@src/hooks/redux";

const MaterialForm = () => {
  const { getValues, setValue } = useFormContext();
  const { materialItems } = useAppSelector(state => state.productionFormulaStore)
  const [materialList, setMaterialList] = useState<IDetailMaterial[]>(getValues('detailMaterial'));
  const [materialData, setMaterialData] = useState<IItemDetail & { index?: number } | undefined>(undefined);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
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
          setMaterialData({...item, id: undefined});
        })
        .catch((e) => console.log('error', e));
  }

  const handleSubmitMaterial = (data: IDetailMaterial, i?: number) => {
    const x = materialList.map((c) => c);
    if (typeof i === 'number') {
      x.splice(i, 1, data);
    } else {
      x.push(data);
    }
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
    const containerRef = useRef<HTMLDivElement>(null);
    return (
      <Card className={cn('w-[300px] items-center border border-amber-500', item._status && item._status === 'delete' ? 'bg-red-500 pointer-events-none border-red-400' : '')} onClick={() => handleShowInForm(item, index)}>
        <CardContent className="flex space-x-2 h-4">
          <div className="flex flex-col items-center justify-center w-[200px]">
            <p>{item.itemNo}</p>
            <MarqueeText
              containerRef={containerRef as React.RefObject<HTMLDivElement>}
              text={item.detailName ?? ''}
            />
          </div>
          <Separator orientation="vertical" className="bg-amber-500"/>
          <div className="ml-1 flex text-center items-center justify-center">
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
                className="w-[350px] truncate overflow-hidden text-ellipsis whitespace-nowrap"
              />
            )
          }
          <div className="relative overflow-auto">
            <ScrollArea className="px-2 h-[400px] w-[350px] mt-3">
              <div className="flex flex-col justify-center items-center mt-2 text-[9pt] space-y-1">
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