import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";

import { firestore } from '../firebase/firestore';

export const useDeleteDocument = (collectionName) => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  async function deleteDocument(id) {
    setError(null);
    setLoading(false);

    try {
      const docQuery = doc(firestore, collectionName, id);

      await deleteDoc(docQuery);
    } catch(error) {
      setError(error.message);
    }

    setLoading(false);
  }

  return { loading, error, deleteDocument };
}