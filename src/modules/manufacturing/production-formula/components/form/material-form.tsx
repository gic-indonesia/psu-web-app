import { Button } from "@src/shared/components/buttons";
import { SearchableSelectInput } from "@src/shared/components/forms";
import bahanBakuMock from "../../consts/bahanBakuMock";

const MaterialForm = () => {
  return (
    <div className="p-2 mt-1 w-full space-y-3">
      <SearchableSelectInput
        label="Bahan Baku"
        id="materialSelect"
        options={bahanBakuMock}
        placeholder="Pilih Bahan Baku"
      />
      <Button
        variant="primary"
        type="submit"
        className="flex w-full justify-center rounded-md"
        size="base"
      >
        Submit
      </Button>
    </div>
  )
}

export default MaterialForm;