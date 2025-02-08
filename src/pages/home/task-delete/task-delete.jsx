import { useSelector } from 'react-redux';

import { Button } from '@/components';
import { THUNK_STATUS } from '@/constants';
import { selectedTaskSelector } from '@/features/tasksSlice';
import { useTaskOperations } from '@/hooks';

import './task-delete.scss';

export const TaskDelete = ({ closeModal }) => {
  const selectedTask = useSelector(selectedTaskSelector);
  const { status: localStatus, deleteTask } = useTaskOperations();

  const isLoading = localStatus === THUNK_STATUS.LOADING;

  const taskTitle = selectedTask?.title.length > 24
    ? `${selectedTask?.title.substring(0, 24)}...`
    : selectedTask?.title;

  function onDeleteClick() {
    deleteTask(selectedTask.id).then(() => {
      closeModal?.();
    });
  }

  return (
    <div className="task__delete">
      <h2 className="task__delete-title">Delete this task?</h2>
      <p className="task__delete-body">
        Are you sure you want to delete the "
        <span className="task__title">
          { taskTitle }
        </span>
        " task? This action will remove the task and it cannot be reversed.
      </p>
      <div className="task__delete-btn-group">
        <Button disabled={ isLoading } onClick={ onDeleteClick } variety="danger">
          { isLoading ? 'Deleting task...' : 'Delete' }
        </Button>
        <Button disabled={ isLoading } onClick={ closeModal } variety="secondary">Cancel</Button>
      </div>
    </div>
  );
};
