"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { useFormContext } from "react-hook-form"

import { cn } from "@lib/utils"
import { Button } from "@src/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@src/components/ui/command"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@src/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@src/components/ui/popover"

interface IOption {
  value: string;
  label: string;
}

export default function SearchableSelectInput(props: { label: string, options: IOption[] & unknown, id: string, placeholder: string, onChange?: (option: IOption & unknown) => void, ifEmptyLabel?: string, className?: string }) {
  const { options, label, id, placeholder, onChange, ifEmptyLabel, className } = props;
  const { setValue, control } = useFormContext();

  return (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "justify-between",
                    className,
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <span className="truncate">
                    {field.value
                      ? options.find(
                          (option) => option.value === field.value
                        )?.label
                      : placeholder}
                  </span>
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput
                  placeholder={placeholder}
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>{ifEmptyLabel ?? ''}</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        value={option.label}
                        key={option.value}
                        onSelect={() => {
                          if (onChange) {
                            onChange(option)
                          }
                          setValue(id, option.value)
                        }}
                      >
                        {option.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            option.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
