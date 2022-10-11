import { Dropdown } from '../dropdown';

export const TaskView = ({ title, description, subtasks }) => {
  return (
    <div className="task__view">
      <h2 className="task__view-title">{ title }</h2>
      <p className="task__view-description">{ description }</p>
      <div className="task__view-subtasks">
        <div className="task__view-label">Subtasks (2 out of 3)</div>
        <ul>
          { subtasks.map((subtask) => <li key={ subtask.value }>{ subtask.value }</li>)}
        </ul>
      </div>
      <div className="task__view-status">
        <div className="task__view-label">Current status</div>
        <Dropdown />
      </div>
    </div>
  );
}