export const TEXTAREA_PLACEHOLDER = 'e.g. It\'s always good to take a break. This 15 minutes break will recharge the batteries.';

export const SIZE = {
  LG: 'lg'
};

export const POPUP_STATES = {
  DANGER: 'danger',
  IMPORTANT: 'important'
};

export const KEYCODES = {
  ENTER: 13,
  ESCAPE: 27
};

export const REDUCERS = {
  THEME: 'theme',
  SHOW_MODAL: 'show_modal',
  BOARDS: 'boards',
  TASKS: 'tasks',
  USER: 'user'
};

export const THUNK_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed'
};

export const MODAL_CONTENT = {
  BOARD_FORM: 'board-form',
  TASK_VIEW: 'task-view',
  TASK_FORM_ADD: 'task-form-add',
  TASK_FORM_EDIT: 'task-form-edit',
  TASK_DELETE: 'task-delete',
};

export const BOARD_CONTENT_LABELS = [
  { status: 'to_do', sectionTitle: 'To do' },
  { status: 'in_progress', sectionTitle: 'In progress' },
  { status: 'in_review', sectionTitle: 'In review' },
  { status: 'done', sectionTitle: 'Done' }
];

export const DROPDOWN_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'High' }
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
