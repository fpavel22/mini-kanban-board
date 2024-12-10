import { getDoc, getDocs } from 'firebase/firestore';

export const getSingleDoc = async (documentRef) => {
  try {
    const docSnapshot = await getDoc(documentRef);

    if (!docSnapshot.exists()) {
      throw new Error(`Document with id ${documentRef.id} was not found.`);
    }

    return docSnapshot.data();
  } catch (error) {
    return error;
  }
};

export const getAllDocs = async (query) => {
  try {
    const querySnapshot = await getDocs(query);

    const parsedDocs = querySnapshot.docs.map((doc) => doc.data());

    return parsedDocs;
  } catch (error) {
    return error;
  }
};
