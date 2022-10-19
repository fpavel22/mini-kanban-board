import { useState } from "react";
import { sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '../firebase/auth';
import { FIREBASE_LOGIN_ERRORS } from "../constants";

export const usePasswordReset = () => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ success, setSuccess ] = useState(null);

  async function passwordReset(email) {
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (email.includes('@gmail')) {
      setError('Cannot recover Google accounts password');
      setLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch(error) {
      const { code } = error;

      if (code === FIREBASE_LOGIN_ERRORS.INVALID_EMAIL) {
        setError('The e-mail provided is invalid, try a different one.');
      } else if (code === FIREBASE_LOGIN_ERRORS.USER_NOT_FOUND) {
        setError('The email was not used to create an account yet.');
      } else if (code === FIREBASE_LOGIN_ERRORS.REQUEST_LIMIT) {
        setError('You reached the number of requests you can make, try again later.');
      } else {
        setError(error.message);
      }
    }

    setLoading(false);
  }

  return { loading, error, success, passwordReset };
}