const setItem = <Item>(key: string, value: Item): void =>
  window.sessionStorage.setItem(
    key,
    typeof value === 'string' ? value : JSON.stringify(value)
  );

const getItem = <Item>(key: string): Item | string | null => {
  const item = window.sessionStorage.getItem(key) ?? null;

  if (item) {
    try {
      return JSON.parse(item) as Item;
    } catch {}
  }

  return item;
};

const removeItem = (key: string): void => window.sessionStorage.removeItem(key);

const clear = (): void => window.sessionStorage.clear();

type UseSessionStorageReturn = {
  setItem: typeof setItem;
  removeItem: typeof removeItem;
  getItem: typeof getItem;
  clear: typeof clear;
};

export const useSessionStorage = (): UseSessionStorageReturn => ({
  setItem,
  getItem,
  removeItem,
  clear
});
