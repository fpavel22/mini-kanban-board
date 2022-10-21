import { useSelector, useDispatch } from 'react-redux';

import { Button } from '../button';
import { toggleTaskDelete } from '../../features/showModalSlice';
import { tasksSelector, deleteTask } from '../../features/tasksSlice';
import { useDeleteDocument } from '../../hooks';
import { FIREBASE_COLLECTIONS } from '../../constants';

export const TaskDelete = () => {
  const { selectedTask } = useSelector(tasksSelector);
  const dispatch = useDispatch();
  
  const { loading, deleteDocument } = useDeleteDocument(FIREBASE_COLLECTIONS.TASKS);

  async function deleteSelectedTask() {
    await deleteDocument(selectedTask.id);
    dispatch(deleteTask(selectedTask.id));
    dispatch(toggleTaskDelete(false));
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
        <Button type="danger" disabled={ loading } onClick={ deleteSelectedTask }>
          { loading ? 'Deleting task...' : 'Delete' }
        </Button>
        <Button type="secondary" onClick={ cancelAction }>Cancel</Button>
      </div>
    </div>
  );
}
