import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useSidebarToggleContext } from '@/context';
import { enableDarkTheme, enableLightTheme } from '@/features/themeSlice';
import { login, logout } from '@/features/userSlice';
import { auth } from '@/firebase/config';
import { loadFromLocalStorage } from '@/utils';

export const useAuthStateChange = () => {
  const [ authIsReady, setAuthIsReady ] = useState(false);
  const dispatch = useDispatch();

  const setSidebarVisible = useSidebarToggleContext();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (userData) => {
      if (userData) {
        const {
          displayName,
          email,
          uid,
          emailVerified
        } = userData;

        const settings = loadFromLocalStorage(uid);

        if (settings) {
          dispatch(settings.darkMode ? enableDarkTheme() : enableLightTheme());
          setSidebarVisible(settings.sidebarVisible);
        }

        dispatch(login({
          displayName,
          email,
          uid,
          emailVerified
        }));
      } else {
        dispatch(logout());
      }

      setAuthIsReady(true);
    });

    return unsub;
  }, [ dispatch, setSidebarVisible ]);

  return { authIsReady };
};
