import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import {
  CheckboxItem,
  Dropdown,
  EllipsisIcon,
  Popup
} from '@/components';
import { TASK_PRIORITY_OPTIONS, THUNK_STATUS } from '@/constants';
import { selectedTaskSelector } from '@/features/tasksSlice';
import { useModalState, useTaskOperations } from '@/hooks';

import './task-view.scss';

export const TaskView = ({ darkMode }) => {
  const selectedTask = useSelector(selectedTaskSelector);

  const { status: localState, updateTask } = useTaskOperations();
  const { showDeleteDialog, showEditDialog } = useModalState();

  const subtasksCompleted = selectedTask.subtasks.filter(({ completed }) => completed).length;
  const subtasksTotal = selectedTask.subtasks.length;
  const subtasksTitle = `Subtasks (${ subtasksCompleted } out of ${ subtasksTotal })`;

  const popupItems = useMemo(() => [
    { value: 'edit', label: 'Edit task', onPopupItemClick: showEditDialog },
    { value: 'danger', label: 'Delete task', onPopupItemClick: showDeleteDialog }
  ], [ showEditDialog, showDeleteDialog ]);

  const trigger = (props) => (
    <EllipsisIcon
      { ...props }
      alt="Task view options icon"
      className="task__view-options"
    />
  );

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
        <Popup
          darkMode={ darkMode }
          items={ popupItems }
          trigger={ trigger }
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
    </div>
  );
};
