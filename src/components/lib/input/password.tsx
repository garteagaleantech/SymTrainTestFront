import { Input, InputProps } from './input';

type PasswordProps = Omit<InputProps, 'type'>;

export const Password = ({ ...props }: PasswordProps): React.ReactElement => {
  return <Input type="password" {...props} />;
};

export type { PasswordProps };
