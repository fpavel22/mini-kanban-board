import { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from '../firebase/auth';
import { determineErrorMessage } from "../utils/hooks";

export const useLogin = () => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  async function loginWithEmailAndPassword(email, password) {
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch(error) {
      const errorContent = determineErrorMessage(error);
      setError(errorContent);
    }

    setLoading(false);
  }

  async function loginWithGoogle() {
    setError(null);
    setLoading(true);

    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
    } catch(error) {
      setError(error.message);
    }

    setLoading(false);
  }

  return { loading, error, loginWithEmailAndPassword, loginWithGoogle };
};
