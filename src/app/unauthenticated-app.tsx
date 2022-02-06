import { PublicLayout } from '@components/layout';
import { LOGIN_PATH, ROOT_PATH, SIGNUP_PATH, BASE_PATH } from './paths';
import { Home, Login, SignUp } from '@screens/unauthenticated';
import { Routes, Route, Navigate } from 'react-router-dom';

const UnauthenticatedApp = (): React.ReactElement => (
  <PublicLayout>
    <Routes>
      <Route path={ROOT_PATH} element={<Home />} />
      <Route path={LOGIN_PATH} element={<Login />} />
      <Route path={SIGNUP_PATH} element={<SignUp />} />
      <Route path={BASE_PATH} element={<Navigate to={LOGIN_PATH} />} />
      <Route path="*" element={<Navigate to={ROOT_PATH} />} />
    </Routes>
  </PublicLayout>
);

// Default export is necessary for code splitting with Webpack.
// eslint-disable-next-line import/no-default-export
export default UnauthenticatedApp;
