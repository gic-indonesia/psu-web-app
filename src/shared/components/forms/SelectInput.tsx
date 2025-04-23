import { cn } from '@lib/utils';
import * as React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { HiExclamationCircle } from 'react-icons/hi';
import './SelectInput.css';

export type SelectInputProps = {
  label: string;
  id: string;
  placeholder?: string;
  helperText?: string;
  type?: string;
  readOnly?: boolean;
  validation?: RegisterOptions;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'select'>;

export default function SelectInput({
  label,
  helperText,
  id,
  placeholder,
  readOnly = false,
  children,
  validation,
  ...rest
}: SelectInputProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const value = watch(id);

  // Add disabled and selected attribute to option, will be used if readonly
  const readOnlyChildren = React.Children.map<React.ReactNode, React.ReactNode>(
    children,
    (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(
          child as React.ReactElement<SelectInputProps>,
          {
            disabled: child.props.value !== rest?.defaultValue,
          }
        );
      }
    }
  );

  return (
    <div>
      <label htmlFor={id} className='block text-sm font-normal text-gray-700'>
        {label}
      </label>
      <div className='relative mt-1'>
        <select
          {...register(id, validation)}
          // defaultValue to value blank, will get overriden by ...rest if needed
          defaultValue=''
          {...rest}
          name={id}
          id={id}
          className={cn(
            readOnly
              ? 'cursor-not-allowed text-gray-400 bg-gray-100 focus:ring-2 focus:ring-inset focus:ring-gray-300'
              : errors[id]
              ? 'text-gray-900 bg-white ring-inset ring-red-600 placeholder:text-red-600 focus:ring-2 focus:ring-inset focus:border-red-500 focus:ring-red-600'
              : 'text-gray-900 ring-inset bg-white ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600',
            'shadow-sm ring-1 ring-inset block w-full focus:outline-none rounded-md p-2 sm:text-sm sm:leading-6',
            { 'text-gray-900': value === '' }
          )}
          aria-describedby={id}
        >
          {placeholder && (
            <option value='' disabled hidden>
              {placeholder}
            </option>
          )}
          {readOnly ? readOnlyChildren : children}
        </select>

        {errors[id] && (
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
            <HiExclamationCircle className='text-xl text-red-500' />
          </div>
        )}
      </div>
      <div className='mt-1'>
        {helperText && <p className='text-xs text-gray-500'>{helperText}</p>}
        {errors[id] && (
          <span className='text-sm text-red-500'>
            {errors[id]?.message as unknown as string}
          </span>
        )}
      </div>
    </div>
  );
}
