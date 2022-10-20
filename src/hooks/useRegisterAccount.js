import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

import { auth } from '../firebase/auth';
import { determineErrorMessage } from '../utils/hooks';

export const useRegisterAccount = () => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  async function registerAccount(email, password) {
    setError(null);
    setLoading(true);

    try {
      if (email.includes('@gmail')) {
        throw new Error('Cannot register with a Google account. Login instead.');
      }

      const response = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(response.user);
    } catch(error) {
      const errorContent = determineErrorMessage(error);
      setError(errorContent);
    }

    setLoading(false);
  }

  return { loading, error, registerAccount };
}