import { loadFromLocalStorage } from './loadFromLocalStorage';

const defaultSettings = {
  darkMode: false,
  sidebarVisible: true,
};

export const saveToLocalStorage = ({ userId, ...restSettings }) => {
  const settings = loadFromLocalStorage(userId);

  const updatedSettings = {
    ...defaultSettings,
    ...(settings ?? {}),
    ...restSettings,
  };

  localStorage.setItem(userId, JSON.stringify(updatedSettings));
};
