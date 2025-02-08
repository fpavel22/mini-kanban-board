import { useCallback, useMemo, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { useSelector } from 'react-redux';

import {
  CheckboxItem,
  Dropdown,
  EllipsisIcon,
  Popup
} from '@/components';
import { POPPER_DEFAULT_MODIFIERS, TASK_PRIORITY_OPTIONS, THUNK_STATUS } from '@/constants';
import { selectedTaskSelector } from '@/features/tasksSlice';
import {
  useHandleClickOutside,
  useModalState,
  usePositionPopup,
  useTaskOperations
} from '@/hooks';

import './task-view.scss';

export const TaskView = ({ darkMode }) => {
  const [ popupVisible, setPopupVisible ] = useState(false);
  const selectedTask = useSelector(selectedTaskSelector);

  const { status: localState, updateTask } = useTaskOperations();
  const { showDeleteDialog, showEditDialog } = useModalState();

  const {
    popperStyles,
    setParentRef,
    setReferenceRef
  } = usePositionPopup(POPPER_DEFAULT_MODIFIERS);

  const hidePopup = useCallback(() => {
    setPopupVisible(false);
  }, []);

  const { parentRef, popupRef } = useHandleClickOutside(popupVisible, hidePopup);

  const subtasksCompleted = selectedTask.subtasks.filter(({ completed }) => completed).length;
  const subtasksTotal = selectedTask.subtasks.length;
  const subtasksTitle = `Subtasks (${ subtasksCompleted } out of ${ subtasksTotal })`;

  const popupItems = useMemo(() => [
    { value: 'edit', label: 'Edit task', onPopupItemClick: showEditDialog },
    { value: 'danger', label: 'Delete task', onPopupItemClick: showDeleteDialog }
  ], [ showEditDialog, showDeleteDialog ]);

  const togglePopup = useCallback(() => {
    setPopupVisible((prevState) => !prevState);
  }, []);

  const ellipsisRefs = useMemo(() => mergeRefs([ parentRef, setParentRef ]), []);

  const updateSubtaskStatus = (subtaskId) => (event) => {
    const { checked } = event.target;

    const updatedSubtasks = selectedTask.subtasks.map((subtask) => (
      subtask.id === subtaskId ? { ...subtask, completed: checked } : subtask
    ));

    const taskData = {
      ...selectedTask,
      subtasks: updatedSubtasks
    };

    updateTask(taskData);
  };

  const subTasksList = selectedTask.subtasks.map(({ completed, id, value }) => (
    <CheckboxItem
      completed={ completed }
      darkMode={ darkMode }
      key={ id }
      loading={ localState === THUNK_STATUS.LOADING }
      onChange={ updateSubtaskStatus(id) }
      title={ value }
    >
      { value }
    </CheckboxItem>
  ));

  return (
    <div className="form task__view">
      <div className="task__view-header">
        <div className="task__view-title">
          <h2 className="form__title">
            { selectedTask.title }
          </h2>
        </div>
        <EllipsisIcon
          alt="Task view options icon"
          className="task__view-options"
          onClick={ togglePopup }
          ref={ ellipsisRefs }
        />
      </div>
      <p className="task__view-description">
        { selectedTask.description }
      </p>
      <div className="task__view-subtasks">
        <h5 className="task__view-label">
          { subtasksTitle }
        </h5>
        <div className="subtasks__list">
          { subTasksList }
        </div>
      </div>
      <div className="task__view-status">
        <h5 className="task__view-label">Current status</h5>
        <Dropdown
          darkMode={ darkMode }
          disabled={ true }
          options={ TASK_PRIORITY_OPTIONS }
          value={ selectedTask.priority }
        />
      </div>
      { popupVisible && (
        <Popup
          darkMode={ darkMode }
          items={ popupItems }
          ref={ mergeRefs([ popupRef, setReferenceRef ]) }
          style={ popperStyles }
        />
      ) }
    </div>
  );
};
