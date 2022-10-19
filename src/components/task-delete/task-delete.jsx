import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../button';

import { toggleTaskDelete } from '../../features/showModalSlice';
import { tasksSelector, deleteTask } from '../../features/tasksSlice';

import './task-delete.scss';

export const TaskDelete = () => {
  const { selectedTask } = useSelector(tasksSelector);
  const dispatch = useDispatch();

  function deleteSelectedTask() {
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
        <Button type="danger" onClick={ deleteSelectedTask }>Delete</Button>
        <Button type="secondary" onClick={ cancelAction }>Cancel</Button>
      </div>
    </div>
  );
}
