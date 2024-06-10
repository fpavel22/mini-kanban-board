import { setDoc as firebaseSetDoc } from 'firebase/firestore';

import { firestore } from '@/firebase/config';

export const putDoc = async (docRef, data) => {
  try {
    const docResult = docRef(firestore);

    await firebaseSetDoc(docResult, data);

    return data;
  } catch (error) {
    return error;
  }
};
