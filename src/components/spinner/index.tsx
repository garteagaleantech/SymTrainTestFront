import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { classNames } from '@utils/helpers';

type SpinnerProps = {
  fullScreen?: boolean;
};

export const Spinner = ({ fullScreen }: SpinnerProps): React.ReactElement => (
  <div
    className={classNames(
      'flex items-center justify-center',
      fullScreen
        ? 'pointer-events-none absolute inset-0 h-screen w-screen'
        : 'h-full w-full'
    )}
  >
    <AiOutlineLoading3Quarters className="h-20 w-20 animate-spin text-green-500" />
  </div>
);
