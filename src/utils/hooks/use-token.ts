import { useCallback } from 'react';
import { useLocalStorage } from './use-local-storage';

const tokenKey = 'token';
const expirationTimeKey = 'expirationTime';

type UseTokenReturn = {
  getToken: () => string | null;
  setToken: (token: string) => void;
  getExpirationTime: () => number;
  setExpirationTime: (time: number) => void;
};

export const useToken = (): UseTokenReturn => {
  const { getItem, setItem } = useLocalStorage();

  const getToken = useCallback(() => getItem<string>(tokenKey), [getItem]);
  const setToken = useCallback(
    (token: string) => setItem(tokenKey, token),
    [setItem]
  );

  const getExpirationTime = useCallback((): number => {
    const expirationTime = getItem(expirationTimeKey);

    return expirationTime ? Number(expirationTime) : 0;
  }, [getItem]);

  const setExpirationTime = useCallback(
    (time: number) => setItem(expirationTimeKey, time),
    [setItem]
  );

  return {
    getToken,
    setToken,
    getExpirationTime,
    setExpirationTime
  };
};
