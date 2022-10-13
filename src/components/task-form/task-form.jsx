import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { hideAddTaskModal } from '../../features/showModalSlice';
import { addTask } from '../../features/tasksSlice';
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

  const [ errors, setErrors ] = useState({
    title: false,
    description: false,
    subtasks: []
  });

  const dispatch = useDispatch();
  
  const { title, description, subtasks, status } = formFieldsState;

  function handleFormFieldsChange({ target: { name, value } }) {
    setFormFieldsState((prevState) => ({ ...prevState, [ name ]: value }));
  }

  function addNewSubtask(event) {
    event.preventDefault();

    const newSubtask = {
      id: uuidv4(),
      value: '',
      completed: false
    };

    setFormFieldsState((prevState) => ({
      ...prevState,
      subtasks: [ ...prevState.subtasks, newSubtask ]
    }));
  }

  function removeSubtask(fieldId) {
    const updatedSubtasks = subtasks.filter(({ id }) => id !== fieldId);

    setFormFieldsState((prevState) => ({
      ...prevState,
      subtasks: updatedSubtasks
    }));
  }

  function handleSubtaskValueChange({ target: { value } }, fieldId) {
    const updatedSubtasks = subtasks.map((subtask) =>
      subtask.id === fieldId ? { ...subtask, value } : subtask);

    setFormFieldsState((prevState) => ({ ...prevState, subtasks: updatedSubtasks }));
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    const _title = Boolean(title);
    const _description = Boolean(description);
    const _subtasks = subtasks.filter(({ value }) => !value);

    if (_title && _description && _subtasks.length === 0) {
      console.log('new task');
      const newTask = {
        title,
        description,
        subtasks,
        status
      };
  
      dispatch(addTask(newTask));
      dispatch(hideAddTaskModal());
    } else {
      setErrors((prevState) => ({
        ...prevState,
        title: !_title,
        description: !_description,
        subtasks: _subtasks
      }));
    }
  }

  return (
    <form className="task__form" onSubmit={ handleFormSubmit }>
      <h2 className="task__form-title">{ editing ? "Edit" : "Add New" } Task</h2>
      <div className="task__form-group">
        <div className="task__form-group--title">Title</div>
        <TextField placeholder="e.g. Make coffee"
            name="title"
            value={ title }
            error={ errors.title }
            onChange={ handleFormFieldsChange } />
      </div>
      <div className="task__form-group">
        <div className="task__form-group--title">Description</div>
        <TextField multiline={ true }
            placeholder={ TEXTAREA_PLACEHOLDER }
            name="description"
            value={ description }
            error={ errors.description }
            onChange={ handleFormFieldsChange } />
      </div>
      <div className="task__form-group task__form-group--subtasks">
        <div className="task__form-group--title">Subtasks</div>
        { subtasks.map(({ id, value }) => (
          <TextField key={ id }
              closable={ true }
              value={ value }
              error={ errors.subtasks.find(({ id: taskId }) => taskId === id) }
              onChange={ (event) => handleSubtaskValueChange(event, id) }
              onClick={ () => removeSubtask(id) } />
        )) }
      </div>
      <div className="task__form-group">
        <Button type="secondary" onClick={ addNewSubtask }>+ Add New Task</Button>
      </div>
      <div className="task__form-group">
        <div className="task__form-group--title">Status</div>
        <Dropdown name="status" value={ status } onChange={ handleFormFieldsChange } />
      </div>
      <div className="task__form-group">
        <Button type="primary">{ editing ? "Save changes" : "Create task" }</Button>
      </div>
    </form>
  );
};
