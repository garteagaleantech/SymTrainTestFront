import { Toaster as HotToaster } from 'react-hot-toast';

export const Toaster = (): React.ReactElement => (
  <HotToaster
    position="bottom-center"
    reverseOrder
    toastOptions={{
      className: 'text-base max-w-2xl',
      duration: 5000
    }}
  />
);
