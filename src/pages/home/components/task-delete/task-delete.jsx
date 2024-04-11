import { useState } from 'react';

import { Button } from '@components/ui';
import { THUNK_STATUS } from '@/constants';

export const TaskDelete = ({
  taskTitle,
  onDeleteTask = async () => {},
  closeModal = () => {}
}) => {
  const [ localStatus, setLocalStatus ] = useState(THUNK_STATUS.IDLE);

  async function deleteSelectedTask() {
    try {
      setLocalStatus(THUNK_STATUS.LOADING);

      await onDeleteTask();

      setLocalStatus(THUNK_STATUS.IDLE);
      closeModal();
    } catch (error) {
      setLocalStatus(THUNK_STATUS.FAILED);
    }
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
        <Button variety="danger" onClick={ deleteSelectedTask }>
          { localStatus === THUNK_STATUS.LOADING ? 'Deleting task...' : 'Delete' }
        </Button>
        <Button variety="secondary" onClick={ closeModal }>Cancel</Button>
      </div>
    </div>
  );
};
