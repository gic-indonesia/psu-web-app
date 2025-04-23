import { ReactNode } from "react";
import { cn } from "@lib/utils";

export default function Title(props: { children: ReactNode, className?: string }) {
  const { children, className } = props
  return (
    <div className={cn('flex flex-col p-2 m-1', className)}>
      <h1 className="font-bold text-2xl">
        {children}
      </h1>
    </div>
  )
}