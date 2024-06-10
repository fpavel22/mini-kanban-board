import { doc } from 'firebase/firestore';

import { FIREBASE_COLLECTIONS } from '@/constants';

export const taskDocRef = (documentId) => (firestore) => (
  doc(firestore, FIREBASE_COLLECTIONS.TASKS, documentId)
);

export const boardDocRef = (documentId) => (firestore) => (
  doc(firestore, FIREBASE_COLLECTIONS.BOARDS, documentId)
);
