import { Input, SelectInput } from "@src/shared/components/forms";
import { Modal } from "@src/shared/components/modals";
import stages from "../../consts/stages";
import { CheckboxInput } from "@src/shared/components/forms";
import { Button } from "@src/shared/components/buttons";
import { TextArea } from "@src/shared/components/forms";
import { useFormContext } from "react-hook-form";
import { IDetailProcess } from "../../requests/create-production-formula.request";
import { useEffect } from "react";

const StageModal = (props: { isOpen: boolean, onSubmit: (data: IDetailProcess) => void, onClose: () => void, option: { label: string, value: string } }) => {
  const { isOpen, onClose, option, onSubmit } = props;


  const { getValues, setValue } = useFormContext();

  useEffect(() => {
    if (option) {
      setValue('stageName', option.label);
      setValue('stageSort', '1');
      setValue('subCon', false);
      setValue('instruction', '');
    }
  }, [option])

  const handleSubmit = () => {
    const [ sortNumber, processCategoryName, subCon, instruction ] = getValues(['stageSort', 'stageName', 'subCon', 'instruction']);
    onSubmit({ sortNumber, processCategoryName, subCon, instruction });
  }

  return (
    <Modal
      title="Rincian Tahapan"
      open={isOpen}
      onClose={onClose}
    >
      <div className="flex flex-col space-y-3 p-2 mt-1 w-full">
        <SelectInput
          label="Tahapan"
          id="stageSort"
          defaultValue="1"
          options={stages}
          placeholder="Pilih Tahapan"
        />
        <Input
          readOnly
          id="stageName"
          label="Nama Tahapan"
          value={getValues('stageName')}
          labelClassName="font-medium"
        />
        <CheckboxInput
          id="subCon"
          label="Sub-kon"
        />
        <TextArea
          readOnly={false}
          id='instruction'
          label='Instruksi'
        />
        <div className="text-right">
          <Button
            variant="primary"
            type="button"
            className="justify-center rounded-md"
            size="base"
            onClick={() => handleSubmit()}
          >
            Lanjut
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default StageModal;