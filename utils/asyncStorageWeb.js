import AsyncStorage from '@react-native-async-storage/async-storage';

const isServer = typeof window === 'undefined';

const asyncStorageWeb = {
  getItem: async (key) => {
    if (isServer) return null;
    return localStorage.getItem(key);
  },
  setItem: async (key, value) => {
    if (isServer) return;
    return localStorage.setItem(key, value);
  },
  removeItem: async (key) => {
    if (isServer) return;
    return localStorage.removeItem(key);
  },
  multiGet: async (keys) => {
    if (isServer) return [];
    return keys.map((key) => [key, localStorage.getItem(key)]);
  },
  multiSet: async (keyValuePairs) => {
    if (isServer) return;
    keyValuePairs.forEach(([key, value]) => localStorage.setItem(key, value));
  },
  multiRemove: async (keys) => {
    if (isServer) return;
    keys.forEach((key) => localStorage.removeItem(key));
  },
  getAllKeys: async () => {
    if (isServer) return [];
    return Object.keys(localStorage);
  },
  clear: async () => {
    if (isServer) return;
    localStorage.clear();
  },
};

export default asyncStorageWeb;
