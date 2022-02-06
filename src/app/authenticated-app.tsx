import { AuthLayout } from '@components/layout/auth-layout';
import { UserProvider } from '@context/user';
import { User } from '@custom-types/index';
import { Dashboard } from '@screens/authenticated';
import { Navigate, Route, Routes } from 'react-router-dom';
import { BASE_PATH } from './paths';

type AuthenticatedAppProps = {
  user: User;
};

const AuthenticatedApp = ({
  user
}: AuthenticatedAppProps): React.ReactElement => (
  <UserProvider user={user}>
    <AuthLayout>
      <Routes>
        <Route path={BASE_PATH} element={<Dashboard />} />
      </Routes>
    </AuthLayout>
  </UserProvider>
);

// Default export is necessary for code splitting with Webpack.
// eslint-disable-next-line import/no-default-export
export default AuthenticatedApp;
