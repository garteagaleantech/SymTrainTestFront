import {
  FormProvider,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
  useForm
} from 'react-hook-form';

type FormProps<TFormValues> = {
  className?: string;
  onSubmit?: SubmitHandler<TFormValues>;
  children: React.ReactNode;
  useFormOptions?: UseFormProps<TFormValues>;
  formMethods?: undefined;
  'aria-label'?: string;
};

type FormWithFormMethodsProps<TFormValues> = Omit<
  FormProps<TFormValues>,
  'useFormOptions' | 'formMethods'
> & {
  useFormOptions?: undefined;
  formMethods: UseFormReturn<TFormValues>;
};

export const Form = <TFormValues extends Record<string, unknown>>({
  onSubmit,
  children,
  className,
  formMethods,
  useFormOptions,
  'aria-label': ariaLabel
}:
  | FormProps<TFormValues>
  | FormWithFormMethodsProps<TFormValues>): React.ReactElement => {
  const defaultMethods = useForm<TFormValues>(useFormOptions);

  const methods = formMethods ?? defaultMethods;

  return (
    <FormProvider {...methods}>
      <form
        aria-label={ariaLabel}
        className={className}
        onSubmit={onSubmit ? methods.handleSubmit(onSubmit) : undefined}
      >
        {children}
      </form>
    </FormProvider>
  );
};
