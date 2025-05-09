/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@src/components/ui/tabs"
import ProductAndStagesForm from "./process-form";
import { Form } from "@src/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateProductionFormulaRequest, ICreateProductionFormulaRequest } from "../../requests/create-production-formula.request";
import MaterialForm from "./material-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, NoLabelInput, SearchableSelectInput, SelectInput } from "@src/shared/components/forms";
import { Switch } from "@src/components/ui/switch";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import { fetchList, fetchProcesses, fetchProducedItems } from "../../stores/production-formula.store";
import * as z from "zod";
import { Button } from "@src/shared/components/buttons";
import { Separator } from "@src/components/ui/separator";
import { ProductionFormulaService } from "../../services";
import { IItemDetail } from "../../models/production-formula-detail.model";
import { useRouter } from "next/navigation";
import { IUpdateProductionFormulaRequest, UpdateProductionFormulaRequest } from "../../requests/update-production-formula.request";
import { Bounce, toast } from "react-toastify";

const schema = CreateProductionFormulaRequest.schema();
const updateSchema = UpdateProductionFormulaRequest.schema()

const ProductionFormulaForm = (props: { item?: IItemDetail }) => {
  const { item } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { filter, producedItems } = useAppSelector((state) => state.productionFormulaStore);
  const [isAutoNumbering, setIsAutoNumbering] = useState(!item);
  const [denomOptions, setDenomOptions] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);

  type CreateFormData = z.infer<typeof schema>;
  type UpdateFormData = z.infer<typeof updateSchema>;

  useEffect(() => {
    dispatch(fetchProducedItems());
    dispatch(fetchProcesses());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (item && producedItems) {
      const goods = producedItems.find((c) => c.id === item.item.id);
      if (goods) {
        setDenomOptions(goods.unit);
      }
    }
  }, [item, producedItems])

  const getDetailMaterial = () => {
    if (item) {
      const x = item.detailMaterial.map((c) => ({
        id: c.id,
        itemNo: c.item.no,
        quantity: String(c.quantity),
        detailName: c.item.name,
        detailNotes: c.detailNotes && c.detailNotes !== null ? c.detailNotes : '',
        itemUnitName: c.itemUnit.name,
        itemUnitId: c.itemUnitId,
        standardCost: String(c.standardCost),
        totalStandardCost: String(c.totalStandardCost),
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
      itemNo: item ? item.item.no : '',
      quantity: item ? String(item.quantity) : String(0),
      transDate: new Date().toISOString(),
      branchId: item ? String(item.branchId) : undefined,
      branchName: item ? item.branchName : undefined,
      itemUnitName: item ? item.itemUnit.name : '',
      number: item ? item.number : '',
      detailMaterial: getDetailMaterial(),
    }
  })

  const { handleSubmit, formState } = methods;

  const { errors } = formState;

  const showOnSuccessToast = (message: string, success: boolean) => {
    if (!success) {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        className: 'rounded-md',
        style: { width: '300px' }
        });
    } else {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        className: 'rounded-md',
        style: { width: '300px' }
        });
    }
  }

  const onSubmit: SubmitHandler<ICreateProductionFormulaRequest | IUpdateProductionFormulaRequest> = (value) => {
    setProcessing(true);
    let params = CreateProductionFormulaRequest.createFromJson({...value, number: value.number && value.number !== '' ? value.number : undefined, typeAutoNumber: value.number && value.number !== '' ? undefined : 301 });
    if (item) {
      params = UpdateProductionFormulaRequest.createFromJson({
        ...value,
        number: value.number && value.number !== '' ? value.number : undefined,
        typeAutoNumber: value.number && value.number !== '' ? undefined : 301,
        id: item.id,
      })
    }
    ProductionFormulaService()
      .save(params)
        .then((res) => {
          const { d, s } = res;
          showOnSuccessToast(Array.isArray(d) && d[0] ? d[0] : '', s);
          dispatch(fetchList(filter));
          setProcessing(false);
          router.push('/manufacturing/production-formula');
        })
        .catch((e) => {
          setProcessing(false);
          console.log('error', e)
        });
  }

  const handleChangeProducedItem = (value: { label: string, value: string, unit: string[] }) => {
    setDenomOptions(value.unit);
  }

  return (
    <Tabs defaultValue="material">
      <Form {...methods}>
        <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-3">
          <div className="p-1 mt-3 space-y-2">
            <NoLabelInput
              id="transDate"
              type='hidden'
            />
            {
              producedItems && (
                <SearchableSelectInput
                  label="Produk Utama"
                  id="itemNo"
                  options={producedItems.map((c) => ({ label: c.name, value: c.no, unit: c.unit }))}
                  placeholder="Pilih Produk Utama"
                  ifEmptyLabel="Tidak ada produk yang ditemukan"
                  onChange={(value) => handleChangeProducedItem(value as any)}
                  className="w-[350px] truncate overflow-hidden text-ellipsis whitespace-nowrap"
                />
              )
            }
            <div className="flex items-center space-x-2">
              <Input
                id="quantity"
                label="Kuantitas"
                type="number"
                labelClassName="font-medium"
              />
              {
                denomOptions.length > 0 ? (
                  <SelectInput
                    id="itemUnitName"
                    options={denomOptions.map((c) => ({ label: c, value: c }))}
                    placeholder="Pilih Satuan"
                    className={`mt-3 ${errors.itemUnitName ? 'mt-4' : ''}`}
                  />
                ) : (
                  null
                )
              }
            </div>
            <div className="flex space-x-8 items-center">
              {
                !isAutoNumbering ? (
                  <Input
                    id="number"
                    label="No Formula #"
                    labelClassName="font-medium"
                  />
                ) : (
                  <SelectInput
                    defaultValue={'301'}
                    label={"No Formula #"}
                    id="formulaProduction"
                    options={[{ value: '301', label: 'Formula Produksi' }]}
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
          </div>
          <Separator className="mb-2 bg-amber-500" />
          <div className="flex flex-col items-center justify-center">
            <TabsList>
              <TabsTrigger value="process" className="pointer-events-none">Tahapan</TabsTrigger>
              <TabsTrigger value="material">Bahan Baku</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="process">
            <ProductAndStagesForm/>
          </TabsContent>
          <TabsContent value="material">
            <MaterialForm/>
          </TabsContent>
          <div>
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
        </form>
      </Form>
    </Tabs>
  )
}

export default ProductionFormulaForm;