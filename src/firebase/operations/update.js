import { updateDoc as firebaseUpdateDoc } from 'firebase/firestore';

import { getSingleDoc } from './get';

export const updateDoc = async (documentRef, data) => {
  try {
    await firebaseUpdateDoc(documentRef, data);

    const docData = await getSingleDoc(documentRef);

    return docData;
  } catch (error) {
    return error;
  }
};
