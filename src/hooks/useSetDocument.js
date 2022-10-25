import { useState } from 'react';
import { doc, setDoc } from "firebase/firestore";

import { firestore } from '../firebase/firestore';

export const useSetDocument = (collectionName) => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  async function setDocument(docId, data) {
    try {
      const docResult = doc(firestore, collectionName, docId);

      await setDoc(docResult, data);
      return data;
    } catch(error) {
      return error;
    }
  }

  return { loading, error, setDocument };
}