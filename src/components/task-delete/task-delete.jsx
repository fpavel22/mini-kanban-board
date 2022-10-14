import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../button';

import { hideDeleteTaskModal } from '../../features/showModalSlice';
import { tasksSelector, deleteTask } from '../../features/tasksSlice';
import './task-delete.scss';

export const TaskDelete = () => {
  const { selectedTask } = useSelector(tasksSelector);
  const dispatch = useDispatch();

  function deleteSelectedTask() {
    dispatch(deleteTask(selectedTask.id));
    dispatch(hideDeleteTaskModal());
  }
  
  function cancelAction() {
    dispatch(hideDeleteTaskModal());
  }

  return (
    <div className="task__delete">
      <h2 className="task__delete-title">Delete this task?</h2>
      <p className="task__delete-body">
        Are you sure you want to delete the <span className="task__title">'{ selectedTask?.title }'</span> task? This action will remove the task and it cannot be reversed.
      </p>
      <div className="task__delete-btn-group">
        <Button type="danger" onClick={ deleteSelectedTask }>Delete</Button>
        <Button type="secondary" onClick={ cancelAction }>Cancel</Button>
      </div>
    </div>
  );
}
