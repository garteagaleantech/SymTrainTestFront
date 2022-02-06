import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

type ToastOptions = {
  promise: Promise<unknown>;
  loading: string;
  success: string | (() => string);
  error?: string | ((error: AxiosError<{ message: string }>) => string);
};

const classNames = (...classes: Array<string | boolean>): string =>
  classes.filter(Boolean).join(' ');

const showToast: ({
  promise,
  loading,
  success,
  error
}: ToastOptions) => void = ({
  promise,
  loading,
  success,
  error = (error: AxiosError<{ message: string }>) => {
    if (error.response) {
      return error.response?.data.message;
    }

    return 'There was a problem, try again!';
  }
}) => {
  toast.remove();
  void toast.promise(
    promise,
    {
      loading,
      success,
      error
    },
    {
      duration: 3000
    }
  );
};

export { classNames, showToast };
