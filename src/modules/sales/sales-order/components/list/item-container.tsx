'use client'

import { Separator } from "@src/components/ui/separator";
import { ISalesOrderListModel } from "../../models/sales-order-list.model";

const ItemContainer = (props: { item: ISalesOrderListModel }) => {
  const { item } = props;
  return (
    <div className="min-w-0 flex-1">
      <p className="truncate text-base font-semibold">{item.number}</p>
      <div className="mt-0.5 flex items-center space-x-2 text-xs text-gray-600">
        <span className="shrink-0">{`${item.transDate}`}</span>
        <Separator orientation="vertical" className="h-4"/>
        <span className="truncate">{item.description}</span>
      </div>
    </div>
  )
}

export default ItemContainer;
