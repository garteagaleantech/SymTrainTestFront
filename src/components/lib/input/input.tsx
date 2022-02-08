import { ErrorMessage } from '@hookform/error-message';
import { classNames } from '@utils/helpers';
import {
  RegisterOptions,
  UseFormReturn,
  useFormContext
} from 'react-hook-form';

export type InputProps = {
  placeholder?: string;
  label: string;
  name: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'file';
  'aria-label': string;
  rules?: RegisterOptions | ((formContext: UseFormReturn) => RegisterOptions);
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  readOnly?: boolean;
};

export const Input = ({
  type = 'text',
  name,
  label,
  rules,
  readOnly = false,
  ...props
}: InputProps): React.ReactElement => {
  const context = useFormContext();
  const {
    register,
    formState: { errors }
  } = context;
  const hasError = !!errors[name];

  return (
    <div className="relative w-full text-left">
      <label htmlFor={name} className="font-semibold">
        {label}
      </label>
      <div className="relative flex w-full">
        <input
          readOnly={readOnly}
          id={name}
          type={type}
          className={classNames(
            'w-full rounded-3xl border bg-white px-6 py-3 text-sm placeholder-gray-300 focus:ring-transparent lg:py-0.5 lg:px-5',
            hasError ? 'border-red-500 text-red-500' : 'border-gray-300',
            readOnly && 'cursor-not-allowed bg-gray-200'
          )}
          {...props}
          {...register(
            name,
            typeof rules === 'function' ? rules(context) : rules
          )}
        />
      </div>
      <ErrorMessage
        name={name}
        as={
          <p
            role="alert"
            className="mt-1 whitespace-pre-line text-xs font-semibold text-red-500 text-opacity-70"
          />
        }
      />
    </div>
  );
};
