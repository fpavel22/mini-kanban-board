import { deleteDoc as firebaseDeleteDoc } from 'firebase/firestore';

export const deleteDoc = async (documentRef) => {
  try {
    await firebaseDeleteDoc(documentRef);

    return documentRef.id;
  } catch (error) {
    return error;
  }
};
