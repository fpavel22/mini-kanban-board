import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';

import { auth } from '@/firebase/config';
import { FIREBASE_INTERNAL_ERRORS } from '@/firebase/constants';
import { isEmailGmail, parseFirebaseError } from '@/utils';

export const usePasswordReset = () => {
  const [ error, setError ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ success, setSuccess ] = useState(null);

  async function passwordReset({ email }) {
    setError(null);
    setLoading(true);
    setSuccess(null);

    try {
      if (isEmailGmail(email)) {
        throw new Error(FIREBASE_INTERNAL_ERRORS.RECOVER_GOOGLE);
      }

      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err) {
      setError(parseFirebaseError(err));
    } finally {
      setLoading(false);
    }
  }

  return {
    error,
    loading,
    passwordReset,
    success
  };
};
