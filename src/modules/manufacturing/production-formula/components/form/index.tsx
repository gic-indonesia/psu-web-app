'use client'

import { Fragment, useState } from "react";
import ProductAndStagesForm from "./product-and-stages-form";
import { Form } from "@src/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateProductionFormulaRequest } from "../../requests/create-production-formula.request";
import MaterialForm from "./material-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = CreateProductionFormulaRequest.schema();

const ProductionFormulaForm = () => {
  const [step, setStep] = useState(0);

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  const { handleSubmit } = methods;

  const onSubmit = (value) => {
    console.log('value', value);
  }
  return (
    <Fragment>
      <div className="flex flex-col">
        <div className="mt-3">
          <ol className="flex items-center justify-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-xs dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
            <li
              className={`flex items-center ${step === 0 ? 'text-amber-600 dark:text-amber-500' : ''}`}
              onClick={() => setStep(0)}
            >
              <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border ${step === 0 ? 'border-amber-600 dark:border-amber-500' : ''} rounded-full shrink-0`}>
                  1
              </span>
              Produk Dan Tahapan <span className="hidden sm:inline-flex sm:ms-2">Info</span>
              <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
              </svg>
            </li>
            <li
              className={`flex items-center ${step === 1 ? 'text-amber-600 dark:text-amber-500' : ''}`}
              onClick={() => setStep(1)}
            >
              <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border ${step === 1 ? 'border-amber-600 dark:border-amber-500' : 'border-gray-500 dark:border-gray-400'} rounded-full shrink-0`}>
                  2
              </span>
              Bahan Baku <span className="hidden sm:inline-flex sm:ms-2">Info</span>
              {/* <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
              </svg> */}
            </li>
            {/* <li className={`flex items-center ${step === 2 ? 'text-amber-600 dark:text-amber-500' : ''}`}>
              <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border ${step === 2 ? 'border-amber-600 dark:border-amber-500' : 'border-gray-500 dark:border-gray-400'} rounded-full shrink-0`}>
                  3
              </span>
              Bahan Baku
            </li> */}
          </ol>
        </div>
      </div>
      <Form {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className={`${step !== 0 ? 'hidden' : ''}`}>
            <ProductAndStagesForm
              onNextStep={() => setStep(1)}
            />
          </div>
          <div className={`${step !== 1 ? 'hidden' : ''}`}>
            <MaterialForm/>
          </div>
        </form>
      </Form>
    </Fragment>
  )
}

export default ProductionFormulaForm;