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

export default function SelectForm(props: { label?: string, placeholder: string, id: string, options: IOption[], defaultValue?: string, className?: string, disabled?: boolean, onChange?: (value: string) => void }) {
  const { label, placeholder, id, options, defaultValue, className, disabled = false, onChange } = props;
  const form = useFormContext()

  return (
    <FormField
      {...{ defaultValue }}
      control={form.control}
      name={id}
      render={({ field }) => (
        <FormItem
          className={cn('w-full max-w-full overflow-hidden', className)}
        >
          <FormLabel className="text-black max-w-full">{label ?? ''}</FormLabel>
          <Select
            disabled={disabled}
            onValueChange={(value) => {
              field.onChange(value)
              if (onChange) {
                onChange(value);
              }
            }}
            defaultValue={field.value}>
            <FormControl className="max-w-full">
              <SelectTrigger
                className="bg-white w-full max-w-full text-black"
              >
                <SelectValue placeholder={placeholder}/>
              </SelectTrigger>
            </FormControl>
            <SelectContent className="w-full max-w-full">
              {
                options.map((option, key) => (
                  <SelectItem key={key} value={option.value}>{option.label}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>
          <FormMessage
            className="text-[10pt] max-w-full"
          />
        </FormItem>
      )}
    />
  )
}
