import { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { auth } from '@/firebase/config';
import { FIREBASE_INTERNAL_ERRORS } from '@/firebase/constants';
import { parseFirebaseError, isEmailGmail } from '@/utils';

export const useLogin = () => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  async function loginWithEmailAndPassword(email, password) {
    setError(null);
    setLoading(true);

    try {
      if (isEmailGmail(email)) {
        throw new Error(FIREBASE_INTERNAL_ERRORS.LOGIN_GOOGLE);
      }

      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(parseFirebaseError(err));
    } finally {
      setLoading(false);
    }
  }

  async function loginWithGoogle() {
    setError(null);
    setLoading(true);

    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(parseFirebaseError(err));
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    loginWithEmailAndPassword,
    loginWithGoogle
  };
};
