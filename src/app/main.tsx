import { FullPageErrorFallback } from '@components/full-page-error-fallback';
import { Spinner } from '@components/spinner';
import { userProfile } from '@services/profile';

import { Suspense, lazy } from 'react';

const AuthenticatedApp = lazy(
  async () =>
    await import(
      /* webpackChunkName: "authenticated-app" */ './authenticated-app'
    )
);

const UnauthenticatedApp = lazy(
  async () =>
    await import(
      /* webpackChunkName: "unauthenticated-app" */ './unauthenticated-app'
    )
);

export const Main = (): React.ReactElement => {
  const userQuery = userProfile();

  if (userQuery.isLoading) {
    return <Spinner fullScreen />;
  }

  if (userQuery.isError) {
    return <FullPageErrorFallback error={userQuery.error} />;
  }

  return (
    <Suspense fallback={<Spinner fullScreen />}>
      {(() => {
        const user = userQuery.data;
        if (user) {
          return <AuthenticatedApp user={user} />;
        }

        return <UnauthenticatedApp />;
      })()}
    </Suspense>
  );
};
