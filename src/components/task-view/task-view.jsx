import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Dropdown } from '../dropdown';
import { Popup } from '../popup';
import { SubtaskItem } from '../subtask-item';
import { setTask, selectedTaskSelector } from '../../features/tasksSlice';
import { usePositionPopup } from '../../hooks';
import { POPPER_MODIFIERS, THUNK_STATUS } from '../../constants';

import iconEllipsis from '../../assets/icon-vertical-ellipsis.svg';

export const TaskView = () => {
  const [ popupVisible, setPopupVisible ] = useState(false);
  const [ localState, setLocalState ] = useState(THUNK_STATUS.IDLE);

  const selectedTask = useSelector(selectedTaskSelector);
  const dispatch = useDispatch();

  const { popperStyles, setParentRef, setReferenceRef } = usePositionPopup(POPPER_MODIFIERS);

  const subtasksCompleted = selectedTask.subtasks.filter(({ completed }) => completed).length;
  const subtasksTotal = selectedTask.subtasks.length;

  const popupOptions = [
    { value: 'edit', label: 'Edit task', onClick: showEditDialog },
    { value: 'danger', label: 'Delete task', onClick: showDeleteDialog }
  ];

  const renderSubtasksList = (
    <>
      { selectedTask.subtasks.map(({ id, value, completed }) => (
        <SubtaskItem key={ id }
            subtaskId={ id }
            completed={ completed }
            loading={ localState === THUNK_STATUS.LOADING }
            onChange={ (event) => handleSubtaskStatus(event, id) }>
          { value }
        </SubtaskItem>
      )) }
    </>
  );

  function togglePopupVisibility() {
    setPopupVisible((prevState) => !prevState);
  }

  function showEditDialog() {
    console.log('toggle edit modal');
  }

  function showDeleteDialog() {
    console.log('toggle delete modal');
  }

  async function handleSubtaskStatus(event, id) {
    const { checked } = event.target;

    try {
      const updatedSubtasks = selectedTask.subtasks.map((subtask) =>
        subtask.id === id
          ? { ...subtask, completed: checked }
          : subtask
      );

      const taskData = {
        ...selectedTask,
        subtasks: updatedSubtasks
      }
      setLocalState(THUNK_STATUS.LOADING);

      await dispatch(setTask(taskData));
    } catch(error) {
      setLocalState(THUNK_STATUS.FAILED);
    } finally {
      setLocalState(THUNK_STATUS.IDLE);
    }
  }
  
  return (
    <div className="form task__view">
      <div className="task__view-header">
        <h2 className="form__title">
          { selectedTask.title }
        </h2>
        <img src={ iconEllipsis  }
            className="task__view-options"
            alt="Task view options icon"
            ref={ setParentRef }
            onClick={ togglePopupVisibility } />
      </div>
      <p className="task__view-description">
        { selectedTask.description }
      </p>
      <div className="task__view-subtasks">
        <h5 className="task__view-label">
          Subtasks ({ subtasksCompleted } out of { subtasksTotal })
        </h5>
        <div className="subtasks__list">
          { renderSubtasksList }
        </div>
      </div>
      <div className="task__view-status">
        <h5 className="task__view-label">Current status</h5>
        <Dropdown value={ selectedTask.status } disabled={ true } />
      </div>
      { popupVisible && <Popup options={ popupOptions } style={ popperStyles } ref={ setReferenceRef } /> }
    </div>
  );
}