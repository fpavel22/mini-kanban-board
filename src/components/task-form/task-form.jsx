import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { hideModal } from '../../features/showAddTaskModalSlice';
import { Button } from '../button';
import { TextField } from '../text-field';
import { Dropdown } from '../dropdown';

import './task-form.scss';

const TEXTAREA_PLACEHOLDER = "e.g. It's always good to take a break. This 15 minutes break will recharge the batteries.";

export const TaskForm = ({ editing }) => {
  const [ formFieldsState, setFormFieldsState ] = useState({
    title: '',
    description: '',
    subtasks: [],
    status: 'to_do'
  });

  const dispatch = useDispatch();

  function handleFormFieldsChange({ target: { name, value } }) {
    setFormFieldsState((prevState) => ({ ...prevState, [ name ]: value }));
  }

  function addNewSubtask(event) {
    event.preventDefault();

    setFormFieldsState((prevState) => ({
      ...prevState,
      subtasks: [ ...prevState.subtasks, { id: uuidv4(), value: '', completed: false } ]
    }));
  }

  function removeSubtask(fieldId) {
    const { subtasks } = formFieldsState;
    const updatedSubtasks = subtasks.filter(({ id }) => id !== fieldId);

    setFormFieldsState((prevState) => {
      return {
        ...prevState,
        subtasks: updatedSubtasks
      }
    });
  }

  function handleSubtaskValueChange({ target: { value } }, fieldId) {
    const { subtasks } = formFieldsState;
    const updatedSubtasks = subtasks.map((task) => {
      if (task.id === fieldId) {
        return {
          ...task,
          value
        }
      } else {
        return task;
      }
    });

    setFormFieldsState((prevState) => ({ ...prevState, subtasks: updatedSubtasks }));
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    dispatch(hideModal());
  }

  return (
    <form className="task__form" onSubmit={ handleFormSubmit }>
      <h2 className="task__form-title">{ editing ? "Edit" : "Add New" } Task</h2>
      <div className="task__form-group">
        <div className="task__form-group--title">Title</div>
        <TextField placeholder="e.g. Make coffee"
            name="title"
            value={ formFieldsState.title }
            onChange={ handleFormFieldsChange } />
      </div>
      <div className="task__form-group">
        <div className="task__form-group--title">Description</div>
        <TextField multiline={ true }
            placeholder={ TEXTAREA_PLACEHOLDER }
            name="description"
            value={ formFieldsState.description }
            onChange={ handleFormFieldsChange } />
      </div>
      <div className="task__form-group task__form-group--subtasks">
        <div className="task__form-group--title">Subtasks</div>
        { formFieldsState.subtasks.map(({ id, value }) => (
          <TextField key={ id }
              closable={ true }
              value={ value }
              onChange={ (event) => handleSubtaskValueChange(event, id) }
              onClick={ () => removeSubtask(id) } />
        )) }
      </div>
      <div className="task__form-group">
        <Button type="secondary" onClick={ addNewSubtask }>+ Add New Task</Button>
      </div>
      <div className="task__form-group">
        <div className="task__form-group--title">Status</div>
        <Dropdown name="status" value={ formFieldsState.status } onChange={ handleFormFieldsChange } />
      </div>
      <div className="task__form-group">
        <Button type="primary">{ editing ? "Save changes" : "Create task" }</Button>
      </div>
    </form>
  );
}