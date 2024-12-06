import { setDoc } from 'firebase/firestore';

import { getSingleDoc } from './get';

export const updateDoc = async (documentRef, data) => {
  try {
    await setDoc(documentRef, data, { merge: true });

    const docData = await getSingleDoc(documentRef);

    return docData;
  } catch (error) {
    return error;
  }
};
