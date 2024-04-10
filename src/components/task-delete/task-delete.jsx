import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '@components/ui';
import { closeModal } from '@/features/modalSlice';
import { selectedTaskSelector, deleteTask } from '@/features/tasksSlice';
import { THUNK_STATUS } from '@/constants';

export const TaskDelete = () => {
  const [ localStatus, setLocalStatus ] = useState(THUNK_STATUS.IDLE);

  const selectedTask = useSelector(selectedTaskSelector);
  const dispatch = useDispatch();

  const subtaskTitle = `${ selectedTask?.title.substring(0, 24) }...`;

  function cancelAction() {
    dispatch(closeModal());
  }

  async function deleteSelectedTask() {
    try {
      setLocalStatus(THUNK_STATUS.LOADING);
      await dispatch(deleteTask(selectedTask.id));
    } catch (error) {
      setLocalStatus(THUNK_STATUS.FAILED);
    } finally {
      setLocalStatus(THUNK_STATUS.IDLE);
      dispatch(closeModal());
    }
  }

  return (
    <div className="task__delete">
      <h2 className="task__delete-title">Delete this task?</h2>
      <p className="task__delete-body">
        Are you sure you want to delete the
        <span className="task__title">
          { subtaskTitle }
        </span>
        task? This action will remove the task and it cannot be reversed.
      </p>
      <div className="task__delete-btn-group">
        <Button variety="danger" onClick={ deleteSelectedTask }>
          { localStatus === THUNK_STATUS.LOADING ? 'Deleting task...' : 'Delete' }
        </Button>
        <Button variety="secondary" onClick={ cancelAction }>Cancel</Button>
      </div>
    </div>
  );
};
