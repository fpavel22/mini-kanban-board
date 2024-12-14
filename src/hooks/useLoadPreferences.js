import { useEffect } from 'react';

import { loadFromLocalStorage } from '@/utils';

export const useLoadPreferences = (userId, callback, deps) => {
  useEffect(() => {
    const preferences = loadFromLocalStorage(userId);

    if (preferences) {
      callback(preferences);
    }
  }, deps);
};
