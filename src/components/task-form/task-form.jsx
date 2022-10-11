import { Button } from '../button';
import { TextField } from '../text-field';
import { Dropdown } from '../dropdown';
import './task-form.scss';

const textareaPlaceholder = "e.g. It's always good to take a break. This 15 minutes break will recharge the batteries.";

export const TaskForm = ({ editing }) => {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  return (
    <form className="task__form" onSubmit={ handleFormSubmit }>
      <h2 className="task__form-title">{ editing ? "Edit" : "Add New" } Task</h2>
      <div className="task__form-group">
        <div className="task__form-group--title">Title</div>
        <TextField placeholder="e.g. Make coffee" />
      </div>
      <div className="task__form-group">
        <div className="task__form-group--title">Description</div>
        <TextField multiline={ true } placeholder={ textareaPlaceholder } />
      </div>
      <div className="task__form-group task__form-group--subtasks">
        <div className="task__form-group--title">Subtasks</div>
        <TextField placeholder="e.g. Make coffee" closable={ true } />
        <TextField placeholder="e.g. Drink coffee and smile" closable={ true } />
      </div>
      <div className="task__form-group">
        <Button type="secondary">+ Add New Task</Button>
      </div>
      <div className="task__form-group">
        <div className="task__form-group--title">Status</div>
        <Dropdown />
      </div>
      <div className="task__form-group">
        <Button type="primary">{ editing ? "Save changes" : "Create task" }</Button>
      </div>
    </form>
  );
}