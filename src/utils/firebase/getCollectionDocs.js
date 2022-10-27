import { collection, query, where, getDocs } from 'firebase/firestore';

import { firestore } from '../../firebase/firestore';
import { FIREBASE_COLLECTIONS, FIREBASE_QUERY } from '../../constants';

export const getCollectionDocs = async (collectionName, id, userId) => {
  let _query;

  if (collectionName === FIREBASE_COLLECTIONS.TASKS) {
    _query = query(
      collection(firestore, collectionName),
      where(FIREBASE_QUERY.PAGE_ID, '==', id),
      where(FIREBASE_QUERY.CREATED_BY, '==', userId)
    )
  } else {
    _query = query(
      collection(firestore, collectionName),
      where(FIREBASE_QUERY.CREATED_BY, '==', id)
    );
  }

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