import { useState } from 'react';
import { doc, setDoc } from "firebase/firestore";

import { firestore } from '../firebase/firestore';

export const useSetDocument = (collectionName) => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  async function setDocument(docId, data) {
    setLoading(true);
    setError(null);

    try {
      const docResult = doc(firestore, collectionName, docId);

      await setDoc(docResult, data);
    } catch(error) {
      setError(error.message);
    }

    setLoading(false);
  }

  return { loading, error, setDocument };
}