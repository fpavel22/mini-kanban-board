import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';

import { auth } from '@/firebase/config';
import { FIREBASE_INTERNAL_ERRORS } from '@/firebase/constants';
import { isEmailGmail, parseFirebaseError } from '@/utils';

export const useLogin = () => {
  const [ error, setError ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  async function loginWithEmailAndPassword({ email, password }) {
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
    error,
    loading,
    loginWithEmailAndPassword,
    loginWithGoogle
  };
};
