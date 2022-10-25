import { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';

import { firestore } from '../firebase/firestore';

export const useGetDocuments = (collectionName) => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  async function getCollectionDocs(queryField, queryValue) {
    const _query = query(collection(firestore, collectionName), where(queryField, '==', queryValue));

    try {
      let results = [];

      const docResults = await getDocs(_query);
      docResults.forEach((doc) => {
        results.push(doc.data());
      });

      return results;
    } catch(error) {
      return error;
    }
  }

  return { loading, error, getCollectionDocs };
}