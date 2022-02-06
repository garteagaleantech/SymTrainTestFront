import { classNames } from '@utils/helpers';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const appearances = {
  primary: 'text-white bg-green-300 border-green-300',
  secondary: 'text-white bg-yellow-300 border-yellow-300',
  danger: 'text-white bg-red-300 border-red-300',
  default: 'bg-white border-gray-300',
  link: 'bg-transparent border-none p-0 lg:p-0'
};

type ButtonProps = {
  type?: 'button' | 'submit';
  appearance?: keyof typeof appearances;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

export const Button = ({
  type = 'button',
  appearance = 'primary',
  isLoading,
  disabled,
  children
}: ButtonProps): React.ReactElement => (
  <button
    type={type}
    className={classNames(
      'flex gap-x-2 rounded-full',
      appearances[appearance],
      'py-3 px-12',
      !!disabled && 'cursor-not-allowed bg-opacity-60 text-opacity-60'
    )}
    disabled={isLoading || disabled}
  >
    {isLoading && <AiOutlineLoading3Quarters className={'mt-1 animate-spin'} />}
    {children}
  </button>
);
