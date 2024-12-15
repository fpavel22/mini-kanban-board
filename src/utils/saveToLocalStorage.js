import { loadFromLocalStorage } from './loadFromLocalStorage';

export const saveToLocalStorage = ({ userId, ...restPreferences }) => {
  const preferences = loadFromLocalStorage(userId);

  const userPreferences = {
    darkMode: false,
    sidebarVisible: true,
    ...(preferences ?? {}),
    ...restPreferences,
  };

  const stringified = JSON.stringify(userPreferences);

  localStorage.setItem(userId, stringified);
};
