import { ReactNode } from "react";
import { cn } from "@lib/utils";

export default function Label(props: { children: ReactNode, className?: string }) {
  const { children, className } = props;

  return (
    <div className={cn('flex flex-col p-2 m-1')}>
      <label
        className={cn('font-medium', className)}
        htmlFor='label-general'
      >
        {children}
      </label>
    </div>
  )
}