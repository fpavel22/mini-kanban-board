import { doc, deleteDoc as firebaseDeleteDoc } from 'firebase/firestore';

import { firestore } from '@/firebase/config';

export const deleteDoc = async (collectionName, id) => {
  try {
    const docQuery = doc(firestore, collectionName, id);

    await firebaseDeleteDoc(docQuery);

    return id;
  } catch (error) {
    return error;
  }
};
