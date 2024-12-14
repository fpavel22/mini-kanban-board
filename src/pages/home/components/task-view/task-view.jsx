import { useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { mergeRefs } from 'react-merge-refs';

import {
  Dropdown,
  EllipsisIcon,
  Popup,
  SubtaskItem
} from '@components/ui';
import { selectedTaskSelector } from '@/features/tasksSlice';
import {
  useHandleClickOutside,
  usePositionPopup,
  useTaskOperations,
  useModalState
} from '@/hooks';
import { POPPER_MODIFIERS, THUNK_STATUS } from '@/constants';

export const TaskView = ({ darkMode }) => {
  const [ popupVisible, setPopupVisible ] = useState(false);
  const selectedTask = useSelector(selectedTaskSelector);

  const { status: localState, updateTask } = useTaskOperations();
  const { showEditDialog, showDeleteDialog } = useModalState();

  const { popperStyles, setParentRef, setReferenceRef } = usePositionPopup(POPPER_MODIFIERS);

  const hidePopup = () => {
    setPopupVisible(false);
  };

  const { parentRef, popupRef } = useHandleClickOutside(popupVisible, hidePopup);

  const subtasksCompleted = selectedTask.subtasks.filter(({ completed }) => completed).length;
  const subtasksTotal = selectedTask.subtasks.length;
  const subtasksTitle = `Subtasks (${ subtasksCompleted } out of ${ subtasksTotal })`;

  const popupOptions = [
    { value: 'edit', label: 'Edit task', onClick: showEditDialog },
    { value: 'danger', label: 'Delete task', onClick: showDeleteDialog }
  ];

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

  const renderSubtasksList = selectedTask.subtasks.map(({ id, value, completed }) => (
    <SubtaskItem
      key={ id }
      completed={ completed }
      loading={ localState === THUNK_STATUS.LOADING }
      darkMode={ darkMode }
      title={ value }
      onChange={ updateSubtaskStatus(id) }
    >
      { value }
    </SubtaskItem>
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
          className="task__view-options"
          alt="Task view options icon"
          ref={ ellipsisRefs }
          onClick={ togglePopup }
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
          { renderSubtasksList }
        </div>
      </div>
      <div className="task__view-status">
        <h5 className="task__view-label">Current status</h5>
        <Dropdown darkMode={ darkMode } value={ selectedTask.priority } disabled={ true } />
      </div>
      { popupVisible && (
        <Popup
          options={ popupOptions }
          style={ popperStyles }
          ref={ mergeRefs([ popupRef, setReferenceRef ]) }
        />
      ) }
    </div>
  );
};
