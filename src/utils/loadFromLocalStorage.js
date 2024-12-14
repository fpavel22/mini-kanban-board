export const loadFromLocalStorage = (userId) => {
  if (userId) {
    const preferences = localStorage.getItem(userId);

    return preferences ? JSON.parse(preferences) : preferences;
  }
};
