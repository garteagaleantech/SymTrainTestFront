import { User } from '@custom-types/index';
import { createContext, useContext } from 'react';

type UserContextState = {
  user: User;
};

const UserContext = createContext<UserContextState | null>(null);

type UserProviderProps = {
  user: User;
  children: React.ReactNode;
};

const UserProvider = ({
  user,
  children
}: UserProviderProps): React.ReactElement => (
  <UserContext.Provider
    value={{
      user
    }}
  >
    {children}
  </UserContext.Provider>
);

const useUser = (): UserContextState => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

export { UserProvider, useUser };
