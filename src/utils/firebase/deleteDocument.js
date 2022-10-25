import { doc, deleteDoc } from "firebase/firestore";

import { firestore } from "../../firebase/firestore";

export const deleteDocument = async (collectionName, id) => {
  try {
    const docQuery = doc(firestore, collectionName, id);

    await deleteDoc(docQuery);
    return id;
  } catch(error) {
    return error;
  }
}
