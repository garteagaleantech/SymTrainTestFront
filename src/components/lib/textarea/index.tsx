import { ErrorMessage } from '@hookform/error-message';
import { classNames } from '@utils/helpers';
import {
  RegisterOptions,
  UseFormReturn,
  useFormContext
} from 'react-hook-form';

export type TextareaProps = {
  name: string;
  label: string;
  'aria-label': string;
  placeholder?: string;
  rules?: RegisterOptions | ((formContext: UseFormReturn) => RegisterOptions);
  rows?: number;
};

export const Textarea = ({
  name,
  label,
  rules,
  ...props
}: TextareaProps): React.ReactElement => {
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
      <textarea
        id={name}
        {...props}
        className={classNames(
          'w-full resize-none rounded-3xl border bg-white px-6 py-3 text-sm placeholder-gray-300 focus:ring-transparent lg:py-0.5 lg:px-5',
          hasError ? 'border-red-500 text-red-500' : 'border-gray-300'
        )}
        {...props}
        {...register(
          name,
          typeof rules === 'function' ? rules(context) : rules
        )}
      ></textarea>
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
