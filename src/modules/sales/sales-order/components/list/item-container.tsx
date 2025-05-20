'use client'

import { useRef } from "react";
import { Separator } from "@src/components/ui/separator";
import { ISalesOrderListModel } from "../../models/sales-order-list.model";
import { MarqueeText } from "@src/shared/components/topography";

const ItemContainer = (props: { item: ISalesOrderListModel }) => {
  const { item } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const container2Ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} className="marquee-container w-full">
      <MarqueeText
        text={item.number}
        containerRef={containerRef as React.RefObject<HTMLDivElement>}
        className="text-lg"
      />
      <div className="flex h-5 items-center space-x-4">
        <p>{`${item.transDate}`}</p>
        <Separator orientation="vertical"/>
        <div ref={container2Ref} className="marquee-container">
          <MarqueeText
            text={item.description}
            containerRef={container2Ref as React.RefObject<HTMLDivElement>}
          />
        </div>
      </div>
    </div>
  )
}

export default ItemContainer;