import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from '../firebase/auth';

export const useLogin = () => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  async function login(email, password) {
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch({ message }) {
      setError(message);
    }

    setLoading(false);
  }

  return { loading, error, login };
};
