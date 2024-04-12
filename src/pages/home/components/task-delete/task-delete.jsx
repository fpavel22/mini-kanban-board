import { useSelector } from 'react-redux';
import { selectedTaskSelector } from '@/features/tasksSlice';

import { Button } from '@components/ui';
import { useTaskOperations } from '@/hooks';
import { THUNK_STATUS } from '@/constants';

export const TaskDelete = ({ closeModal = () => {} }) => {
  const selectedTask = useSelector(selectedTaskSelector);
  const { status: localStatus, deleteTask } = useTaskOperations();

  const isLoading = localStatus === THUNK_STATUS.LOADING;

  const taskTitle = selectedTask?.title.length > 24
    ? `${selectedTask?.title.substring(0, 24)}...`
    : selectedTask?.title;

  function onDeleteClick() {
    deleteTask(selectedTask.id).then(() => {
      closeModal();
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
        <Button variety="danger" onClick={ onDeleteClick } disabled={ isLoading }>
          { isLoading ? 'Deleting task...' : 'Delete' }
        </Button>
        <Button variety="secondary" onClick={ closeModal } disabled={ isLoading }>Cancel</Button>
      </div>
    </div>
  );
};
