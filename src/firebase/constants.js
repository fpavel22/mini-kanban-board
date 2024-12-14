export const FIREBASE_COLLECTIONS = {
  BOARDS: 'boards',
  TASKS: 'tasks'
};

export const FIREBASE_QUERY = {
  CREATED_BY: 'createdBy',
  PAGE_ID: 'pageId'
};

export const FIREBASE_AUTH_ERRORS = {
  INVALID_EMAIL: 'auth/invalid-email',
  WRONG_PASSWORD: 'auth/wrong-password',
  INTERNAL_ERROR: 'auth/internal-error',
  USER_NOT_FOUND: 'auth/user-not-found',
  REQUEST_LIMIT: 'auth/too-many-requests',
  EMAIL_USED: 'auth/email-already-in-use',
  WEAK_PASSWORD: 'auth/weak-password',
  NOT_ALLOWED: 'auth/operation-not-allowed',
  POPUP_CLOSED: 'auth/popup-closed-by-user'
};

export const FIREBASE_INTERNAL_ERRORS = {
  REGISTER_GOOGLE: 'Can\'t register with a Google account. Use the \'login with Google\' method to log in instead.',
  LOGIN_GOOGLE: 'Use the \'login with Google\' method below to log in with a Google account.',
  RECOVER_GOOGLE: 'Can\'t recover the password of a Google account.'
};
