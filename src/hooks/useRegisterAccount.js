import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { auth } from '../firebase/auth';
import { FIREBASE_SIGNUP_ERRORS } from '../constants';

export const useRegisterAccount = () => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  async function registerAccount(email, password, displayName) {
    setError(null);
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName
      });
    } catch({ code }) {
      if (code === FIREBASE_SIGNUP_ERRORS.EMAIL_USED) {
        setError('The email is already used, try a different one.');
      } else if (code === FIREBASE_SIGNUP_ERRORS.INVALID_EMAIL) {
        setError('The email is invalid, please try a different one.');
      } else if (code === FIREBASE_SIGNUP_ERRORS.WEAK_PASSWORD) {
        setError('The password is too weak, try a stronger password.');
      } else if (code === FIREBASE_SIGNUP_ERRORS.NOT_ALLOWED) {
        setError('This operation is not allowed. Try again later.');
      } else {
        setError(code);
      }
    }

    setLoading(false);
  }

  return { loading, error, registerAccount };
}