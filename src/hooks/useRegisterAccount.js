import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../firebase/auth';
import { determineErrorMessage } from '../utils/hooks';

export const useRegisterAccount = () => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  async function registerAccount(email, password, displayName) {
    setError(null);
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch(error) {
      const errorContent = determineErrorMessage(error);
      setError(errorContent);
    }

    setLoading(false);
  }

  return { loading, error, registerAccount };
}