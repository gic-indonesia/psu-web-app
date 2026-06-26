'use client'

import { Separator } from "@src/components/ui/separator";
import { IProductionFormulaListModel } from "../../models/production-formula-list.model";

const ItemContainer = (props: { item: IProductionFormulaListModel }) => {
  const { item } = props;
  return (
    <div className="min-w-0 flex-1">
      <p className="truncate text-base font-semibold">{item.item.name}</p>
      <div className="mt-0.5 flex items-center space-x-2 text-xs text-gray-600">
        <span className="truncate">{item.number}</span>
        <Separator orientation="vertical" className="h-4"/>
        <span className="shrink-0">{`${item.quantity} ${item.itemUnit.name}`}</span>
      </div>
    </div>
  )
}

export default ItemContainer;
