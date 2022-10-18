import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from 'firebase/auth';

import { changeUserAuth } from '../features/userSlice';
import { auth } from '../firebase/auth';

export const useAuthStateChange = () => {
  const [ authIsReady, setAuthIsReady ] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (userData) => {
      const user = userData ? {
        accessToken: userData.accessToken,
        displayName: userData.displayName,
        email: userData.email,
        uid: userData.uid
      } : null;

      dispatch(changeUserAuth(user));
      setAuthIsReady(true);
    });

    return () => {
      unsub();
    }
  }, []);

  return { authIsReady };
}