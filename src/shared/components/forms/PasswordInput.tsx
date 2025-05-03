import { cn } from '@lib/utils';
import { useState } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi';

export type PasswordInputProps = {
  /** Input label */
  label: string;
  /**
   * id to be initialized with React Hook Form,
   * must be the same with the pre-defined types.
   */
  id: string;
  /** Input placeholder */
  placeholder?: string;
  /** Small text below input, useful for additional information */
  helperText?: string;
  /**
   * Input type
   * @example text, email, password
   */
  type?: React.HTMLInputTypeAttribute;
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  /** Disable error style (not disabling error validation) */
  hideError?: boolean;
  /** Manual validation using RHF, it is encouraged to use yup resolver instead */
  validation?: RegisterOptions;
  labelClassName?: string;
} & React.ComponentPropsWithoutRef<'input'>;

export default function PasswordInput({
  label,
  placeholder = '',
  helperText,
  id,
  readOnly = false,
  validation,
  labelClassName,
  ...rest
}: PasswordInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div>
      <label htmlFor={id} className={`block text-sm text-black ${labelClassName}`}>
        {label}
      </label>
      <div className='relative mt-1'>
        <input
          {...register(id, validation)}
          {...rest}
          type={showPassword ? 'text' : 'password'}
          name={id}
          id={id}
          readOnly={readOnly}
          className={cn(
            readOnly ?
              'cursor-not-allowed text-gray-400 bg-gray-100 focus:ring-2 focus:ring-inset focus:ring-gray-300' : 
                errors[id] ? 
                  'text-gray-900 ring-inset ring-red-600 placeholder:text-red-600 focus:ring-2 focus:ring-inset focus:border-red-500 focus:ring-red-600' : 
                    'text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600',
            'shadow-sm ring-1 ring-inset block w-full focus:outline-none rounded-md px-1.5 py-1.5 sm:text-sm sm:leading-6'
          )}
          placeholder={placeholder}
          aria-describedby={id}
        />

        <button
          onClick={togglePassword}
          type='button'
          className='absolute inset-y-0 right-0 mr-3 flex items-center rounded-lg p-1'
        >
          {showPassword ? (
            <HiEyeOff className='cursor-pointer text-xl text-gray-500 hover:text-gray-600 focus:outline-none' />
          ) : (
            <HiEye className='cursor-pointer text-xl text-gray-500 hover:text-gray-600 focus:outline-none' />
          )}
        </button>
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
