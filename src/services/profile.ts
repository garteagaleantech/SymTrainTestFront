import { useQuery, UseQueryResult } from 'react-query';
import { useFetch } from '@context/fetch';
import { User, ErrorResponse } from '@custom-types/index';
import { useToken } from '@utils/hooks';
import { useLogout } from './auth';

const profileKeys = {
  all: ['profile']
};

const useProfile = (): UseQueryResult<User, ErrorResponse> => {
  const { authRequest } = useFetch();
  const token = useToken().getToken();
  const { logout } = useLogout();

  return useQuery(
    profileKeys.all,
    async () => {
      const { data } = await authRequest.get<User>('/profile/me');

      return data;
    },
    {
      retry: false,
      enabled: !!token,
      onError: (error: ErrorResponse) => {
        if (error.response?.data.status === 401) {
          logout();
        }
      }
    }
  );
};

export { useProfile };
