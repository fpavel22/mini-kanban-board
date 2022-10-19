import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from 'firebase/auth';

import { login, logout } from '../features/userSlice';
import { auth } from '../firebase/auth';

export const useAuthStateChange = () => {
  const [ authIsReady, setAuthIsReady ] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (userData) => {
      if (userData) {
        const { displayName, email, uid } = userData;
        dispatch(login({ displayName, email, uid }));
      } else {
        dispatch(logout());
      }

      setAuthIsReady(true);
    });

    return unsub;
  }, []);

  return { authIsReady };
}