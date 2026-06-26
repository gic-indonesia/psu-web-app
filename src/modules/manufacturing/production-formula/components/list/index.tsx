'use client'

import { Fragment, useEffect, useState } from "react";
import { Title } from "@src/shared/components/topography";
import { SearchInput } from "@src/shared/components/forms";
import { Button, IconButton } from "@src/shared/components/buttons";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { Edit } from "lucide-react";
import { Card, CardContent } from "@src/components/ui/card";
import { Separator } from "@src/components/ui/separator";
import ItemContainer from "./item-container";
import ItemDetailModal from "./item-detail-modal";
import { IProductionFormulaListModel } from "../../models/production-formula-list.model";
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
  const [action, setAction] = useState<'detail' | 'edit' | undefined>(undefined);

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

  const handleShowDetail = (item: IProductionFormulaListModel) => {
    setAction('detail');
    dispatch(fetchItemDetail(item.id));
  }

  const handleShowEdit = (item: IProductionFormulaListModel) => {
    setAction('edit');
    router.push(`/manufacturing/production-formula/form?action=edit&id=${item.id}`);
  }

  useEffect(() => {
    dispatch(fetchList(filter));
  }, [dispatch, filter])

  return (
    <Fragment>
       <div className="flex w-full flex-col">
        <Title>Formula Produksi</Title>
        <div className="w-full px-2 py-2">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-full items-start gap-2">
              <div className="flex-1">
                <SearchInput
                  id="search"
                  placeholder="Search..."
                />
              </div>
              <Button
                variant="primary"
                type="submit"
                className="flex shrink-0 justify-center rounded-md px-4 py-2"
                size="base"
              >
                Cari
              </Button>
            </form>
          </FormProvider>
        </div>
        <div className="w-full px-2">
          <Button
            leftIcon={Plus}
            variant="primary"
            className="flex w-full justify-center rounded-md"
            onClick={() => router.push('/manufacturing/production-formula/form')}
          >
            Tambah Data
          </Button>
        </div>
        <div className="mt-3 w-full px-1">
          <div className="mt-2 space-y-2 text-sm">
            {
              data && data.d && data.d.map((item, index) => (
                <Card key={index} className="w-full" onClick={() => handleShowDetail(item)}>
                  <CardContent className="flex items-center space-x-2 px-3 py-2">
                    <ItemContainer
                      item={item}
                    />
                    <Separator orientation="vertical" className="h-10"/>
                    <div className="flex shrink-0 items-center">
                      <IconButton
                        variant="outline"
                        icon={Edit}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShowEdit(item);
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </div>
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
        item && action && action === 'detail' && (
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