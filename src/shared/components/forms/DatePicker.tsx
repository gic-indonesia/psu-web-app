import { Button } from "@src/components/ui/button"
import { Calendar } from "@src/components/ui/calendar"
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
import { CalendarIcon } from "lucide-react"
import { cn } from "@src/lib/utils"
import { format } from "date-fns"
import { useFormContext } from "react-hook-form"
import { Matcher } from "react-day-picker"


const defaultRule = (date: Date) => date > new Date() || date < new Date("1900-01-01");

export default function DatePicker(props: { label: string, id: string, className?: string, rule?: Matcher | Matcher[]  }) {
  const { label, id, className, rule = defaultRule } = props;
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={id}
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground",
                    className,
                  )}
                >
                  {field.value ? (
                    format(field.value, "dd/MM/yyyy")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={rule}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}