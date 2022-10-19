export const POPUP_DANGER_VALUE = 'danger';

export const SIZE = {
  LG: 'lg'
};

export const REDUCERS = {
  THEME: 'theme',
  SHOW_MODAL: 'show_modal',
  TASKS: 'tasks',
  USER: 'user'
};

export const INITIAL_TASK_FORM = {
  addNewTask: false,
  editTask: false
};

export const FIREBASE_SIGNUP_ERRORS = {
  EMAIL_USED: 'auth/email-already-in-use',
  INVALID_EMAIL: 'auth/invalid-email',
  WEAK_PASSWORD: 'auth/weak-password',
  NOT_ALLOWED: 'auth/operation-not-allowed'
};

export const FIREBASE_LOGIN_ERRORS = {
  INVALID_EMAIL: 'auth/invalid-email',
  WRONG_PASSWORD: 'auth/wrong-password',
  INTERNAL_ERROR: 'auth/internal-error',
  USER_NOT_FOUND: 'auth/user-not-found',
  REQUEST_LIMIT: 'auth/too-many-requests'
};

export const BOARD_CONTENT_LABELS = [
  { status: 'to_do', sectionTitle: 'To do' },
  { status: 'in_progress', sectionTitle: 'In progress' },
  { status: 'done', sectionTitle: 'Done' }
];

export const DROPDOWN_OPTIONS = [
  { value: 'to_do', label: 'To do' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'done', label: 'Done' }
];

export const POPPER_MODIFIERS = [
  {
    name: 'offset',
    options: {
      offset: [ 0, 10 ]
    }
  }
];

export const POPPER_PLACEMENTS = {
  top: 'top',
  topLeft: 'top-start',
  topRight: 'top-end',
  bottom: 'bottom',
  bottomRight: 'bottom-end',
  bottomLeft: 'bottom-start'
};
