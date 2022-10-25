import { collection, query, where, getDocs } from 'firebase/firestore';

import { firestore } from '../../firebase/firestore';

export const getCollectionDocs = async (collectionName, queryField, queryValue) => {
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