import { useSelector, useDispatch } from 'react-redux';

import { Button } from '../button';
import { toggleTaskDelete } from '../../features/modalSlice';
import { tasksSliceSelectors, deleteTask } from '../../features/tasksSlice';
import { useDeleteDocument } from '../../hooks';
import { FIREBASE_COLLECTIONS, THUNK_STATUS } from '../../constants';
import { useState } from 'react';

export const TaskDelete = () => {
  const [ deleteTaskStatus, setDeleteTaskStatus ] = useState(THUNK_STATUS.IDLE);

  const { selectedTaskSelector } = tasksSliceSelectors;

  const selectedTask = useSelector(selectedTaskSelector);
  const dispatch = useDispatch();
  
  const { deleteDocument } = useDeleteDocument(FIREBASE_COLLECTIONS.TASKS);

  async function deleteSelectedTask() {
    try {
      setDeleteTaskStatus(THUNK_STATUS.LOADING);

      const thunkArgs = {
        deleteDocument,
        id: selectedTask.id
      }

      await dispatch(deleteTask(thunkArgs));
    } catch(error) {
      setDeleteTaskStatus(THUNK_STATUS.FAILED)
    } finally {
      setDeleteTaskStatus(THUNK_STATUS.IDLE);
      dispatch(toggleTaskDelete(false));
    }    
  }
  
  function cancelAction() {
    dispatch(toggleTaskDelete(false));
  }

  return (
    <div className="task__delete">
      <h2 className="task__delete-title">Delete this task?</h2>
      <p className="task__delete-body">
        Are you sure you want to delete the
        <span className="task__title">
          '{ selectedTask?.title.substring(0, 24) }...'
        </span> task? This action will remove the task and it cannot be reversed.
      </p>
      <div className="task__delete-btn-group">
        <Button type="danger" disabled={ deleteTaskStatus === THUNK_STATUS.LOADING } onClick={ deleteSelectedTask }>
          { deleteTaskStatus === THUNK_STATUS.LOADING ? 'Deleting task...' : 'Delete' }
        </Button>
        <Button type="secondary" onClick={ cancelAction }>Cancel</Button>
      </div>
    </div>
  );
}
