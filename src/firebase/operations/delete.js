import { deleteDoc as firebaseDeleteDoc } from 'firebase/firestore';

export const deleteDoc = async (documentRef) => {
  await firebaseDeleteDoc(documentRef);

  return documentRef.id;
};
