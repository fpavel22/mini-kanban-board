import { useState } from "react";
import { sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '../firebase/auth';
import { determineErrorMessage } from "../utils/hooks";

export const usePasswordReset = () => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ success, setSuccess ] = useState(null);

  async function passwordReset(email) {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (email.includes('@gmail')) {
        throw new Error('Cannot recover Google accounts passwords.');
      }

      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch(error) {
      const errorContent = determineErrorMessage(error);
      setError(errorContent);
    }

    setLoading(false);
  }

  return { loading, error, success, passwordReset };
}