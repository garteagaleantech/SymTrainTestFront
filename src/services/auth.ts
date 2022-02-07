import { useFetch } from '@context/fetch';
import { useLocalStorage, useToken } from '@utils/hooks';
import { useCallback } from 'react';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import {
  Credentials,
  ErrorResponse,
  AuthLogin,
  User,
  CreateUser
} from '@custom-types/index';

const AUTH_ENDPOINT = '/auth';

const useSignUp = (): UseMutationResult<User, ErrorResponse, CreateUser> => {
  const { publicRequest } = useFetch();

  return useMutation(async (userData: CreateUser) => {
    const { data } = await publicRequest.post<User>(
      `${AUTH_ENDPOINT}/signup`,
      userData
    );

    return data;
  });
};

const useLogin = (): UseMutationResult<
  AuthLogin,
  ErrorResponse,
  Credentials
> => {
  const { publicRequest, setToken } = useFetch();
  const { setToken: saveToken, setExpirationTime } = useToken();

  return useMutation(
    async ({ email, password }: Credentials) => {
      const { data } = await publicRequest.post<AuthLogin>(
        `${AUTH_ENDPOINT}/login`,
        {
          email,
          password
        }
      );

      return data;
    },
    {
      onSuccess: ({ token, expiresIn }: AuthLogin) => {
        saveToken(token);
        setExpirationTime(expiresIn);
        setToken(token);
      }
    }
  );
};

const useLogout = (): {
  logout: () => void;
} => {
  const queryClient = useQueryClient();
  const { setToken } = useFetch();
  const { clear: clearLocalStorage } = useLocalStorage();

  const logout = useCallback(() => {
    clearLocalStorage();
    queryClient.clear();
    setToken(null);
  }, [queryClient, setToken, clearLocalStorage]);

  return {
    logout
  };
};

export { useLogin, useLogout, useSignUp };
