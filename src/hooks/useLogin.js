import { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { auth } from '@/firebase/auth';
import { isEmailGmail } from '@/utils/utils';
import { determineErrorMessage } from '@/utils/firebase';
import { FIREBASE_INTERNAL_ERRORS } from '@/constants';

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
      const errorContent = determineErrorMessage(err);

      setError(errorContent);
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
      const errorContent = determineErrorMessage(err);
      setError(errorContent);
    }

    setLoading(false);
  }

  return {
    loading,
    error,
    loginWithEmailAndPassword,
    loginWithGoogle
  };
};
