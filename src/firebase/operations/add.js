import { addDoc as firebaseAddDoc } from 'firebase/firestore';

import { updateDoc } from './update';

export const addDoc = async (collectionRef, data) => {
  try {
    const createdDocRef = await firebaseAddDoc(collectionRef, data);

    const docData = await updateDoc(createdDocRef, {
      id: createdDocRef.id,
      path: createdDocRef.id
    });

    return docData;
  } catch (error) {
    return error;
  }
};
