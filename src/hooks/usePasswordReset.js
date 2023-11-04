import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '@/firebase/auth';
import { isEmailGmail } from '@/utils/utils';
import { determineErrorMessage } from '@/utils/firebase';
import { FIREBASE_INTERNAL_ERRORS } from '@/constants';

export const usePasswordReset = () => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ success, setSuccess ] = useState(null);

  async function passwordReset(email) {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isEmailGmail(email)) {
        throw new Error(FIREBASE_INTERNAL_ERRORS.RECOVER_GOOGLE);
      }

      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err) {
      const errorContent = determineErrorMessage(err);
      setError(errorContent);
    }

    setLoading(false);
  }

  return {
    loading,
    error,
    success,
    passwordReset
  };
};
