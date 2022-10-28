import {
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';

import { firestore } from '../../firebase/firestore';
import { FIREBASE_COLLECTIONS, FIREBASE_QUERY } from '../../constants';

export const getCollectionDocs = async (collectionName, id, userId) => {
  let docQuery;

  if (collectionName === FIREBASE_COLLECTIONS.TASKS) {
    docQuery = query(
      collection(firestore, collectionName),
      where(FIREBASE_QUERY.PAGE_ID, '==', id),
      where(FIREBASE_QUERY.CREATED_BY, '==', userId)
    );
  } else {
    docQuery = query(
      collection(firestore, collectionName),
      where(FIREBASE_QUERY.CREATED_BY, '==', id)
    );
  }

  try {
    const results = [];

    const docResults = await getDocs(docQuery);
    docResults.forEach((doc) => {
      results.push(doc.data());
    });

    return results;
  } catch (error) {
    return error;
  }
};
