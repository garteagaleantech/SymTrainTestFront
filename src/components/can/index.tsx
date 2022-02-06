import { Fragment } from 'react';
import { userProfile } from '@services/profile';

type CanProps = {
  I: boolean;
  not?: boolean;
  children: React.ReactNode;
};

export const Can = ({
  I,
  not,
  children
}: CanProps): React.ReactElement | null => {
  const userQuery = userProfile();

  if (not) {
    return userQuery.data ? null : <Fragment>{children}</Fragment>;
  }

  if (I && userQuery.data) {
    return <Fragment>{children}</Fragment>;
  }

  return null;
};
