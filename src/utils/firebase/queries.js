import { collection, query, where } from 'firebase/firestore';

import { FIREBASE_QUERY, FIREBASE_COLLECTIONS } from '@/constants';

export const createTasksQuery = ({ id, userId }) => (firestore) => (
  query(
    collection(firestore, FIREBASE_COLLECTIONS.TASKS),
    where(FIREBASE_QUERY.PAGE_ID, '==', id),
    where(FIREBASE_QUERY.CREATED_BY, '==', userId)
  ));

export const createBoardQuery = ({ id }) => (firestore) => (
  query(
    collection(firestore, FIREBASE_COLLECTIONS.BOARDS),
    where(FIREBASE_QUERY.CREATED_BY, '==', id)
  ));
