import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import { Button } from '../button';
import { Dropdown } from '../dropdown';
import { TextField } from '../text-field';
import { setTask } from "../../features/tasksSlice";
import { THUNK_STATUS } from "../../constants";

export const TaskForm = () => {
  const [ localStatus, setLocalStatus ] = useState(THUNK_STATUS.IDLE);
  const [ fieldsValue, setFieldsValue ] = useState({
    title: '',
    description: '',
    subtasks: [],
    status: 'to_do'
  });

  const [ fieldsError, setFieldsError ] = useState({
    titleError: null,
    descriptionError: null,
    subtasksError: null
  });

  const dispatch = useDispatch();
  const { boardId } = useParams();

  const { title, description, subtasks, status } = fieldsValue;
  const { titleError, descriptionError, subtasksError } = fieldsError;

  function handleFormFieldsChange({ target }) {
    const { name, value } = target;

    setFieldsValue((prevState) => ({ ...prevState, [ name ]: value }));
  }

  function addSubtask(event) {
    event.preventDefault();

    const subtask = {
      id: uuidv4(),
      completed: false,
      value: ''
    }

    setFieldsValue((prevState) => ({
      ...prevState,
      subtasks: [ ...prevState.subtasks, subtask ]
    }));
  }

  function changeSubtaskValue(event, id) {
    const { target: { value } } = event;

    const updatedSubtasks = subtasks.map((subtask) =>
      subtask.id === id
        ? { ...subtask, value }
        : subtask
    );

    setFieldsValue((prevState) => ({
      ...prevState,
      subtasks: updatedSubtasks
    }));
  }

  function removeSubtask(id) {
    const updatedSubtasks = updatedSubtasks = subtasks.filter(({ id: taskId }) => taskId !== id);

    setFieldsValue((prevState) => ({
      ...prevState,
      subtasks: updatedSubtasks
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if ([ title, description, subtasks.length ].every(Boolean)) {
      try {
        setLocalStatus(THUNK_STATUS.LOADING);

        const taskDetails = {
          pageId: boardId,
          title,
          description,
          subtasks,
          status
        };

        await dispatch(setTask(taskDetails));
      } catch(error) {
        setLocalStatus(THUNK_STATUS.FAILED);
      } finally {
        setLocalStatus(THUNK_STATUS.IDLE);
        // hide modal here
      }
    } else {
      const emptySubtasks = subtasks.filter(({ value }) => !value)
      const errorSubtasksIds = emptySubtasks.map(({ id }) => id);

      setFieldsError((prevState) => ({
        ...prevState,
        title: !title,
        description: !description,
        subtasks: errorSubtasksIds
      }));
    }
  }

  return (
    <form className="form task__form" onSubmit={ handleSubmit }>
      <h2 className="form__title">Add New Task</h2>
      <div className="form__group">
        <p className="form__group-title">Title</p>
        <TextField placeholder="e.g. Make coffee"
            name="title"
            value={ title }
            error={ titleError }
            onChange={ handleFormFieldsChange } />
      </div>
      <div className="form__group">
        <p className="form__group-title">Description</p>
        <TextField placeholder="e.g. Make coffee"
            name="description"
            multiline={ true }
            value={ description }
            error={ descriptionError }
            onChange={ handleFormFieldsChange } />
      </div>
      <div className="form__group task__form-group--subtasks">
        <p className="form__group-title">Subtasks</p>
        { subtasks.map(({ id, value }) => (
          <TextField key={ id }
              closable={ true }
              value={ value }
              error={ subtasksError.includes(id) }
              onClick={ () => removeSubtask(id) }
              onChange={ (event) => changeSubtaskValue(event, id) } />
        )) }
      </div>
      <div className="form__group">
        <Button type="secondary" onClick={ addSubtask }>+ Add Subtask</Button>
      </div>
      <div className="form__group">
        <p className="form__group-title">Status</p>
        <Dropdown name="status" value={ status } onChange={ handleFormFieldsChange } />
      </div>
      <Button type="primary" disabled={ localStatus === THUNK_STATUS.LOADING }>
        Create task
      </Button>
    </form>
  );
}