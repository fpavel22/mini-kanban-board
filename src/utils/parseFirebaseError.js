import { FIREBASE_AUTH_ERRORS } from '@/firebase/constants';

export const parseFirebaseError = (error) => {
  const { code, message } = error;

  switch (code) {
    case FIREBASE_AUTH_ERRORS.INVALID_EMAIL:
      return 'The provided e-mail is invalid, try a different one.';
    case FIREBASE_AUTH_ERRORS.WRONG_PASSWORD:
      return 'The provided username or password do not match.';
    case FIREBASE_AUTH_ERRORS.INTERNAL_ERROR:
      return 'Something went wrong, please try again later.';
    case FIREBASE_AUTH_ERRORS.USER_NOT_FOUND:
      return 'There is not an account associated with the provided email.';
    case FIREBASE_AUTH_ERRORS.REQUEST_LIMIT:
      return 'Request limit has been reached, please try again later.';
    case FIREBASE_AUTH_ERRORS.EMAIL_USED:
      return 'The email is already used, try a different one.';
    case FIREBASE_AUTH_ERRORS.WEAK_PASSWORD:
      return 'Your password must be at least 6 characters long.';
    case FIREBASE_AUTH_ERRORS.NOT_ALLOWED:
      return 'This operation is not allowed at the moment, try again later.';
    case FIREBASE_AUTH_ERRORS.POPUP_CLOSED:
      return 'Login popup closed, you have not been logged in.';
    default:
      return message;
  }
};
