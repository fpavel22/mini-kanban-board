import { loadFromLocalStorage } from './loadFromLocalStorage';

export const saveToLocalStorage = ({ userId, ...restPreferences }) => {
  const storageData = loadFromLocalStorage(userId);

  const userPreferences = {
    ...(storageData ?? { darkMode: false, sidebarVisible: false }),
    ...restPreferences,
  };

  const stringified = JSON.stringify(userPreferences);

  localStorage.setItem(userId, stringified);
};
