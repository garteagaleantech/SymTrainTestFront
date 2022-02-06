import { config } from '@utils/config';
import { useToken } from '@utils/hooks';

import axios, { AxiosInstance } from 'axios';
import { createContext, useContext, useState } from 'react';

type FetchContextState = {
  publicRequest: AxiosInstance;
  authRequest: AxiosInstance;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

const FetchContext = createContext<FetchContextState | null>(null);

type FetchProviderProps = {
  children?: React.ReactNode;
};

const createPublicRequest = (url: string): AxiosInstance =>
  axios.create({
    baseURL: url
  });

const createAuthRequest = (
  url: string,
  token?: string | null
): AxiosInstance => {
  const authRequest = createPublicRequest(url);

  authRequest.interceptors.request.use(
    (config) => ({
      ...config,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      }
    }),
    async (error) => await Promise.reject(error)
  );

  return authRequest;
};

const FetchProvider = ({
  children
}: FetchProviderProps): React.ReactElement => {
  const [token, setToken] = useState(useToken().getToken());

  const publicRequest = createPublicRequest(config.api.url);
  const authRequest = createAuthRequest(config.api.url, token);

  return (
    <FetchContext.Provider
      value={{
        publicRequest,
        authRequest,
        setToken
      }}
    >
      {children}
    </FetchContext.Provider>
  );
};

const useFetch = (): FetchContextState => {
  const context = useContext(FetchContext);
  if (!context) {
    throw new Error('useFetch must be used within a FetchProvider');
  }

  return context;
};

export { FetchProvider, useFetch };
