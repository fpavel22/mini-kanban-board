import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Dropdown } from '../dropdown';
import { Popup } from '../popup';
import { SubtaskItem } from '../subtask-item';
import { tasksSelector, updateTask } from '../../features/tasksSlice';
import { toggleTaskForm, toggleTaskDelete } from '../../features/showModalSlice';
import { useSetDocument, usePositionPopup } from '../../hooks';
import { POPPER_MODIFIERS, FIREBASE_COLLECTIONS } from '../../constants';

import iconEllipsis from '../../assets/icon-vertical-ellipsis.svg';

export const TaskView = () => {
  const [ popupVisible, setPopupVisible ] = useState(false);

  const { selectedTask } = useSelector(tasksSelector);
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

    const task = {
      ...selectedTask,
      subtasks: updatedSubtasks
    };

    await setDocument(selectedTask.id, task);
    dispatch(updateTask(task));
  }

  const renderSubtasksList = (
    <div className="subtasks__list">
      { subtasks.map(({ id, value, completed }) => (
        <SubtaskItem key={ id }
            subtaskId={ id }
            completed={ completed }
            loading={ loading }
            onChange={ (event) => handleSubtaskStatus(event, id) }>
          { loading ? 'Loading...' : value }
        </SubtaskItem>
      )) }
    </div>
  );

  return (
    <div className="task__view">
      <div className="task__view-header">
        <h2 className="task__view-title">
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
