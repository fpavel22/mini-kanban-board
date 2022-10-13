import { useSelector } from 'react-redux';

import { tasksSelector } from '../../features/tasksSlice';
import { Dropdown } from '../dropdown';
import { SubtaskItem } from '../subtask-item/subtask-item';

import './task-view.scss';

export const TaskView = () => {
  const { selectedTask } = useSelector(tasksSelector);
  const { subtasks } = selectedTask;
  
  const subtasksCount = subtasks.length;
  const subtasksCompleted = subtasks.filter(({ completed }) => completed).length;

  const renderSubtasksList = (
    <div className="subtasks__list">
      { subtasks.map(({ id, value, completed }) => (
        <SubtaskItem key={ id }
            subtaskId={ id }
            completed={ completed }>
          { value }
        </SubtaskItem>
      )) }
    </div>
  )

  return (
    <div className="task__view">
      <h2 className="task__view-title">
        { selectedTask.title }
      </h2>
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
    </div>
  );
};
