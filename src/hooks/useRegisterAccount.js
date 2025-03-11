import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useState } from 'react';

import { auth } from '@/firebase/config';
import { FIREBASE_INTERNAL_ERRORS } from '@/firebase/constants';
import { isEmailGmail, parseFirebaseError } from '@/utils';

export const useRegisterAccount = () => {
  const [ error, setError ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  async function registerAccount({ email, password }) {
    setError(null);
    setLoading(true);

    try {
      if (isEmailGmail(email)) {
        throw new Error(FIREBASE_INTERNAL_ERRORS.REGISTER_GOOGLE);
      }

      const response = await createUserWithEmailAndPassword(auth, email, password);

      await sendEmailVerification(response.user);
    } catch (err) {
      setError(parseFirebaseError(err));
    } finally {
      setLoading(false);
    }
  }

  return { error, loading, registerAccount };
};
