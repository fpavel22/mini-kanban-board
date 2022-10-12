import { Dropdown } from '../dropdown';
import { SubtaskItem } from '../subtask-item/subtask-item';

import './task-view.scss';

export const TaskView = ({ title, description, subtasks, status }) => {
  return (
    <div className="task__view">
      <h2 className="task__view-title">{ title }</h2>
      <p className="task__view-description">{ description }</p>
      <div className="task__view-subtasks">
        <h5 className="task__view-label">Subtasks (2 out of 3)</h5>
        <ul>
          { subtasks.map((subtask) => (
            <SubtaskItem key={ subtask.value }
                completed={ subtask.completed }>
              { subtask.value }
            </SubtaskItem>
          )) }
        </ul>
      </div>
      <div className="task__view-status">
        <h5 className="task__view-label">Current status</h5>
        <Dropdown value={ status } disabled={ true } />
      </div>
    </div>
  );
}