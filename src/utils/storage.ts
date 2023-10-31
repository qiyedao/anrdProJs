export type StorageType = 'session' | 'local';

export const setStorage = (type: StorageType, key: string, value: string) => {
  if (type === 'local') {
    localStorage.setItem(key, value);
  }
  if (type === 'session') {
    sessionStorage.setItem(key, value);
  }
};

export const getStorage = (type: StorageType, key: string) => {
  if (type === 'local') {
    return localStorage.getItem(key);
  }
  if (type === 'session') {
    return sessionStorage.getItem(key);
  }
  return null;
};

export const removeStorage = (type: StorageType, key: string) => {
  if (type === 'local') {
    return localStorage.removeItem(key);
  }
  if (type === 'session') {
    return sessionStorage.removeItem(key);
  }
};

export const clearStorage = (type: StorageType) => {
  if (type === 'local') {
    return localStorage.clear();
  }
  if (type === 'session') {
    return sessionStorage.clear();
  }
};
