import { FullPageErrorFallback } from '@components/full-page-error-fallback';
import { Spinner } from '@components/spinner';
import { useProfile } from '@services/profile';

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
  const { isLoading, isError, error, data } = useProfile();

  if (isLoading) {
    return <Spinner fullScreen />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return (
    <Suspense fallback={<Spinner fullScreen />}>
      {(() => {
        const user = data;
        if (user) {
          return <AuthenticatedApp user={user} />;
        }

        return <UnauthenticatedApp />;
      })()}
    </Suspense>
  );
};
