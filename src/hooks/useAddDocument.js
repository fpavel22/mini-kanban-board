import { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";

import { firestore } from '../firebase/firestore';

export const useAddDocument = (collectionName) => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  async function addNewDoc(data) {
    setLoading(true);
    setError(null);

    try {
      await addDoc(collection(firestore, collectionName), data);
    } catch(error) {
      setError(error.message);
    }

    setLoading(false);
  }
  return { loading, error, addNewDoc };
}