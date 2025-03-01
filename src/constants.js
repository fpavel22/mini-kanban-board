export const SIZE = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
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

export const PATHS = {
  ROOT: '/',
  BOARDS: '/boards',
  LOGIN: '/login',
  REGISTER: '/register',
  RESET: '/password-reset'
};

export const MODAL_CONTENT = {
  BOARD_FORM: 'board-form',
  TASK_VIEW: 'task-view',
  TASK_FORM_ADD: 'task-form-add',
  TASK_FORM_EDIT: 'task-form-edit',
  TASK_DELETE: 'task-delete',
};

export const TASK_PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'High' }
];

export const POPPER_DEFAULT_MODIFIERS = [
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
