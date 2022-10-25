import { doc, deleteDoc } from "firebase/firestore";

import { firestore } from '../firebase/firestore';

export const useDeleteDocument = (collectionName) => {
  async function deleteDocument(id) {
    try {
      const docQuery = doc(firestore, collectionName, id);

      await deleteDoc(docQuery);
      return id;
    } catch(error) {
      return error;
    }
  }

  return { deleteDocument };
}