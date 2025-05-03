import { Input, NoLabelInput, SelectInput } from "@src/shared/components/forms";
import { SearchableSelectInput } from "@src/shared/components/forms";
import { barangOptions } from "../../consts/produkUtamaMock";
import tahapanMock from "../../consts/tahapanMock";
import { Button, IconButton } from "@src/shared/components/buttons";
import { SetStateAction, useEffect, useState } from "react";
import { Switch } from "@src/components/ui/switch";
import { Separator } from "@src/components/ui/separator";
import StageModal from "./stage-modal";
import { FieldArrayWithId, useFieldArray, useFormContext } from "react-hook-form";
import { CreateProductionFormulaRequest, IDetailProcess } from "../../requests/create-production-formula.request";
import { ScrollArea, ScrollBar } from "@src/components/ui/scroll-area";
import { Card, CardContent } from "@src/components/ui/card";
import { Edit } from "lucide-react";

const ProductAndStagesForm = (props: { onNextStep: () => void }) => {
  const { onNextStep } = props;
  const [isAutoNumbering, setIsAutoNumbering] = useState(true);
  const [showStage, setShowStage] = useState<{ label: string; value: string } | undefined>(undefined);
  const [processSortList, setProcessSortList] = useState<Record<number, IDetailProcess[]> | undefined>(undefined);

  const handleChangeStage = (option: SetStateAction<{ label: string; value: string; } | undefined>) => {
    setShowStage(option);
  }

  const { control } = useFormContext<CreateProductionFormulaRequest>();
  const { fields, append } = useFieldArray({
    control,
    name: 'detailProcess',
  });

  useEffect(() => {
    function groupBySortNumber(items: FieldArrayWithId<CreateProductionFormulaRequest, "detailProcess", "id">[]): Record<number, IDetailProcess[]> {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return items.reduce((acc: any, item: IDetailProcess) => {
        if (!acc[item.sortNumber]) {
          acc[item.sortNumber] = [];
        }
        acc[item.sortNumber].push(item);
        return acc;
      }, {} as Record<number, IDetailProcess[]>);
    }
    setProcessSortList(groupBySortNumber(fields));
  }, [fields])

  const handleSubmitProcessDetail = (data: IDetailProcess) => {
    append(data);
    setShowStage(undefined);
  }

  return (
    <div className="p-2 mt-1 w-full space-y-3">
      <SearchableSelectInput
        label="Produk Utama"
        id="itemNo"
        options={barangOptions}
        placeholder="Pilih Produk Utama"
        ifEmptyLabel="Tidak ada produk yang ditemukan"
      />
      <div className="flex items-end space-x-2">
        <Input
          id="quantity"
          label="Kuantitas"
          type="number"
          labelClassName="font-medium"
        />
        <NoLabelInput
          id="itemUnitName"
        />
      </div>
      <div className="flex space-x-8 items-center">
        {
          !isAutoNumbering ? (
            <Input
              id="number"
              label="No Formula #"
              type="string"
              labelClassName="mt-0 font-medium"
            />
          ) : (
            <SelectInput
              defaultValue={'1'}
              label={"No Formula #"}
              id="formulaProduction"
              options={[{ value: '1', label: 'Formula Produksi' }]}
              placeholder="Pilih Formula Produksi"
            />
          )
        }
        <Switch
          defaultChecked={isAutoNumbering}
          className="mt-4"
          onCheckedChange={(checked) => {
            setIsAutoNumbering(checked)
          }}
        />
      </div>
      <Separator className="my-3" />
      <div>
        <SearchableSelectInput
          label="Tahapan"
          id="stages"
          options={tahapanMock}
          placeholder="Pilih Tahapan Produksi"
          ifEmptyLabel="Tidak ada tahapan yang ditemukan"
          onChange={(option) => handleChangeStage(option)}
        />
        <ScrollArea className="px-2 h-[500px] w-[350px] mt-3">
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
      <Button
        variant="primary"
        type="button"
        className="flex w-full justify-center rounded-md"
        size="base"
        onClick={onNextStep}
      >
        Next
      </Button>
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