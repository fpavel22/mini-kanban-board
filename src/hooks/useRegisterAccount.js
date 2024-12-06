import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

import { auth } from '@/firebase/config';
import { getFirebaseErrorMessage, isEmailGmail } from '@/utils';
import { FIREBASE_INTERNAL_ERRORS } from '@/constants';

export const useRegisterAccount = () => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  async function registerAccount(email, password) {
    setError(null);
    setLoading(true);

    try {
      if (isEmailGmail(email)) {
        throw new Error(FIREBASE_INTERNAL_ERRORS.REGISTER_GOOGLE);
      }

      const response = await createUserWithEmailAndPassword(auth, email, password);

      await sendEmailVerification(response.user);
    } catch (err) {
      const errorContent = getFirebaseErrorMessage(err);

      setError(errorContent);
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, registerAccount };
};
