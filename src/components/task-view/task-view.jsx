import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Dropdown } from '../dropdown';
import { Popup } from '../popup';
import { SubtaskItem } from '../subtask-item';
import { toggleTaskForm, toggleTaskDelete } from '../../features/modalSlice';
import { tasksSliceSelectors, setTask } from '../../features/tasksSlice';
import { useSetDocument, usePositionPopup } from '../../hooks';
import { POPPER_MODIFIERS, FIREBASE_COLLECTIONS, THUNK_STATUS } from '../../constants';

import iconEllipsis from '../../assets/icon-vertical-ellipsis.svg';

export const TaskView = () => {
  const [ updateSubtasksState, setUpdateSubtasksState ] = useState(THUNK_STATUS.IDLE);
  const [ popupVisible, setPopupVisible ] = useState(false);

  const { selectedTaskSelector } = tasksSliceSelectors;

  const selectedTask = useSelector(selectedTaskSelector);
  const dispatch = useDispatch();

  const { loading, setDocument } = useSetDocument(FIREBASE_COLLECTIONS.TASKS);
  const { popperStyles, setParentRef, setReferenceRef } = usePositionPopup(POPPER_MODIFIERS);

  const { subtasks } = selectedTask;
  const subtasksCount = subtasks.length;
  const subtasksCompleted = subtasks.filter(({ completed }) => completed).length;

  const popupOptions = [
    { value: 'edit', label: 'Edit task', onClick: showEditDialog },
    { value: 'danger', label: 'Delete task', onClick: showDeleteDialog }
  ];

  function showEditDialog() {
    dispatch(toggleTaskForm({ addNewTask: false, editTask: true }));
  }

  function showDeleteDialog() {
    dispatch(toggleTaskDelete(true));
  }

  async function handleSubtaskStatus({ target: { checked } }, subtaskId) {
    const updatedSubtasks = selectedTask.subtasks.map((subtask) => subtask.id === subtaskId
      ? { ...subtask, completed: checked }
      : subtask
    );

    try {
      setUpdateSubtasksState(THUNK_STATUS.LOADING);

      const thunkArgs = {
        setDocument,
        taskDetails: {
          ...selectedTask,
          subtasks: updatedSubtasks
        }
      }
  
      await dispatch(setTask(thunkArgs));
    } catch(error) {
      setUpdateSubtasksState(THUNK_STATUS.FAILED)
    } finally {
      setUpdateSubtasksState(THUNK_STATUS.IDLE);
    }
  }

  const renderSubtasksList = (
    <div className="subtasks__list">
      { subtasks.map(({ id, value, completed }) => (
        <SubtaskItem key={ id }
            subtaskId={ id }
            completed={ completed }
            loading={ updateSubtasksState === THUNK_STATUS.LOADING }
            onChange={ (event) => handleSubtaskStatus(event, id) }>
          { value }
        </SubtaskItem>
      )) }
    </div>
  );

  return (
    <div className="form task__view">
      <div className="task__view-header">
        <h2 className="form__title">
          { selectedTask.title }
        </h2>
        <img src={ iconEllipsis }
            className="task__view-options"
            alt="Task view options icon"
            ref={ setParentRef }
            onClick={ () => setPopupVisible(!popupVisible) } />
      </div>
      <p className="task__view-description">
        { selectedTask.description }
      </p>
      <div className="task__view-subtasks">
        <h5 className="task__view-label">
          Subtasks ({ subtasksCompleted } out of { subtasksCount })
        </h5>
        <div className="subtasks__list">
          { renderSubtasksList }
        </div>
      </div>
      <div className="task__view-status">
        <h5 className="task__view-label">Current status</h5>
        <Dropdown value={ selectedTask.status } disabled={ true } />
      </div>
      { popupVisible &&
        <Popup options={ popupOptions } style={ popperStyles } ref={ setReferenceRef } /> }
    </div>
  );
};
