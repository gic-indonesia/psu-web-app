'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { Separator } from "@src/components/ui/separator";
import { IDataModel } from "../../models/production-formula-list.model";
import { MarqueeText } from "@src/shared/components/topography";

const ItemContainer = (props: { item: IDataModel }) => {
  const { item } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const container2Ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} className="marquee-container w-full">
      <MarqueeText
        text={item.item.name}
        containerRef={containerRef as React.RefObject<HTMLDivElement>}
        className="text-lg"
      />
      <div className="flex h-5 items-center space-x-4">
        <div ref={container2Ref} className="marquee-container">
          <MarqueeText
            text={item.number}
            containerRef={container2Ref as React.RefObject<HTMLDivElement>}
          />
        </div>
        <Separator orientation="vertical"/>
        <p>{`${item.quantity} ${item.itemUnit.name}`}</p>
      </div>
    </div>
  )
}

export default ItemContainer;