'use client'

import { Fragment, useEffect } from "react";
import { Title } from "@src/shared/components/topography";
import { SearchInput } from "@src/shared/components/forms";
import { Button, IconButton } from "@src/shared/components/buttons";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@src/components/ui/tooltip';
import { Edit } from "lucide-react";
import { Card, CardContent } from "@src/components/ui/card";
import { ScrollArea } from "@src/components/ui/scroll-area";
import { Separator } from "@src/components/ui/separator";
import ItemContainer from "./item-container";
import ItemDetailModal from "./item-detail-modal";
import { IDataModel } from "../../models/production-formula-list.model";
import { fetchItemDetail, fetchList, handleFilter, handleItemDetail } from "../../stores/production-formula.store";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import { FilterProductionFormulaListRequest } from "../../requests/filter-production-formula-list.request";
import MobilePagination from "@src/shared/components/MobilePagination";
import { useRouter } from "next/navigation";

interface ISearch {
  search: string;
}

const ProductionFormulaList = () => {
  const dispatch = useAppDispatch();
  const { data, filter, item } = useAppSelector((state) => state.productionFormulaStore);
  const router = useRouter();

  const methods = useForm<ISearch>({
    mode: 'onSubmit',
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<ISearch> = (data) => {
    if (data.search === '') {
      dispatch(fetchList(FilterProductionFormulaListRequest.createFromJson({})));
    } else {
      const params = FilterProductionFormulaListRequest.createFromJson({ ...filter, filter: { keywords: { op: 'CONTAIN', val: data.search } } });
      dispatch(handleFilter(params));
    }
  }

  const handleShowDetail = (item: IDataModel) => {
    dispatch(fetchItemDetail(item.id));
  }

  useEffect(() => {
    dispatch(fetchList(filter));
  }, [dispatch, filter])

  useEffect(() => {
    console.log('data', data);
  }, [data])

  return (
    <Fragment>
       <div className="flex flex-col">
        <Title>Formula Produksi</Title>
        <div className="flex items-center px-2 py-2">
          <div>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-3">
                <SearchInput
                  id="search"
                  placeholder="Search..."
                />
                <Button
                  variant="primary"
                  type="submit"
                  className="flex justify-center w-[87px] rounded-md mb-1"
                  size="base"
                >
                  Cari
                </Button>
              </form>
            </FormProvider>
          </div>
        </div>
        <div className="px-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  leftIcon={Plus}
                  variant="primary"
                  className="rounded-md"
                  onClick={() => router.push('/manufacturing/production-formula/form')}
                >
                  Tambah Data
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tambah Data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <ScrollArea className="px-2 h-[500px] w-[395px] mt-3">
          <div className="mt-2 text-[9pt] space-y-1">
            {
              data && data.d && data.d.map((item, index) => (
                <Card key={index} className="w-[375px]" onClick={() => handleShowDetail(item)}>
                  <CardContent className="flex space-x-2 h-14">
                    <ItemContainer
                      item={item}
                    />
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
        </ScrollArea>
        {
          data && (
            <MobilePagination
              currentPage={data.sp.page}
              totalPages={data.sp.pageCount}
              itemsPerPage={data.sp.pageSize}
              totalItems={data.sp.rowCount}
              onChangePage={(page) => {
                dispatch(fetchList(FilterProductionFormulaListRequest.createFromJson({
                  ...filter,
                  sp: { ...filter.sp, page, }
                })))
              }}
            />
          )
        }
      </div>
      {
        item && (
          <ItemDetailModal
            data={item}
            isOpen={!!item}
            onCancel={() => dispatch(handleItemDetail(undefined))}
          />
        )
      }
    </Fragment>
  );
}

export default ProductionFormulaList;