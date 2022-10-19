import { FIREBASE_AUTH_ERRORS } from "../../constants";

export const determineErrorMessage = (error) => {
  const { code, message } = error;

  switch (code) {
    case FIREBASE_AUTH_ERRORS.INVALID_EMAIL:
      return "The provided e-mail is invalid, try a different one."
    case FIREBASE_AUTH_ERRORS.WRONG_PASSWORD:
      return "The provided password does not match with the account.";
    case FIREBASE_AUTH_ERRORS.INTERNAL_ERROR:
      return "Something went wrong, please try again later.";
    case FIREBASE_AUTH_ERRORS.USER_NOT_FOUND:
      return "The email was not used to create an account yet.";
    case FIREBASE_AUTH_ERRORS.REQUEST_LIMIT:
      return "Request limit has been reached, please try again later.";
    case FIREBASE_AUTH_ERRORS.EMAIL_USED:
      return "The email is already used, try a different one.";
    case FIREBASE_AUTH_ERRORS.WEAK_PASSWORD:
      return "The password is too weak, use a stronger password.";
    case FIREBASE_AUTH_ERRORS.NOT_ALLOWED:
      return "This operation is not allowed at the moment, try again later.";
    default:
      return message;
  }
}
