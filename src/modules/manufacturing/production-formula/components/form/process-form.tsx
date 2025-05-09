'use client'

import { SearchableSelectInput } from "@src/shared/components/forms";
import { IconButton } from "@src/shared/components/buttons";
import { SetStateAction, useEffect, useState } from "react";
import { Separator } from "@src/components/ui/separator";
import StageModal from "./process-modal";
import { useFormContext } from "react-hook-form";
import { CreateProductionFormulaRequest, IDetailProcess } from "../../requests/create-production-formula.request";
import { ScrollArea, ScrollBar } from "@src/components/ui/scroll-area";
import { Card, CardContent } from "@src/components/ui/card";
import { Edit } from "lucide-react";
import { useAppSelector } from "@src/hooks/redux";

const ProductAndStagesForm = () => {
  const { processes } = useAppSelector((state) => state.productionFormulaStore);
  const [showStage, setShowStage] = useState<{ label: string; value: string } | undefined>(undefined);
  const [detailProcess, setDetailProcess] = useState<IDetailProcess[]>([]);
  const [processSortList, setProcessSortList] = useState<Record<number, IDetailProcess[]> | undefined>(undefined);

  const { getValues, setValue } = useFormContext<CreateProductionFormulaRequest>();

  const handleChangeStage = (option: SetStateAction<{ label: string; value: string; } | undefined>) => {
    const itemNo = getValues('itemNo');
    const quantity = getValues('quantity');
    if (!itemNo || isNaN(quantity)) {
      alert('Silahkan isi produk utama dan kuantitas terlebih dahulu');
      return;
    }
    setShowStage(option);
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue('detailProcess', detailProcess as any);
    function groupBySortNumber(items: IDetailProcess[]): Record<number, IDetailProcess[]> {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return items.reduce((acc: any, item: IDetailProcess) => {
        if (!acc[item.sortNumber]) {
          acc[item.sortNumber] = [];
        }
        acc[item.sortNumber].push(item);
        return acc;
      }, {} as Record<number, IDetailProcess[]>);
    }
    setProcessSortList(groupBySortNumber(detailProcess));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailProcess])

  const handleSubmitProcessDetail = (data: IDetailProcess) => {
    const x = detailProcess.map((c) => c);
    x.push({...data, sortNumber: String(data.sortNumber)});
    setDetailProcess(x);
    setShowStage(undefined);
  }

  const handleEditProcess = (item: IDetailProcess) => {
    console.log('item', item);
  }

  return (
    <div className="p-2 w-full mt-1 space-y-3">
      <div>
        {
          processes && (
            <SearchableSelectInput
              label="Tahapan"
              id="stages"
              options={processes.map((c) => ({ label: c.nama_tahapan, value: String(c.id) }))}
              placeholder="Pilih Tahapan Produksi"
              ifEmptyLabel="Tidak ada tahapan yang ditemukan"
              onChange={(option) => handleChangeStage(option)}
              className="w-[340px] truncate overflow-hidden text-ellipsis whitespace-nowrap"
            />
          )
        }
        <ScrollArea className="px-2 h-[350px] w-[340px] mt-3">
          <div className="mt-2 text-[9pt] space-y-1">
            {
              processSortList && Object.keys(processSortList).map((key, i) => (
                <div key={i} className="flex space-x-2 items-center">
                  <p className="text-sm font-semibold text-amber-600 bg-white p-1 rounded-md">{key}</p>
                  <ScrollArea className="max-w-[305px] whitespace-nowrap rounded-md border p-1">
                    <div className="flex space-x-1 p-1">
                      {
                        processSortList[Number(key)].map((item, index) => (
                          <Card key={index} className="w-fit">
                            <CardContent className="flex space-x-2 h-8">
                              <div className="flex flex-col items-center justify-center">
                                <p>{item.processCategoryName}</p>
                                { item.subCon ? <p>Sub-kon</p> : null }
                              </div>
                              <Separator orientation="vertical"/>
                              <div className="ml-1 flex space-x-1 items-center">
                                <IconButton
                                  variant="outline"
                                  icon={Edit}
                                  onClick={() => handleEditProcess(item)}
                                />
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      }
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              ))
            }
          </div>
        </ScrollArea>
      </div>
      {
        showStage && (
          <StageModal
            isOpen={!!showStage}
            onClose={() => setShowStage(undefined)}
            option={showStage}
            onSubmit={(data) => handleSubmitProcessDetail(data)}
          />
        )
      }
    </div>
  )
}

export default ProductAndStagesForm;