import { AuthLayout } from '@components/layout/auth-layout';
import { UserProvider } from '@context/user';
import { User } from '@custom-types/index';
import { Dashboard, Recipe, RecipeDetails } from '@screens/authenticated';
import { Navigate, Route, Routes } from 'react-router-dom';
import { BASE_PATH, RECIPE_DETAILS_PATH, RECIPE_PATH } from './paths';

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
        <Route path={RECIPE_PATH} element={<Recipe />} />
        <Route
          path={`${RECIPE_DETAILS_PATH}/:id`}
          element={<RecipeDetails />}
        />
        <Route path={`${RECIPE_PATH}/:id`} element={<Recipe />} />
        <Route path="*" element={<Navigate to={BASE_PATH} />} />
      </Routes>
    </AuthLayout>
  </UserProvider>
);

// Default export is necessary for code splitting with Webpack.
// eslint-disable-next-line import/no-default-export
export default AuthenticatedApp;
