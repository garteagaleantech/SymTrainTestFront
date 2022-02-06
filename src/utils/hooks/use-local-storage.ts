const setItem = <Item>(key: string, value: Item): void =>
  window.localStorage.setItem(
    key,
    typeof value === 'string' ? value : JSON.stringify(value)
  );

const getItem = <Item>(key: string): Item | string | null => {
  const item = window.localStorage.getItem(key) ?? null;

  if (item) {
    try {
      return JSON.parse(item) as Item;
    } catch {}
  }

  return item;
};

const removeItem = (key: string): void => window.localStorage.removeItem(key);

const clear = (): void => window.localStorage.clear();

type UseLocalStorageReturn = {
  setItem: typeof setItem;
  removeItem: typeof removeItem;
  getItem: typeof getItem;
  clear: typeof clear;
};

export const useLocalStorage = (): UseLocalStorageReturn => ({
  setItem,
  getItem,
  removeItem,
  clear
});
