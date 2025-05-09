'use client'

import ProductionFormulaForm from "@src/modules/manufacturing/production-formula/components/form"
import { useAppDispatch, useAppSelector } from "@src/hooks/redux"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { fetchItemDetail, handleItemDetail } from "@src/modules/manufacturing/production-formula/stores/production-formula.store"

export default function ProductionFormulaFormPage() {
  const dispatch = useAppDispatch();
  const { item } = useAppSelector((state) => state.productionFormulaStore);
  const searchParams = useSearchParams();
  const action = searchParams.get('action');
  const id = searchParams.get('id');
  const [loading, setLoading] = useState<boolean>(!!(action && id));

  useEffect(() => {
    if (action && id) {
      dispatch(fetchItemDetail(Number(id)))
        .finally(() => setLoading(false))
    }
  }, [id, action, dispatch])

  useEffect(() => {
    return () => {
      dispatch(handleItemDetail(undefined));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-500" />
      </div>
    )
  }
  return (
    <div className="bg-white">
      <ProductionFormulaForm item={action && item ? item : undefined}/>
    </div>
  )
}