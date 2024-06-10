import { getDocs as firebaseGetDocs } from 'firebase/firestore';

import { firestore } from '@/firebase/config';

export const getDoc = async (query) => {
  const docQuery = query(firestore);

  try {
    const results = [];
    const docResults = await firebaseGetDocs(docQuery);

    docResults.forEach((doc) => {
      results.push(doc.data());
    });

    return results;
  } catch (error) {
    return error;
  }
};
