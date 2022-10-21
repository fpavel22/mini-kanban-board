import { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';

import { firestore } from '../firebase/firestore';

export const useGetDocuments = (collectionName) => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  async function getCollectionDocs(queryField, queryValue) {
    setLoading(true);
    setError(null);

    const _query = query(collection(firestore, collectionName), where(queryField, '==', queryValue));

    try {
      let results = [];

      const docResults = await getDocs(_query);
      docResults.forEach((doc) => {
        results.push(doc.data());
      });
      
      setLoading(false);
      return results;
    } catch(error) {
      setError(error.message);
    }
    setLoading(false);
  }

  return { loading, error, getCollectionDocs };
}