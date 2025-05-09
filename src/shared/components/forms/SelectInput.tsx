"use client"

import { useFormContext } from "react-hook-form"
import { cn } from "@src/lib/utils"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@src/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@src/components/ui/select"

interface IOption {
  value: string;
  label: string;
}

export default function SelectForm(props: { label?: string, placeholder: string, id: string, options: IOption[], defaultValue?: string, className?: string }) {
  const { label, placeholder, id, options, defaultValue, className } = props;
  const form = useFormContext()

  return (
    <FormField
      {...{ defaultValue }}
      control={form.control}
      name={id}
      render={({ field }) => (
        <FormItem
          className={cn('w-full', className)}
        >
          <FormLabel className="text-black">{label ?? ''}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger
                className="bg-white w-full"
              >
                <SelectValue placeholder={placeholder}/>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {
                options.map((option, key) => (
                  <SelectItem key={key} value={option.value}>{option.label}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>
          <FormMessage
            className="text-[10pt]"
          />
        </FormItem>
      )}
    />
  )
}
