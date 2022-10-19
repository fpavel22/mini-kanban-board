import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from '../firebase/auth';

export const useSignInWithGoogle = () => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  const provider = new GoogleAuthProvider();

  async function signInWithGoogle() {
    setLoading(true);
    setError(null);

    try {
      await signInWithPopup(auth, provider);
    } catch(error) {
      console.log(error);
    }

    setLoading(false);
  }

  return { loading, error, signInWithGoogle };
}