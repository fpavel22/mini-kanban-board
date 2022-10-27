import { doc, setDoc } from "firebase/firestore";

import { firestore } from "../../firebase/firestore";

export const setDocument = async (collectionName, docId, data) => {
  try {
    const docResult = doc(firestore, collectionName, docId);

    await setDoc(docResult, data);
    return data;
  } catch(error) {
    return error;
  }
}