import { FormControl, FormField, FormItem, FormLabel } from "@src/components/ui/form";
import { Checkbox } from "@src/components/ui/checkbox";
import { useFormContext } from "react-hook-form";

const CheckboxInput = (props: { label: string, id: string }) => {
  const { label, id } = props;
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={id}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center space-x-1 space-y-0 p-4">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="leading-none">
            <FormLabel className="text-black">
              {label}
            </FormLabel>
          </div>
        </FormItem>
      )}
    />
  )
}

export default CheckboxInput;