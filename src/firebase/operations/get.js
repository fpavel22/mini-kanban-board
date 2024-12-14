import { getDoc, getDocs } from 'firebase/firestore';

export const getSingleDoc = async (documentRef) => {
  const docSnapshot = await getDoc(documentRef);

  if (!docSnapshot.exists()) {
    throw new Error(`Document with id ${documentRef.id} was not found.`);
  }

  return docSnapshot.data();
};

export const getAllDocs = async (query) => {
  const querySnapshot = await getDocs(query);

  const parsedDocs = querySnapshot.docs.map((doc) => doc.data());

  return parsedDocs;
};
