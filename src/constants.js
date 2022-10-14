export const SIZE = {
  LG: 'lg'
};

export const REDUCERS = {
  THEME: 'theme',
  SHOW_MODAL: 'show_modal',
  TASKS: 'tasks'
};

export const INITIAL_TASK_FORM = {
  addNewTask: false,
  editTask: false
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

export const POPUP__OPTION__VALUES = {
  edit: 'edit',
  delete: 'delete'
}

export const POPUP_OPTIONS = [
  { value: POPUP__OPTION__VALUES.edit, label: 'Edit Task' },
  { value: POPUP__OPTION__VALUES.delete, label: 'Delete Task' }
];
